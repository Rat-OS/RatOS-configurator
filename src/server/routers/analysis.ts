import { serverSchema } from '@/env/schema.mjs';
import { publicProcedure, router } from '@/server/trpc';
import {
	macroIDSchema,
	macroRecordingIdSchema,
	macroRecordingSchema,
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
	createMacro: publicProcedure
		.input(macroSchema.omit({ recordingCount: true, createdAtTimeStamp: true, updatedAtTimeStamp: true }))
		.mutation(async ({ input }) => {
			await macroStorage.upsert({
				...input,
				recordingCount: {}, // recordingCount is always initialized as an empty object
				createdAtTimeStamp: Date.now(),
				updatedAtTimeStamp: null,
			});

			return {
				result: 'success',
			};
		}),
	deleteMacro: publicProcedure.input(macroIDSchema).mutation(async ({ input }) => {
		const macro = await macroStorage.findById(input);
		if (macro == null) {
			throw new Error(`Can't delete macro: macro with id ${input} not found`);
		}
		const file = path.join(recordingsDataDir, `${input}.ndjson`);
		const recordingStorage = initObjectStorage(file, macroRecordingSchema);
		await recordingStorage.destroyStorage();
		getLogger().info(`Deleted recordings for macro "${macro.name}" (${macro.id})`);
		await macroStorage.remove(input);
		getLogger().info(`Deleted macro "${macro.name}" (${macro.id})`);
		return {
			result: 'success',
		};
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
	getRecordings: publicProcedure
		.input(
			z.object({
				macroId: macroIDSchema,
				sequenceId: macroSequenceIDSchema.optional(),
				limit: z.number().default(50),
				cursor: z.number().default(0),
			}),
		)
		.output(
			z.object({ result: z.array(macroRecordingSchema), cursor: z.number().default(0), hasNextPage: z.boolean() }),
		)
		.query(async ({ input }) => {
			const file = path.join(recordingsDataDir, `${input.macroId}.ndjson`);
			const recordingStorage = initObjectStorage(file, macroRecordingSchema);
			return await recordingStorage.getAll(input.cursor, input.limit);
		}),
	getRecording: publicProcedure
		.input(z.object({ macroId: macroIDSchema, recordingId: macroRecordingIdSchema }))
		.output(macroRecordingSchema.nullable())
		.query(async ({ input }) => {
			const file = path.join(recordingsDataDir, `${input.macroId}.ndjson`);
			const recordingStorage = initObjectStorage(file, macroRecordingSchema);
			return await recordingStorage.find((r) => r.id === input.recordingId);
		}),
});
