import { describe, expect, test } from '@jest/globals';
import { TRPCError } from '@trpc/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { Extruder, Hotend, parseDirectory, Probe } from '../server/router/printer';

describe('configuration', () => {
	test('should have valid hotend configuration files', async () => {
		const parsedHotends = await parseDirectory('hotends', Hotend);
		expect(parsedHotends.length).toBeGreaterThan(0);
	});
	test('should have valid extruder configuration files', async () => {
		const parsedExtruders = await parseDirectory('extruders', Extruder);
		expect(parsedExtruders.length).toBeGreaterThan(0);
	});
	test('should have valid z-probe configuration files', async () => {
		const parsedProbes = await parseDirectory('z-probe', Probe);
		expect(parsedProbes.length).toBeGreaterThan(0);
	});
});
