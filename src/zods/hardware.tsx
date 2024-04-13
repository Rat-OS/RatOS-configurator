import { z } from 'zod';
import { serverSchema } from '@/env/schema.mjs';
import { PrinterRailDefinition, Stepper } from '@/zods/motion';

export const thermistors = [
	'EPCOS 100K B57560G104F',
	'ATC Semitec 104GT-2',
	'ATC Semitec 104NT-4-R025H42G',
	'Generic 3950',
	'Honeywell 100K 135-104LAG-J01',
	'NTC 100K MGB18-104F39050L32',
	'SliceEngineering 450',
	'TDK NTCG104LH104JT1',
	'PT1000',
] as const;

let startsWithServerValidation = '';
if (process.env.RATOS_CONFIGURATION_PATH) {
	const environment = serverSchema.parse(process.env);
	startsWithServerValidation = environment.RATOS_CONFIGURATION_PATH;
}
const hardwareType = z.object({
	path: z.string().startsWith(startsWithServerValidation).endsWith('.cfg'),
	id: z.string(),
});

export const Thermistor = z.enum(thermistors);

export const Hotend = hardwareType.extend({
	type: z.literal('hotend'),
	title: z.string(),
	thermistor: z.enum(thermistors),
	flowType: z.union([z.literal('sf'), z.literal('hf'), z.literal('uhf')]),
});

export const Nozzle = z.object({
	type: z.enum(['Regular', 'CHT']),
	diameter: z.number().min(0.2).max(1.8),
});

export const Extruder = hardwareType.extend({
	type: z.literal('extruder'),
	stepper: Stepper.shape.id.optional(),
	current: PrinterRailDefinition.shape.current.optional(),
	title: z.string(),
});

export const Probe = hardwareType.extend({
	type: z.literal('static-probe').or(z.literal('stowable-probe')),
	title: z.string(),
});

export const Endstop = z.object({
	id: z.enum(['endstop', 'endstop-toolboard', 'sensorless']),
	title: z.string(),
});

export const AccelerometerType = z.union([z.literal('adxl345'), z.literal('lis2dw')]);

export const Accelerometer = z.object({
	id: z.enum(['toolboard', 'controlboard', 'sbc', 'none']),
	title: z.string(),
});

export const Fan = z.object({
	id: z.enum([
		'2pin',
		'4pin',
		'4pin-dedicated',
		'2pin-toolboard',
		'4pin-toolboard',
		'4pin-dedicated-toolboard',
		'none',
	]),
	title: z.string(),
});
