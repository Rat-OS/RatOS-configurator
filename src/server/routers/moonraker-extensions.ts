import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { getLogger } from '../helpers/logger';
import { publicProcedure, router } from '../trpc';
import path from 'path';
import { serverSchema } from '../../env/schema.mjs';
import { searchFileByLine } from '../helpers/file-operations';
import { appendFile, symlink } from 'fs/promises';

const moonrakerExtension = z.object({
	fileName: z.string(),
	path: z.string(),
	extensionName: z.string(),
	errorIfExists: z.boolean().optional(),
});
const moonrakerExtensions = z.array(moonrakerExtension);

const getExtensions = () => {
	const environment = serverSchema.parse(process.env);
	const extensionDir = environment.RATOS_DATA_DIR;
	const moonrakerExtensionsFile = path.join(extensionDir, 'moonraker-extensions.json');
	if (!existsSync(extensionDir)) {
		mkdirSync(extensionDir);
	}
	if (!existsSync(moonrakerExtensionsFile)) {
		writeFileSync(moonrakerExtensionsFile, '[]');
	}
	const currentExtensions = moonrakerExtensions.parse(JSON.parse(readFileSync(moonrakerExtensionsFile).toString()));
	return currentExtensions;
};

const saveExtensions = (extensions: z.infer<typeof moonrakerExtensions>) => {
	const environment = serverSchema.parse(process.env);
	const extensionDir = environment.RATOS_DATA_DIR;
	const moonrakerExtensionsFile = path.join(extensionDir, 'moonraker-extensions.json');
	if (!existsSync(extensionDir)) {
		mkdirSync(extensionDir);
	}
	writeFileSync(moonrakerExtensionsFile, JSON.stringify(extensions));
};

export const symlinkMoonrakerExtensions = async () => {
	const environment = serverSchema.parse(process.env);
	const currentExtensions = getExtensions();
	if (currentExtensions.length === 0) {
		return 'No extensions registered, nothing to do.';
	}
	let cleanedUpExtensions: z.infer<typeof moonrakerExtensions> = [];
	const gitExcludePath = path.resolve(path.join(environment.MOONRAKER_DIR, '.git', 'info', 'exclude'));
	const symlinkResults = await Promise.all(
		currentExtensions.map(async (ext) => {
			if (existsSync(path.resolve(path.join(ext.path, ext.fileName)))) {
				cleanedUpExtensions.push(ext);
				const excludeLine = new RegExp(`^moonraker/components/${ext.fileName}$`);
				const isExcluded = await searchFileByLine(gitExcludePath, excludeLine);
				const symlinkExists = existsSync(
					path.resolve(path.join(environment.MOONRAKER_DIR, 'moonraker/components', ext.fileName)),
				);
				try {
					if (symlinkExists === false) {
						await symlink(
							path.resolve(path.join(ext.path, ext.fileName)),
							path.resolve(path.join(environment.MOONRAKER_DIR, 'moonraker/components', ext.fileName)),
						);
					}
					if (isExcluded === false) {
						await appendFile(gitExcludePath, `moonraker/components/${ext.fileName}\n`);
					}
					return {
						result: 'success',
						message: symlinkExists
							? `Symlink for "${ext.fileName}" already exists. Skipping.`
							: `Symlink for "${ext.fileName}" created`,
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
		}),
	);
	if (cleanedUpExtensions.length !== currentExtensions.length) {
		saveExtensions(cleanedUpExtensions);
	}
	const successCount = symlinkResults.filter((r) => r.result === 'success').length;
	let report = `Symlinked ${successCount}/${symlinkResults.length} extension(s): \n`;
	symlinkResults.forEach((r) => {
		report += `${r.message} \n`;
	});
	return report;
};

export const moonrakerExtensionsRouter = router({
	register: publicProcedure.input(z.object({ json: moonrakerExtension })).mutation(async ({ input }) => {
		const currentExtensions = getExtensions();
		const { path: filePath, fileName, errorIfExists } = input.json;
		const extensionPath = path.join(filePath, fileName);
		if (!existsSync(extensionPath)) {
			getLogger().error(`File "${extensionPath}" does not exist`);
			throw new TRPCError({
				message: `File "${extensionPath}" does not exist`,
				code: 'PRECONDITION_FAILED',
			});
		}
		if (currentExtensions.find((ext) => ext.fileName === fileName)) {
			if (errorIfExists === true) {
				getLogger().error(`An extension with the fileName "${fileName}" is already registered`);
				throw new TRPCError({
					message: `An extension with the fileName "${fileName}" is already registered`,
					code: 'PRECONDITION_FAILED',
				});
			}
			getLogger().warn(`An extension with the fileName "${fileName}" is already registered, ignoring...`);
			return true;
		}
		currentExtensions.push(input.json);
		saveExtensions(currentExtensions);
		return true;
	}),
	symlink: publicProcedure.mutation(symlinkMoonrakerExtensions),
	list: publicProcedure.output(moonrakerExtensions).query(async () => {
		return getExtensions();
	}),
});
