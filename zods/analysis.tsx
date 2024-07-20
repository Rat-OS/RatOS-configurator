import { z } from 'zod';
import { KlipperAccelSensorNameSchame } from '@/zods/hardware';

export const aDXL345ResponseHeaderSchema = z.union([
	z.literal('time'),
	z.literal('x_acceleration'),
	z.literal('y_acceleration'),
	z.literal('z_acceleration'),
	z.literal('x'), // Beacon returns x, y, z
	z.literal('y'), // Beacon returns x, y, z
	z.literal('z'), // Beacon returns x, y, z
]);

export const klipperADXL345SubscriptionResponseSchema = z.object({
	header: z.tuple([
		aDXL345ResponseHeaderSchema,
		aDXL345ResponseHeaderSchema,
		aDXL345ResponseHeaderSchema,
		aDXL345ResponseHeaderSchema,
	]),
});

export const klipperADXL345SubscriptionDataSchema = z.object({
	data: z.array(z.tuple([z.number(), z.number(), z.number(), z.number()])),
	overflows: z.number().optional(),
	errors: z.number().optional(),
});

export const beaconAccelSubscriptionDataSchema = z.array(z.tuple([z.number(), z.number(), z.number(), z.number()]));

export const psdSchema = z.object({
	frequencies: z.array(z.number()),
	estimates: z.array(z.number()),
	powerRange: z.object({
		max: z.number(),
		min: z.number(),
	}),
});

export const accumulatedPSDSchema = z.object({
	x: psdSchema,
	y: psdSchema,
	z: psdSchema,
	total: psdSchema,
});

// Macro data structure
export const macroIDSchema = z.string().brand('MacroID');

export const macroSequenceIDSchema = z.string().brand('MacroSequenceID');

export const macroRecordingIdSchema = z.string().brand('MacroRecordingID');

export const macroRecordingRunIdSchema = z.string().brand('MacroRecordingRunID');

export const macroRecordingSettingsSchema = z
	.object({
		capturePSD: z.boolean().default(false),
		accelerometer: KlipperAccelSensorNameSchame.optional(),
		color: z.string().optional(),
	})
	.superRefine((val, ctx) => {
		if (val.capturePSD && val.accelerometer == null) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Required when recording resonance data',
				path: ['accelerometer'],
			});
		}
		return val;
	});

export const macroRecordingSchema = z.object({
	id: macroRecordingIdSchema,
	macroRecordingRunId: macroRecordingRunIdSchema,
	scv: z.number().default(5),
	macroId: macroIDSchema,
	sequenceId: macroSequenceIDSchema,
	startTimeStamp: z.number(),
	endTimeStamp: z.number(),
	accelerometer: KlipperAccelSensorNameSchame,
	recordingHardwareName: z.string(),
	psd: accumulatedPSDSchema,
	name: z.string(),
});

export const macroRecordingSchemaWithoutSourcePSDs = macroRecordingSchema;

export const macroSequenceSchema = z.object({
	id: macroSequenceIDSchema,
	name: z.string(),
	recording: macroRecordingSettingsSchema.nullable(),
	gcode: z.string().min(2),
});

export const macroSchema = z.object({
	id: macroIDSchema,
	name: z.string(),
	description: z.string(),
	createdAtTimeStamp: z.number(),
	updatedAtTimeStamp: z.number().nullable(),
	recordingCount: z.record(macroSequenceIDSchema, z.number()),
	sequences: z.array(macroSequenceSchema),
});

export const createMacroSchema = macroSchema.omit({
	recordingCount: true,
	createdAtTimeStamp: true,
	updatedAtTimeStamp: true,
});

// inferred types:

export type KlipperAccelResponseHeader = z.infer<typeof aDXL345ResponseHeaderSchema>;

export type KlipperAccelSubscriptionResponse = z.infer<typeof klipperADXL345SubscriptionResponseSchema>;

export type KlipperAccelSubscriptionData = z.infer<typeof klipperADXL345SubscriptionDataSchema>;
export type BeaconAccelSubscriptionData = z.infer<typeof beaconAccelSubscriptionDataSchema>;

export type PSD = z.infer<typeof psdSchema>;

export type AccumulatedPSD = z.infer<typeof accumulatedPSDSchema>;

export type MacroID = z.infer<typeof macroIDSchema>;

export type MacroRecordingSettings = z.infer<typeof macroRecordingSettingsSchema>;

export type MacroRecording = z.infer<typeof macroRecordingSchema>;

export type MacroRecordingWithoutSourcePSDs = z.infer<typeof macroRecordingSchemaWithoutSourcePSDs>;

export type MacroSequence = z.infer<typeof macroSequenceSchema>;

export type Macro = z.infer<typeof macroSchema>;
