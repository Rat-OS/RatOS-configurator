import { z } from 'zod';
import { getLogger } from '../../helpers/logger';
import * as trpc from '@trpc/server';
import { exec } from 'child_process';
import { promisify } from 'util';

import { parseMetadata } from '../../helpers/parseMetadata';
import { Hotend, Extruder, Probe, thermistors, Endstop } from '../../zods/hardware';
import { readFileSync } from 'fs';
import { Printer } from '../../zods/printer';
import { PartialPrinterConfiguration, PrinterConfiguration } from '../../zods/printer-configuration';
import { xEndstopOptions, yEndstopOptions } from '../../data/endstops';
import { constructKlipperConfigHelpers } from '../../helpers/klipper-config';

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

export const printerRouter = trpc
	.router()
	.query('printers', {
		output: z.array(Printer),
		resolve: async () =>
			(await getPrinters()).sort((a, b) =>
				a.manufacturer === 'Rat Rig' && (b.manufacturer !== 'Rat Rig' || b.description.indexOf('Discontinued') > -1)
					? -1
					: a.name.localeCompare(b.name),
			),
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
		input: PartialPrinterConfiguration.nullable(),
		output: z.array(Endstop),
		resolve: (ctx) => xEndstopOptions(ctx.input),
	})
	.query('y-endstops', {
		input: PartialPrinterConfiguration.nullable(),
		output: z.array(Endstop),
		resolve: (ctx) => yEndstopOptions(ctx.input),
	})
	.mutation('save-configuration', {
		input: PrinterConfiguration,
		resolve: async (ctx) => {
			const config = ctx.input;
			const helper = constructKlipperConfigHelpers(config);
			const { template, initialPrinterCfg } = await import(
				`../../templates/${config.printer.template.replace('-printer.template.cfg', '.ts')}`
			);
			const ratosCfg = template(config, helper);
			const printerCfg = initialPrinterCfg(config, helper);
			// Todo: write to disk
			return {
				ratosCfg: ratosCfg,
				printerCfg: printerCfg,
			};
		},
	});
