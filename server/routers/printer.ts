import { z } from 'zod';
import { getLogger } from '@/server/helpers/logger';

import { extractIncludes, parseMetadata } from '@/server/helpers/metadata';
import { Hotend, Extruder, Probe, thermistors, Endstop, Fan, Accelerometer } from '@/zods/hardware';
import { constants, existsSync, readFileSync } from 'fs';
import { PrinterDefinition, PrinterDefinitionWithResolvedToolheads } from '@/zods/printer';
import {
	PartialPrinterConfiguration,
	PrinterConfiguration,
	SerializedPartialPrinterConfiguration,
	SerializedPrinterConfiguration,
} from '@/zods/printer-configuration';
import {
	PartialToolheadConfiguration,
	SerializedPartialToolheadConfiguration,
	SerializedToolheadConfiguration,
	ToolheadConfiguration,
	ToolOrAxis,
} from '@/zods/toolhead';
import { xEndstopOptions, yEndstopOptions } from '@/data/endstops';
import {
	constructKlipperConfigExtrasGenerator,
	constructKlipperConfigHelpers,
	constructKlipperConfigUtils,
} from '@/server/helpers/klipper-config';
import { serverSchema } from '@/env/schema.mjs';
import { controllerFanOptions, hotendFanOptions, partFanOptions } from '@/data/fans';
import { getBoards, getToolboards } from '@/server/routers/mcu';
import { xAccelerometerOptions, yAccelerometerOptions } from '@/data/accelerometers';
import { glob } from 'glob';
import path from 'path';
import { publicProcedure, router } from '@/server/trpc';
import {
	deserializePrinterRail,
	extractToolheadFromPrinterConfiguration,
	extractToolheadsFromPrinterConfiguration,
	stringToTitleObject,
} from '@/utils/serialization';
import { serializePrinterConfiguration } from '@/hooks/usePrinterConfiguration';
import { BoardWithDetectionStatus } from '@/zods/boards';
import { QueryLike, RouterLike } from '@trpc/react-query/shared';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { ToolheadHelper } from '@/helpers/toolhead';
import { getLastPrinterSettings, hasLastPrinterSettings, savePrinterSettings } from '@/server/helpers/printer-settings';
import { PrinterAxis } from '@/zods/motion';
import { ServerCache, cacheAsyncDirectoryFn } from '@/server/helpers/cache';
import { klipperRestart } from '@/server/helpers/klipper';
import { access, copyFile, readFile, unlink, writeFile } from 'fs/promises';
import { exec } from 'child_process';
import objectHash from 'object-hash';
import { getDefaultNozzle } from '@/data/nozzles';
import { extractLinesFromFile, getScriptRoot, searchFileByLine } from '@/server/helpers/file-operations';
import { runSudoScript } from '@/server/helpers/run-script';

function isNodeError(error: any): error is NodeJS.ErrnoException {
	return error instanceof Error;
}

type FileAction = 'created' | 'overwritten' | 'skipped' | 'error' | 'unchanged';
export type CFGDirectories = 'hotends' | 'extruders' | 'z-probe';

export const parseDirectory = cacheAsyncDirectoryFn(async <T extends z.ZodType>(directory: CFGDirectories, zod: T) => {
	const cached = ServerCache.get(directory);
	if (cached != null) {
		return z.array(zod).parse(cached);
	}
	const defs = await glob(`${process.env.RATOS_CONFIGURATION_PATH}/${directory}/*.cfg`);
	const res = (
		await Promise.all(
			defs
				.map((f) => f.trim())
				.filter((f) => f !== '')
				.map(async (f) => {
					const parsedFile = await parseMetadata(f, zod);
					if (parsedFile == null) {
						getLogger().warn(`No metadata present in ${f} skipping..`);
						return null;
					}
					return parsedFile;
				}),
		)
	).filter((f): f is z.TypeOf<T> => f != null);
	ServerCache.set(directory, res);
	return res;
}, ServerCache);

const serializedPartialConfigFromPrinterDefinition = (def: PrinterDefinition) => {
	return SerializedPartialPrinterConfiguration.parse({
		printer: def.id,
		controlboard: def.defaults.board,
	});
};

type MaybePrinterWithResolvedToolhead<T extends boolean> = T extends true
	? PrinterDefinitionWithResolvedToolheads
	: PrinterDefinition;
type MaybeResolvedToolhead<T extends boolean> = T extends true
	? ToolheadConfiguration<any>
	: SerializedToolheadConfiguration;
export const getPrinters = async <T extends boolean = false>(
	resolveToolheads: T = false as T,
): Promise<MaybePrinterWithResolvedToolhead<T>[]> => {
	const defs = glob(`${process.env.RATOS_CONFIGURATION_PATH}/printers/*/printer-definition.json`);
	const hotends = await parseDirectory('hotends', Hotend);
	const boards = await getBoards();
	const toolheadPromises: { [id: string]: Promise<MaybeResolvedToolhead<T>>[] } = {};
	const printers = (
		await Promise.all(
			(await defs).map(async (f) =>
				f.trim() === ''
					? null
					: ({
							...(JSON.parse((await readFile(f)).toString()) as {}),
							path: f.replace('printer-definition.json', ''),
							id: f.replace('/printer-definition.json', '').split('/').pop(),
						} as z.infer<typeof PrinterDefinition>),
			),
		)
	).filter(Boolean);

	printers.forEach((p) => {
		const partialPrinter = serializedPartialConfigFromPrinterDefinition(p);
		toolheadPromises[p.id] = p.defaults.toolheads.map(async (th) => {
			const hotend = (await hotends).find((h) => h.id === th.hotend);
			if (th.thermistor == null && hotend != null) {
				th.thermistor = hotend.thermistor;
			}
			if (th.nozzle == null) {
				th.nozzle = getDefaultNozzle();
			}
			if (resolveToolheads) {
				const dth = (await deserializeToolheadConfiguration(th, partialPrinter, boards)) as MaybeResolvedToolhead<T>;
				(th as MaybeResolvedToolhead<T>) = dth;
			}
			return th as MaybeResolvedToolhead<T>;
		});
	});
	const resolvedToolheads: { [id: string]: MaybeResolvedToolhead<T>[] } = {};
	await Promise.all(
		Object.keys(toolheadPromises).map(async (printerId) => {
			const promises = toolheadPromises[printerId];
			resolvedToolheads[printerId] = await Promise.all(promises);
		}),
	);
	return z.array(resolveToolheads ? PrinterDefinitionWithResolvedToolheads : PrinterDefinition).parse(
		printers.map((p) => {
			(p.defaults.toolheads as MaybeResolvedToolhead<any>[]) = resolvedToolheads[p.id];
			return p;
		}),
	) as MaybePrinterWithResolvedToolhead<T>[];
};

const isPrinterCfgInitialized = async () => {
	const environment = serverSchema.parse(process.env);
	try {
		await access(path.join(environment.KLIPPER_CONFIG_PATH, 'printer.cfg'), constants.F_OK);
	} catch (e) {
		if (isNodeError(e) && e.code === 'ENOENT') {
			// File does not exist, resume as normal.
			return false;
		} else {
			throw e;
		}
	}
	const currentcfg = await readFile(path.join(environment.KLIPPER_CONFIG_PATH, 'printer.cfg'));
	return currentcfg.indexOf('[include RatOS/printers/initial-setup.cfg]') === -1;
};

export const deserializeToolheadConfiguration = async (
	config: SerializedToolheadConfiguration,
	printerConfig: SerializedPartialPrinterConfiguration,
	boards?: BoardWithDetectionStatus[],
): Promise<ToolheadConfiguration<any>> => {
	const loadedBoards = boards == null ? await getBoards() : boards;
	const controlboard = loadedBoards.find((b) => b.id === printerConfig.controlboard);
	const toolboards = getToolboards(loadedBoards);
	const hotends = await parseDirectory('hotends', Hotend);
	const extruders = await parseDirectory('extruders', Extruder);
	const probes = await parseDirectory('z-probe', Probe);
	const toolboard = toolboards.find((b) => b.id === config.toolboard) ?? null;
	const xAccels = xAccelerometerOptions({ controlboard }, { toolboard });
	const yAccels = yAccelerometerOptions({ controlboard }, { toolboard });
	const res = {
		...config,
		toolboard: toolboard,
		hotend: hotends.find((h) => h.id === config.hotend),
		extruder: extruders.find((e) => e.id === config.extruder),
		probe: probes.find((p) => p.id === config.probe),
		thermistor: thermistors.find((t) => t === config.thermistor),
		xEndstop: xEndstopOptions({ controlboard }, { toolboard, axis: config.axis }).find((e) => e.id === config.xEndstop),
		yEndstop: yEndstopOptions({ controlboard }, { toolboard, axis: config.axis }).find((e) => e.id === config.yEndstop),
		xAccelerometer:
			xAccels.find((a) => a.id === config.xAccelerometer) ??
			(toolboard && (toolboard.ADXL345SPI != null || toolboard.LIS2DW)
				? xAccels.find((a) => a.id === 'toolboard')
				: null),
		yAccelerometer:
			yAccels.find((a) => a.id === config.yAccelerometer) ??
			(toolboard && (toolboard.ADXL345SPI != null || toolboard.LIS2DW)
				? yAccels.find((a) => a.id === 'toolboard')
				: null),
		partFan: partFanOptions({ controlboard }, { toolboard, axis: config.axis }).find((f) => f.id === config.partFan),
		hotendFan: hotendFanOptions({ controlboard }, { toolboard, axis: config.axis }).find(
			(f) => f.id === config.hotendFan,
		),
	} satisfies PartialToolheadConfiguration;
	return ToolheadConfiguration.parse(res);
};

export const deserializePartialToolheadConfiguration = async (
	config: SerializedPartialToolheadConfiguration,
	printerConfig: SerializedPartialPrinterConfiguration,
	boards?: BoardWithDetectionStatus[],
): Promise<PartialToolheadConfiguration> => {
	boards = boards ?? (await getBoards());
	const controlboard = boards.find((b) => b.id === printerConfig?.controlboard);
	const toolboards = getToolboards(boards);
	const hotends = await parseDirectory('hotends', Hotend);
	const extruders = await parseDirectory('extruders', Extruder);
	const probes = await parseDirectory('z-probe', Probe);
	const toolboard = toolboards.find((b) => b.id === config?.toolboard);
	return PartialToolheadConfiguration.parse({
		...config,
		toolboard: toolboard ?? null,
		hotend: hotends.find((h) => h.id === config?.hotend),
		extruder: extruders.find((e) => e.id === config?.extruder),
		probe: probes.find((p) => p.id === config?.probe),
		thermistor: thermistors.find((t) => t === config?.thermistor),
		xEndstop: xEndstopOptions({ controlboard }, { toolboard, axis: config?.axis ?? PrinterAxis.x }).find(
			(e) => e.id === config?.xEndstop,
		),
		yEndstop: yEndstopOptions({ controlboard }, { toolboard, axis: config?.axis ?? PrinterAxis.x }).find(
			(e) => e.id === config?.yEndstop,
		),
		xAccelerometer: xAccelerometerOptions({ controlboard }, { toolboard }).find((a) => a.id === config?.xAccelerometer),
		yAccelerometer: yAccelerometerOptions({ controlboard }, { toolboard }).find((a) => a.id === config?.yAccelerometer),
		partFan: partFanOptions({ controlboard }, { toolboard, axis: config?.axis ?? PrinterAxis.x }).find(
			(f) => f.id === config?.partFan,
		),
		hotendFan: hotendFanOptions({ controlboard }, { toolboard, axis: config?.axis ?? PrinterAxis.x }).find(
			(f) => f.id === config?.hotendFan,
		),
	} satisfies PartialToolheadConfiguration);
};

export const deserializePartialPrinterConfiguration = async (
	config?: SerializedPartialPrinterConfiguration,
): Promise<PartialPrinterConfiguration> => {
	const boards = await getBoards();
	const controlboard = boards.find((b) => b.id === config?.controlboard);
	const toolheads =
		config?.toolheads == null
			? undefined
			: await Promise.all(
					config.toolheads.map(async (th) => await deserializePartialToolheadConfiguration(th, config, boards)),
				);

	return PartialPrinterConfiguration.parse({
		toolheads: toolheads,
		printer: (await getPrinters()).find((p) => p.id === config?.printer),
		size: config?.size,
		controllerFan: controllerFanOptions({ controlboard }).find((f) => f.id === config?.controllerFan),
		controlboard: controlboard,
		performanceMode: config?.performanceMode,
		stealthchop: config?.stealthchop,
		standstillStealth: config?.standstillStealth,
		rails: config?.rails?.map((r) => deserializePrinterRail(r)),
	});
};

export const deserializePrinterConfiguration = async (
	config: SerializedPrinterConfiguration,
): Promise<PrinterConfiguration> => {
	const boards = await getBoards();
	const controlboard = boards.find((b) => b.id === config?.controlboard);
	const toolheads =
		config.toolheads == null
			? undefined
			: await Promise.all(config.toolheads.map((th) => deserializeToolheadConfiguration(th, config, boards)));
	return PrinterConfiguration.parse({
		toolheads: toolheads,
		printer: (await getPrinters()).find((p) => p.id === config?.printer),
		size: config?.size,
		controllerFan: controllerFanOptions({ controlboard }).find((f) => f.id === config?.controllerFan),
		controlboard: controlboard,
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
	return `${yyyy}${mm}${dd}_${hh}${min}${sec}`;
};

export type FileState = 'changed' | 'created' | 'removed' | 'unchanged';

type FilesToWrite = {
	fileName: string;
	content: string;
	overwrite: boolean;
	exists?: boolean;
	diskContent?: string | null;
	lastSavedContent?: string | null;
	order?: number;
}[];

export type FilesToWriteWithState = (Omit<Unpacked<FilesToWrite>, 'content'> & {
	state: FileState;
	diff: string | null;
	changedOnDisk?: boolean;
	changedFromConfig?: boolean;
})[];

export const portModifications = async (file: string, content: string) => {
	if (existsSync(file)) {
		const klipperSectionLine = await searchFileByLine(
			file,
			'#*# <---------------------- SAVE_CONFIG ---------------------->',
		);
		if (klipperSectionLine !== false) {
			content += '\n\n' + (await extractLinesFromFile(file, klipperSectionLine)) + '\n';
		}
	}
	return content;
};

export const getFilesToWrite = async (
	config: PrinterConfiguration,
	overwriteFiles?: string[],
): Promise<FilesToWrite> => {
	const utils = await constructKlipperConfigUtils(config);
	const extrasGenerator = constructKlipperConfigExtrasGenerator(config, utils);
	const helper = await constructKlipperConfigHelpers(config, extrasGenerator, utils);
	const environment = serverSchema.parse(process.env);
	const { template, initialPrinterCfg } = await import(
		`../../templates/${config.printer.template.replace('-printer.template.cfg', '.ts')}`
	);
	const renderedTemplate = template(config, helper).trim();
	const renderedPrinterCfg = await portModifications(
		path.join(environment.KLIPPER_CONFIG_PATH, 'printer.cfg'),
		initialPrinterCfg(config, helper).trim(),
	);
	const extras: FilesToWrite = extrasGenerator.getFilesToWrite();
	return [
		{ fileName: 'RatOS.cfg', content: renderedTemplate, overwrite: true, order: 0 } as Unpacked<FilesToWrite>,
		{
			fileName: 'printer.cfg',
			order: 1,
			content: renderedPrinterCfg,
			overwrite: !(await isPrinterCfgInitialized()),
		} as Unpacked<FilesToWrite>,
	]
		.concat(extras)
		.map((f) => {
			const fileWithExists: Unpacked<FilesToWrite> = { ...f, exists: false, diskContent: null };
			if (overwriteFiles?.includes(fileWithExists.fileName) || overwriteFiles?.includes('*')) {
				fileWithExists.overwrite = true;
			}
			fileWithExists.exists = existsSync(path.join(environment.KLIPPER_CONFIG_PATH, fileWithExists.fileName));
			if (fileWithExists.exists) {
				fileWithExists.diskContent = readFileSync(
					path.join(environment.KLIPPER_CONFIG_PATH, fileWithExists.fileName),
					'utf-8',
				);
				if (existsSync(path.join(environment.RATOS_DATA_DIR, `last-${fileWithExists.fileName}`))) {
					fileWithExists.lastSavedContent = readFileSync(
						path.join(environment.RATOS_DATA_DIR, `last-${fileWithExists.fileName}`),
						'utf-8',
					);
				}
			}
			return fileWithExists;
		});
};

const BACKUPS_TO_KEEP = 5;

const generateKlipperConfiguration = async <T extends boolean>(
	config: PrinterConfiguration,
	overwriteFiles?: string[],
	skipFiles?: string[],
): Promise<T extends true ? string : { fileName: string; action: FileAction; err?: unknown }[]> => {
	const environment = serverSchema.parse(process.env);
	const filesToWrite = await getFilesToWrite(config, overwriteFiles);
	const results: { fileName: string; action: FileAction; err?: unknown }[] = await Promise.all(
		filesToWrite.map(async (file) => {
			let action: FileAction = 'created';
			let finalPath = path.join(environment.KLIPPER_CONFIG_PATH, file.fileName);
			let lastSavedPath = path.join(environment.RATOS_DATA_DIR, `last-${file.fileName}`);
			try {
				await access(finalPath, constants.F_OK);
				// At this point we know the file exists.
				if (file.overwrite) {
					if (file.exists && file.diskContent === file.content) {
						return { fileName: file.fileName, action: 'unchanged' };
					}
					// Make a back up.
					const backupFilename = `${file.fileName.split('.').slice(0, -1).join('.')}-${getTimeStamp()}.cfg`;
					try {
						await copyFile(finalPath, path.join(environment.KLIPPER_CONFIG_PATH, backupFilename));
						// prune backups
						const backups = await glob(
							path.join(
								environment.KLIPPER_CONFIG_PATH,
								`${file.fileName.split('.').slice(0, -1).join('.')}-+([0-9])_+([0-9]).cfg`,
							),
						);
						if (backups.length > 0) {
							const sortedBackups = backups.sort((a, b) => {
								const aDate = new Date(a.split('-').slice(-1)[0].split('.cfg')[0]);
								const bDate = new Date(b.split('-').slice(-1)[0].split('.cfg')[0]);
								return aDate.getTime() - bDate.getTime();
							});
							if (sortedBackups.length > BACKUPS_TO_KEEP) {
								// Keep last BACKUPS_TO_KEEP backups, remove the rest
								await Promise.all(
									sortedBackups
										.reverse()
										.slice(0, sortedBackups.length - BACKUPS_TO_KEEP)
										.map((b) => {
											getLogger().info(`Removing old backup: ${b}`);
											return unlink(b);
										}),
								);
							}
						}
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
				if (skipFiles?.includes(file.fileName)) {
					return { fileName: file.fileName, action: 'skipped' };
				}
				await writeFile(finalPath, file.content);
				await writeFile(lastSavedPath, file.content);
				return { fileName: file.fileName, action: action };
			} catch (e) {
				return { fileName: file.fileName, action: 'error', err: e };
			}
		}),
	);
	const errors = results.filter((r) => r.action === 'error');
	if (errors.length > 0) {
		errors.map((e) => getLogger().error(e));
		throw new Error(
			"Something went wrong when saving the configuration. The following files couldn't be written: " +
				errors.map((e) => e.fileName).join(', '),
		);
	}
	try {
		await savePrinterSettings(serializePrinterConfiguration(config));
	} catch (e) {
		throw new Error(
			"Couldn't backup your current printer settings to disk, but your klipper configuration has been generated.",
		);
	}
	return results as T extends true ? string : { fileName: string; action: FileAction; err?: unknown }[];
};

export const compareSettings = async (newSettings: SerializedPrinterConfiguration): Promise<FilesToWriteWithState> => {
	const environment = serverSchema.parse(process.env);
	const oldFiles = hasLastPrinterSettings() ? await getFilesToWrite(await getLastPrinterSettings()) : [];
	const newFiles = await getFilesToWrite(await deserializePrinterConfiguration(newSettings));
	const addedFiles = await Promise.all(
		newFiles
			.filter((f) => !f.exists || !oldFiles.some((of) => of.fileName === f.fileName))
			.map(async (f) => {
				const timehash = new Date().getTime() + objectHash(f);
				await writeFile(`/tmp/ratos-added-new-${timehash}.cfg`, f.content);
				const diff = await new Promise<string | null>((resolve, reject) => {
					exec(
						`git diff --minimal --no-index /dev/null /tmp/ratos-added-new-${timehash}.cfg`,
						(err, stdout, stderr) => {
							if (stdout.trim() == '') {
								reject(stderr);
							}
							resolve(stdout);
						},
					);
				});
				return {
					fileName: f.fileName,
					diff: diff,
					exists: f.exists,
					overwrite: f.overwrite,
					order: f.order,
					state: 'created' as const,
				} as Unpacked<FilesToWriteWithState>;
			}),
	);
	const removedFiles = await Promise.all(
		oldFiles
			.filter((f) => f.exists && !newFiles.some((nf) => nf.fileName === f.fileName))
			.map(async (f) => {
				const timehash = new Date().getTime() + objectHash(f);
				await writeFile(`/tmp/ratos-removed-old-${timehash}.cfg`, f.content);
				const diff = await new Promise<string | null>((resolve, reject) => {
					exec(
						`git diff --minimal --no-index /tmp/ratos-removed-old-${timehash}.cfg /dev/null`,
						(err, stdout, stderr) => {
							if (stdout.trim() == '') {
								reject(stderr);
							}
							resolve(stdout);
						},
					);
				});
				return {
					fileName: f.fileName,
					diff: diff,
					exists: f.exists,
					overwrite: f.overwrite,
					order: f.order,
					state: 'removed' as const,
				} as Unpacked<FilesToWriteWithState>;
			}),
	);
	const changedFiles = await Promise.all(
		newFiles
			.filter(
				(f) =>
					f.exists &&
					oldFiles.some(
						(of) =>
							of.fileName === f.fileName &&
							(of.content !== f.content || (f.lastSavedContent != null && of.content !== f.lastSavedContent)),
					),
			)
			.map(async (f) => {
				const oldFile = oldFiles.find((of) => of.fileName === f.fileName);
				if (oldFile == null) {
					throw new Error('This should never happen.');
				}
				const timehash = new Date().getTime() + objectHash(f);
				let oldPath = path.resolve(path.join(environment.KLIPPER_CONFIG_PATH, oldFile.fileName));
				if (!oldFile.exists) {
					oldPath = `/tmp/ratos-changed-old-${timehash}.cfg`;
					await writeFile(oldPath, oldFile.content);
				}
				await writeFile(`/tmp/ratos-changed-new-${timehash}.cfg`, f.content);
				const diff = await new Promise<string | null>((resolve, reject) => {
					exec(
						`git diff --minimal --no-index ${oldPath} /tmp/ratos-changed-new-${timehash}.cfg`,
						(err, stdout, stderr) => {
							if (stdout.trim() == '') {
								reject(stderr);
							}
							resolve(stdout);
						},
					);
				});
				return {
					fileName: f.fileName,
					diff: diff,
					exists: f.exists,
					overwrite: f.overwrite,
					changedOnDisk: oldFile.diskContent !== oldFile.content,
					changedFromConfig:
						oldFile.content !== f.content || (f.lastSavedContent != null && oldFile.content !== f.lastSavedContent),
					order: f.order,
					state: 'changed' as const,
				} as Unpacked<FilesToWriteWithState>;
			}),
	);
	const unchangedFiles = await Promise.all(
		newFiles
			.filter(
				(f) =>
					f.exists &&
					oldFiles.some(
						(of) =>
							of.fileName === f.fileName &&
							of.content === f.content &&
							(f.lastSavedContent == null || of.content === f.lastSavedContent),
					),
			)
			.map(async (f) => {
				const oldFile = oldFiles.find((of) => of.fileName === f.fileName);
				if (oldFile == null) {
					throw new Error('This should never happen.');
				}
				let diff = null;
				if (oldFile.diskContent !== oldFile.content) {
					const timehash = new Date().getTime() + objectHash(f);
					let oldPath = path.resolve(path.join(environment.KLIPPER_CONFIG_PATH, oldFile.fileName));
					if (!oldFile.exists) {
						oldPath = `/tmp/ratos-changed-old-${timehash}.cfg`;
						await writeFile(oldPath, oldFile.content);
					}
					await writeFile(`/tmp/ratos-changed-new-${timehash}.cfg`, f.content);
					diff = await new Promise<string | null>((resolve, reject) => {
						exec(
							`git diff --minimal --no-index ${oldPath} /tmp/ratos-changed-new-${timehash}.cfg`,
							(err, stdout, stderr) => {
								if (stdout.trim() == '') {
									reject(stderr);
								}
								resolve(stdout);
							},
						);
					});
				}
				return {
					fileName: f.fileName,
					diff: diff,
					exists: f.exists,
					overwrite: f.overwrite,
					changedOnDisk: oldFile.diskContent !== oldFile.content,
					changedFromConfig:
						oldFile.content !== f.content || (f.lastSavedContent != null && oldFile.content !== f.lastSavedContent),
					order: f.order,
					state: 'unchanged' as const,
				} as Unpacked<FilesToWriteWithState>;
			}),
	);
	const result = addedFiles
		.concat(removedFiles)
		.concat(changedFiles)
		.concat(unchangedFiles)
		.sort((a, b) => {
			if (a.order != null || b.order != null) {
				if ((a.order ?? 9999) > (b.order ?? 9999)) {
					return 1;
				} else if ((a.order ?? 9999) < (b.order ?? 9999)) {
					return -1;
				}
			}
			if (
				newFiles.findIndex((nf) => nf.fileName === a.fileName) < newFiles.findIndex((nf) => nf.fileName === b.fileName)
			) {
				return -1;
			}
			if (
				newFiles.findIndex((nf) => nf.fileName === a.fileName) > newFiles.findIndex((nf) => nf.fileName === b.fileName)
			) {
				return 1;
			}
			if (a.fileName < b.fileName) {
				return -1;
			}
			if (a.fileName > b.fileName) {
				return 1;
			}
			return 0;
		});
	return result;
};

export const loadSerializedConfig = async (filePath: string) => {
	const config = await deserializePrinterConfiguration(await readSerializedConfig(filePath));
	return config;
};

export const readSerializedConfig = async (filePath: string) => {
	const configJson = await readFile(filePath);
	const serializedConfig = SerializedPrinterConfiguration.parse(JSON.parse(configJson.toString()));
	return serializedConfig;
};

export const regenerateKlipperConfiguration = async <T extends boolean = false>(
	fromFile?: string,
	overwriteFiles?: string[],
	skipFiles?: string[],
) => {
	return await generateKlipperConfiguration<T>(await getLastPrinterSettings(fromFile), overwriteFiles, skipFiles);
};

const getToolhead = async <
	S extends boolean = false,
	R = S extends true ? SerializedPartialPrinterConfiguration : ToolheadHelper<any>,
>(
	config: SerializedPartialPrinterConfiguration | null,
	toolOrAxis: ToolOrAxis,
	serialize?: S,
): Promise<null | R> => {
	const th =
		extractToolheadFromPrinterConfiguration(toolOrAxis, await deserializePartialPrinterConfiguration(config ?? {})) ??
		null;
	if (th == null) {
		return null;
	}
	if (serialize === true) {
		return th.serialize() as R;
	}
	return th as R;
};

const getToolheads = async <
	S extends boolean = false,
	R = S extends true ? SerializedPartialPrinterConfiguration : ToolheadHelper<any>,
>(
	config: SerializedPartialPrinterConfiguration | null,
	serialize?: S,
): Promise<null | R[]> => {
	const toolheads =
		extractToolheadsFromPrinterConfiguration(await deserializePartialPrinterConfiguration(config ?? {})) ?? null;
	if (toolheads == null) {
		return null;
	}
	if (serialize === true) {
		return toolheads.map((th) => th.serialize() as R);
	}
	return toolheads as R[];
};

export const printerRouter = router({
	getSavedConfig: publicProcedure.output(SerializedPrinterConfiguration.nullable()).query(async (ctx) => {
		const config = await getLastPrinterSettings(undefined, true);
		return config;
	}),
	getSavedPrinterName: publicProcedure.output(z.string().nullable()).query(async (ctx) => {
		const config = await getLastPrinterSettings(undefined, true);
		const printer = (await getPrinters()).find((p) => p.id === config.printer);
		if (printer == null) {
			return null;
		}
		return printer.manufacturer + ' ' + printer.name;
	}),
	printers: publicProcedure
		.output(z.array(PrinterDefinitionWithResolvedToolheads))
		.query(async () =>
			(await getPrinters(true)).sort((a, b) =>
				a.manufacturer === 'Rat Rig' && (b.manufacturer !== 'Rat Rig' || b.description.indexOf('Discontinued') > -1)
					? -1
					: a.name.localeCompare(b.name),
			),
		),
	printer: publicProcedure
		.input(z.string())
		.output(PrinterDefinitionWithResolvedToolheads.nullable())
		.query(async (ctx) => {
			const printer = (await getPrinters()).find((p) => p.id === ctx.input);
			if (printer) {
				(printer as any).defaults.toolheads = await Promise.all(
					printer.defaults.toolheads.map((th) =>
						deserializeToolheadConfiguration(th, serializedPartialConfigFromPrinterDefinition(printer)),
					),
				);
			} else {
				return null;
			}
			return PrinterDefinitionWithResolvedToolheads.parse(printer);
		}),
	hotends: publicProcedure.output(z.array(Hotend)).query(() => parseDirectory('hotends', Hotend)),
	extruders: publicProcedure.output(z.array(Extruder)).query(() => parseDirectory('extruders', Extruder)),
	probes: publicProcedure.output(z.array(Probe)).query(() => parseDirectory('z-probe', Probe)),
	thermistors: publicProcedure.query(() => thermistors.map(stringToTitleObject)),
	xEndstops: publicProcedure
		.input(
			z.object({
				config: SerializedPartialPrinterConfiguration.nullable(),
				toolOrAxis: ToolOrAxis,
			}),
		)
		.output(z.array(Endstop))
		.query(async (ctx) =>
			xEndstopOptions(
				await deserializePartialPrinterConfiguration(ctx.input.config ?? {}),
				(await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig(),
			),
		),
	yEndstops: publicProcedure
		.input(
			z.object({
				config: SerializedPartialPrinterConfiguration.nullable(),
				toolOrAxis: ToolOrAxis,
			}),
		)
		.output(z.array(Endstop))
		.query(async (ctx) =>
			yEndstopOptions(
				await deserializePartialPrinterConfiguration(ctx.input.config ?? {}),
				(await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig(),
			),
		),
	partFanOptions: publicProcedure
		.input(
			z.object({
				config: SerializedPartialPrinterConfiguration.nullable(),
				toolOrAxis: ToolOrAxis,
			}),
		)
		.output(z.array(Fan))
		.query(async (ctx) =>
			partFanOptions(
				await deserializePartialPrinterConfiguration(ctx.input.config ?? {}),
				(await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig(),
			),
		),
	hotendFanOptions: publicProcedure
		.input(
			z.object({
				config: SerializedPartialPrinterConfiguration.nullable(),
				toolOrAxis: ToolOrAxis,
			}),
		)
		.output(z.array(Fan))
		.query(async (ctx) =>
			hotendFanOptions(
				await deserializePartialPrinterConfiguration(ctx.input.config ?? {}),
				(await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig(),
			),
		),
	controllerFanOptions: publicProcedure
		.input(
			z.object({
				config: SerializedPartialPrinterConfiguration.nullable(),
			}),
		)
		.output(z.array(Fan))
		.query(async (ctx) =>
			controllerFanOptions(
				await deserializePartialPrinterConfiguration(ctx.input.config ?? {}),
				(await getToolheads(ctx.input.config))?.map((th) => th.getConfig()),
			),
		),
	xAccelerometerOptions: publicProcedure
		.input(
			z.object({
				config: SerializedPartialPrinterConfiguration.nullable(),
				toolOrAxis: ToolOrAxis,
			}),
		)
		.output(z.array(Accelerometer))
		.query(async (ctx) =>
			xAccelerometerOptions(
				await deserializePartialPrinterConfiguration(ctx.input.config ?? {}),
				(await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig(),
			),
		),
	yAccelerometerOptions: publicProcedure
		.input(
			z.object({
				config: SerializedPartialPrinterConfiguration.nullable(),
				toolOrAxis: ToolOrAxis,
			}),
		)
		.output(z.array(Accelerometer))
		.query(async (ctx) =>
			yAccelerometerOptions(
				await deserializePartialPrinterConfiguration(ctx.input.config ?? {}),
				(await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig(),
			),
		),
	deserializeToolheadConfiguration: publicProcedure
		.input(
			z.object({
				config: SerializedToolheadConfiguration,
				printerConfig: SerializedPartialPrinterConfiguration.optional(),
			}),
		)
		.query(async (ctx) => {
			return await deserializeToolheadConfiguration(ctx.input.config, ctx.input.printerConfig ?? {});
		}),
	printercfgStatus: publicProcedure.query(async () => {
		return {
			isInitialized: await isPrinterCfgInitialized(),
		};
	}),
	regenerateConfiguration: publicProcedure
		.input(z.object({ overwriteFiles: z.array(z.string()).optional(), skipFiles: z.array(z.string()).optional() }))
		.mutation(async ({ input }) => {
			const res = await regenerateKlipperConfiguration(undefined, input.overwriteFiles, input.skipFiles);
			if (res.some((r) => r.action === 'created' || r.action === 'overwritten')) {
				klipperRestart();
			}
			return res;
		}),
	// Has to be a mutation as printer config is too large for url string.
	getFilesToWrite: publicProcedure
		.input(
			z.object({
				config: SerializedPrinterConfiguration,
			}),
		)
		.mutation(async (ctx) => {
			const { config: serializedConfig } = ctx.input;
			return await compareSettings(serializedConfig);
		}),
	saveConfiguration: publicProcedure
		.input(
			z.object({
				config: SerializedPrinterConfiguration,
				overwriteFiles: z.array(z.string()).optional(),
				skipFiles: z.array(z.string()).optional(),
			}),
		)
		.mutation(async (ctx) => {
			const { config: serializedConfig, overwriteFiles, skipFiles } = ctx.input;
			const config = await deserializePrinterConfiguration(serializedConfig);
			const configResult = await generateKlipperConfiguration(config, overwriteFiles, skipFiles);
			klipperRestart();
			return configResult;
		}),
	flashBeacon: publicProcedure.mutation(async () => {
		const environment = serverSchema.parse(process.env);
		const res = await runSudoScript(
			path.relative(getScriptRoot(), path.join(environment.RATOS_CONFIGURATION_PATH, 'scripts', 'beacon-update.sh')),
		);
		if (res.stderr) {
			throw new Error(res.stderr);
		}
		return res.stdout;
	}),
});

export type PrinterRouterLike = RouterLike<typeof printerRouter>;
type HardwareQueries = Pick<
	PrinterRouterLike,
	| 'extruders'
	| 'controllerFanOptions'
	| 'hotendFanOptions'
	| 'hotends'
	| 'partFanOptions'
	| 'probes'
	| 'thermistors'
	| 'xAccelerometerOptions'
	| 'xEndstops'
	| 'yAccelerometerOptions'
	| 'yEndstops'
>;
export type DropdownQueryKeys = keyof HardwareQueries;
export type DropdownQuery<T extends DropdownQueryKeys = DropdownQueryKeys> = QueryLike<(typeof printerRouter)[T]>;
export type DropdownQueryInput<T extends DropdownQueryKeys = DropdownQueryKeys> = inferRouterInputs<
	typeof printerRouter
>[T];
export type DropdownQueryOutput<T extends DropdownQueryKeys = DropdownQueryKeys> = inferRouterOutputs<
	typeof printerRouter
>[T];
