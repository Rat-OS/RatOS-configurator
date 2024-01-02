import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { getLogger } from '../helpers/logger';
import { publicProcedure, router } from '../trpc';
import path from 'path';
import { serverSchema } from '../../env/schema.mjs';
import { searchFileByLine } from '../helpers/file-operations';
import { appendFile, symlink } from 'fs/promises';

const klippyExtension = z.object({
	fileName: z.string(),
	path: z.string(),
	extensionName: z.string(),
	errorIfExists: z.boolean().optional(),
	isKinematics: z.boolean().optional(),
});
const klippyExtensions = z.array(klippyExtension);

const getExtensions = () => {
	const environment = serverSchema.parse(process.env);
	const extensionDir = environment.RATOS_DATA_DIR;
	const klippyExtensionsFile = path.join(extensionDir, 'klippy-extensions.json');
	if (!existsSync(extensionDir)) {
		mkdirSync(extensionDir);
	}
	if (!existsSync(klippyExtensionsFile)) {
		writeFileSync(klippyExtensionsFile, '[]');
	}
	const currentExtensions = klippyExtensions.parse(JSON.parse(readFileSync(klippyExtensionsFile).toString()));
	return currentExtensions;
};

const saveExtensions = (extensions: z.infer<typeof klippyExtensions>) => {
	const environment = serverSchema.parse(process.env);
	const extensionDir = environment.RATOS_DATA_DIR;
	const klippyExtensionsFile = path.join(extensionDir, 'klippy-extensions.json');
	if (!existsSync(extensionDir)) {
		mkdirSync(extensionDir);
	}
	writeFileSync(klippyExtensionsFile, JSON.stringify(extensions));
};

export const symlinkKlippyExtensions = async () => {
	const environment = serverSchema.parse(process.env);
	const currentExtensions = getExtensions();
	if (currentExtensions.length === 0) {
		return 'No extensions registered, nothing to do.';
	}
	let cleanedUpExtensions: z.infer<typeof klippyExtensions> = [];
	const gitExcludePath = path.resolve(path.join(environment.KLIPPER_DIR, '.git', 'info', 'exclude'));
	const symlinkResults = await Promise.all(
		currentExtensions.map(async (ext) => {
			if (existsSync(path.resolve(path.join(ext.path, ext.fileName)))) {
				const relativeDestination = ext.isKinematics
					? `klippy/kinematics/${ext.fileName}`
					: `klippy/extras/${ext.fileName}`;
				const destination = path.resolve(path.join(environment.KLIPPER_DIR, relativeDestination));
				cleanedUpExtensions.push(ext);
				const excludeLine = new RegExp(`^${relativeDestination}$`);
				const isExcluded = await searchFileByLine(gitExcludePath, excludeLine);
				const symlinkExists = existsSync(
					path.resolve(path.join(environment.MOONRAKER_DIR, 'moonraker/components', ext.fileName)),
				);
				if (existsSync(destination)) {
					return {
						result: 'success',
						message: `Symlink for "${ext.fileName}" already exists`,
					};
				}
				try {
					if (symlinkExists === false) {
						await symlink(path.resolve(path.join(ext.path, ext.fileName)), destination);
					}
					if (isExcluded === false) {
						await appendFile(gitExcludePath, `${relativeDestination}\n`);
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

export const klippyExtensionsRouter = router({
	register: publicProcedure.input(z.object({ json: klippyExtension })).mutation(async ({ input }) => {
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
		if (
			currentExtensions.find((ext) => ext.fileName === fileName && !!ext.isKinematics === !!input.json.isKinematics)
		) {
			if (errorIfExists === true) {
				getLogger().error(
					`${
						input.json.isKinematics ? 'A kinematic' : 'An'
					} extension with the fileName "${fileName}" is already registered`,
				);
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
	symlink: publicProcedure.mutation(symlinkKlippyExtensions),
	list: publicProcedure.output(klippyExtensions).query(async () => {
		return getExtensions();
	}),
});
