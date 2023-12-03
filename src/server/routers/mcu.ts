import { z } from 'zod';
import fs, { exists } from 'fs';
import { exec } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { promisify } from 'util';
import { TRPCError } from '@trpc/server';
import { getScriptRoot } from '../../helpers/util';
import { runSudoScript } from '../../helpers/run-script';
import { AutoFlashableBoard, Board, BoardWithDetectionStatus } from '../../zods/boards';
import { middleware, publicProcedure, router } from '../trpc';
import path from 'path';
import { glob } from 'glob';

const inputSchema = z.object({
	boardPath: z.string(),
});

export const getBoards = async () => {
	const defs = await promisify(exec)(`ls ${process.env.RATOS_CONFIGURATION_PATH}/boards/*/board-definition.json`);
	return z.array(BoardWithDetectionStatus).parse(
		defs.stdout
			.split('\n')
			.map((f) =>
				f.trim() === ''
					? null
					: {
							...(JSON.parse(readFileSync(f).toString()) as BoardWithDetectionStatus),
							path: f.replace('board-definition.json', ''),
					  },
			)
			.filter((b) => b != null)
			.map((b) => {
				b!.detected = b != null && 'serialPath' in b && b.serialPath != null ? existsSync(b.serialPath) : false;
				return b;
			}),
	);
};

export const getBoardsWithoutHost = (boards: BoardWithDetectionStatus[]) => {
	return boards.filter((b) => !b.isHost);
};
export const getToolboards = (boards: BoardWithDetectionStatus[]) => {
	return boards.filter((b) => b.isToolboard);
};
export const getBoardsWithDriverCount = (boards: BoardWithDetectionStatus[], driverCount: number) => {
	return boards.filter(
		(b) => b.driverCount >= driverCount || (b.extruderlessConfig != null && b.driverCount >= driverCount - 1),
	);
};
const mcuMiddleware = middleware(async ({ ctx, next, meta, rawInput }) => {
	let boards = null;
	const parsedInput = inputSchema.safeParse(rawInput);
	try {
		boards = await getBoards();
		if (meta?.includeHost !== true) {
			boards = getBoardsWithoutHost(boards);
		}
	} catch (e) {
		throw new TRPCError({
			code: 'INTERNAL_SERVER_ERROR',
			message: `Invalid board definition(s) in ${process.env.RATOS_CONFIGURATION_PATH}/boards.`,
			cause: e,
		});
	}
	let board = null;
	if (meta?.boardRequired && !parsedInput.success) {
		throw new TRPCError({
			code: 'PRECONDITION_FAILED',
			message: `boardPath parameter missing.`,
		});
	}
	if (parsedInput.success) {
		board = boards.find((b) => b.path === parsedInput.data.boardPath);
		if (board == null) {
			throw new TRPCError({
				code: 'PRECONDITION_FAILED',
				message: `No supported board exists for the path ${parsedInput.data.boardPath}`,
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
});
const mcuProcedure = publicProcedure.use(mcuMiddleware);
export const mcuRouter = router({
	boards: mcuProcedure
		.input(
			z.object({
				boardFilters: z
					.object({
						toolboard: z.boolean().optional(),
						driverCountRequired: z.number().optional(),
					})
					.optional(),
			}),
		)
		.output(z.array(BoardWithDetectionStatus))
		.query(({ ctx, input }) => {
			let boards = ctx.boards;
			if (input.boardFilters?.toolboard === true) {
				boards = getToolboards(boards);
			}
			if (input.boardFilters?.driverCountRequired != null) {
				boards = getBoardsWithDriverCount(boards, input.boardFilters.driverCountRequired);
			}
			return boards;
		}),
	detect: mcuProcedure
		.input(inputSchema)
		.meta({
			boardRequired: true,
		})
		.query(({ ctx, input }) => {
			if (ctx.board == null) {
				throw new TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `No supported board exists for the path ${input.boardPath}`,
				});
			}
			if (existsSync(ctx.board.serialPath)) {
				return true;
			}
			return false;
		}),
	unidentifiedDevices: mcuProcedure.query(async ({ ctx }) => {
		const detected = ctx.boards.filter((b) => b.detected).map((b) => fs.realpathSync(b.serialPath));
		return (await glob('/dev/serial/by-id/usb-Klipper*')).filter((d) => !detected.includes(fs.realpathSync(d)));
	}),
	boardVersion: mcuProcedure
		.input(inputSchema)
		.meta({
			boardRequired: true,
		})
		.query(async ({ ctx, input }) => {
			if (ctx.board == null) {
				throw new TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `No supported board exists for the path ${input.boardPath}`,
				});
			}
			if (process.env.KLIPPER_ENV == null || process.env.KLIPPER_ENV.trim() === '') {
				throw new TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `Environment variable KLIPPER_ENV is missing`,
				});
			}
			if (process.env.KLIPPER_DIR == null || process.env.KLIPPER_DIR.trim() === '') {
				throw new TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `Environment variable KLIPPER_DIR is missing`,
				});
			}

			const scriptRoot = getScriptRoot();
			// stop klipper
			let version = { stdout: '' };
			let error: any = null;
			try {
				await fetch('http://localhost:7125/machine/services/stop?service=klipper', { method: 'POST' });
				version = await promisify(exec)(
					`${path.join(process.env.KLIPPER_ENV, 'bin', 'python')} ${path.join(scriptRoot, 'check-version.py')} ${
						ctx.board.serialPath
					}`,
					{ env: { KLIPPER_DIR: process.env.KLIPPER_DIR, NODE_ENV: process.env.NODE_ENV } },
				);
			} catch (e) {
				error = e;
			} finally {
				await fetch('http://localhost:7125/machine/services/start?service=klipper', { method: 'POST' });
			}
			if (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					cause: error,
				});
			}
			const versionRegEx = /Version:\s(v\d+\.\d+\.\d+-\d+-\w{9})/;
			return version.stdout.match(versionRegEx)?.[1];
		}),
	compile: mcuProcedure
		.input(
			z.object({
				boardPath: z.string(),
			}),
		)
		.meta({
			boardRequired: true,
		})
		.mutation(async ({ ctx, input }) => {
			if (ctx.board == null) {
				throw new TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `No supported board exists for the path ${input.boardPath}`,
				});
			}
			let compileResult = null;
			const firmwareBinary = path.resolve(
				'/home/pi/printer_data/config/firmware_binaries',
				ctx.board.firmwareBinaryName,
			);
			try {
				if (fs.existsSync(firmwareBinary)) {
					fs.rmSync(firmwareBinary);
				}
				const compileScript = path.join(
					ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''),
					ctx.board.compileScript,
				);
				compileResult = await runSudoScript('board-script.sh', compileScript);
			} catch (e) {
				const message = e instanceof Error ? e.message : e;
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not compile firmware for ${ctx.board.name}: ${message}'}`,
					cause: e,
				});
			}
			if (!fs.existsSync(firmwareBinary)) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not compile firmware for ${ctx.board.name}: ${compileResult.stdout}`,
				});
			}
			return 'success';
		}),
	flashAllConnected: mcuProcedure
		.meta({
			boardRequired: false,
			includeHost: true,
		})
		.mutation(async ({ ctx }) => {
			const connectedBoards = ctx.boards.filter(
				(b) => existsSync(b.serialPath) && b.flashScript && b.compileScript && b.disableAutoFlash !== true,
			);
			const flashResults: {
				board: Board;
				result: 'success' | 'error';
				message?: string;
			}[] = [];
			for (const b of connectedBoards) {
				try {
					const current = AutoFlashableBoard.parse(b);
					await runSudoScript(
						'board-script.sh',
						path.join(
							current.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''),
							current.compileScript,
						),
					);
					await runSudoScript(
						'board-script.sh',
						path.join(current.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''), current.flashScript),
					);
					flashResults.push({
						board: b,
						result: 'success',
					});
				} catch (e) {
					const message = e instanceof Error ? e.message : e;
					flashResults.push({
						board: b,
						result: 'error',
						message: typeof message === 'string' ? message : undefined,
					});
				}
			}
			const successCount = flashResults.filter((r) => r.result === 'success').length;
			let report = `${successCount}/${connectedBoards.length} connected board(s) flashed successfully.\n`;
			flashResults.map((r) => {
				if (r.result === 'error') {
					report += `${r.board.manufacturer} ${r.board.name} failed to flash: ${r.message}\n`;
				} else {
					report += `${r.board.manufacturer} ${r.board.name} was successfully flashed.\n`;
				}
			});
			return report;
		}),
	flashViaPath: mcuProcedure
		.input(
			z.object({
				boardPath: z.string(),
				flashPath: z.string().optional(),
			}),
		)
		.meta({
			boardRequired: true,
		})
		.mutation(async ({ ctx, input }) => {
			if (ctx.board == null) {
				throw new TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `No supported board exists for the path ${input.boardPath}`,
				});
			}
			if (ctx.board.flashScript == null) {
				throw new TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `${ctx.board.name} does not support automatic flashing via serial path.`,
				});
			}
			if (input.flashPath && !fs.existsSync(input.flashPath)) {
				throw new TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `The path ${input.flashPath} does not exist.`,
				});
			}
			let compileResult = null;
			const firmwareBinary = path.resolve(
				'/home/pi/printer_data/config/firmware_binaries',
				ctx.board.firmwareBinaryName,
			);
			try {
				if (fs.existsSync(firmwareBinary)) {
					fs.rmSync(firmwareBinary);
				}
				const compileScript = path.join(
					ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''),
					ctx.board.compileScript,
				);
				compileResult = await runSudoScript('board-script.sh', compileScript);
			} catch (e) {
				const message = e instanceof Error ? e.message : e;
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not compile firmware for ${ctx.board.name}: ${compileResult?.stdout ?? message}'}`,
					cause: e,
				});
			}
			if (!fs.existsSync(firmwareBinary)) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not compile firmware for ${ctx.board.name}: ${compileResult.stdout}`,
				});
			}
			let flashResult = null;
			try {
				const flashScript = path.join(
					ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''),
					ctx.board.flashScript,
				);
				flashResult = input.flashPath
					? await runSudoScript('flash-path.sh', ctx.board.serialPath, input.flashPath)
					: await runSudoScript('board-script.sh', flashScript);
			} catch (e) {
				const message = e instanceof Error ? e.message : e;
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not flash firmware to ${ctx.board.name}: ${flashResult?.stdout ?? message}'}`,
					cause: e,
				});
			}
			if (!fs.existsSync(ctx.board.serialPath)) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not flash firmware to ${ctx.board.name}: ${flashResult.stdout}`,
				});
			}
			return 'success';
		}),
	dfuDetect: mcuProcedure
		.input(inputSchema)
		.meta({
			boardRequired: true,
		})
		.query(async ({ ctx, input }) => {
			const dfuDeviceCount = parseInt((await promisify(exec)('lsusb | grep "0483:df11" | wc -l')).stdout, 10);
			if (dfuDeviceCount === 1) {
				return true;
			}
			if (dfuDeviceCount > 1) {
				throw new TRPCError({
					code: 'PRECONDITION_FAILED',
					message: 'Multiple DFU devices detected, please disconnect the other devices.',
				});
			}
			return false;
		}),
	dfuFlash: mcuProcedure
		.input(inputSchema)
		.meta({
			boardRequired: true,
		})
		.mutation(async ({ ctx, input }) => {
			if (ctx.board == null) return; // middleware takes care of the error message.
			if (ctx.board.dfu == null) {
				throw new TRPCError({
					code: 'PRECONDITION_FAILED',
					message: 'Board does not support DFU.',
				});
			}
			let compileResult = null;
			const firmwareBinary = path.resolve(
				'/home/pi/printer_data/config/firmware_binaries',
				ctx.board.firmwareBinaryName,
			);
			try {
				if (fs.existsSync(firmwareBinary)) {
					fs.rmSync(firmwareBinary);
				}
				const compileScript = path.join(
					ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''),
					ctx.board.compileScript,
				);
				compileResult = await runSudoScript('board-script.sh', compileScript);
			} catch (e) {
				const message = e instanceof Error ? e.message : e;
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not compile firmware for ${ctx.board.name}: ${message}`,
					cause: e,
				});
			}
			if (!fs.existsSync(firmwareBinary)) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not compile firmware for ${ctx.board.name}: ${compileResult.stdout} ${compileResult.stderr}`,
				});
			}
			try {
				const flashResult = await runSudoScript('dfu-flash.sh', ctx.board.serialPath);
				return flashResult.stdout;
			} catch (e) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to flash device.',
					cause: e,
				});
			}
		}),
});
