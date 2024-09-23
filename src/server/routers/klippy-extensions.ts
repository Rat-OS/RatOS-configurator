import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { getLogger } from '@/server/helpers/logger';
import { publicProcedure, router } from '@/server/trpc';
import path from 'path';
import { serverSchema } from '@/env/schema.mjs';
import { symlinkExtensions, unlinkExtension } from '@/server/helpers/extensions';

const klippyExtension = z.object({
	fileName: z.string(),
	path: z.string(),
	extensionName: z.string(),
	errorIfExists: z.boolean().optional(),
	errorIfNotExists: z.boolean().optional(),
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

export const symlinkKlippyExtensions = async (errorIfExists?: boolean) => {
	const environment = serverSchema.parse(process.env);
	const currentExtensions = getExtensions();
	return await symlinkExtensions({
		extensions: currentExtensions,
		options: {
			errorIfExists: errorIfExists,
		},
		gitRepoPath: environment.KLIPPER_DIR,
		relativePath,
		saveExtensions,
	});
};

const relativePath = (ext: z.infer<typeof klippyExtension>) => {
	return ext.isKinematics ? `klippy/kinematics` : `klippy/extras`;
};

export const klippyExtensionsRouter = router({
	register: publicProcedure.input(z.object({ json: klippyExtension })).mutation(async ({ input }) => {
		const currentExtensions = getExtensions();
		const { path: filePath, fileName, errorIfExists, extensionName } = input.json;
		const extensionPath = path.join(filePath, fileName);
		if (!existsSync(extensionPath)) {
			throw new TRPCError({
				message: `File "${extensionPath}" does not exist`,
				code: 'PRECONDITION_FAILED',
			});
		}
		if (
			currentExtensions.find(
				(ext) =>
					ext.extensionName === extensionName ||
					(ext.fileName === fileName && !!ext.isKinematics === !!input.json.isKinematics),
			)
		) {
			if (errorIfExists === true) {
				throw new TRPCError({
					message: `${
						input.json.isKinematics ? 'A kinematic' : 'An'
					} extension called "${extensionName}" with fileName "${fileName}" is already registered`,
					code: 'PRECONDITION_FAILED',
				});
			}
			getLogger().warn(
				`${
					input.json.isKinematics ? 'A kinematic' : 'An'
				} extension called "${extensionName}" with the fileName "${fileName}" is already registered, ignoring...`,
			);
			return true;
		}
		currentExtensions.push(input.json);
		saveExtensions(currentExtensions);
		return true;
	}),
	unregister: publicProcedure
		.input(z.object({ extensionName: z.string(), errorIfNotExists: z.boolean().optional() }))
		.mutation(async ({ input }) => {
			const currentExtensions = getExtensions();
			const { extensionName } = input;
			const extensionIndex = currentExtensions.findIndex((ext) => ext.extensionName === extensionName);
			if (extensionIndex === -1) {
				if (input.errorIfNotExists === true) {
					throw new TRPCError({
						message: `Extension with the name "${extensionName}" is not registered`,
						code: 'PRECONDITION_FAILED',
					});
				}
				getLogger().warn(`Extension with the name "${extensionName}" is not registered, ignoring...`);
				return {
					result: 'success' as const,
					message: `Extension "${extensionName}" does not exist. Nothing to do.`,
				};
			}
			const ext = currentExtensions.splice(extensionIndex, 1);
			if (ext.length !== 1) {
				throw new Error('Failed to remove extension');
			}
			const res = await unlinkExtension({
				extension: ext[0],
				gitRepoPath: serverSchema.parse(process.env).KLIPPER_DIR,
				relativePath,
			});
			if (res.result === 'success') {
				saveExtensions(currentExtensions);
			}
			return res;
		}),
	symlink: publicProcedure
		.input(
			z.object({
				errorIfExists: z.boolean().optional(),
			}),
		)
		.mutation(async ({ input }) => await symlinkKlippyExtensions(input.errorIfExists)),
	unlink: publicProcedure.mutation(async () => {
		const currentExtensions = getExtensions();
		return await Promise.all(
			currentExtensions.map(async (ext) => {
				const res = await unlinkExtension({
					extension: ext,
					gitRepoPath: serverSchema.parse(process.env).KLIPPER_DIR,
					relativePath,
				});
				return res;
			}),
		);
	}),
	list: publicProcedure.output(klippyExtensions).query(async () => {
		return getExtensions();
	}),
});
