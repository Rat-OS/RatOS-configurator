import {
	deserializePartialPrinterConfiguration,
	deserializePartialToolheadConfiguration,
	deserializeToolheadConfiguration,
	getPrinters,
	parseDirectory,
} from '@/server/routers/printer';
import { Extruder, Hotend, Probe } from '@/zods/hardware';
import { getBoards } from '@/server/routers/mcu';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { serverSchema } from '@/env/schema.mjs';
const environment = serverSchema.parse(process.env);
import { describe, expect, test } from 'vitest';
import {
	PartialPrinterConfiguration,
	PrinterConfiguration,
	SerializedPartialPrinterConfiguration,
	SerializedPrinterConfiguration,
} from '@/zods/printer-configuration';
import { xEndstopOptions, yEndstopOptions } from '@/data/endstops';
import { serializePartialPrinterConfiguration, serializePrinterConfiguration } from '@/hooks/usePrinterConfiguration';
import { deserializePrinterRail } from '@/utils/serialization';
import { parseBoardPinConfig } from '@/server/helpers/metadata';
import { getBoardChipId } from '@/helpers/board';
import { PartialToolheadConfiguration, ToolheadConfiguration } from '@/zods/toolhead';
import { ServerCache } from '@/server/helpers/cache';
import { glob } from 'glob';
import { readFile } from 'fs/promises';
import { PrinterAxis } from '@/zods/motion';
import { MotorSlotPins } from '@/zods/boards';
import { z } from 'zod';

describe('configuration', async () => {
	ServerCache.flushAll();
	const parsedHotends = await parseDirectory('hotends', Hotend);
	const parsedExtruders = await parseDirectory('extruders', Extruder);
	const parsedProbes = await parseDirectory('z-probe', Probe);
	const parsedBoards = await getBoards();
	const parsedPrinters = await getPrinters();
	const scripts = (await promisify(fs.readdir)(path.join(environment.RATOS_CONFIGURATION_PATH, 'scripts'))).filter(
		(f) => f.substring(f.length - 3) === '.sh',
	);
	test.concurrent('has valid hotend configuration files', async () => {
		expect(parsedHotends.length).toBeGreaterThan(0);
	});
	test.concurrent('has valid extruder configuration files', async () => {
		expect(parsedExtruders.length).toBeGreaterThan(0);
	});
	test.concurrent('has valid z-probe configuration files', async () => {
		expect(parsedProbes.length).toBeGreaterThan(0);
	});
	test.concurrent('has valid board configuration files', async () => {
		expect(parsedBoards.length).toBeGreaterThan(0);
	});
	test.concurrent('has non zero bash scripts', async () => {
		expect(scripts.length).toBeGreaterThan(0);
	});
	test.concurrent('is free of dumb typos', async () => {
		const files = await glob(environment.RATOS_CONFIGURATION_PATH + '/**/*.cfg');
		const fileContents = files.map((f) => readFile(f));
		let noAmpersands = '';
		let noElseIfs = '';
		let f = 0;
		for await (const file of fileContents) {
			const generatedLines = file
				.toString()
				.split('\n')
				.map(
					(l: string, i: number) =>
						`${files[f].split('/').pop()}:${i + 1}`.padEnd(15, ' ') + `| ${l.replace(/\t/g, '')}`,
				);
			noAmpersands += generatedLines.filter((l: string) => l.includes('&&')).join('\n');
			noElseIfs += generatedLines.filter((l: string) => l.includes('else if')).join('\n');
			f++;
		}
		expect(noAmpersands, `Expected no &&'s in config`).to.eq('');
		expect(noElseIfs, 'Expected no `else ifs` in config').to.eq('');
	});
	describe('has executable bash scripts', async () => {
		test.concurrent.each(scripts)('%s is executable', async (script) => {
			await promisify(fs.access)(path.join(environment.RATOS_CONFIGURATION_PATH, 'scripts', script), fs.constants.X_OK);
		});
	});
	describe('has valid board definitions', async () => {
		describe.each(parsedBoards)('$name', async (board) => {
			test.concurrent('has executable scripts', async () => {
				const boardFiles = await promisify(fs.readdir)(`${board.path}`);
				const boardScripts = boardFiles.filter((f) => f.substring(f.length - 3) === '.sh');
				expect(boardScripts.length).toBeGreaterThan(0);
				await Promise.all(
					boardScripts.map(async (file) => {
						return await promisify(fs.access)(`${board.path}/${file}`, fs.constants.X_OK);
					}),
				);
			});
			test.skipIf(board.isHost).concurrent('has a valid single unique udev rule', async () => {
				const rules: string[] = (await glob(`${board.path}/../**/*.rules`)).map((r) => r.split('/').pop() ?? '');
				const boardFiles = await promisify(fs.readdir)(`${board.path}`);
				const boardRules = boardFiles.filter((f) => f.substring(f.length - 6) === '.rules');
				expect(boardRules.length).toBe(1);
				expect(rules.filter((r) => r === boardRules[0]).length).toBe(1);
				rules.push(boardRules[0]);
				expect(fs.existsSync(`${board.path}/${boardRules[0]}`)).toBeTruthy();
				const ruleContents = await promisify(fs.readFile)(`${board.path}/${boardRules[0]}`, 'utf8');
				const firmwareConfig = path.join(board.path, 'firmware.config');
				expect(fs.existsSync(firmwareConfig)).toBeTruthy();
				const firmwareConfigContents = await promisify(fs.readFile)(firmwareConfig, 'utf8');
				if (firmwareConfigContents.includes(`CONFIG_MCU="atmega2560"`)) {
					// can't override serial numbers on atmega2560 boards. Don't look for it.
					return;
				}
				const attr = `ATTRS{serial}=="${getBoardChipId(board)}"`;
				const symlink = `SYMLINK+="${getBoardChipId(board)}"`;
				expect(ruleContents.includes(attr)).toBeTruthy();
				expect(ruleContents.includes(symlink)).toBeTruthy();
			});
			test.skipIf(board.motorSlots == null).concurrent('has valid motor slot pins', async () => {
				if (board.motorSlots == null) {
					throw new Error('motorSlots should not be null for this test');
				}
				const slotNames = Object.keys(board.motorSlots);
				const requiredUniquePins: string[] = [];
				slotNames.forEach((slot) => {
					const pinAliases = Object.keys(board.motorSlots[slot] as { [key: string]: string }).filter(
						(key: string): key is keyof z.infer<typeof MotorSlotPins> => key !== 'title',
					);
					const filteredSlot = Object.fromEntries(pinAliases.map((alias) => [alias, board.motorSlots[slot][alias]]));
					const pins = pinAliases.map((alias) => (board.motorSlots[slot] as { [key: string]: string })[alias]);
					pins.forEach((pin) => {
						if (pin == 'null') {
							return;
						}
						expect(pin).toMatch(/^[a-zA-Z0-9\.]+$/);
						const usedForAliases = pinAliases.filter((alias) => filteredSlot[alias] === pin);
						// check that the pin is only used for a specific purpose.
						const stepEnableDir = usedForAliases.filter(
							(alias) => ['enable_pin', 'step_pin', 'dir_pin'].indexOf(alias) > -1,
						).length;
						const uartCs = Math.min(
							usedForAliases.filter((alias) => ['uart_pin', 'cs_pin'].indexOf(alias) > -1).length,
							1,
						);
						const endstopDiag = Math.min(
							usedForAliases.filter((alias) => ['endstop_pin', 'diag_pin'].indexOf(alias) > -1).length,
							1,
						);
						const others = usedForAliases.filter(
							(alias) =>
								['enable_pin', 'step_pin', 'dir_pin', 'uart_pin', 'cs_pin', 'endstop_pin', 'diag_pin'].indexOf(
									alias,
								) === -1,
						).length;
						expect(
							stepEnableDir + uartCs + endstopDiag + others,
							`Pin ${pin} is used for several purposes in slot ${slot} (${usedForAliases.join(', ')})`,
						).toBe(1);
						// Check if non-unique pins are used for other purposes in other slots
						const shouldBeUniqueAcrossSlots = usedForAliases.filter(
							(alias) =>
								['step_pin', 'dir_pin', 'cs_pin', 'uart_address', 'diag_pin', 'endstop_pin'].indexOf(alias) > -1,
						).length;
						if (!shouldBeUniqueAcrossSlots) {
							usedForAliases.forEach((orgAlias) => {
								slotNames
									.filter((s) => s !== slot)
									.forEach((otherSlot) => {
										if (!shouldBeUniqueAcrossSlots) {
											const otherPins = Object.keys(board.motorSlots[otherSlot] as { [key: string]: string })
												.filter((alias) => alias !== orgAlias)
												.map((alias) => (board.motorSlots[otherSlot] as { [key: string]: string })[alias]);
											expect(
												otherPins.includes(pin),
												`${orgAlias} ${pin} on slot ${slot} is used for a different purpose in slot ${otherSlot}`,
											).toBeFalsy();
										} else {
											const otherPins = Object.keys(board.motorSlots[otherSlot] as { [key: string]: string }).map(
												(alias) => (board.motorSlots[otherSlot] as { [key: string]: string })[alias],
											);
											expect(
												otherPins.includes(pin),
												`${orgAlias} ${pin} on slot ${slot} should be unique accross slots but is also used in slot ${otherSlot}`,
											).toBeFalsy();
										}
									});
							});
						}
					});
				});
			});
			test.skipIf(board.boardImageFileName == null).concurrent('has a valid board image', async () => {
				expect(fs.existsSync(path.join(board.path, board.boardImageFileName ?? ''))).toBeTruthy();
			});
			test.skipIf(board.manualFileName == null).concurrent('has a valid manual', async () => {
				expect(fs.existsSync(path.join(board.path, board.manualFileName ?? ''))).toBeTruthy();
			});
			test.skipIf(board.wireDiagramFileName == null).concurrent('has a valid wire diagram', async () => {
				expect(fs.existsSync(path.join(board.path, board.wireDiagramFileName ?? ''))).toBeTruthy();
			});
			test.concurrent('has alphanumeric firmwareBinaryName', async () => {
				expect(board.firmwareBinaryName).toMatch(/^[a-zA-Z0-9\.\-_]+$/);
			});
			test.concurrent('has config file', async () => {
				expect(
					fs.existsSync(path.join(board.path, board.isToolboard ? 'toolboard-config.cfg' : 'config.cfg')),
				).toBeTruthy();
			});
			test.skipIf(board.isHost).concurrent('can parse board config file', async () => {
				const pinConfigPromise = parseBoardPinConfig(board);
				await expect(pinConfigPromise).resolves.not.toThrow();
				const pinConfig = await pinConfigPromise;
				expect(pinConfig).not.toBeNull();
				if (board.fourPinFanConnectorCount) {
					if (board.fourPinFanConnectorCount == 1) {
						expect(pinConfig['4p_fan_part_cooling_pin'], '4p part cooling fan pin missing').not.toBeNull();
						expect(pinConfig['4p_fan_part_cooling_tach_pin'], '4p part cooling fan tach pin missing').not.toBeNull();
					}
					if (board.fourPinFanConnectorCount > 1) {
						expect(pinConfig['4p_fan_part_cooling_pin'], '4p part cooling fan pin missing').not.toBeNull();
						expect(pinConfig['4p_fan_part_cooling_tach_pin'], '4p part cooling fan tach pin missing').not.toBeNull();
						expect(pinConfig['4p_toolhead_cooling_pin'], '4p toolhead cooling fan pin missing').not.toBeNull();
						expect(pinConfig['4p_toolhead_cooling_tach_pin'], '4p toolhead cooling tach pin missing').not.toBeNull();
						expect(pinConfig['4p_controller_board_pin'], '4p controller board fan pin missing').not.toBeNull();
						expect(pinConfig['4p_controller_board_tach_pin'], '4p controller board tach pin missing').not.toBeNull();
					}
				}
				if (pinConfig['4p_fan_part_cooling_pin'] != null) {
					expect(
						board.fourPinFanConnectorCount,
						'4p pin definitions exist in board pin alias, but are not correctly specified in board definition',
					).toBeDefined();
					expect(
						board.fourPinFanConnectorCount,
						'4p pin definitions exist in board pin alias, but are not correctly specified in board definition',
					).toBeGreaterThan(0);
				}
				if (pinConfig['4p_toolhead_cooling_pin'] != null) {
					expect(
						board.fourPinFanConnectorCount,
						'4p pin definitions exist in board pin alias, but are not correctly specified in board definition',
					).toBeDefined();
					expect(
						board.fourPinFanConnectorCount,
						'4p pin definitions exist in board pin alias, but are not correctly specified in board definition',
					).toBeGreaterThan(1);
				}
				if (pinConfig['4p_controller_board_pin'] != null) {
					expect(
						board.fourPinFanConnectorCount,
						'4p pin definitions exist in board pin alias, but are not correctly specified in board definition',
					).toBeDefined();
					expect(
						board.fourPinFanConnectorCount,
						'4p pin definitions exist in board pin alias, but are not correctly specified in board definition',
					).toBeGreaterThan(1);
				}
				if (board.extruderlessConfig != null) {
					await expect(parseBoardPinConfig(board, true)).resolves.not.toThrow();
				}
			});
			test.skipIf(board.extruderlessConfig == null).concurrent('has extruderless config file', async () => {
				expect(fs.existsSync(path.join(board.path, board.extruderlessConfig ?? ''))).toBeTruthy();
			});
			test.skipIf(board.isHost).concurrent('has firmware config file with correct USB Serial number', async () => {
				const firmwareConfig = path.join(board.path, 'firmware.config');
				expect(fs.existsSync(firmwareConfig)).toBeTruthy();
				const firmwareConfigContents = await promisify(fs.readFile)(firmwareConfig, 'utf8');
				if (firmwareConfigContents.includes(`CONFIG_MCU="atmega2560"`)) {
					// can't override serial numbers on atmega2560 boards. Don't look for it.
					return;
				}
				expect(firmwareConfigContents.includes(`CONFIG_USB_SERIAL_NUMBER="${getBoardChipId(board)}"`)).toBeTruthy();
			});
			test.skipIf(board.dfu == null).concurrent('has existing dfu raster image', async () => {
				if (board.dfu == null) {
					throw new Error('dfu should not be null for this test');
				}
				expect(
					fs.existsSync(path.join(board.path, board.dfu.dfuBootImage)),
					`${board.dfu.dfuBootImage} does not exist.`,
				).toBeTruthy();
				expect(board.dfu.dfuBootImage.endsWith('svg'), `SVG images are not supported for dfu boot images`).toBeFalsy();
			});
		});
	});
	const printerConfigs = parsedPrinters.filter((p) => p.defaults == null);
	test('has valid printer configuration files', async () => {
		expect(printerConfigs.length).toBe(0);
	});
	describe.each(parsedPrinters)('has valid $manufacturer $name definition', async (printer) => {
		const defaultBoard = parsedBoards.find((board) => board.id === printer.defaults.board);
		const defaultRails = printer.defaults.rails.map((r) => {
			return deserializePrinterRail(r);
		});
		let partialConfig: SerializedPartialPrinterConfiguration;
		test('has serializable partial config', () => {
			const partialConfigResult = PartialPrinterConfiguration.safeParse({
				printer: printer,
				controlboard: defaultBoard,
				rails: defaultRails,
			} satisfies PartialPrinterConfiguration);
			if (partialConfigResult.success) {
				partialConfig = serializePartialPrinterConfiguration(partialConfigResult.data);
			} else {
				throw partialConfigResult.error;
			}
			expect(partialConfig).not.toBeUndefined();
		});
		let toolheads: ToolheadConfiguration<any>[];
		test('has deserializeable toolheads', async () => {
			expect(partialConfig).not.toBeUndefined();
			toolheads = await Promise.all(
				printer.defaults.toolheads.map((toolhead) => {
					return deserializeToolheadConfiguration(toolhead, partialConfig);
				}),
			);
			expect(toolheads.length).toEqual(printer.defaults.toolheads.length);
			toolheads.forEach((toolhead) => {
				expect(toolhead).not.toBeNull();
			});
		});
		let serializedConfig: SerializedPrinterConfiguration;
		test('has serializable config', async () => {
			expect(defaultBoard).not.toBeNull();
			expect(toolheads).not.toBeUndefined();
			if (defaultBoard == null) {
				return;
			}
			const serializedConfigResult = PrinterConfiguration.safeParse({
				printer: printer,
				controlboard: defaultBoard,
				toolheads: toolheads,
				rails: defaultRails,
				size: printer.sizes?.[0],
				performanceMode: false,
				standstillStealth: false,
				stealthchop: false,
				controllerFan: { id: '2pin', title: 'nobody cares' },
			} satisfies PrinterConfiguration);
			if (serializedConfigResult.success) {
				serializedConfig = serializePrinterConfiguration(serializedConfigResult.data);
			} else {
				throw serializedConfigResult.error;
			}
			expect(serializedConfig).not.toBeUndefined();
		});
		describe.each(printer.defaults.toolheads)('has valid toolhead $axis', async (toolhead) => {
			test('can be deserialized', async () => {
				if (partialConfig == null) {
					throw new Error("partialConfig shouldn't be null or undefined");
				}
				await deserializePartialToolheadConfiguration(toolhead, partialConfig);
			});
			const deserializedToolheadConfig: PartialToolheadConfiguration = await deserializePartialToolheadConfiguration(
				toolhead,
				partialConfig,
			);
			const deserializedConfig = await deserializePartialPrinterConfiguration(partialConfig);
			const defaultHotend = parsedHotends.find((hotend) => hotend.id === toolhead.hotend);
			const defaultExtruder = parsedExtruders.find((extruder) => extruder.id === toolhead.extruder);
			const defaultProbe = parsedProbes.find((probe) => probe.id === toolhead.probe);
			const defaultXEndstop = xEndstopOptions(deserializedConfig, {
				...deserializedToolheadConfig,
				axis: deserializedToolheadConfig?.axis ?? PrinterAxis.x,
			}).find((option) => option.id === toolhead.xEndstop);
			const defaultYEndstop = yEndstopOptions(deserializedConfig, {
				...deserializedToolheadConfig,
				axis: deserializedToolheadConfig?.axis ?? PrinterAxis.x,
			}).find((option) => option.id === toolhead.yEndstop);
			const defaultToolboard = parsedBoards.find((board) => board.id === toolhead.toolboard);
			test.skipIf(!toolhead.toolboard).concurrent('has valid toolboard default', () => {
				expect(defaultToolboard).not.toBeNull();
			});
			test.skipIf(!toolhead.probe).concurrent('has valid probe default', () => {
				expect(defaultProbe).not.toBeNull();
			});
			test.concurrent('has valid hotend default', () => {
				expect(defaultHotend).not.toBeNull();
			});
			test.concurrent('has valid extruder default', () => {
				expect(defaultExtruder).not.toBeNull();
			});
			test.concurrent('has valid x endstop default', () => {
				expect(defaultXEndstop).not.toBeNull();
			});
			test.concurrent('has valid x endstop default', () => {
				expect(defaultYEndstop).not.toBeNull();
			});
		});
		test.concurrent('has a valid image', async () => {
			expect(fs.existsSync(path.join(printer.path, printer.image))).toBeTruthy();
		});
		test.concurrent('has an existing template file', async () => {
			expect(
				fs.existsSync(
					path.resolve(
						path.join(__dirname, `../templates/${printer.template.replace('-printer.template.cfg', '.ts')}`),
					),
				),
			).toBeTruthy();
		});
		test.concurrent('has valid board default', () => {
			expect(defaultBoard).not.toBeNull();
		});
		test.concurrent('has valid rail defaults', () => {
			// Rail definitions required for printer definition
			expect(defaultRails.length ?? 0).toBe(printer.driverCountRequired);
		});
	});
});
