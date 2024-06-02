import { ReadAtomInterface, syncEffect } from 'recoil-sync';
import { PrinterDefinitionWithResolvedToolheads } from '@/zods/printer';
import { trpcClient } from '@/helpers/trpc';
import { atomFamily, selector, DefaultValue, atom, noWait } from 'recoil';
import { z } from 'zod';
import { getRefineCheckerForZodSchema } from 'zod-refine';
import { deserializePrinterRail, serializePrinterRail } from '@/utils/serialization';
import { SerializedPrinterRail, PrinterAxis, PrinterRail } from '@/zods/motion';
import { Board, BoardID, BoardPath } from '@/zods/boards';
import { moonrakerWriteEffect } from '@/components/sync-with-moonraker';
import { PrinterSize } from '@/zods/printer-configuration';

let cachedPrinters: { [id: string]: z.infer<typeof PrinterDefinitionWithResolvedToolheads> } = {};

// SyncEffect read methods
export const readPrinterAtom = async ({
	read,
}: ReadAtomInterface): Promise<z.infer<typeof PrinterDefinitionWithResolvedToolheads> | null> => {
	const printer = await read(PrinterState.key);
	if (printer != null) {
		let printerId = z.object({ id: PrinterDefinitionWithResolvedToolheads.shape.id }).safeParse(printer);
		if (!printerId.success) {
			printerId = z.object({ id: PrinterDefinitionWithResolvedToolheads.shape.id }).safeParse({ id: printer });
		}
		if (printerId.success) {
			let newPrinter: null | PrinterDefinitionWithResolvedToolheads = cachedPrinters[printerId.data.id];
			if (newPrinter == null) {
				newPrinter = await trpcClient.printer.printer.query(printerId.data.id, {});
				if (newPrinter) {
					cachedPrinters[printerId.data.id] = newPrinter;
				}
			}
			return newPrinter ?? null;
		}
	}
	return null;
};

export const readPrinterRailAtom =
	(param: PrinterAxis) =>
	async ({ read }: ReadAtomInterface): Promise<z.infer<typeof SerializedPrinterRail> | null> => {
		const printerRailState = await read(PrinterRailState(param).key);
		if (printerRailState != null) {
			const parsedRail = SerializedPrinterRail.safeParse(printerRailState);
			if (parsedRail.success) {
				return parsedRail.data;
			}
			const printer = await readPrinterAtom({ read });
			const printerRailDefault = printer?.defaults.rails.find((r) => r.axis === param);
			if (printerRailDefault != null) {
				const parsedRailRepaired = SerializedPrinterRail.safeParse({ ...printerRailDefault, ...printerRailState });
				if (parsedRailRepaired.success) {
					return parsedRailRepaired.data;
				}
			}
		}
		return null;
	};

export const PrinterState = atom<z.infer<typeof PrinterDefinitionWithResolvedToolheads> | null>({
	key: 'Printer',
	default: null,
	effects: [
		moonrakerWriteEffect(),
		syncEffect({
			read: readPrinterAtom,
			write: async ({ write }, newValue) => {
				await new Promise((resolve) => {
					if (newValue instanceof DefaultValue) {
						write(PrinterState.key, null);
					} else {
						write(PrinterState.key, newValue ?? null);
					}
					setTimeout(() => {}, 500);
				});
			},
			refine: getRefineCheckerForZodSchema(PrinterDefinitionWithResolvedToolheads.nullable()),
		}),
	],
});

export const LoadablePrinterState = selector<z.infer<typeof PrinterDefinitionWithResolvedToolheads> | null>({
	key: 'LoadablePrinterState',
	get: async ({ get }) => {
		const loadable = get(noWait(PrinterState));
		return {
			hasValue: () => loadable.contents,
			hasError: () => [],
			loading: () => [],
		}[loadable.state]();
	},
});

export const PrinterSizeState = atom<z.output<typeof PrinterSize> | null>({
	key: 'PrinterOption',
	default: null,
	effects: [
		moonrakerWriteEffect(),
		syncEffect({
			refine: getRefineCheckerForZodSchema(PrinterSize.nullable()),
		}),
	],
});

export const ControlboardState = atom<Board | null>({
	key: 'Controlboard',
	default: null,
	effects: [
		moonrakerWriteEffect(),
		syncEffect({
			read: async ({ read }) => {
				const board = await read(ControlboardState.key);
				if (board != null) {
					const boardId = z.object({ id: BoardID }).safeParse(board);
					if (boardId.success) {
						const boardReq = await trpcClient.mcu.boards.query({ boardFilters: { toolboard: false } });
						const newBoard = boardReq.find((b) => b.id === boardId.data.id);
						return newBoard ?? null;
					}
				}
				return null;
			},
			refine: getRefineCheckerForZodSchema(Board.nullable()),
		}),
	],
});

export const PrinterRailState = atomFamily<z.infer<typeof SerializedPrinterRail> | null, PrinterAxis>({
	key: 'PrinterRail',
	default: null,
	effects: (param) => [
		moonrakerWriteEffect(),
		syncEffect({
			read: readPrinterRailAtom(param),
			refine: getRefineCheckerForZodSchema(SerializedPrinterRail.nullable()),
		}),
	],
});

export const PrinterRailsState = selector<z.infer<typeof PrinterRail>[]>({
	key: 'PrinterRails',
	get: ({ get }) => {
		const printer = get(PrinterState);
		const rails = printer?.defaults.rails.map((rail) => {
			const railState = get(PrinterRailState(rail.axis));
			return deserializePrinterRail(railState ?? rail);
		});
		return rails ?? [];
	},
	set: ({ set }, newValue) => {
		if (newValue instanceof DefaultValue) {
			Object.values(PrinterAxis).forEach((axis) => {
				set(PrinterRailState(axis), null);
			});
			return;
		}
		newValue.forEach((rail) => {
			set(PrinterRailState(rail.axis), serializePrinterRail(rail));
		});
	},
});

export const LoadablePrinterRailsState = selector<z.infer<typeof PrinterRail>[]>({
	key: 'LoadablePrinterRailsState',
	get: async ({ get }) => {
		const loadable = get(noWait(PrinterRailsState));
		return {
			hasValue: () => loadable.contents,
			hasError: () => [],
			loading: () => [],
		}[loadable.state]();
	},
});
