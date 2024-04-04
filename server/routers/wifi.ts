import { promisify } from 'util';
import { exec } from 'child_process';
import { getWirelessInterface, scan } from '@/server/helpers/iw';
import { getScriptRoot } from '@/server/helpers/file-operations';
import { hostnameInput, joinInput } from '@/helpers/validators/wifi';
import { getLogger } from '@/server/helpers/logger';
import { runSudoScript } from '@/server/helpers/run-script';
import { publicProcedure, router } from '@/server/trpc';
import { TRPCError } from '@trpc/server';
import path from 'path';

export const wifiRouter = router({
	hostname: publicProcedure.input(hostnameInput).mutation(async ({ input }) => {
		const scriptRoot = getScriptRoot();
		try {
			const result = await promisify(exec)(`sudo ${path.join(scriptRoot, 'change-hostname.sh')} ${input.hostname}`);
		} catch (e) {
			if (e instanceof Error) {
				getLogger().error(e.message);
			}
			throw new TRPCError({
				message: 'An error occured while attempting to change the hostname',
				code: 'INTERNAL_SERVER_ERROR',
				cause: e,
			});
		}
		return {
			result: 'success',
		};
	}),
	join: publicProcedure.input(joinInput).mutation(async ({ input }) => {
		try {
			await runSudoScript('add-wifi-network.sh', input.ssid, input.passphrase, input.country ?? 'GB');
		} catch (e) {
			if (e instanceof Error) {
				getLogger().error(e.message);
			}
			throw new TRPCError({
				message: 'Invalid wifi credentials',
				code: 'PRECONDITION_FAILED',
				cause: e,
			});
		}
		return {
			result: 'success',
		};
	}),
	scan: publicProcedure.query(async () => {
		const wirelessInterface = await getWirelessInterface();
		if (wirelessInterface == null || wirelessInterface.trim() === '') {
			throw new TRPCError({
				message: "No wifi interface available on device, if you're connected via ethernet you can skip this step.",
				code: 'INTERNAL_SERVER_ERROR',
			});
		}
		try {
			// if (process.env.NODE_ENV === 'development') {
			// 	return [];
			// }
			return await scan(wirelessInterface, { apForce: true });
		} catch (e) {
			if (e instanceof Error) {
				getLogger().error(e.message);
			}
			throw new TRPCError({
				message: 'Failed to scan wifi networks',
				code: 'INTERNAL_SERVER_ERROR',
				cause: e,
			});
		}
	}),
});
