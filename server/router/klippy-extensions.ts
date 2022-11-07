import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { existsSync, mkdirSync, symlinkSync, writeFileSync, readFileSync } from 'fs';
import { getLogger } from '../../helpers/logger';
import path from 'path';
import * as trpc from '@trpc/server';

const klippyExtension = z.object({
	fileName: z.string(),
	path: z.string(),
	extensionName: z.string(),
});
const klippyExtensions = z.array(klippyExtension);

const getExtensions = () => {
	if (process.env.KLIPPY_EXTENSIONS == null) {
		throw new Error('No KLIPPY_EXTENSIONS specified in environment');
	}
	const extensionDir = process.env.KLIPPY_EXTENSIONS.split('/').slice(0, -1).join('/');
	if (!existsSync(extensionDir)) {
		mkdirSync(extensionDir);
	}
	if (!existsSync(process.env.KLIPPY_EXTENSIONS)) {
		writeFileSync(process.env.KLIPPY_EXTENSIONS, '[]');
	}
	const currentExtensions = klippyExtensions.parse(JSON.parse(readFileSync(process.env.KLIPPY_EXTENSIONS).toString()));
	return currentExtensions;
};

const saveExtensions = (extensions: z.infer<typeof klippyExtensions>) => {
	if (process.env.KLIPPY_EXTENSIONS == null) {
		throw new Error('No KLIPPY_EXTENSIONS specified in environment');
	}
	const extensionDir = process.env.KLIPPY_EXTENSIONS.split('/').slice(0, -1).join('/');
	if (!existsSync(extensionDir)) {
		mkdirSync(extensionDir);
	}
	writeFileSync(process.env.KLIPPY_EXTENSIONS, JSON.stringify(extensions));
};

export const klippyExtensionsRouter = trpc
	.router()
	.mutation('register', {
		input: klippyExtension,
		resolve: async ({ input }) => {
			const currentExtensions = getExtensions();
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
			saveExtensions(currentExtensions);
			return true;
		},
	})
	.mutation('symlink', {
		resolve: async () => {
			const currentExtensions = getExtensions();
			if (currentExtensions.length === 0) {
				return 'No extensions registered, nothing to do.';
			}
			let cleanedUpExtensions: z.infer<typeof klippyExtensions> = [];
			const symlinkResults = currentExtensions.map((ext) => {
				if (existsSync(path.resolve(path.join(ext.path, ext.fileName)))) {
					cleanedUpExtensions.push(ext);
					if (
						existsSync(
							path.resolve(path.join(process.env.KLIPPER_DIR ?? '/home/pi/klipper', 'klippy/extras', ext.fileName)),
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
							path.resolve(path.join(process.env.KLIPPER_DIR ?? '/home/pi/klipper', 'klippy/extras', ext.fileName)),
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
				saveExtensions(cleanedUpExtensions);
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
		output: klippyExtensions,
		resolve: async () => {
			return getExtensions();
		},
	});
