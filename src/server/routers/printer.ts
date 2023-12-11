import { z } from 'zod';
import { getLogger } from '../../helpers/logger';
import { promisify } from 'util';

import { parseMetadata } from '../../helpers/metadata';
import { Hotend, Extruder, Probe, thermistors, Endstop, Fan, Accelerometer } from '../../zods/hardware';
import { writeFile, readFileSync, access, constants, copyFile, readFile } from 'fs';
import { Printer } from '../../zods/printer';
import {
	PartialPrinterConfiguration,
	PrinterConfiguration,
	SerializedPartialPrinterConfiguration,
	SerializedPrinterConfiguration,
} from '../../zods/printer-configuration';
import { xEndstopOptions, yEndstopOptions } from '../../data/endstops';
import {
	constructKlipperConfigExtrasGenerator,
	constructKlipperConfigHelpers,
	constructKlipperConfigUtils,
} from '../../helpers/klipper-config';
import { serverSchema } from '../../env/schema.mjs';
import { controllerFanOptions, hotendFanOptions, partFanOptions } from '../../data/fans';
import { getBoards } from './mcu';
import { xAccelerometerOptions, yAccelerometerOptions } from '../../data/accelerometers';
import { glob } from 'glob';
import path from 'path';
import { publicProcedure, router } from '../trpc';
import { deserializePrinterRail } from '../../utils/serialization';
import { serializePrinterConfiguration } from '../../hooks/usePrinterConfiguration';

function isNodeError(error: any): error is NodeJS.ErrnoException {
	return error instanceof Error;
}

type FileAction = 'created' | 'overwritten' | 'skipped' | 'error';

export const parseDirectory = async <T extends z.ZodType>(directory: string, zod: T) => {
	const defs = await glob(`${process.env.RATOS_CONFIGURATION_PATH}/${directory}/*.cfg`);
	return (
		await Promise.all(
			defs
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
	const defs = await glob(`${process.env.RATOS_CONFIGURATION_PATH}/printers/*/printer-definition.json`);
	return z.array(Printer).parse(
		defs
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

const isPrinterCfgInitialized = async () => {
	const environment = serverSchema.parse(process.env);
	try {
		await promisify(access)(path.join(environment.KLIPPER_CONFIG_PATH, 'printer.cfg'), constants.F_OK);
	} catch (e) {
		if (isNodeError(e) && e.code === 'ENOENT') {
			// File does not exist, resume as normal.
			return false;
		} else {
			throw e;
		}
	}
	const currentcfg = await promisify(readFile)(path.join(environment.KLIPPER_CONFIG_PATH, 'printer.cfg'));
	return currentcfg.indexOf('[include RatOS/printers/initial-setup.cfg]') === -1;
};

export const deserializePartialPrinterConfiguration = async (
	config: SerializedPartialPrinterConfiguration,
): Promise<PartialPrinterConfiguration> => {
	const boards = await getBoards();

	const controlboard = boards.find((b) => b.serialPath === config?.controlboard);
	const toolboard = boards.find((b) => b.serialPath === config?.toolboard);
	return PartialPrinterConfiguration.parse({
		printer: (await getPrinters()).find((p) => p.id === config?.printer),
		size: config?.size,
		hotend: (await parseDirectory('hotends', Hotend)).find((h) => h.id === config?.hotend),
		extruder: (await parseDirectory('extruders', Extruder)).find((e) => e.id === config?.extruder),
		probe: (await parseDirectory('z-probe', Probe)).find((p) => p.id === config?.probe),
		thermistor: thermistors.find((t) => t === config?.thermistor),
		xEndstop: xEndstopOptions(config).find((e) => e.id === config?.xEndstop),
		yEndstop: yEndstopOptions(config).find((e) => e.id === config?.yEndstop),
		partFan: partFanOptions({ controlboard, toolboard }).find((f) => f.id === config?.partFan),
		hotendFan: hotendFanOptions({ controlboard, toolboard }).find((f) => f.id === config?.hotendFan),
		controllerFan: controllerFanOptions({ controlboard, toolboard }).find((f) => f.id === config?.controllerFan),
		controlboard: controlboard,
		toolboard: toolboard,
		xAccelerometer: xAccelerometerOptions({ controlboard, toolboard }).find((a) => a.id === config?.xAccelerometer),
		yAccelerometer: yAccelerometerOptions({ controlboard, toolboard }).find((a) => a.id === config?.yAccelerometer),
		performanceMode: config?.performanceMode,
		stealthchop: config?.stealthchop,
		standstillStealth: config?.standstillStealth,
	});
};

export const deserializePrinterConfiguration = async (
	config: SerializedPrinterConfiguration,
): Promise<PrinterConfiguration> => {
	const boards = await getBoards();

	const controlboard = boards.find((b) => b.serialPath === config?.controlboard);
	const toolboard = boards.find((b) => b.serialPath === config?.toolboard);
	return PrinterConfiguration.parse({
		printer: (await getPrinters()).find((p) => p.id === config?.printer),
		size: config?.size,
		hotend: (await parseDirectory('hotends', Hotend)).find((h) => h.id === config?.hotend),
		extruder: (await parseDirectory('extruders', Extruder)).find((e) => e.id === config?.extruder),
		probe: (await parseDirectory('z-probe', Probe)).find((p) => p.id === config?.probe),
		thermistor: thermistors.find((t) => t === config?.thermistor),
		xEndstop: xEndstopOptions(config).find((e) => e.id === config?.xEndstop),
		yEndstop: yEndstopOptions(config).find((e) => e.id === config?.yEndstop),
		partFan: partFanOptions({ controlboard, toolboard }).find((f) => f.id === config?.partFan),
		hotendFan: hotendFanOptions({ controlboard, toolboard }).find((f) => f.id === config?.hotendFan),
		controllerFan: controllerFanOptions({ controlboard, toolboard }).find((f) => f.id === config?.controllerFan),
		controlboard: controlboard,
		toolboard: toolboard,
		xAccelerometer: xAccelerometerOptions({ controlboard, toolboard }).find((a) => a.id === config?.xAccelerometer),
		yAccelerometer: yAccelerometerOptions({ controlboard, toolboard }).find((a) => a.id === config?.yAccelerometer),
		performanceMode: config?.performanceMode,
		stealthchop: config?.stealthchop,
		standstillStealth: config?.standstillStealth,
		rails: config?.rails.map((r) => deserializePrinterRail(r)),
	});
};

const getTimeStamp = () => {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
	let yyyy = today.getFullYear();
	let hh = String(today.getHours()).padStart(2, '0');
	let min = String(today.getMinutes()).padStart(2, '0');
	let sec = String(today.getSeconds()).padStart(2, '0');
	return `${yyyy}${mm}${dd}-${hh}${min}${sec}`;
};

const generateKlipperConfiguration = async (
	config: PrinterConfiguration,
	overwritePrinterCfg = false,
	overwriteExtras?: boolean,
) => {
	const utils = constructKlipperConfigUtils(config);
	const extrasGenerator = constructKlipperConfigExtrasGenerator(config, utils);
	const helper = await constructKlipperConfigHelpers(config, extrasGenerator, utils);
	const { template, initialPrinterCfg } = await import(
		`../../templates/${config.printer.template.replace('-printer.template.cfg', '.ts')}`
	);

	const environment = serverSchema.parse(process.env);
	const renderedTemplate = template(config, helper).trim();
	const renderedPrinterCfg = initialPrinterCfg(config, helper).trim();
	const extras = extrasGenerator.getFilesToWrite(overwriteExtras);
	const filesToWrite = extras.concat([
		{ fileName: 'RatOS.cfg', content: renderedTemplate, overwrite: true },
		{
			fileName: 'printer.cfg',
			content: renderedPrinterCfg,
			overwrite: !(await isPrinterCfgInitialized()) || overwritePrinterCfg,
		},
	]);
	const results: { fileName: string; action: FileAction; err?: unknown }[] = await Promise.all(
		filesToWrite.map(async (file) => {
			let action: FileAction = 'created';
			try {
				await promisify(access)(path.join(environment.KLIPPER_CONFIG_PATH, file.fileName), constants.F_OK);
				// At this point we know the file exists;
				if (file.overwrite) {
					const backupFilename = `${file.fileName.split('.').slice(0, -1).join('.')}-${getTimeStamp()}.cfg`;
					try {
						await promisify(copyFile)(
							path.join(environment.KLIPPER_CONFIG_PATH, file.fileName),
							path.join(environment.KLIPPER_CONFIG_PATH, backupFilename),
						);
					} catch (e) {
						return { fileName: file.fileName, action: 'error', err: e };
					}
					action = 'overwritten';
				} else {
					// Skip this file.
					return { fileName: file.fileName, action: 'skipped' };
				}
			} catch (e) {
				if (isNodeError(e) && e.code === 'ENOENT') {
					// File does not exist, resume as normal.
				} else {
					// Unknown error, abort.
					return { fileName: file.fileName, action: 'error', err: e };
				}
			}
			try {
				await promisify(writeFile)(path.join(environment.KLIPPER_CONFIG_PATH, file.fileName), file.content);
				return { fileName: file.fileName, action: action };
			} catch (e) {
				return { fileName: file.fileName, action: 'error', err: e };
			}
		}),
	);
	const errors = results.filter((r) => r.action === 'error');
	if (errors.length > 0) {
		throw new Error(
			"Something went wrong when saving the configuration. The following files couldn't be written: " +
				errors.map((e) => e.fileName).join(', '),
		);
	}

	try {
		await promisify(writeFile)(
			path.join(environment.RATOS_DATA_DIR, 'last-printer-settings.json'),
			JSON.stringify(serializePrinterConfiguration(config)),
		);
	} catch (e) {
		throw new Error(
			"Couldn't backup your current printer settings to disk, but your klipper configuration has been generated.",
		);
	}
};

export const regenerateKlipperConfiguration = async () => {
	const environment = serverSchema.parse(process.env);
	const configJson = readFileSync(path.join(environment.RATOS_DATA_DIR, 'last-printer-settings.json'));
	const serializedConfig = SerializedPrinterConfiguration.parse(JSON.parse(configJson.toString()));
	const config = await deserializePrinterConfiguration(serializedConfig);
	return await generateKlipperConfiguration(config);
};

export const printerRouter = router({
	printers: publicProcedure
		.output(z.array(Printer))
		.query(async () =>
			(await getPrinters()).sort((a, b) =>
				a.manufacturer === 'Rat Rig' && (b.manufacturer !== 'Rat Rig' || b.description.indexOf('Discontinued') > -1)
					? -1
					: a.name.localeCompare(b.name),
			),
		),
	hotends: publicProcedure.output(z.array(Hotend)).query(() => parseDirectory('hotends', Hotend)),
	extruders: publicProcedure.output(z.array(Extruder)).query(() => parseDirectory('extruders', Extruder)),
	probes: publicProcedure.output(z.array(Probe)).query(() => parseDirectory('z-probe', Probe)),
	thermistors: publicProcedure.query(() => thermistors),
	xEndstops: publicProcedure
		.input(SerializedPartialPrinterConfiguration.nullable())
		.output(z.array(Endstop))
		.query((ctx) => xEndstopOptions(ctx.input)),
	yEndstops: publicProcedure
		.input(SerializedPartialPrinterConfiguration.nullable())
		.output(z.array(Endstop))
		.query((ctx) => yEndstopOptions(ctx.input)),
	partFanOptions: publicProcedure
		.input(SerializedPartialPrinterConfiguration.nullable())
		.output(z.array(Fan))
		.query(async (ctx) => partFanOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
	hotendFanOptions: publicProcedure
		.input(SerializedPartialPrinterConfiguration.nullable())
		.output(z.array(Fan))
		.query(async (ctx) => hotendFanOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
	controllerFanOptions: publicProcedure
		.input(SerializedPartialPrinterConfiguration.nullable())
		.output(z.array(Fan))
		.query(async (ctx) => controllerFanOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
	xAccelerometerOptions: publicProcedure
		.input(SerializedPartialPrinterConfiguration.nullable())
		.output(z.array(Accelerometer))
		.query(async (ctx) => xAccelerometerOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
	yAccelerometerOptions: publicProcedure
		.input(SerializedPartialPrinterConfiguration.nullable())
		.output(z.array(Accelerometer))
		.query(async (ctx) => yAccelerometerOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
	printercfgStatus: publicProcedure.query(async (ctx) => {
		return {
			isInitialized: await isPrinterCfgInitialized(),
		};
	}),
	regenerateConfiguration: publicProcedure.mutation(async () => {
		return await regenerateKlipperConfiguration();
	}),
	saveConfiguration: publicProcedure
		.input(
			z.object({
				config: SerializedPrinterConfiguration,
				overwritePrinterCfg: z.boolean().default(false),
			}),
		)
		.mutation(async (ctx) => {
			const { config: serializedConfig, overwritePrinterCfg } = ctx.input;
			const config = await deserializePrinterConfiguration(serializedConfig);
			return await generateKlipperConfiguration(config, overwritePrinterCfg);
		}),
});
