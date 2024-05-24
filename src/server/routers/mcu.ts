import { ZodError, z } from 'zod';
import fs, { existsSync, readFileSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { TRPCError } from '@trpc/server';
import { runSudoScript } from '@/server/helpers/run-script';
import {
	AutoFlashableBoard,
	Board,
	BoardID,
	BoardPath,
	BoardWithDetectionStatus,
	ToolboardWithDetectionStatus,
	reversePinLookup,
} from '@/zods/boards';
import { middleware, publicProcedure, router } from '@/server/trpc';
import path from 'path';
import { glob } from 'glob';
import { SerializedToolheadConfiguration } from '@/zods/toolhead';
import { getBoardSerialPath, getBoardChipId } from '@/helpers/board';
import { copyFile, unlink } from 'fs/promises';
import { serverSchema } from '@/env/schema.mjs';
import { replaceInFileByLine, getScriptRoot } from '@/server/helpers/file-operations';
import { ToolheadHelper } from '@/helpers/toolhead';
import { deserializeToolheadConfiguration } from '@/server/routers/printer';
import { ServerCache } from '@/server/helpers/cache';
import { PrinterAxis } from '@/zods/motion';
import { parseBoardPinConfig } from '@/server/helpers/metadata';
import { getLastPrinterSettings } from '@/server/helpers/printer-settings';
import { queryPrinterState } from '@/server/helpers/klipper';

const inputSchema = z.object({
	boardPath: z.string().optional(),
	toolhead: SerializedToolheadConfiguration.optional(),
	controlboard: BoardID.optional(),
});

const detect = (board: Board, toolhead?: ToolheadHelper<any>) => {
	return fs.existsSync(getBoardSerialPath(board, toolhead));
};

export const getBoards = async () => {
	const cached = ServerCache.get('boards');
	if (cached != null && cached.length > 0) {
		return cached.map((b) => {
			b.detected = detect(b);
			return b;
		});
	}
	const defs = await glob(`${process.env.RATOS_CONFIGURATION_PATH}/boards/*/board-definition.json`);
	const boards = defs
		.map((f) =>
			f.trim() === ''
				? null
				: {
						...(JSON.parse(fs.readFileSync(f).toString()) as BoardWithDetectionStatus),
						path: BoardPath.parse(f.replace('board-definition.json', '')),
					},
		)
		.filter(Boolean)
		.map((b) => {
			b.detected = detect(b);
			try {
				return BoardWithDetectionStatus.parse(b);
			} catch (e) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Invalid board definition for ${b.name} in ${b.path}`,
					cause: e,
				});
			}
		});
	ServerCache.set('boards', boards);
	return boards;
};

export const updateDetectionStatus = async (boards: BoardWithDetectionStatus[], toolhead?: ToolheadHelper<any>) => {
	return boards.map((b) => {
		b.detected = detect(b, toolhead);
		return b;
	});
};

export const compileFirmware = async <T extends boolean>(
	board: Board,
	toolhead?: ToolheadHelper<any> | null,
	skipCompile?: T,
): Promise<T extends true ? string : Awaited<ReturnType<typeof runSudoScript>>> => {
	let compileResult = null;
	const environment = serverSchema.parse(process.env);
	try {
		const dest = path.join(environment.KLIPPER_DIR, '.config');
		await copyFile(path.join(board.path, 'firmware.config'), dest);
		if (!board.isHost) {
			await replaceInFileByLine(
				dest,
				/CONFIG_USB_SERIAL_NUMBER=".+"/g,
				`CONFIG_USB_SERIAL_NUMBER="${getBoardChipId(board, toolhead)}"`,
			);
		}
		if (skipCompile) {
			return readFileSync(dest).toString() as T extends true ? string : Awaited<ReturnType<typeof runSudoScript>>;
		}
		const binaryName = board.firmwareBinaryName;
		const extension = path.extname(binaryName);
		const klipperOut = path.join(environment.KLIPPER_DIR, 'out', `klipper${extension}`);
		const firmwareDest = path.join(environment.RATOS_DATA_DIR, binaryName);
		existsSync(firmwareDest) && (await unlink(firmwareDest));
		compileResult = await runSudoScript('klipper-compile.sh');
		if (existsSync(klipperOut)) {
			await copyFile(klipperOut, firmwareDest);
		} else if (!board.isHost) {
			throw new Error(`Could not find compiled firmware at ${klipperOut}`);
		}
		return compileResult as T extends true ? string : Awaited<ReturnType<typeof runSudoScript>>;
	} catch (e) {
		const message = e instanceof Error ? e.message : e;
		throw new TRPCError({
			code: 'INTERNAL_SERVER_ERROR',
			message: `Could not compile firmware for ${board.name}: ${message} \n\n ${compileResult?.stdout}`,
			cause: e,
		});
	}
};

export const getBoardsWithoutHost = (boards: BoardWithDetectionStatus[]) => {
	return boards.filter((b) => !b.isHost);
};
export const getToolboards = (boards: BoardWithDetectionStatus[]) => {
	return z.array(ToolboardWithDetectionStatus).parse(boards.filter((b) => b.isToolboard));
};
export const getBoardsWithDriverCount = (boards: BoardWithDetectionStatus[], driverCount: number) => {
	return boards.filter(
		(b) => b.driverCount >= driverCount || (b.extruderlessConfig != null && b.driverCount >= driverCount - 1),
	);
};
const mcuMiddleware = middleware(async ({ ctx, next, meta, rawInput }) => {
	let boards = null;
	let toolhead = null;
	const parsedInput = inputSchema.safeParse(rawInput);
	try {
		boards = await getBoards();
		try {
			toolhead =
				parsedInput.success && parsedInput.data.toolhead
					? new ToolheadHelper(
							await deserializeToolheadConfiguration(
								parsedInput.data.toolhead,
								{ controlboard: parsedInput.data.controlboard },
								boards,
							),
						)
					: undefined;
			boards = await updateDetectionStatus(boards, toolhead);
		} catch (e) {
			if (e instanceof ZodError) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Toolhead configuration cannot be deserialized, please check the configuration.\n${Object.entries(
						e.flatten().fieldErrors,
					)
						.map(([k, v]) => `${k}: ${v}`)
						.join('\n')}`,
					cause: e,
				});
			}
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Toolhead configuration cannot be deserialized, please check the configuration.`,
				cause: e,
			});
		}
		if (meta?.includeHost !== true) {
			boards = getBoardsWithoutHost(boards);
		}
	} catch (e) {
		if (e instanceof TRPCError) {
			throw e;
		}
		throw new TRPCError({
			code: 'INTERNAL_SERVER_ERROR',
			message: `Invalid board definition(s) in ${process.env.RATOS_CONFIGURATION_PATH}/boards.`,
			cause: e,
		});
	}
	let board = null;

	if (meta?.boardRequired && (!parsedInput.success || parsedInput.data.boardPath == null)) {
		throw new TRPCError({
			code: 'PRECONDITION_FAILED',
			message: `boardPath parameter missing.`,
		});
	}
	if (parsedInput.success && parsedInput.data.boardPath != null) {
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
			toolhead: toolhead,
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
				toolhead: SerializedToolheadConfiguration.optional(),
				controlboard: BoardID.optional(),
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
			return detect(ctx.board, ctx.toolhead);
		}),
	unidentifiedDevices: mcuProcedure.query(async ({ ctx }) => {
		const detected = ctx.boards.filter((b) => b.detected).map((b) => fs.realpathSync(getBoardSerialPath(b)));
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
			const printerState = await queryPrinterState();
			if (!['error', 'complete', 'canceled', 'standby', undefined].includes(printerState)) {
				throw new TRPCError({
					code: 'PRECONDITION_FAILED',
					message: `Printer is busy, board cannot be queried at this time without interrupting operations. Klipper print state reported as "${printerState}".`,
				});
			}

			const scriptRoot = getScriptRoot();
			// stop klipper
			let version = { stdout: '' };
			let error: any = null;
			try {
				await fetch('http://127.0.0.1:7125/machine/services/stop?service=klipper', { method: 'POST' });
				version = await promisify(exec)(
					`${path.join(process.env.KLIPPER_ENV, 'bin', 'python')} ${path.join(
						scriptRoot,
						'check-version.py',
					)} ${getBoardSerialPath(ctx.board, ctx.toolhead)}`,
					{ env: { KLIPPER_DIR: process.env.KLIPPER_DIR, NODE_ENV: process.env.NODE_ENV } },
				);
			} catch (e) {
				error = e;
			} finally {
				await fetch('http://127.0.0.1:7125/machine/services/start?service=klipper', { method: 'POST' });
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
				toolhead: SerializedToolheadConfiguration.optional(),
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
			await compileFirmware(ctx.board, ctx.toolhead);
			return 'success';
		}),
	reversePinLookup: mcuProcedure
		.meta({
			boardRequired: true,
		})
		.input(z.object({ axis: z.nativeEnum(PrinterAxis), canUseExtruderlessConfigs: z.boolean(), boardPath: z.string() }))
		.query(async ({ ctx, input }) => {
			if (ctx.board == null) {
				return undefined;
			}
			const isExtruderlessBoard = ctx.board.extruderlessConfig != null && input.canUseExtruderlessConfigs;
			const pins = await parseBoardPinConfig(ctx.board, isExtruderlessBoard);

			const axisAlias =
				input.axis === PrinterAxis.z
					? 'z0'
					: input.axis === PrinterAxis.extruder
						? 'e'
						: PrinterAxis.extruder1 === input.axis
							? 'e1'
							: input.axis;
			return (
				reversePinLookup(
					{
						step_pin: pins[`${axisAlias}_step_pin` as keyof typeof pins],
						dir_pin: pins[`${axisAlias}_dir_pin` as keyof typeof pins],
					},
					ctx.board,
				) ?? null
			);
		}),
	flashAllConnected: mcuProcedure
		.meta({
			boardRequired: false,
			includeHost: true,
		})
		.mutation(async ({ ctx }) => {
			const config = await getLastPrinterSettings();
			const toolheadHelpers = config.toolheads.map((t) => {
				return new ToolheadHelper(t);
			});
			const connectedBoards: { board: Board; toolhead: ToolheadHelper<any> | null }[] = ctx.boards
				.flatMap((b) => {
					if (b.flashScript && b.compileScript && b.disableAutoFlash !== true) {
						if (detect(b)) {
							return { board: b, toolhead: null } as { board: Board; toolhead: ToolheadHelper<any> | null };
						}
						const toolboards = toolheadHelpers
							.map((th) => {
								if (detect(b, th)) {
									return { board: b, toolhead: th } as { board: Board; toolhead: ToolheadHelper<any> | null };
								}
								return null;
							})
							.filter(Boolean);
						return toolboards;
					}
					return null;
				})
				.filter(Boolean);
			const flashResults: {
				board: Board;
				result: 'success' | 'error';
				message: string;
			}[] = [];
			for (const b of connectedBoards) {
				try {
					const current = AutoFlashableBoard.parse(b.board);
					await compileFirmware(b.board, b.toolhead);
					let flashResult = null;
					try {
						const flashScript = path.join(
							current.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''),
							current.flashScript,
						);
						flashResult = b.toolhead
							? await runSudoScript('flash-path.sh', getBoardSerialPath(b.board, b.toolhead))
							: await runSudoScript('board-script.sh', flashScript);
					} catch (e) {
						const message = e instanceof Error ? e.message : e;
						throw new TRPCError({
							code: 'INTERNAL_SERVER_ERROR',
							message: `Could not flash firmware to ${b.board.name}: \n\n ${flashResult?.stdout ?? message}`,
							cause: e,
						});
					}
					flashResults.push({
						board: b.board,
						result: 'success',
						message: `${b.board.manufacturer} ${b.board.name} on ${b.toolhead ? ` ${b.toolhead.getToolCommand}` : ''} was successfully flashed.`,
					});
				} catch (e) {
					const message = e instanceof Error ? e.message : e;
					flashResults.push({
						board: b.board,
						result: 'error',
						message:
							typeof message === 'string'
								? message
								: `Unknown error occured while flashing ${b.board.manufacturer} ${b.board.name} on ${b.toolhead ? ` ${b.toolhead.getToolCommand}` : ''}`,
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
			return { report, flashResults };
		}),
	flashViaPath: mcuProcedure
		.input(
			z.object({
				boardPath: z.string(),
				flashPath: z.string().optional(),
				toolhead: SerializedToolheadConfiguration.optional(),
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
			await compileFirmware(ctx.board, ctx.toolhead);
			let flashResult = null;
			try {
				const flashScript = path.join(
					ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''),
					ctx.board.flashScript,
				);
				flashResult = input.flashPath
					? await runSudoScript('flash-path.sh', getBoardSerialPath(ctx.board, ctx.toolhead), input.flashPath)
					: ctx.toolhead
						? await runSudoScript('flash-path.sh', getBoardSerialPath(ctx.board, ctx.toolhead))
						: await runSudoScript('board-script.sh', flashScript);
			} catch (e) {
				const message = e instanceof Error ? e.message : e;
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not flash firmware to ${ctx.board.name}: \n\n ${flashResult?.stdout ?? message}`,
					cause: e,
				});
			}
			if (!detect(ctx.board, ctx.toolhead)) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not flash firmware to ${ctx.board.name}, device did not show up at expected path.: \n\n ${flashResult.stdout}`,
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
			try {
				await compileFirmware(ctx.board, ctx.toolhead);
			} catch (e) {
				const message = e instanceof Error ? e.message : e;
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Could not compile firmware for ${ctx.board.name}: \n\n ${message}`,
					cause: e,
				});
			}
			try {
				const flashResult = await runSudoScript('dfu-flash.sh', getBoardSerialPath(ctx.board, ctx.toolhead));
				return flashResult.stdout;
			} catch (e) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to flash device',
					cause: e,
				});
			}
		}),
});
