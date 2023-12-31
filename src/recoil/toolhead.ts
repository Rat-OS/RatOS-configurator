import { atomFamily, DefaultValue, selector, selectorFamily, noWait, waitForAll } from 'recoil';
import { ReadAtomInterface, syncEffect } from 'recoil-sync';
import { z } from 'zod';
import { getRefineCheckerForZodSchema } from 'zod-refine';
import { trpcClient } from '../helpers/trpc';
import { Toolboard } from '../zods/boards';
import { PrinterAxis } from '../zods/motion';
import {
	BaseToolheadConfiguration,
	SerializedToolheadConfiguration,
	ToolheadConfiguration,
	ToolNumber,
} from '../zods/toolhead';
import { PrinterState } from './printer';

export const isAxisValidForTool = (axis: PrinterAxis, tool: ToolNumber) => {
	if (axis === PrinterAxis.dual_carriage && tool === 1) {
		return true;
	}
	if (axis === PrinterAxis.x) {
		return true;
	}
	return false;
};

const readPrinterToolheadAtom =
	(param: ToolNumber) =>
	async ({ read }: ReadAtomInterface): Promise<(ToolheadConfiguration<any> & { toolNumber: ToolNumber }) | null> => {
		const printerToolheadState = await read(PrinterToolheadState(param).key);
		if (printerToolheadState != null) {
			const parsedToolhead = ToolheadConfiguration.safeParse(printerToolheadState);
			if (parsedToolhead.success) {
				let freshToolboard = parsedToolhead.data.toolboard;
				if (freshToolboard) {
					if (freshToolboard != null) {
						const toolboardPath = z.object({ path: Toolboard.shape.path }).safeParse(freshToolboard);
						if (toolboardPath.success) {
							const boardReq = await trpcClient.mcu.boards.query({ boardFilters: { toolboard: true } });
							const maybeToolboard = boardReq.find((b) => b.path === toolboardPath.data.path);
							if (maybeToolboard) {
								freshToolboard = Toolboard.parse(maybeToolboard);
							}
						}
					}
				}
				return { ...parsedToolhead.data, toolboard: freshToolboard, toolNumber: param };
			}
			return null;
		}
		return null;
	};

export const PrinterToolheadState = atomFamily<
	(ToolheadConfiguration<any> & { toolNumber: ToolNumber }) | null,
	ToolNumber
>({
	key: 'PrinterToolhead',
	default: null,
	effects: (param) => [
		(params) => {
			params.onSet((newValue) => {
				console.log('Atom Effect: new toolhead value was set', PrinterToolheadState(param).key, newValue);
			});
		},
		syncEffect({
			read: async ({
				read,
			}: ReadAtomInterface): Promise<(ToolheadConfiguration<any> & { toolNumber: ToolNumber }) | null> => {
				console.log('RecoilSync: reading toolhead!', PrinterToolheadState(param).key);
				const printerToolheadState = await read(PrinterToolheadState(param).key);
				if (printerToolheadState != null) {
					const parsedToolhead = ToolheadConfiguration.safeParse(printerToolheadState);
					if (parsedToolhead.success) {
						let freshToolboard = parsedToolhead.data.toolboard;
						if (freshToolboard) {
							if (freshToolboard != null) {
								const toolboardPath = z.object({ path: Toolboard.shape.path }).safeParse(freshToolboard);
								if (toolboardPath.success) {
									const boardReq = await trpcClient.mcu.boards.query({ boardFilters: { toolboard: true } });
									const maybeToolboard = boardReq.find((b) => b.path === toolboardPath.data.path);
									if (maybeToolboard) {
										freshToolboard = Toolboard.parse(maybeToolboard);
									}
								}
							}
						}
						return { ...parsedToolhead.data, toolboard: freshToolboard, toolNumber: param };
					}
					return null;
				}
				return null;
			},
			write: async ({ write, reset }, newValue) => {
				console.log('RecoilSync: writing toolhead!', newValue, PrinterToolheadState(param).key);
				if (newValue instanceof DefaultValue) {
					reset(PrinterToolheadState(param).key);
				} else {
					write(PrinterToolheadState(param).key, newValue);
				}
			},
			refine: getRefineCheckerForZodSchema(BaseToolheadConfiguration.extend({ toolNumber: ToolNumber }).nullable()),
		}),
	],
});

export const DeserializeToolheadQuery = selectorFamily<
	(ToolheadConfiguration<any> & { toolNumber: ToolNumber }) | null,
	{ th: SerializedToolheadConfiguration; boardId: string; toolNumber: ToolNumber }
>({
	key: 'DeserializeToolheadQuery',
	get:
		(param) =>
		async ({ get }) => {
			const parsedToolhead = ToolheadConfiguration.safeParse(
				await trpcClient.printer.deserializeToolheadConfiguration.query({
					config: param.th,
					printerConfig: { controlboard: param.boardId },
				}),
			);
			if (!parsedToolhead.success) {
				return null;
			}
			return { ...parsedToolhead.data, toolNumber: param.toolNumber };
		},
});

export const PrinterToolheadsState = selector<(ToolheadConfiguration<any> & { toolNumber: ToolNumber })[]>({
	key: 'PrinterToolheadsState',
	get: ({ get }) => {
		const printer = get(PrinterState);
		if (printer == null) {
			return [];
		}
		return get(waitForAll(printer.defaults.toolheads.map((th, i) => PrinterToolheadState(i as ToolNumber)))).filter(
			Boolean,
		);
	},
	set: ({ set, reset }, newValue) => {
		if (newValue instanceof DefaultValue) {
			throw new Error('ToolheadsState cannot be reset, please reset the individual ToolheadState instead');
		}
		newValue.forEach((th) => {
			set(PrinterToolheadState(th.toolNumber), { ...th, toolNumber: th.toolNumber });
		});
	},
});

export const LoadablePrinterToolheadsState = selector<(ToolheadConfiguration<any> & { toolNumber: ToolNumber })[]>({
	key: 'LoadablePrinterToolheadsState',
	get: async ({ get }) => {
		const loadable = get(noWait(PrinterToolheadsState));
		return {
			hasValue: () => loadable.contents,
			hasError: () => [],
			loading: () => [],
		}[loadable.state]();
	},
});
