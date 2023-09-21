import { z } from 'zod';
import { serverSchema } from '../env/schema.mjs';

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
	id: z.string().endsWith('.cfg'),
});

export const Thermistor = z.enum(thermistors);

export const Hotend = hardwareType.extend({
	type: z.literal('hotend'),
	title: z.string(),
	thermistor: z.enum(thermistors),
});

export const Extruder = hardwareType.extend({
	type: z.literal('extruder'),
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

export const Fan = z.object({
	id: z.enum(['2pin', '4pin', '4pin-dedicated']),
	title: z.string(),
});
