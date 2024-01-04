import {
	deserializePartialPrinterConfiguration,
	getPrinters,
	loadSerializedConfig,
	regenerateKlipperConfiguration,
} from '../server/routers/printer';
import { describe, expect, test } from 'vitest';
import { extractToolheadFromPrinterConfiguration, serializePartialToolheadConfiguration } from '../utils/serialization';
import path from 'path';
import { replaceLinesStartingWith, stripCommentLines, stripIncludes } from '../server/helpers/metadata';
import { compileFirmware } from '../server/routers/mcu';
import { ToolheadHelper } from '../helpers/toolhead';
import { getBoardChipId } from '../helpers/board';

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
		test.concurrent('can generate idex config', async () => {
			let res: string = await regenerateKlipperConfiguration(
				path.join(__dirname, 'fixtures', 'idex-config.json'),
				true,
				true,
			);
			const splitRes = res.split('\n').map((l: string, i: number) => `Line ${i}`.padEnd(10, ' ') + `|${l}`);
			const noUndefined = splitRes.filter((l: string) => l.includes('undefined')).join('\n');
			const noPromises = splitRes.filter((l: string) => l.includes('[object Promise]')).join('\n');
			const noObjects = splitRes.filter((l: string) => l.includes('[object Object]')).join('\n');
			if (noUndefined || noPromises || noObjects) {
				console.log(splitRes.join('\n'));
			}
			expect(noUndefined, 'Expected no undefined values in config').to.eq('');
			expect(noPromises, 'Expected no promises in config').to.eq('');
			expect(noObjects, 'Expected no objects in config').to.eq('');
		});
		describe('can generate hybrid config with toolboard', async () => {
			let generatedLines: string[] = [];
			test('produces valid config', async () => {
				const res: string = await regenerateKlipperConfiguration(
					path.join(__dirname, 'fixtures', 'hybrid-config.json'),
					true,
					true,
				);
				generatedLines = res.split('\n').map((l: string, i: number) => `Line ${i}`.padEnd(10, ' ') + `|${l}`);
				const noUndefined = generatedLines.filter((l: string) => l.includes('undefined')).join('\n');
				const noPromises = generatedLines.filter((l: string) => l.includes('[object Promise]')).join('\n');
				const noObjects = generatedLines.filter((l: string) => l.includes('[object Object]')).join('\n');
				if (noUndefined || noPromises || noObjects) {
					console.log(generatedLines.join('\n'));
				}
				expect(noUndefined, 'Expected no undefined values in config').to.eq('');
				expect(noPromises, 'Expected no promises in config').to.eq('');
				expect(noObjects, 'Expected no objects in config').to.eq('');
			});
			test.concurrent('uses the correct heater fan', async () => {
				const sectionIndex = generatedLines.findIndex((l) => l.includes('[heater_fan toolhead_cooling_fan]'));
				const commentIndex = generatedLines.findIndex((l) =>
					l.includes('# 2-pin fan connected to the toolboard on T0 (toolboard_t0)'),
				);
				const pinIndex = generatedLines.findIndex((l) => l.includes('pin: toolboard_t0:PA1'));
				expect(sectionIndex, 'Exepected [heater_fan toolhead_cooling_fan] section present').toBeGreaterThan(-1);
				expect(commentIndex, 'Expected 2-pin toolboard fan comment').toEqual(sectionIndex! + 1);
				expect(pinIndex, 'expected toolboard fan pin').toEqual(commentIndex! + 1);
			});
			test.concurrent('uses the correct part fan', async () => {
				const sectionIndex = generatedLines.findIndex((l) => l.includes('[fan]'));
				const commentIndex = generatedLines.findIndex((l) =>
					l.includes('# 4-pin fan connected to the toolboard on T0 (toolboard_t0)'),
				);
				const pinIndex = generatedLines.findIndex((l) => l.includes('pin: !toolboard_t0:PA0'));
				expect(sectionIndex, 'Exepected [fan] section present').toBeGreaterThan(-1);
				expect(commentIndex, 'Expected 4-pin toolboard fan comment').toEqual(sectionIndex! + 1);
				expect(pinIndex, 'expected toolboard fan pin').toEqual(commentIndex! + 1);
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
