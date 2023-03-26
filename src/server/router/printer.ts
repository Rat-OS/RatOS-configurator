import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { getLogger } from '../../helpers/logger';
import * as trpc from '@trpc/server';
import { exec } from 'child_process';
import { promisify } from 'util';

import { serverSchema } from '../../env/schema.mjs';
import { parseMetadata } from '../../helpers/parseMetadata';

const environment = serverSchema.parse(process.env);

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

const hardwareType = z.object({
	path: z.string().startsWith(environment.RATOS_CONFIGURATION_PATH).endsWith('.cfg'),
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

export const parseDirectory = async <T extends z.ZodType>(directory: string, zod: T) => {
	const defs = await promisify(exec)(`ls ${process.env.RATOS_CONFIGURATION_PATH}/${directory}/*.cfg`);
	return (
		await Promise.all(
			defs.stdout
				.split('\n')
				.map((f) => f.trim())
				.filter((f) => f !== '')
				.map(async (f) => {
					const parsedFile = await parseMetadata(f, zod);
					if (parsedFile == null) {
						getLogger().error(`No metadata present in ${f} skipping..`);
						return null;
					}
					return parsedFile;
				}),
		)
	).filter((f): f is z.TypeOf<T> => f != null);
};

export const printerRouter = trpc
	.router()
	.query('hotends', {
		output: z.array(Hotend),
		resolve: () => parseDirectory('hotends', Hotend),
	})
	.query('extruders', {
		output: z.array(Extruder),
		resolve: () => parseDirectory('extruders', Extruder),
	})
	.query('probes', {
		output: z.array(Probe),
		resolve: () => parseDirectory('z-probe', Probe),
	})
	.query('thermistors', {
		resolve: () => thermistors,
	})
	.query('x-endstops', {
		output: z.array(Endstop),
		resolve: () => [
			{ id: 'endstop' as const, title: 'Physical Endstop' },
			{ id: 'endstop-toolboard' as const, title: 'Physical Endstop (toolboard)' },
			{ id: 'sensorless' as const, title: 'Sensorless Homing' },
		],
	})
	.query('y-endstops', {
		output: z.array(Endstop),
		resolve: () => [
			{ id: 'endstop' as const, title: 'Physical Endstop' },
			{ id: 'sensorless' as const, title: 'Sensorless Homing' },
		],
	});
