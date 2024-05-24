import { atomFamily, DefaultValue, selector, selectorFamily, noWait, waitForAll } from 'recoil';
import { ReadAtomInterface, syncEffect } from 'recoil-sync';
import { z } from 'zod';
import { getRefineCheckerForZodSchema } from 'zod-refine';
import { trpcClient } from '@/helpers/trpc';
import { BoardPath, Toolboard } from '@/zods/boards';
import { PrinterAxis } from '@/zods/motion';
import {
	BaseToolheadConfiguration,
	SerializedToolheadConfiguration,
	ToolheadConfiguration,
	ToolNumber,
} from '@/zods/toolhead';
import { PrinterState } from '@/recoil/printer';
import { moonrakerWriteEffect } from '@/components/sync-with-moonraker';
import { getLogger } from '@/app/_helpers/logger';

export const isAxisValidForTool = (axis: PrinterAxis, tool: ToolNumber) => {
	if (axis === PrinterAxis.dual_carriage && tool === 1) {
		return true;
	}
	if (axis === PrinterAxis.x) {
		return true;
	}
	return false;
};

export const PrinterToolheadState = atomFamily<
	(ToolheadConfiguration<any> & { toolNumber: ToolNumber }) | null,
	ToolNumber
>({
	key: 'PrinterToolhead',
	default: null,
	effects: (param) => [
		moonrakerWriteEffect(),
		syncEffect({
			read: async ({
				read,
			}: ReadAtomInterface): Promise<(ToolheadConfiguration<any> & { toolNumber: ToolNumber }) | null> => {
				const state = await read(PrinterToolheadState(param).key);
				if (typeof state !== 'object') {
					return null;
				}
				if (state == null) {
					return null;
				}
				const { toolNumber: tNum, ...printerToolheadState } = state as ToolheadConfiguration<any> & {
					toolNumber: ToolNumber;
				};
				if (printerToolheadState != null) {
					const parsedToolhead = ToolheadConfiguration.safeParse(printerToolheadState);
					if (parsedToolhead.success) {
						let freshToolboard = parsedToolhead.data.toolboard;
						if (freshToolboard) {
							if (freshToolboard != null) {
								const toolboardPath = z.object({ path: BoardPath }).safeParse(freshToolboard);
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
					getLogger().debug(
						'RecoilSync: failed to read toolhead!',
						PrinterToolheadState(param).key,
						parsedToolhead.error,
						printerToolheadState,
					);
					return null;
				}
				return null;
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
		getLogger().debug('LoadableToolheadState', loadable);
		return {
			hasValue: () => loadable.contents,
			hasError: () => [],
			loading: () => [],
		}[loadable.state]();
	},
});
