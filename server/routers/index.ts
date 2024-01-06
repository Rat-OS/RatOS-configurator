// src/server/router/index.ts
import { statSync } from 'fs';

import { wifiRouter } from './wifi';
import { mcuRouter } from './mcu';
import { promisify } from 'util';
import { exec } from 'child_process';
import { getWirelessInterface } from '../helpers/iw';
import { klippyExtensionsRouter } from './klippy-extensions';
import { moonrakerExtensionsRouter } from './moonraker-extensions';
import { printerRouter } from './printer';
import { publicProcedure, router } from '../trpc';
import { ServerCache } from '../helpers/cache';

export const appRouter = router({
	version: publicProcedure.query(async () => {
		return await promisify(exec)('git describe --tags --always', {
			cwd: process.env.RATOS_CONFIGURATION_PATH,
		}).then(({ stdout }) => stdout.trim());
	}),
	klipperVersion: publicProcedure.query(async () => {
		return await promisify(exec)('git describe --tags --always', { cwd: process.env.KLIPPER_DIR }).then(({ stdout }) =>
			stdout.trim(),
		);
	}),
	osVersion: publicProcedure.query(async () => {
		if (process.env.NODE_ENV === 'development') {
			return 'DEV';
		}
		const releaseFile = statSync('/etc/ratos-release').isFile() ? '/etc/ratos-release' : '/etc/RatOS-release';
		return await promisify(exec)(`cat ${releaseFile}`).then(({ stdout }) => stdout.trim().replace('RatOS ', ''));
	}),
	ipAddress: publicProcedure.query(async () => {
		const wirelessInterface = await getWirelessInterface();
		const iface = wirelessInterface == null || wirelessInterface.trim() === '' ? 'eth0' : wirelessInterface.trim();
		return (
			(await promisify(exec)(`ip address | grep "${iface}"`).then(
				({ stdout }) => stdout.match(/inet\s(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/)?.[1],
			)) ?? 'Unknown IP'
		);
	}),
	resetCache: publicProcedure.mutation(async () => {
		ServerCache.flushAll();
		return {
			result: 'success',
		};
	}),
	kill: publicProcedure.query(async () => {
		process.exit();
	}),
	reboot: publicProcedure.mutation(async () => {
		setTimeout(() => {
			promisify(exec)('reboot');
		}, 500);
		return {
			result: 'success',
		};
	}),
	mcu: mcuRouter,
	printer: printerRouter,
	wifi: wifiRouter,
	'klippy-extensions': klippyExtensionsRouter,
	'moonraker-extensions': moonrakerExtensionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
