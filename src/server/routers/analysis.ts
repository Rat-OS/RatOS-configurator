import { serverSchema } from '@/env/schema.mjs';
import { publicProcedure, router } from '@/server/trpc';
import {
	createMacroSchema,
	macroIDSchema,
	macroRecordingIdSchema,
	macroRecordingRunIdSchema,
	macroRecordingSchema,
	macroRecordingSchemaWithoutSourcePSDs,
	macroSchema,
	macroSequenceIDSchema,
} from '@/zods/analysis';
import path from 'path';
import { z } from 'zod';
import { initObjectStorage } from '@/server/helpers/ndjson';
import { getLogger } from '@/server/helpers/logger';

const environment = serverSchema.parse(process.env);
const dataDir = path.join(environment.RATOS_DATA_DIR, 'analysis');
const recordingsDataDir = path.join(environment.RATOS_DATA_DIR, 'analysis', 'recordings');
const macroStorage = initObjectStorage(path.join(dataDir, 'macros.ndjson'), macroSchema);

export const analysisRouter = router({
	createMacro: publicProcedure.input(createMacroSchema).mutation(async ({ input }) => {
		return await macroStorage.upsert({
			...input,
			recordingCount: {}, // recordingCount is always initialized as an empty object
			createdAtTimeStamp: Date.now(),
			updatedAtTimeStamp: null,
		});
	}),
	updateMacro: publicProcedure.input(createMacroSchema).mutation(async ({ input }) => {
		const file = path.join(recordingsDataDir, `${input.id}.ndjson`);
		const recordingStorage = initObjectStorage(file, macroRecordingSchema);
		const totalRecordingsRemoved = await recordingStorage.destroyStorage();
		getLogger().info(`Deleted recordings for macro "${input.name}" (${input.id})`);
		return await macroStorage.update(
			{
				...input,
				recordingCount: {}, // recordingCount is always initialized as an empty object
				updatedAtTimeStamp: Date.now(),
			},
			input.id,
		);
	}),
	deleteMacro: publicProcedure.input(macroIDSchema).mutation(async ({ input }) => {
		const macro = await macroStorage.findById(input);
		if (macro == null) {
			throw new Error(`Can't delete macro: macro with id ${input} not found`);
		}
		const file = path.join(recordingsDataDir, `${input}.ndjson`);
		const recordingStorage = initObjectStorage(file, macroRecordingSchema);
		const totalRecordingsRemoved = await recordingStorage.destroyStorage();
		getLogger().info(`Deleted recordings for macro "${macro.name}" (${macro.id})`);
		const macrosRemoved = await macroStorage.remove(input);
		getLogger().info(`Deleted macro "${macro.name}" (${macro.id})`);
		return {
			result: 'success',
			totalRecordingsRemoved,
			macrosRemoved,
		};
	}),
	deleteMacros: publicProcedure.input(z.array(macroIDSchema)).mutation(async ({ input }) => {
		const result = await Promise.all(
			input.map(async (id) => {
				const macro = await macroStorage.findById(id);
				if (macro == null) {
					const resultMsg = `Can't delete macro: macro with id ${id} not found`;
					getLogger().warn(resultMsg);
					return { id, msg: resultMsg, totalRecordingsRemoved: 0, success: false };
				}
				const file = path.join(recordingsDataDir, `${id}.ndjson`);
				const recordingStorage = initObjectStorage(file, macroRecordingSchema);
				const totalRecordingsRemoved = await recordingStorage.destroyStorage();
				const resultMsg = `Deleted ${totalRecordingsRemoved} recordings for macro "${macro.name}" (${macro.id})`;
				getLogger().info(resultMsg);
				return { id, msg: resultMsg, totalRecordingsRemoved, success: true };
			}),
		);
		const macrosRemoved = await macroStorage.removeAll(input);
		getLogger().info(`Deleted ${macrosRemoved}/${input.length} macros`);
		return {
			result,
			macrosRemoved,
		};
	}),
	deleteRecordings: publicProcedure
		.input(z.object({ macroId: macroIDSchema, recordingIds: z.array(macroRecordingIdSchema) }))
		.mutation(async ({ input }) => {
			const macro = await macroStorage.findById(input.macroId);
			if (macro == null) {
				const resultMsg = `Can't delete recordings, macro with id ${input.macroId} not found`;
				getLogger().warn(resultMsg);
				return { msg: resultMsg, recordingsRemoved: 0, success: false };
			}
			const file = path.join(recordingsDataDir, `${input.macroId}.ndjson`);
			const recordingStorage = initObjectStorage(file, macroRecordingSchema);
			const removeResult = await recordingStorage.removeAll(input.recordingIds);
			const resultMsg = `Deleted ${removeResult.linesDeleted} recordings for macro "${macro.name}" (${input.macroId})`;
			const recordingCount = macro.recordingCount as z.input<typeof macroSchema>['recordingCount'];
			removeResult.found.forEach((r) => {
				recordingCount[r.sequenceId] -= 1;
			});
			await macroStorage.update(
				{ recordingCount: recordingCount, updatedAtTimeStamp: new Date().getTime() },
				input.macroId,
			);
			getLogger().info(resultMsg);
			return { msg: resultMsg, recordingsRemoved: removeResult.linesDeleted, success: true };
		}),
	findMacro: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
		const macro = await macroStorage.findById(input.id);
		if (macro == null) {
			throw new Error(`Macro with id ${input.id} not found`);
		}
		return macro;
	}),
	getMacros: publicProcedure
		.input(z.object({ cursor: z.number().default(0), limit: z.number().default(50) }))
		.query(async ({ input }) => {
			return await macroStorage.getAll(input.cursor, input.limit);
		}),
	saveRecording: publicProcedure.input(z.object({ recording: macroRecordingSchema })).mutation(async ({ input }) => {
		const macro = await macroStorage.findById(input.recording.macroId);
		if (macro == null) {
			throw new Error(`Can't save recording: macro with id ${input.recording.macroId} not found`);
		}
		if (!macro.sequences.some((s) => s.id === input.recording.sequenceId)) {
			throw new Error(
				`Can't save recording: sequence with id ${input.recording.sequenceId} not found in "${macro.name}" macro`,
			);
		}
		const file = path.join(recordingsDataDir, `${input.recording.macroId}.ndjson`);
		const recordingStorage = initObjectStorage(file, macroRecordingSchema);
		const recording = await recordingStorage.upsert(input.recording);
		await macroStorage.update(
			{
				recordingCount: { [input.recording.sequenceId]: (macro.recordingCount[input.recording.sequenceId] ?? 0) + 1 },
				updatedAtTimeStamp: Date.now(),
			},
			input.recording.macroId,
		);
		return recording;
	}),
	getNextAndPreviousRunRecordingIds: publicProcedure
		.input(z.object({ macroId: macroIDSchema, runId: macroRecordingRunIdSchema }))
		.output(z.object({ next: macroRecordingRunIdSchema.nullable(), previous: macroRecordingRunIdSchema.nullable() }))
		.query(async ({ input }) => {
			const file = path.join(recordingsDataDir, `${input.macroId}.ndjson`);
			const recordingStorage = initObjectStorage(file, macroRecordingSchemaWithoutSourcePSDs);
			const recordings = await recordingStorage.getAll();
			const first = recordings.result.findIndex((r) => r.macroRecordingRunId === input.runId);
			const last = recordings.result.findLastIndex((r) => r.macroRecordingRunId === input.runId);
			if (first === -1 || last === -1) {
				throw new Error(`Recording with id ${input.runId} not found in macro with id ${input.macroId}`);
			}
			const nextRecording = recordings.result[last + 1];
			const previousRecording = recordings.result[first - 1];
			return {
				next: nextRecording?.macroRecordingRunId ?? null,
				previous: previousRecording?.macroRecordingRunId ?? null,
			};
		}),
	getRecordings: publicProcedure
		.input(
			z.object({
				macroId: macroIDSchema,
				sequenceId: macroSequenceIDSchema.optional(),
				includeSource: z.boolean().default(false),
				limit: z.number().default(50),
				cursor: z.number().default(0),
			}),
		)
		.query(async ({ input }) => {
			const file = path.join(recordingsDataDir, `${input.macroId}.ndjson`);
			const recordingStorage = initObjectStorage(
				file,
				input.includeSource ? macroRecordingSchema : macroRecordingSchemaWithoutSourcePSDs, // effectively filters out the source PSDs
			);
			const recordings = await recordingStorage.getAll(input.cursor, input.limit);
			if (input.sequenceId) {
				const macro = await macroStorage.findById(input.macroId);
				if (macro == null) {
					throw new Error(`Macro with id ${input.macroId} not found`);
				}
				recordings.result = recordings.result.filter((r) => r.sequenceId === input.sequenceId);
				recordings.total = macro.recordingCount[input.sequenceId] ?? 0;
			}
			return recordings;
		}),
	getRecording: publicProcedure
		.input(z.object({ macroId: macroIDSchema, recordingId: macroRecordingIdSchema }))
		.output(macroRecordingSchemaWithoutSourcePSDs.nullable())
		.query(async ({ input }) => {
			const file = path.join(recordingsDataDir, `${input.macroId}.ndjson`);
			const recordingStorage = initObjectStorage(file, macroRecordingSchemaWithoutSourcePSDs);
			return await recordingStorage.find((r) => r.id === input.recordingId);
		}),
	getRunRecordings: publicProcedure
		.input(z.object({ runId: macroRecordingRunIdSchema, macroId: macroIDSchema }))
		.query(async ({ input }) => {
			const file = path.join(recordingsDataDir, `${input.macroId}.ndjson`);
			const recordingStorage = initObjectStorage(file, macroRecordingSchemaWithoutSourcePSDs);
			return await recordingStorage.findAll((r) => r.macroRecordingRunId === input.runId);
		}),
});
