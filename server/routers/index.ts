// src/server/router/index.ts
import { statSync } from 'fs';

import { wifiRouter } from '@/server/routers/wifi';
import { mcuRouter } from '@/server/routers/mcu';
import { promisify } from 'util';
import { exec } from 'child_process';
import { getWirelessInterface } from '@/server/helpers/iw';
import { klippyExtensionsRouter } from '@/server/routers/klippy-extensions';
import { moonrakerExtensionsRouter } from '@/server/routers/moonraker-extensions';
import { printerRouter } from '@/server/routers/printer';
import { publicProcedure, router } from '@/server/trpc';
import { ServerCache } from '@/server/helpers/cache';
import { z } from 'zod';
import { getLogger } from '@/server/helpers/logger';
import { PinoLogEvent } from '@/zods/util';
import { analysisRouter } from '@/server/routers/analysis';
import { getDebugZipFiles } from '@/pages/api/debug-zip';

export const appRouter = router({
	clientLog: publicProcedure
		.input(
			z.object({
				level: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']),
				logEvent: PinoLogEvent,
			}),
		)
		.mutation(async ({ input }) => {
			let frontendLogger = getLogger().child({ source: 'frontend' }, { level: input.level });
			for (const binding of input.logEvent.bindings) {
				frontendLogger = frontendLogger.child(binding);
			}
			frontendLogger[input.logEvent.level.label](
				input.logEvent.messages[0],
				input.logEvent.messages[1],
				...input.logEvent.messages.slice(2),
			);
		}),
	version: publicProcedure.query(async () => {
		return (await promisify(exec)('git describe --tags --always', {
			cwd: process.env.RATOS_CONFIGURATION_PATH,
		}).then(({ stdout }) => stdout.trim())) as GitVersion;
	}),
	klipperVersion: publicProcedure.query(async () => {
		return (await promisify(exec)('git describe --tags --always', { cwd: process.env.KLIPPER_DIR }).then(({ stdout }) =>
			stdout.trim(),
		)) as GitVersion;
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
	debugFileList: publicProcedure.query(async () => {
		return await getDebugZipFiles();
	}),
	mcu: mcuRouter,
	printer: printerRouter,
	wifi: wifiRouter,
	'klippy-extensions': klippyExtensionsRouter,
	'moonraker-extensions': moonrakerExtensionsRouter,
	analysis: analysisRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
