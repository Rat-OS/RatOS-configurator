import { z } from 'zod';
import * as trpc from '@trpc/server';
import fs from 'fs';
import { exec } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { promisify } from 'util';
import { createRouter } from './context';
import { TRPCError } from '@trpc/server';
import { getScriptRoot } from '../../helpers/util';
import path from 'path';

export const Board = z.object({
	serialPath: z.string(),
	isToolboard: z.boolean().optional(),
	name: z.string(),
	manufacturer: z.string(),
	firmwareBinaryName: z.string(),
	compileScript: z.string(),
	flashScript: z.string().optional(),
	flashInstructions: z.string().optional(),
	documentationLink: z.string().optional(),
	dfu: z
		.object({
			dfuBootImage: z.string(),
			flashDevice: z.string(),
			instructions: z.array(z.string()),
			reminder: z.string().optional(),
		})
		.optional(),
	path: z.string(),
});
export type Board = z.infer<typeof Board>;

const inputSchema = z.object({
	boardPath: z.string(),
});

export const getBoards = async () => {
	const defs = await promisify(exec)(`ls ${process.env.RATOS_CONFIGURATION_PATH}/boards/*/board-definition.json`);
	return z.array(Board).parse(
		defs.stdout
			.split('\n')
			.map((f) =>
				f.trim() === ''
					? null
					: { ...JSON.parse(readFileSync(f).toString()), path: f.replace('board-definition.json', '') },
			)
			.filter((f) => f != null),
	);
};

export const mcuRouter = createRouter<{ boardRequired: boolean }>()
	.middleware(async ({ ctx, next, meta, rawInput }) => {
		let boards = null;
		try {
			boards = await getBoards();
		} catch (e) {
			throw new trpc.TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Invalid board definition(s) in ${process.env.RATOS_CONFIGURATION_PATH}/boards.`,
				cause: e,
			});
		}
		let board = null;
		const boardPath = inputSchema.safeParse(rawInput);
		if (meta?.boardRequired && !boardPath.success) {
			throw new trpc.TRPCError({
				code: 'PRECONDITION_FAILED',
				message: `boardPath parameter missing.`,
			});
		}
		if (boardPath.success) {
			board = boards.find((b) => b.path === boardPath.data.boardPath);
			if (board == null) {
				throw new trpc.TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `No supported board exists for the path ${boardPath.data.boardPath}`,
				});
			}
		}
		return next({
			ctx: {
				...ctx,
				boards: boards,
				board: board,
			},
		});
	})
	.query('boards', {
		output: z.array(Board),
		resolve: ({ ctx }) => {
			return ctx.boards;
		},
	})
	.query('detect', {
		meta: {
			boardRequired: true,
		},
		input: inputSchema,
		resolve: ({ ctx, input }) => {
			if (ctx.board == null) {
				throw new trpc.TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `No supported board exists for the path ${input.boardPath}`,
				});
			}
			if (existsSync(ctx.board.serialPath)) {
				return true;
			}
			return false;
		},
	})
	.mutation('compile', {
		meta: {
			boardRequired: true,
		},
		input: z.object({
			boardPath: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			if (ctx.board == null) {
				throw new trpc.TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `No supported board exists for the path ${input.boardPath}`,
				});
			}
			let compileResult = null;
			const firmwareBinary = path.resolve('/home/pi/klipper_config/firmware_binaries', ctx.board.firmwareBinaryName);
			try {
				if (fs.existsSync(firmwareBinary)) {
					fs.rmSync(firmwareBinary);
				}
				const compileScript = path.join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''), ctx.board.compileScript);
				console.log(`${getScriptRoot()}/board-script.sh ${compileScript}`);
				compileResult = await promisify(exec)(`sudo ${getScriptRoot()}/board-script.sh ${compileScript}`);
			} catch (e) {
				const message = e instanceof Error ? e.message : e;
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not compile firmware for ${ctx.board.name}: ${message}'}`,
					cause: e,
				});
			}
			if (!fs.existsSync(firmwareBinary)) {
				throw new trpc.TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not compile firmware for ${ctx.board.name}: ${compileResult.stdout}`,
				});
			}
			return 'success';
		}
	})
	.mutation('flash-via-path', {
		meta: {
			boardRequired: true,
		},
		input: z.object({
			boardPath: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			if (ctx.board == null) {
				throw new trpc.TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `No supported board exists for the path ${input.boardPath}`,
				});
			}
			if (ctx.board.flashScript == null) {
				throw new trpc.TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `${ctx.board.name} does not support automatic flashing via serial path.`,
				});
			}
			let compileResult = null;
			const firmwareBinary = path.resolve('/home/pi/klipper_config/firmware_binaries', ctx.board.firmwareBinaryName);
			try {
				if (fs.existsSync(firmwareBinary)) {
					fs.rmSync(firmwareBinary);
				}
				const compileScript = path.join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''), ctx.board.compileScript);
				console.log(`${getScriptRoot()}/board-script.sh ${compileScript}`);
				compileResult = await promisify(exec)(`sudo ${getScriptRoot()}/board-script.sh ${compileScript}`);
			} catch (e) {
				const message = e instanceof Error ? e.message : e;
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not compile firmware for ${ctx.board.name}: ${message}'}`,
					cause: e,
				});
			}
			if (!fs.existsSync(firmwareBinary)) {
				throw new trpc.TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not compile firmware for ${ctx.board.name}: ${compileResult.stdout}`,
				});
			}
			let flashResult = null;
			try {
				const flashScript = path.join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''), ctx.board.flashScript);
				console.log(`${getScriptRoot()}/board-script.sh ${flashScript}`);
				flashResult = await promisify(exec)(`sudo ${getScriptRoot()}/board-script.sh ${flashScript}`);
			} catch (e) {
				const message = e instanceof Error ? e.message : e;
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not flash firmware to ${ctx.board.name}: ${message}'}`,
					cause: e,
				});
			}
			if (!fs.existsSync(ctx.board.serialPath)) {
				throw new trpc.TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not flash firmware to ${ctx.board.name}: ${flashResult.stdout}`,
				});
			}
			return 'success';
		}
	})
	.query('dfu-detect', {
		meta: {
			boardRequired: true,
		},
		input: inputSchema,
		resolve: async ({ ctx, input }) => {
			const dfuDeviceCount = parseInt((await promisify(exec)('lsusb | grep "0483:df11" | wc -l')).stdout, 10);
			if (dfuDeviceCount === 1) {
				return true;
			}
			if (dfuDeviceCount > 1) {
				throw new trpc.TRPCError({
					code: 'PRECONDITION_FAILED',
					message: 'Multiple DFU devices detected, please disconnect the other devices.',
				});
			}
			return false;
		},
	})
	.mutation('dfu-flash', {
		meta: {
			boardRequired: true,
		},
		input: inputSchema,
		resolve: async ({ ctx, input }) => {
			if (ctx.board == null) return; // middleware takes care of the error message.
			if (ctx.board.dfu == null) {
				throw new TRPCError({
					code: 'PRECONDITION_FAILED',
					message: 'Board does not support DFU.',
				});
			}
			let compileResult = null;
			const firmwareBinary = path.resolve('/home/pi/klipper_config/firmware_binaries', ctx.board.firmwareBinaryName);
			try {
				if (fs.existsSync(firmwareBinary)) {
					fs.rmSync(firmwareBinary);
				}
				const compileScript = path.join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''), ctx.board.compileScript);
				compileResult = await promisify(exec)(`sudo ${getScriptRoot()}/board-script.sh ${compileScript}`);
			} catch (e) {
				const message = e instanceof Error ? e.message : e;
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not compile firmware for ${ctx.board.name}: ${message}`,
					cause: e,
				});
			}
			if (!fs.existsSync(firmwareBinary)) {
				throw new trpc.TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not compile firmware for ${ctx.board.name}: ${compileResult.stdout} ${compileResult.stderr}`,
				});
			}
			try {
				const flashResult = await promisify(exec)('sudo ' + path.join(getScriptRoot(), 'dfu-flash.sh'));
				return flashResult.stdout;
			} catch (e) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to flash device.',
					cause: e,
				});
			}
		},
	});
