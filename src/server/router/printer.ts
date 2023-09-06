import { z } from 'zod';
import { getLogger } from '../../helpers/logger';
import * as trpc from '@trpc/server';
import { exec } from 'child_process';
import { promisify } from 'util';

import { parseMetadata } from '../../helpers/parseMetadata';
import { Hotend, Extruder, Probe, thermistors, Endstop } from '../../zods/hardware';
import { readFileSync } from 'fs';
import { Printer } from '../../zods/printer';

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

export const getPrinters = async () => {
	const defs = await promisify(exec)(`ls ${process.env.RATOS_CONFIGURATION_PATH}/printers/*/printer-definition.json`);
	return z.array(Printer).parse(
		defs.stdout
			.split('\n')
			.map((f) =>
				f.trim() === ''
					? null
					: {
							...(JSON.parse(readFileSync(f).toString()) as {}),
							path: f.replace('printer-definition.json', ''),
							id: f.replace('/printer-definition.json', '').split('/').pop(),
					  },
			)
			.filter((f) => f != null),
	);
};

export const xEndstopOptions = [
	{ id: 'endstop' as const, title: 'Physical Endstop' },
	{ id: 'endstop-toolboard' as const, title: 'Physical Endstop (toolboard)' },
	{ id: 'sensorless' as const, title: 'Sensorless Homing' },
];

export const yEndstopOptions = [
	{ id: 'endstop' as const, title: 'Physical Endstop' },
	{ id: 'sensorless' as const, title: 'Sensorless Homing' },
];

export const printerRouter = trpc
	.router()
	.query('printers', {
		output: z.array(Printer),
		resolve: getPrinters,
	})
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
		resolve: () => xEndstopOptions,
	})
	.query('y-endstops', {
		output: z.array(Endstop),
		resolve: () => yEndstopOptions,
	});
