import { serverSchema } from '@/env/schema.mjs';
import { publicProcedure, router } from '@/server/trpc';
import {
	Macro,
	MacroRecording,
	macroIDSchema,
	macroRecordingIdSchema,
	macroRecordingSchema,
	macroSchema,
	macroSequenceIDSchema,
} from '@/zods/analysis';
import { createReadStream, createWriteStream } from 'fs';
import ndjson from 'ndjson';
import path from 'path';
import { z } from 'zod';

export const analysisRouter = router({
	saveMacro: publicProcedure.input(macroSchema).mutation(async ({ input }) => {
		const environment = serverSchema.parse(process.env);
		const writeStream = createWriteStream(path.join(environment.RATOS_DATA_DIR, 'anlysis', 'macros.ndjson'), {
			flags: 'a+',
			encoding: 'utf-8',
		});
		var serialize = ndjson.stringify();
		serialize.pipe(writeStream);
		serialize.write(input);
		serialize.end();

		return {
			result: 'success',
		};
	}),
	getMacros: publicProcedure
		.input(z.object({ cursor: z.number().default(0), limit: z.number().default(50) }))
		.output(z.object({ macros: z.array(macroSchema), cursor: z.number().default(0), hasNextPage: z.boolean() }))
		.mutation(async ({ input }) => {
			const environment = serverSchema.parse(process.env);
			const file = path.join(environment.RATOS_DATA_DIR, 'anlysis', 'macros.ndjson');
			const stream = createReadStream(file, { encoding: 'utf-8', start: input.cursor });
			const availableBytes = stream.readableLength;

			const macros: Macro[] = [];

			stream.pipe(ndjson.parse()).on('data', function (obj) {
				macros.push(macroSchema.parse(obj));
				if (macros.length >= input.limit) {
					stream.destroy();
				}
			});
			return {
				macros,
				cursor: stream.bytesRead,
				hasNextPage: stream.bytesRead < availableBytes,
			};
		}),
	saveRecording: publicProcedure.input(z.object({ recording: macroRecordingSchema })).mutation(async ({ input }) => {
		const environment = serverSchema.parse(process.env);
		const writeStream = createWriteStream(
			path.join(environment.RATOS_DATA_DIR, 'analysis', 'recordings', `${input.recording.macroId}.ndjson`),
			{
				flags: 'a+',
				encoding: 'utf-8',
			},
		);
		var serialize = ndjson.stringify();
		serialize.pipe(writeStream);
		serialize.write(input);
		serialize.end();
	}),
	getRecordings: publicProcedure
		.input(
			z.object({
				macroId: macroIDSchema.optional(),
				sequenceId: macroSequenceIDSchema.optional(),
				limit: z.number().default(50),
				cursor: z.number().default(0),
			}),
		)
		.output(
			z.object({ recordings: z.array(macroRecordingSchema), cursor: z.number().default(0), hasNextPage: z.boolean() }),
		)
		.mutation(async ({ input }) => {
			const environment = serverSchema.parse(process.env);
			const file = path.join(environment.RATOS_DATA_DIR, 'analysis', 'recordings', `${input.macroId}.ndjson`);
			const stream = createReadStream(file, { encoding: 'utf-8' });
			const availableBytes = stream.readableLength;
			const recordings: MacroRecording[] = [];

			stream.pipe(ndjson.parse()).on('data', function (obj) {
				recordings.push(macroRecordingSchema.parse(obj));
				if (recordings.length >= input.limit) {
					stream.destroy();
				}
			});
			return {
				recordings,
				cursor: stream.bytesRead,
				hasNextPage: stream.bytesRead < availableBytes,
			};
		}),
	getRecording: publicProcedure
		.input(z.object({ macroId: macroIDSchema, recordingId: macroRecordingIdSchema }))
		.output(macroSchema.nullable())
		.mutation(async ({ input }) => {
			const environment = serverSchema.parse(process.env);
			const file = path.join(environment.RATOS_DATA_DIR, 'analysis', 'recordings', `${input.macroId}.ndjson`);
			const stream = createReadStream(file, { encoding: 'utf-8' });
			const availableBytes = stream.readableLength;
			let recording: MacroRecording | null = null;

			stream.pipe(ndjson.parse()).on('data', function (obj) {
				const incoming = macroRecordingSchema.safeParse(obj);
				if (incoming.success && incoming.data.macroRecordingId === input.recordingId) {
					recording = incoming.data;
					stream.destroy();
				}
			});
			return recording;
		}),
});
