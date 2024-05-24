/* eslint-disable no-console */
import {
	deserializePartialPrinterConfiguration,
	getPrinters,
	loadSerializedConfig,
	getFilesToWrite,
	compareSettings,
	deserializePrinterConfiguration,
} from '@/server/routers/printer';
import { describe, expect, test } from 'vitest';
import { extractToolheadFromPrinterConfiguration, serializePartialToolheadConfiguration } from '@/utils/serialization';
import path from 'path';
import { replaceLinesStartingWith, stripCommentLines, stripIncludes } from '@/server/helpers/metadata';
import { compileFirmware } from '@/server/routers/mcu';
import { ToolheadHelper } from '@/helpers/toolhead';
import { getBoardChipId } from '@/helpers/board';
import { constructKlipperConfigUtils } from '@/server/helpers/klipper-config';
import { sensorlessXTemplate, sensorlessYTemplate } from '@/templates/extras/sensorless-homing';
import { readFile } from 'fs/promises';
import { SerializedPrinterConfiguration } from '@/zods/printer-configuration';
import { PrinterDefinition } from '@/zods/printer';
import { Accelerometer } from '@/zods/hardware';
import { z } from 'zod';
import { serializePrinterConfiguration } from '@/hooks/usePrinterConfiguration';
import { glob } from 'glob';

const serializedConfigFromDefaults = (printer: PrinterDefinition): SerializedPrinterConfiguration => {
	return SerializedPrinterConfiguration.strip().parse({
		...printer,
		...printer.defaults,
		toolheads: printer.defaults.toolheads.map((t) => {
			if (t.xAccelerometer == null) {
				if (t.toolboard != null) {
					t.xAccelerometer = 'toolboard';
				}
			}
			if (t.yAccelerometer == null) {
				if (t.toolboard != null) {
					t.yAccelerometer = 'toolboard';
				}
			}
			return t;
		}),
		size: printer.sizes[Object.keys(printer.sizes)[0] as keyof typeof printer.sizes],
		controlboard: printer.defaults.board,
		printer: printer.id,
		performanceMode: false,
		standstillStealth: false,
		stealthchop: false,
		controllerFan: printer.defaults.controllerFan ?? '2pin',
	} satisfies SerializedPrinterConfiguration);
};

describe('server', async () => {
	const parsedPrinters = await getPrinters();
	describe('metadata', async () => {
		test.concurrent('can strip comments', () => {
			const test = `
				# this is a comment
				[include]
			`;
			const result = stripCommentLines(test);
			expect(result).toEqual(`
				[include]
			`);
		});
		test.concurrent('can strip includes', () => {
			const test = `
				# this is a comment
				[include RatOS/extruder/test.cfg]
			`;
			const result = stripIncludes(test);
			expect(result).toEqual(`
				# this is a comment
			`);
		});
		test.concurrent('can replace a pin', () => {
			const test = `
				# this is a comment
				[include RatOS/extruder/test.cfg]
				[extruder]
				heater_pin: bad_pin
			`;
			const result = replaceLinesStartingWith(test, 'heater_pin', '				heater_pin: good_pin');
			expect(result).toEqual(`
				# this is a comment
				[include RatOS/extruder/test.cfg]
				[extruder]
				heater_pin: good_pin
			`);
		});
	});
	describe('serialization', async () => {
		test.concurrent('can deserialize toolheads from printer configuration files', async () => {
			const parsedPrintersWithDeserializedToolheads = await getPrinters(true);
			expect(parsedPrintersWithDeserializedToolheads.length).toEqual(parsedPrinters.length);
			parsedPrinters.forEach((p) => {
				expect(p.defaults.toolheads.length).toBeGreaterThan(0);
				p.defaults.toolheads.forEach((t) => {
					expect(t).not.toBeNull();
				});
			});
		});
		test.concurrent('can deserialize toolheads from a partial printer config', async () => {
			await Promise.all(
				parsedPrinters.map(async (p) => {
					const config = await deserializePartialPrinterConfiguration({
						printer: p.id,
						rails: p.defaults.rails,
						toolheads: p.defaults.toolheads,
						controlboard: p.defaults.board,
					});
					expect(config).not.toBeNull();
					expect(config?.printer?.id).toEqual(p.id);
					expect(config?.toolheads).toBeDefined();
					expect(config?.toolheads?.length).toEqual(p.defaults.toolheads.length);
					expect(config?.rails?.length).toEqual(p.defaults.rails.length);
					for (const toolhead of config!.toolheads!) {
						expect(toolhead).toBeDefined();
						if (toolhead == null) {
							return;
						}
						const th = extractToolheadFromPrinterConfiguration(toolhead.axis!, config)?.serialize();
						expect(th).toBeDefined();
						const reserialized = serializePartialToolheadConfiguration(toolhead)!;
						expect(th).toEqual(reserialized);
						Object.keys(toolhead).forEach((key) => {
							if (key === 'axis') {
								return;
							}
							expect(th?.[key as keyof typeof toolhead]).toEqual(reserialized[key as keyof typeof reserialized]);
						});
					}
				}),
			);
		});
		test.concurrent('results in the same serialized config after reserializing a deserialized config', async () => {
			await Promise.all(
				parsedPrinters
					.map((p) => {
						return serializedConfigFromDefaults(p);
					})
					.concat(
						await Promise.all(
							(await glob('**/*.json', { cwd: path.join(__dirname, 'fixtures') })).map(async (fixtureFile) => {
								const file = await readFile(path.join(__dirname, 'fixtures', fixtureFile));
								return SerializedPrinterConfiguration.parse(JSON.parse(file.toString()));
							}),
						),
					)
					.map(async (serialized) => {
						const deserialized = await deserializePrinterConfiguration(serialized);
						const reserialized = serializePrinterConfiguration(deserialized);
						if (
							(serialized.size == null || typeof serialized.size !== 'object') &&
							typeof reserialized.size === 'object'
						) {
							// Handle PrinterConfiguration zod transform
							if (serialized.size == null) {
								expect(reserialized.size).toEqual(
									deserialized.printer.sizes[Object.keys(deserialized.printer.sizes)[0]],
								);
							} else {
								expect(reserialized.size?.x).toEqual(serialized.size);
							}
							serialized.size = reserialized.size;
						}
						expect(reserialized).toEqual(serialized);
					}),
			);
		});
	});
	describe('regression tests', async () => {
		describe('can generate a default v-core config', async () => {
			const vCoreConfigPath = path.join(__dirname, 'fixtures', 'v-core-200.json');
			const config = await loadSerializedConfig(vCoreConfigPath);
			const res: string = (await getFilesToWrite(config)).find((f) => f.fileName === 'RatOS.cfg')?.content ?? '';
			const splitRes = res.split('\n');
			const annotatedLines = splitRes.map((l: string, i: number) => `Line-${i + 1}`.padEnd(10, '-') + `|${l}`);
			const gcodeBlocks: number[] = [];
			splitRes.forEach((l, i) => l.includes('gcode:') && gcodeBlocks.push(i));
			test('produces valid config', async () => {
				expect(splitRes.length).toBeGreaterThan(0);
				const noUndefined = splitRes.filter((l: string) => l.includes('undefined')).join('\n');
				const noPromises = splitRes.filter((l: string) => l.includes('[object Promise]')).join('\n');
				const noObjects = splitRes.filter((l: string) => l.includes('[object Object]')).join('\n');
				if (noUndefined || noPromises || noObjects) {
					console.log(annotatedLines.join('\n'));
				}
				expect(noUndefined, 'Expected no undefined values in config').to.eq('');
				expect(noPromises, 'Expected no promises in config').to.eq('');
				expect(noObjects, 'Expected no objects in config').to.eq('');
			});
			test('can diff files', async () => {
				const configJson = await readFile(vCoreConfigPath);
				const serializedConfig = SerializedPrinterConfiguration.parse(JSON.parse(configJson.toString()));
				compareSettings(serializedConfig);
			});
			test.runIf(gcodeBlocks.length > 0)('correctly indents gcode blocks', async () => {
				for (const block of gcodeBlocks) {
					try {
						expect(splitRes[block + 1].startsWith('\t') || splitRes[block + 1].startsWith('  ')).toBeTruthy();
					} catch (e) {
						throw new Error(
							`Failed to indent gcode block at line ${block + 1}:\n${annotatedLines.slice(block - 4, block + 5).join('\n')}`,
						);
					}
				}
			});
		});
		describe('can generate idex config', async () => {
			const config = await loadSerializedConfig(path.join(__dirname, 'fixtures', 'idex-config.json'));
			const res: string = (await getFilesToWrite(config)).find((f) => f.fileName === 'RatOS.cfg')?.content ?? '';
			const splitRes = res.split('\n');
			const annotatedLines = splitRes.map((l: string, i: number) => `Line-${i + 1}`.padEnd(10, '-') + `|${l}`);
			const gcodeBlocks: number[] = [];
			splitRes.forEach((l, i) => l.includes('gcode:') && gcodeBlocks.push(i));
			test('produces valid config', async () => {
				expect(splitRes.length).toBeGreaterThan(0);
				const noUndefined = splitRes.filter((l: string) => l.includes('undefined')).join('\n');
				const noPromises = splitRes.filter((l: string) => l.includes('[object Promise]')).join('\n');
				const noObjects = splitRes.filter((l: string) => l.includes('[object Object]')).join('\n');
				if (noUndefined || noPromises || noObjects) {
					console.log(annotatedLines.join('\n'));
				}
				expect(noUndefined, 'Expected no undefined values in config').to.eq('');
				expect(noPromises, 'Expected no promises in config').to.eq('');
				expect(noObjects, 'Expected no objects in config').to.eq('');
			});
			test.runIf(gcodeBlocks.length > 0)('correctly indents gcode blocks', async () => {
				for (const block of gcodeBlocks) {
					try {
						expect(splitRes[block + 1].startsWith('\t') || splitRes[block + 1].startsWith('  ')).toBeTruthy();
					} catch (e) {
						throw new Error(
							`Failed to indent gcode block at line ${block + 1}:\n${annotatedLines.slice(block - 4, block + 5).join('\n')}`,
						);
					}
				}
			});
		});
		describe('can generate another idex config', async () => {
			const config = await loadSerializedConfig(path.join(__dirname, 'fixtures', 'another-idex.json'));
			const filesToWrite = await getFilesToWrite(config);
			const res: string = filesToWrite.find((f) => f.fileName === 'RatOS.cfg')?.content ?? '';
			const printerCfg: string = filesToWrite.find((f) => f.fileName === 'ratos-variables.cfg')?.content ?? '';
			const splitRes = res.split('\n');
			const annotatedLines = splitRes.map((l: string, i: number) => `Line-${i + 1}`.padEnd(10, '-') + `|${l}`);
			const gcodeBlocks: number[] = [];
			splitRes.forEach((l, i) => l.includes('gcode:') && gcodeBlocks.push(i));
			test('produces valid config', async () => {
				expect(splitRes.length).toBeGreaterThan(0);
				const noUndefined = splitRes.filter((l: string) => l.includes('undefined')).join('\n');
				const noNull = splitRes.filter((l: string) => l.includes(':null')).join('\n');
				const noPromises = splitRes.filter((l: string) => l.includes('[object Promise]')).join('\n');
				const noObjects = splitRes.filter((l: string) => l.includes('[object Object]')).join('\n');
				if (noUndefined || noPromises || noObjects) {
					console.log(annotatedLines.join('\n'));
				}
				expect(noUndefined, 'Expected no undefined values in config').to.eq('');
				expect(noNull, 'Expected no null values in config').to.eq('');
				expect(noPromises, 'Expected no promises in config').to.eq('');
				expect(noObjects, 'Expected no objects in config').to.eq('');
			});
			test.runIf(gcodeBlocks.length > 0)('correctly indents gcode blocks', async () => {
				for (const block of gcodeBlocks) {
					try {
						expect(splitRes[block + 1].startsWith('\t') || splitRes[block + 1].startsWith('  ')).toBeTruthy();
					} catch (e) {
						throw new Error(
							`Failed to indent gcode block at line ${block + 1}:\n${annotatedLines.slice(block - 4, block + 5).join('\n')}`,
						);
					}
				}
			});
		});
		describe('can resolve pins that are only defined in motorslots and not aliases', async () => {
			const config = await loadSerializedConfig(path.join(__dirname, 'fixtures', 'idex-undefined-pins.json'));
			const filesToWrite = await getFilesToWrite(config);
			const res: string = filesToWrite.find((f) => f.fileName === 'RatOS.cfg')?.content ?? '';
			const splitRes = res.split('\n');
			const annotatedLines = splitRes.map((l: string, i: number) => `Line-${i + 1}`.padEnd(10, '-') + `|${l}`);
			const suspectedMissingPins: string[] = [
				`y1_step_pin=`,
				`y1_dir_pin=`,
				`y1_enable_pin=`,
				`y1_uart_pin=`,
				`y1_diag_pin=`,
				`y1_endstop_pin=`,
				`dual_carriage_step_pin=`,
				`dual_carriage_dir_pin=`,
				`dual_carriage_enable_pin=`,
				`dual_carriage_uart_pin=`,
				`dual_carriage_diag_pin=`,
				`dual_carriage_endstop_pin=`,
				`dual_carriage_step_pin=`,
				`dual_carriage_dir_pin=`,
				`dual_carriage_enable_pin=`,
				`dual_carriage_uart_pin=`,
				`dual_carriage_diag_pin=`,
				`dual_carriage_endstop_pin=`,
			];
			test('produces valid config', async () => {
				expect(splitRes.length).toBeGreaterThan(0);
				const noUndefined = splitRes.filter((l: string) => l.includes('undefined')).join('\n');
				const noNull = splitRes.filter((l: string) => l.includes(':null')).join('\n');
				const noPromises = splitRes.filter((l: string) => l.includes('[object Promise]')).join('\n');
				const noObjects = splitRes.filter((l: string) => l.includes('[object Object]')).join('\n');
				if (noUndefined || noPromises || noObjects) {
					console.log(annotatedLines.join('\n'));
				}
				expect(noUndefined, 'Expected no undefined values in config').to.eq('');
				expect(noNull, 'Expected no null values in config').to.eq('');
				expect(noPromises, 'Expected no promises in config').to.eq('');
				expect(noObjects, 'Expected no objects in config').to.eq('');
			});
			test('contains undefined motor slot pins', async () => {
				const errors: string[] = [];
				suspectedMissingPins.forEach((pin) => {
					try {
						expect(
							splitRes.some((l) => l.includes(`\t` + pin)),
							`Expected config to contain "${pin}" alias.`,
						).toBeTruthy();
					} catch (e) {
						if (!(e instanceof Error)) {
							throw e;
						}
						errors.push(e.message);
					}
				});
				if (errors.length > 0) {
					throw new Error('\n' + errors.join('\n'));
				}
			});
		});
		describe('can generate hybrid config with toolboard', async () => {
			let debugLines: string[] = [];
			let generatedLines: string[] = [];
			test('produces valid config', async () => {
				const config = await loadSerializedConfig(path.join(__dirname, 'fixtures', 'hybrid-config.json'));
				expect(config.printer.kinematics).toEqual('hybrid-corexy');
				const res: string = (await getFilesToWrite(config)).find((f) => f.fileName === 'RatOS.cfg')?.content ?? '';
				generatedLines = res.split('\n');
				debugLines = generatedLines.map((l: string, i: number) => `Line ${i + 1}`.padEnd(10, ' ') + `|${l}`);
				expect(debugLines.length).toBeGreaterThan(0);
				const noUndefined = debugLines.filter((l: string) => l.includes('undefined')).join('\n');
				const noPromises = debugLines.filter((l: string) => l.includes('[object Promise]')).join('\n');
				const noObjects = debugLines.filter((l: string) => l.includes('[object Object]')).join('\n');
				if (noUndefined || noPromises || noObjects) {
					console.log(debugLines.join('\n'));
				}
				expect(noUndefined, 'Expected no undefined values in config').to.eq('');
				expect(noPromises, 'Expected no promises in config').to.eq('');
				expect(noObjects, 'Expected no objects in config').to.eq('');
				expect(generatedLines.includes(`variable_x_axes: ["x"]`)).toBeTruthy();
				expect(generatedLines.includes(`variable_x_driver_types: ["tmc2209"]`)).toBeTruthy();
				expect(generatedLines.includes(`variable_y_axes: ["x1", "y", "y1"]`)).toBeTruthy();
				expect(generatedLines.includes(`variable_y_driver_types: ["tmc2209", "tmc2209", "tmc2209"]`)).toBeTruthy();
			});
			test.concurrent('uses the correct heater fan', async () => {
				const sectionIndex = debugLines.findIndex((l) => l.includes('[heater_fan toolhead_cooling_fan]'));
				const commentIndex = debugLines
					.slice(sectionIndex > -1 ? sectionIndex : 0)
					.findIndex((l) => l.includes('# 2-pin fan connected to the toolboard on T0 (toolboard_t0)'));
				const pinIndex = debugLines
					.slice(sectionIndex > -1 ? sectionIndex : 0)
					.findIndex((l) => l.includes('pin: toolboard_t0:PA1'));
				expect(sectionIndex, 'Expected [heater_fan toolhead_cooling_fan] section present').toBeGreaterThan(-1);
				expect(commentIndex, 'Expected 2-pin toolboard fan comment').toEqual(2);
				expect(pinIndex, 'expected toolboard fan pin').toEqual(commentIndex! + 1);
			});
			test.concurrent('uses the correct part fan', async () => {
				const sectionIndex = debugLines.findIndex((l) => l.includes('[fan]'));
				const commentIndex = debugLines
					.slice(sectionIndex > -1 ? sectionIndex : 0)
					.findIndex((l) => l.includes('# 4-pin fan connected to the toolboard on T0 (toolboard_t0)'));
				const pinIndex = debugLines
					.slice(sectionIndex > -1 ? sectionIndex : 0)
					.findIndex((l) => l.includes('pin: !toolboard_t0:PA0'));
				expect(sectionIndex, 'Expected [fan] section present').toBeGreaterThan(-1);
				expect(commentIndex, 'Expected 4-pin toolboard fan comment').toEqual(1);
				expect(pinIndex, 'expected toolboard fan pin').toEqual(commentIndex! + 1);
			});
			test.concurrent('can render sensorless homing files', async () => {
				const config = await loadSerializedConfig(path.join(__dirname, 'fixtures', 'hybrid-config.json'));
				const utils = await constructKlipperConfigUtils(config);
				const x = sensorlessXTemplate(config, utils);
				const y = sensorlessYTemplate(config, utils);
			});
		});
		describe('can generate v-minion config', async () => {
			const config = await loadSerializedConfig(path.join(__dirname, 'fixtures', 'minion-config.json'));
			const filesToWrite = await getFilesToWrite(config);
			let res: string = filesToWrite.find((f) => f.fileName === 'RatOS.cfg')?.content ?? '';
			const printerCfg: string = filesToWrite.find((f) => f.fileName === 'printer.cfg')?.content ?? '';
			const splitRes = res.split('\n');
			const splitPrinterCfg = printerCfg.split('\n');
			const annotatedLines = splitRes.map((l: string, i: number) => `Line-${i + 1}`.padEnd(10, '-') + `|${l}`);
			const annotatedPrinterCfgLines = splitPrinterCfg.map(
				(l: string, i: number) => `Line-${i + 1}`.padEnd(10, '-') + `|${l}`,
			);
			const gcodeBlocks: number[] = [];
			splitRes.forEach((l, i) => l.includes('gcode:') && gcodeBlocks.push(i));
			test('produces valid config', async () => {
				expect(splitRes.length).toBeGreaterThan(0);
				const noUndefined = splitRes.filter((l: string) => l.includes('undefined')).join('\n');
				const noPromises = splitRes.filter((l: string) => l.includes('[object Promise]')).join('\n');
				const noObjects = splitRes.filter((l: string) => l.includes('[object Object]')).join('\n');
				if (noUndefined || noPromises || noObjects) {
					console.log(annotatedLines.join('\n'));
				}
				expect(noUndefined, 'Expected no undefined values in config').to.eq('');
				expect(noPromises, 'Expected no promises in config').to.eq('');
				expect(noObjects, 'Expected no objects in config').to.eq('');
			});
			test.runIf(gcodeBlocks.length > 0)('correctly indents gcode blocks', async () => {
				for (const block of gcodeBlocks) {
					try {
						expect(splitRes[block + 1].startsWith('\t') || splitRes[block + 1].startsWith('  ')).toBeTruthy();
					} catch (e) {
						throw new Error(
							`Failed to indent gcode block at line ${block + 1}:\n${annotatedLines.slice(block - 4, block + 5).join('\n')}`,
						);
					}
				}
			});
			test.concurrent('properly sets x and y accelerometers', () => {
				const xSections: number[] = [];
				const ySections: number[] = [];
				const getAccelChipName = (id: z.infer<typeof Accelerometer>['id']) => {
					switch (id) {
						case 'none':
							return 'none';
						case 'sbc':
							return 'rpi';
						case 'controlboard':
							return 'controlboard';
						case 'toolboard':
							return 'toolboard_t0';
					}
				};
				splitRes.forEach((l, i) => {
					if (l.startsWith('accel_chip_x')) {
						xSections.push(i);
						if (l !== `accel_chip_x: adxl345 ${getAccelChipName(config.toolheads[0].xAccelerometer?.id ?? 'none')}`) {
							throw new Error(
								`Incorrect accel_chip_x at at line ${i + 1}:\n${annotatedLines.slice(Math.max(i - 4, 0), Math.min(i + 5, annotatedLines.length)).join('\n')}`,
							);
						}
					}
					if (l.startsWith('accel_chip_y')) {
						ySections.push(i);
						if (l !== `accel_chip_y: adxl345 ${getAccelChipName(config.toolheads[0].yAccelerometer?.id ?? 'none')}`) {
							throw new Error(
								`Incorrect accel_chip_y at at line ${i + 1}:\n${annotatedLines.slice(Math.max(i - 4, 0), Math.min(i + 5, annotatedLines.length)).join('\n')}`,
							);
						}
					}
				});
				if (config.toolheads[0].xAccelerometer?.id !== 'none') {
					expect(xSections.length).toBeGreaterThan(0);
				}
				if (config.toolheads[0].yAccelerometer?.id !== 'none') {
					expect(ySections.length).toBeGreaterThan(0);
				}
			});
			test.concurrent('contains position_min/max/endstop for x/y', () => {
				const combined = [...splitRes, ...splitPrinterCfg];
				const xSections: number[] = [];
				const ySections: number[] = [];
				combined.forEach((l, i) => {
					l.startsWith('[stepper_x]') && xSections.push(i);
					l.startsWith('[stepper_y]') && ySections.push(i);
				});
				[xSections, ySections].forEach((sections, i) => {
					const sectionName = ['x', 'y', 'z'][i];
					let hasMin = false;
					let hasMax = false;
					let hasEndstop = false;
					sections.forEach((i) => {
						const nextSection = combined.slice(i + 1).findIndex((l) => l.trim().startsWith('['));
						hasMin = combined.slice(i, i + nextSection).find((l) => l.includes('position_min:')) != null || hasMin;
						hasMax = combined.slice(i, i + nextSection).find((l) => l.includes('position_max:')) != null || hasMax;
						hasEndstop =
							combined.slice(i, i + nextSection).find((l) => l.includes('position_endstop:')) != null || hasEndstop;
					});
					try {
						expect(hasMin, `[stepper_${sectionName}] is missing position_min`).toBeTruthy();
						expect(hasMax, `[stepper_${sectionName}] is missing position_max`).toBeTruthy();
						expect(hasEndstop, `[stepper_${sectionName}] is missing position_endstop`).toBeTruthy();
					} catch (e) {
						console.log(annotatedLines.join('\n'));
						console.log(annotatedPrinterCfgLines.join('\n'));
						throw e;
					}
				});
			});
		});
	});
	describe('printer defaults', async () => {
		const printers = await getPrinters();
		describe.each(printers)('can generate a default config for $manufacturer $name', async (printer) => {
			const serialized = serializedConfigFromDefaults(printer);
			const config = await deserializePrinterConfiguration(serialized);
			test('defaults resolve to valid config', async () => {
				expect(config).not.toBeNull();
				expect(config?.printer?.id).toEqual(printer.id);
				expect(config?.toolheads).toBeDefined();
				expect(config?.toolheads?.length).toEqual(printer.defaults.toolheads.length);
				expect(config?.rails?.length).toEqual(printer.defaults.rails.length);
				for (const toolhead of config!.toolheads!) {
					expect(toolhead).toBeDefined();
					if (toolhead == null) {
						return;
					}
					const th = extractToolheadFromPrinterConfiguration(toolhead.axis!, config)?.serialize();
					expect(th).toBeDefined();
					const reserialized = serializePartialToolheadConfiguration(toolhead)!;
					expect(th).toEqual(reserialized);
					Object.keys(toolhead).forEach((key) => {
						if (key === 'axis') {
							return;
						}
						expect(th?.[key as keyof typeof toolhead]).toEqual(reserialized[key as keyof typeof reserialized]);
					});
				}
			});
			describe.each(await getFilesToWrite(config))('defaults generate valid content for $fileName', async (res) => {
				const splitRes = res.content.split('\n');
				const annotatedLines = splitRes.map((l: string, i: number) => `Line-${i + 1}`.padEnd(10, '-') + `|${l}`);
				test('not empty', () => {
					expect(splitRes.length).toBeGreaterThan(0);
				});
				test('no invalid stringification', () => {
					const noUndefined = splitRes.findIndex((l: string) => l.includes('undefined'));
					const noPromises = splitRes.findIndex((l: string) => l.includes('[object Promise]'));
					const noObjects = splitRes.findIndex((l: string) => l.includes('[object Object]'));
					try {
						expect(noUndefined, 'Expected no undefined values in config').to.eq(-1);
					} catch (e) {
						throw new Error(
							`Found stringified undefined ${noUndefined + 1}:\n${annotatedLines.slice(Math.max(noUndefined - 4, 0), Math.min(annotatedLines.length, noUndefined + 5)).join('\n')}`,
						);
					}
					try {
						expect(noPromises, 'Expected no promises in config').to.eq(-1);
					} catch (e) {
						throw new Error(
							`Found stringified promise ${noUndefined + 1}:\n${annotatedLines.slice(Math.max(noUndefined - 4, 0), Math.min(annotatedLines.length, noUndefined + 5)).join('\n')}`,
						);
					}
					try {
						expect(noObjects, 'Expected no objects in config').to.eq(-1);
					} catch (e) {
						throw new Error(
							`Found stringified object ${noUndefined + 1}:\n${annotatedLines.slice(Math.max(noUndefined - 4, 0), Math.min(annotatedLines.length, noUndefined + 5)).join('\n')}`,
						);
					}
				});
				test.runIf(res.fileName === 'printer.cfg').concurrent('contains position_min/max/endstop for x/y', async () => {
					const xSections: number[] = [];
					const ySections: number[] = [];
					splitRes.forEach((l, i) => {
						l.startsWith('[stepper_x]') && xSections.push(i);
						l.startsWith('[stepper_y]') && ySections.push(i);
					});
					[xSections, ySections].forEach((sections, i) => {
						const sectionName = ['x', 'y', 'z'][i];
						let hasMin = false;
						let hasMax = false;
						let hasEndstop = false;
						sections.forEach((i) => {
							const nextSection = splitRes.slice(i + 1).findIndex((l) => l.trim().startsWith('['));
							hasMin = splitRes.slice(i, i + nextSection).find((l) => l.includes('position_min:')) != null || hasMin;
							hasMax = splitRes.slice(i, i + nextSection).find((l) => l.includes('position_max:')) != null || hasMax;
							hasEndstop =
								splitRes.slice(i, i + nextSection).find((l) => l.includes('position_endstop:')) != null || hasEndstop;
						});
						try {
							expect(hasMin, `[stepper_${sectionName}] is missing position_min`).toBeTruthy();
							expect(hasMax, `[stepper_${sectionName}] is missing position_max`).toBeTruthy();
							expect(hasEndstop, `[stepper_${sectionName}] is missing position_endstop`).toBeTruthy();
						} catch (e) {
							console.log(annotatedLines.join('\n'));
							throw e;
						}
					});
				});
				test.runIf(res.fileName === 'printer.cfg').concurrent('contains no RatOS managed parameters', async () => {
					const offendingLines: { line: number; param: string }[] = [];
					const offendingStrings = ['nozzle_diameter', 'variable_hotend_type', 'variable_has_cht_nozzle'];
					splitRes.forEach((l, i) => {
						offendingStrings.forEach((s) => {
							if (l.startsWith(s)) {
								offendingLines.push({ line: i, param: s });
							}
						});
					});
					for (const { line, param } of offendingLines) {
						try {
							expect(splitRes[line + 1].startsWith('\t') || splitRes[line + 1].startsWith('  ')).toBeTruthy();
						} catch (e) {
							throw new Error(
								`Illegal parameter "${param}" at line ${line + 1}:\n${annotatedLines.slice(Math.max(line - 4, 0), Math.min(line + 5, annotatedLines.length)).join('\n')}`,
							);
						}
					}
				});
				test.concurrent('properly indents gcode blocks', async () => {
					const gcodeBlocks: number[] = [];
					splitRes.forEach((l, i) => l.includes('gcode:') && gcodeBlocks.push(i));
					for (const block of gcodeBlocks) {
						try {
							expect(splitRes[block + 1].startsWith('\t') || splitRes[block + 1].startsWith('  ')).toBeTruthy();
						} catch (e) {
							throw new Error(
								`Failed to indent gcode block at line ${block + 1}:\n${annotatedLines.slice(Math.max(block - 4, 0), Math.min(block + 5, annotatedLines.length)).join('\n')}`,
							);
						}
					}
				});
			});
			test('can be compared', () => {
				compareSettings(serialized);
			});
		});
	});
	describe('mcu', async () => {
		test.concurrent('can compile firmware for controlboard and toolheads', async () => {
			const config = await loadSerializedConfig(path.join(__dirname, 'fixtures', 'idex-config.json'));
			const cbFirmware = await compileFirmware(config.controlboard, undefined, true);
			if (!cbFirmware) {
				throw new Error('Failed to compile controlboard firmware');
			}
			expect(
				cbFirmware
					.split('\n')
					.filter((l) => l.includes(`CONFIG_USB_SERIAL_NUMBER="${getBoardChipId(config.controlboard)}"`)).length,
			).toEqual(1);
			for (const toolhead of config.toolheads) {
				if (toolhead.toolboard == null) {
					throw new Error('Toolhead from test config has no toolboard');
				}
				const th = new ToolheadHelper(toolhead);
				const chipId = getBoardChipId(toolhead.toolboard, th);
				const thFirmware = await compileFirmware(toolhead.toolboard, th, true);
				if (!thFirmware) {
					throw new Error('Failed to compile controlboard firmware');
				}
				expect(thFirmware.split('\n').filter((l) => l.includes(`CONFIG_USB_SERIAL_NUMBER="${chipId}"`)).length).toEqual(
					1,
				);
			}
		});
	});
});
