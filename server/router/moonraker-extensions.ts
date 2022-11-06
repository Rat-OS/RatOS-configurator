import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { existsSync, symlinkSync } from 'fs';
import { getLogger } from '../../helpers/logger';
import path from 'path';
import * as trpc from '@trpc/server';

const moonrakerExtension = z.object({
	fileName: z.string(),
	path: z.string(),
	extensionName: z.string(),
});
const moonrakerExtensions = z.array(moonrakerExtension);
export const moonrakerExtensionsRouter = trpc
	.router()
	.mutation('register', {
		input: moonrakerExtension,
		resolve: async ({ input }) => {
			const moonrakerGetURL = 'http://localhost:7125/server/database/item?namespace=RatOS&key=moonraker_extensions';
			const currentExtensionsRequest = await fetch(moonrakerGetURL);
			if (currentExtensionsRequest.status !== 200) {
				getLogger().error(currentExtensionsRequest, `Failed to get moonraker extensions`);
				throw new TRPCError({
					message: `Failed to get moonraker extensions`,
					code: 'INTERNAL_SERVER_ERROR',
				});
			}
			const currentExtensionsResult = await currentExtensionsRequest.json();
			let currentExtensions = [];
			if (currentExtensionsResult.error == null && currentExtensionsResult.result != null) {
				currentExtensions = moonrakerExtensions.parse(JSON.parse(currentExtensionsResult.result.value));
			} else {
				getLogger().error(currentExtensionsResult, `Failed to get moonraker extensions`);
				throw new TRPCError({
					message: `Failed to get moonraker extensions`,
					code: 'INTERNAL_SERVER_ERROR',
				});
			}
			const extensionPath = path.join(input.path, input.fileName);
			if (!existsSync(extensionPath)) {
				getLogger().error(`File "${extensionPath}" does not exist`);
				throw new TRPCError({
					message: `File "${extensionPath}" does not exist`,
					code: 'PRECONDITION_FAILED',
				});
			}
			if (currentExtensions.find((ext) => ext.fileName === input.fileName)) {
				getLogger().error(`An extension with the fileName "${input.fileName}" is already registered`);
				throw new TRPCError({
					message: `An extension with the fileName "${input.fileName}" is already registered`,
					code: 'PRECONDITION_FAILED',
				});
			}
			currentExtensions.push(input);
			const moonrakerPostURL = 'http://localhost:7125/server/database/item';
			const result = await fetch(moonrakerPostURL, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					namespace: 'RatOS',
					key: 'moonraker_extensions',
					value: JSON.stringify(currentExtensions),
				}),
			});
			if (result.status !== 200) {
				getLogger().error(result, 'Failed to register moonraker extensions');
				throw new TRPCError({
					message: `Failed to register extension "${extensionPath}"`,
					code: 'INTERNAL_SERVER_ERROR',
				});
			}
			return true;
		},
	})
	.mutation('symlink', {
		resolve: async () => {
			const moonrakerGetURL = 'http://localhost:7125/server/database/item?namespace=RatOS&key=moonraker_extensions';
			const currentExtensionsRequest = await fetch(moonrakerGetURL);
			if (currentExtensionsRequest.status !== 200) {
				getLogger().error(currentExtensionsRequest, 'Failed to get moonraker extensions');
				throw new TRPCError({
					message: `Failed to get moonraker extensions`,
					code: 'INTERNAL_SERVER_ERROR',
				});
			}
			const currentExtensionsResult = await currentExtensionsRequest.json();
			let currentExtensions = [];
			if (currentExtensionsResult.error == null && currentExtensionsResult.result != null) {
				currentExtensions = moonrakerExtensions.parse(JSON.parse(currentExtensionsResult.result.value));
			} else {
				getLogger().error(currentExtensionsResult, 'Failed to get moonraker extensions');
				throw new TRPCError({
					message: `Failed to get moonraker extensions`,
					code: 'INTERNAL_SERVER_ERROR',
				});
			}
			if (currentExtensions.length === 0) {
				return 'No extensions registered, nothing to do.';
			}
			let cleanedUpExtensions: z.infer<typeof moonrakerExtensions> = [];
			const symlinkResults = currentExtensions.map((ext) => {
				if (existsSync(path.resolve(path.join(ext.path, ext.fileName)))) {
					cleanedUpExtensions.push(ext);
					if (
						existsSync(
							path.resolve(
								path.join(process.env.MOONRAKER_DIR ?? '/home/pi/moonraker', 'moonraker/components', ext.fileName),
							),
						)
					) {
						return {
							result: 'success',
							message: `Symlink for "${ext.fileName}" already exists`,
						};
					}
					try {
						symlinkSync(
							path.resolve(path.join(ext.path, ext.fileName)),
							path.resolve(
								path.join(process.env.MOONRAKER_DIR ?? '/home/pi/moonraker', 'moonraker/components', ext.fileName),
							),
						);
						return {
							result: 'success',
							message: `Symlink for "${ext.fileName}" created`,
						};
					} catch (e) {
						return {
							result: 'error',
							message: `Failed to create symlink for "${ext.fileName}"`,
						};
					}
				} else {
					return {
						result: 'error',
						message: `Extension file "${ext.fileName}" does not exist in ${ext.path} and has been removed from the list of registered extensions`,
					};
				}
			});
			if (cleanedUpExtensions.length !== currentExtensions.length) {
				const moonrakerPostURL = 'http://localhost:7125/server/database/item';
				const result = await fetch(moonrakerPostURL, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						namespace: 'RatOS',
						key: 'moonraker_extensions',
						value: JSON.stringify(cleanedUpExtensions),
					}),
				});
				if (result.status !== 200) {
					getLogger().error(
						result,
						'Extensions have been symlinked, but nonexistent extensions were found and we failed to clean up those extensions.',
					);
					throw new TRPCError({
						message: `Extensions have been symlinked, but nonexistent extensions were found and we failed to clean up those extensions.`,
						code: 'INTERNAL_SERVER_ERROR',
					});
				}
			}
			const successCount = symlinkResults.filter((r) => r.result === 'success').length;
			let report = `Symlinked ${successCount}/${symlinkResults.length} extension(s): \n`;
			symlinkResults.forEach((r) => {
				report += `${r.message} \n`;
			});
			return report;
		},
	})
	.query('list', {
		output: moonrakerExtensions,
		resolve: async () => {
			const moonrakerGetURL = 'http://localhost:7125/server/database/item?namespace=RatOS&key=moonraker_extensions';
			const currentExtensionsRequest = await fetch(moonrakerGetURL);
			if (currentExtensionsRequest.status !== 200) {
				getLogger().error(currentExtensionsRequest, 'Failed to get moonraker extensions');
				throw new TRPCError({
					message: `Failed to get moonraker extensions`,
					code: 'INTERNAL_SERVER_ERROR',
				});
			}
			const currentExtensionsResult = await currentExtensionsRequest.json();
			let currentExtensions = [];
			if (currentExtensionsResult.error == null && currentExtensionsResult.result != null) {
				currentExtensions = JSON.parse(currentExtensionsResult.result.value);
			} else {
				getLogger().error(currentExtensionsResult, 'Failed to get moonraker extensions');
				throw new TRPCError({
					message: `Failed to get moonraker extensions`,
					code: 'INTERNAL_SERVER_ERROR',
				});
			}
			return currentExtensions;
		},
	});
