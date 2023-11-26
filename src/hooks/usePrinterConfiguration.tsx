'use client';

import { atom, atomFamily, DefaultValue, selector, useRecoilValue } from 'recoil';
import { z } from 'zod';
import { Board, Toolboard } from '../zods/boards';
import {
	Hotend,
	Thermistor,
	Extruder,
	Probe,
	Endstop,
	Fan,
	Accelerometer,
	PrinterRail,
	PrinterAxis,
	deserializePrinterRail,
	SerializedPrinterRail,
	serializePrinterRail,
} from '../zods/hardware';
import { Printer } from '../zods/printer';
import {
	PartialPrinterConfiguration,
	PrinterConfiguration,
	SerializedPartialPrinterConfiguration,
	SerializedPrinterConfiguration,
} from '../zods/printer-configuration';
import { useRecoilState } from 'recoil';
import { trpc, trpcClient } from '../helpers/trpc';
import { syncEffect } from 'recoil-sync';
import { getRefineCheckerForZodSchema } from 'zod-refine';
import { defaultXEndstop, xEndstopOptions } from '../data/endstops';
import { useCallback, useMemo } from 'react';
import { asType, match } from '@recoiljs/refine';
import { P } from 'pino';

export const PrinterState = atom({
	key: 'Printer',
	default: null,
	effects: [
		syncEffect({
			read: async ({ read }) => {
				const printer = await read(PrinterState.key);
				if (printer != null) {
					const printerId = z.object({ id: Printer.shape.id }).safeParse(printer);
					if (printerId.success) {
						const printerReq = await trpcClient.query('printer.printers');
						const newPrinter = printerReq.find((p) => p.id === printerId.data.id);
						return newPrinter ?? null;
					}
				}
				return null;
			},
			refine: match(getRefineCheckerForZodSchema(Printer.nullable())),
		}),
	],
});

export const PrinterSizeState = atom({
	key: 'PrinterOption',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Printer.shape.sizes.unwrap().element.nullable()),
		}),
	],
});

export const HotendState = atom({
	key: 'Hotend',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Hotend.nullable()),
		}),
	],
});

export const ThermistorState = atom({
	key: 'Thermistor',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Thermistor.nullable()),
		}),
	],
});

export const ExtruderState = atom({
	key: 'Extruder',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Extruder.nullable()),
		}),
	],
});

export const ProbeState = atom({
	key: 'Probe',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Probe.nullable()),
		}),
	],
});

export const XEndstopState = atom({
	key: 'XEndstop',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Endstop.nullable()),
		}),
	],
});

export const YEndstopState = atom({
	key: 'YEndstop',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Endstop.nullable()),
		}),
	],
});

export const ControlboardState = atom({
	key: 'Controlboard',
	default: null,
	effects: [
		syncEffect({
			read: async ({ read }) => {
				const board = await read(ControlboardState.key);
				if (board != null) {
					const boardId = z.object({ path: Board.shape.path }).safeParse(board);
					if (boardId.success) {
						const boardReq = await trpcClient.query('mcu.boards', { boardFilters: { toolboard: false } });
						const newBoard = boardReq.find((b) => b.path === boardId.data.path);
						return newBoard ?? null;
					}
				}
				return null;
			},
			refine: getRefineCheckerForZodSchema(Board.nullable()),
		}),
	],
});

const _ToolboardState = atom({
	key: 'Toolboard',
	default: null,
	effects: [
		syncEffect({
			read: async ({ read }) => {
				const board = await read(_ToolboardState.key);
				if (board != null) {
					const boardId = z.object({ path: Board.shape.path }).safeParse(board);
					if (boardId.success) {
						const boardReq = await trpcClient.query('mcu.boards', { boardFilters: { toolboard: true } });
						const newBoard = boardReq.find((b) => b.path === boardId.data.path);
						return newBoard ?? null;
					}
				}
				return null;
			},
			refine: getRefineCheckerForZodSchema(Toolboard.nullable()),
		}),
	],
});

const PerformanceModeState = atom({
	key: 'PerformanceMode',
	default: false,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(z.boolean().optional().nullable()),
		}),
	],
});

const StealthchopState = atom({
	key: 'Stealchop',
	default: false,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(z.boolean().optional().nullable()),
		}),
	],
});

const XAccelerometerState = atom({
	key: 'XAccelerometer',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Accelerometer.nullable()),
		}),
	],
});
const YAccelerometerState = atom({
	key: 'YAccelerometer',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Accelerometer.nullable()),
		}),
	],
});

const PartFanState = atom({
	key: 'PartFan',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Fan.nullable()),
		}),
	],
});

const HotendFanState = atom({
	key: 'HotendFan',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Fan.nullable()),
		}),
	],
});

const ControllerFanState = atom({
	key: 'ControllerFan',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Fan.nullable()),
		}),
	],
});

export const ToolboardState = selector<z.infer<typeof Toolboard> | null>({
	key: 'ToolboardSelector',
	set: ({ set, get }, newValue) => {
		const xEndstop = get(XEndstopState);
		if (newValue == null && xEndstop?.id === 'endstop-toolboard') {
			set(XEndstopState, defaultXEndstop);
		}
		set(_ToolboardState, newValue);
	},
	get: ({ get }) => {
		return get(_ToolboardState);
	},
});

export const PrinterRailState = atomFamily<z.infer<typeof SerializedPrinterRail> | null, PrinterAxis>({
	key: 'PrinterRail',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(SerializedPrinterRail.nullable()),
		}),
	],
});

export const PrinterRailsState = selector<z.infer<typeof PrinterRail>[]>({
	key: 'PrinterRails',
	get: ({ get }) => {
		const printer = get(PrinterState);
		const rails = printer?.defaults.rails
			.map((rail) => deserializePrinterRail(get(PrinterRailState(rail.axis)) ?? rail))
			.filter(Boolean);
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

export const PrinterConfigurationState = selector<z.infer<typeof PartialPrinterConfiguration> | null>({
	key: 'PrinterConfiguration',
	get: ({ get }) => {
		const printer = get(PrinterState) ?? undefined;
		const printerSize = get(PrinterSizeState) ?? undefined;
		const hotend = get(HotendState) ?? undefined;
		const thermistor = get(ThermistorState) ?? undefined;
		const extruder = get(ExtruderState) ?? undefined;
		const probe = get(ProbeState) ?? undefined;
		const xEndstop = get(XEndstopState) ?? undefined;
		const yEndstop = get(YEndstopState) ?? undefined;
		const controlboard = get(ControlboardState) ?? undefined;
		const toolboard = get(ToolboardState) ?? undefined;
		const partFan = get(PartFanState) ?? undefined;
		const hotendFan = get(HotendFanState) ?? undefined;
		const controllerFan = get(ControllerFanState) ?? undefined;
		const xAccelerometer = get(XAccelerometerState) ?? undefined;
		const yAccelerometer = get(YAccelerometerState) ?? undefined;
		const performanceMode = get(PerformanceModeState) ?? undefined;
		const stealthchop = get(StealthchopState) ?? undefined;
		const rails = get(PrinterRailsState);

		const printerConfig = PartialPrinterConfiguration.safeParse({
			printer,
			hotend,
			thermistor,
			extruder,
			probe,
			xEndstop,
			yEndstop,
			controlboard,
			toolboard,
			partFan,
			hotendFan,
			controllerFan,
			size: printerSize,
			xAccelerometer,
			yAccelerometer,
			performanceMode,
			stealthchop,
			rails,
		});
		if (printerConfig.success === false) {
			console.log(printerConfig.error);
		}
		return printerConfig.success ? printerConfig.data : null;
	},
});

export const serializePrinterConfiguration = (config: PrinterConfiguration): SerializedPrinterConfiguration => {
	const serializedConfig: SerializedPrinterConfiguration = {
		printer: config.printer.id,
		size: config.size,
		hotend: config.hotend.id,
		thermistor: config.thermistor,
		extruder: config.extruder.id,
		probe: config.probe?.id,
		xEndstop: config.xEndstop.id,
		yEndstop: config.yEndstop.id,
		controlboard: config.controlboard.serialPath,
		toolboard: config.toolboard?.serialPath,
		partFan: config.partFan.id,
		hotendFan: config.hotendFan.id,
		controllerFan: config.controllerFan.id,
		xAccelerometer: config.xAccelerometer?.id,
		yAccelerometer: config.yAccelerometer?.id,
		performanceMode: config.performanceMode,
		stealthchop: config.stealthchop,
		rails: config.rails.map((rail) => ({ ...rail, driver: rail.driver.id, stepper: rail.stepper.id })),
	};
	return SerializedPrinterConfiguration.parse(serializedConfig);
};
export const serializePartialPrinterConfiguration = (
	config: PartialPrinterConfiguration,
): SerializedPartialPrinterConfiguration => {
	const serializedConfig: SerializedPartialPrinterConfiguration = {
		printer: config?.printer?.id,
		size: config?.size,
		hotend: config?.hotend?.id,
		thermistor: config?.thermistor,
		extruder: config?.extruder?.id,
		probe: config?.probe?.id,
		xEndstop: config?.xEndstop?.id,
		yEndstop: config?.yEndstop?.id,
		controlboard: config?.controlboard?.serialPath,
		toolboard: config?.toolboard?.serialPath,
		partFan: config?.partFan?.id,
		hotendFan: config?.hotendFan?.id,
		controllerFan: config?.controllerFan?.id,
		xAccelerometer: config?.xAccelerometer?.id,
		yAccelerometer: config?.yAccelerometer?.id,
		performanceMode: config?.performanceMode,
		stealthchop: config?.stealthchop,
		rails: config?.rails?.map((rail) => ({ ...rail, driver: rail.driver.id, stepper: rail.stepper.id })),
	};
	return SerializedPartialPrinterConfiguration.parse(serializedConfig);
};

export const usePrinterConfiguration = () => {
	const [selectedPrinter, setSelectedPrinter] = useRecoilState(PrinterState);
	const [selectedPrinterOption, setSelectedPrinterOption] = useRecoilState(PrinterSizeState);
	const [selectedHotend, setSelectedHotend] = useRecoilState(HotendState);
	const [selectedExtruder, setSelectedExtruder] = useRecoilState(ExtruderState);
	const [selectedThermistor, setSelectedThermistor] = useRecoilState(ThermistorState);
	const [selectedProbe, setSelectedProbe] = useRecoilState(ProbeState);
	const [selectedXEndstop, setSelectedXEndstop] = useRecoilState(XEndstopState);
	const [selectedYEndstop, setSelectedYEndstop] = useRecoilState(YEndstopState);
	const [selectedBoard, setSelectedBoard] = useRecoilState(ControlboardState);
	const [selectedToolboard, setSelectedToolboard] = useRecoilState(ToolboardState);
	const [selectedXAccelerometer, setSelectedXAccelerometer] = useRecoilState(XAccelerometerState);
	const [selectedYAccelerometer, setSelectedYAccelerometer] = useRecoilState(YAccelerometerState);
	const [performanceMode, setPerformanceMode] = useRecoilState(PerformanceModeState);
	const [stealthchop, setStealthchop] = useRecoilState(StealthchopState);
	const [selectedPartFan, setSelectedPartFan] = useRecoilState(PartFanState);
	const [selectedHotendFan, setSelectedHotendFan] = useRecoilState(HotendFanState);
	const [selectedControllerFan, setSelectedControllerFan] = useRecoilState(ControllerFanState);
	const [selectedPrinterRails, setSelectedPrinterRails] = useRecoilState(PrinterRailsState);
	const printerConfiguration = useRecoilValue(PrinterConfigurationState);
	const serializedPrinterConfiguration = useMemo(
		() => serializePartialPrinterConfiguration(printerConfiguration ?? {}),
		[printerConfiguration],
	);

	const hotends = trpc.useQuery(['printer.hotends']);
	const boards = trpc.useQuery(['mcu.boards', {}]);
	const extruders = trpc.useQuery(['printer.extruders']);
	const thermistors = trpc.useQuery(['printer.thermistors']);
	const probes = trpc.useQuery(['printer.probes']);
	const xEndstops = trpc.useQuery(['printer.x-endstops', serializedPrinterConfiguration], {
		keepPreviousData: true,
	});
	const yEndstops = trpc.useQuery(['printer.y-endstops', serializedPrinterConfiguration], {
		keepPreviousData: true,
	});
	const partFanOptions = trpc.useQuery(['printer.part-fan-options', serializedPrinterConfiguration], {
		keepPreviousData: true,
	});
	const hotendFanOptions = trpc.useQuery(['printer.hotend-fan-options', serializedPrinterConfiguration], {
		keepPreviousData: true,
	});
	const controllerFanOptions = trpc.useQuery(['printer.controller-fan-options', serializedPrinterConfiguration], {
		keepPreviousData: true,
	});
	const xAccelerometerOptions = trpc.useQuery(['printer.x-accelerometer-options', serializedPrinterConfiguration], {
		keepPreviousData: true,
	});
	const yAccelerometerOptions = trpc.useQuery(['printer.y-accelerometer-options', serializedPrinterConfiguration], {
		keepPreviousData: true,
	});

	const setPrinterDefaults = useCallback(
		(printer: z.infer<typeof Printer>) => {
			const board = boards.data?.find((board) => board.serialPath === '/dev/' + printer.defaults.board);
			const toolboard = boards.data?.find((board) => board.serialPath === '/dev/' + printer.defaults.board);
			const hotend = hotends.data?.find((h) => h.id === printer.defaults.hotend + '.cfg');
			const extruder = extruders.data?.find((e) => e.id === printer.defaults.extruder + '.cfg');
			const thermistor = thermistors.data?.find((t) => t === hotend?.thermistor);
			const probe = probes.data?.find((p) => p.id === printer.defaults.probe + '.cfg');
			const xEndstop = xEndstops.data?.find((e) => e.id === printer.defaults.xEndstop);
			const yEndstop = yEndstops.data?.find((e) => e.id === printer.defaults.yEndstop);
			const partFan = partFanOptions.data?.[0];
			const hotendFan = hotendFanOptions.data?.[0];
			const controllerFan = controllerFanOptions.data?.[0];
			const xAccelerometer = xAccelerometerOptions.data?.[0];
			const yAccelerometer = yAccelerometerOptions.data?.[0];

			if (board) {
				setSelectedBoard(board);
			}

			if (toolboard) {
				const _toolboard = Toolboard.safeParse(toolboard);
				if (_toolboard.success) {
					setSelectedToolboard(_toolboard.data);
				}
			}

			if (hotend) {
				setSelectedHotend(hotend);
			}

			if (extruder) {
				setSelectedExtruder(extruder);
			}

			if (thermistor) {
				setSelectedThermistor(thermistor);
			}

			if (probe) {
				setSelectedProbe(probe);
			}

			if (xEndstop) {
				setSelectedXEndstop(xEndstop);
			}

			if (yEndstop) {
				setSelectedYEndstop(yEndstop);
			}

			if (partFan) {
				setSelectedPartFan(partFan);
			}

			if (hotendFan) {
				setSelectedHotendFan(hotendFan);
			}

			if (controllerFan) {
				setSelectedControllerFan(controllerFan);
			}
			if (xAccelerometer) {
				setSelectedXAccelerometer(xAccelerometer);
			}
			if (yAccelerometer) {
				setSelectedYAccelerometer(yAccelerometer);
			}
			setSelectedPrinterRails(
				printer.defaults.rails.filter((r) => !r.performanceMode).map((rail) => deserializePrinterRail(rail)),
			);
		},
		[
			boards.data,
			hotends.data,
			extruders.data,
			thermistors.data,
			probes.data,
			xEndstops.data,
			yEndstops.data,
			partFanOptions.data,
			hotendFanOptions.data,
			controllerFanOptions.data,
			xAccelerometerOptions.data,
			yAccelerometerOptions.data,
			setSelectedPrinterRails,
			setSelectedBoard,
			setSelectedToolboard,
			setSelectedHotend,
			setSelectedExtruder,
			setSelectedThermistor,
			setSelectedProbe,
			setSelectedXEndstop,
			setSelectedYEndstop,
			setSelectedPartFan,
			setSelectedHotendFan,
			setSelectedControllerFan,
			setSelectedXAccelerometer,
			setSelectedYAccelerometer,
		],
	);

	const parsedPrinterConfiguration = PrinterConfiguration.safeParse({
		controlboard: selectedBoard,
		toolboard: selectedToolboard,
		printer: selectedPrinter,
		hotend: selectedHotend,
		extruder: selectedExtruder,
		thermistor: selectedThermistor,
		probe: selectedProbe,
		xEndstop: selectedXEndstop,
		yEndstop: selectedYEndstop,
		partFan: selectedPartFan,
		hotendFan: selectedHotendFan,
		controllerFan: selectedControllerFan,
		size: selectedPrinterOption,
		xAccelerometer: selectedXAccelerometer,
		yAccelerometer: selectedYAccelerometer,
		performanceMode,
		stealthchop,
		rails: selectedPrinterRails,
	});

	const queryErrors: string[] = [];
	if (hotends.error) {
		queryErrors.push(hotends.error.message);
	}
	if (extruders.error) {
		queryErrors.push(extruders.error.message);
	}
	if (thermistors.error) {
		queryErrors.push(thermistors.error.message);
	}
	if (probes.error) {
		queryErrors.push(probes.error.message);
	}
	if (xEndstops.error) {
		queryErrors.push(xEndstops.error.message);
	}
	if (yEndstops.error) {
		queryErrors.push(yEndstops.error.message);
	}
	if (boards.error) {
		queryErrors.push(boards.error.message);
	}
	return {
		queryErrors,
		selectedPrinter,
		setSelectedPrinter,
		selectedPrinterOption,
		setSelectedPrinterOption,
		selectedHotend,
		setSelectedHotend,
		selectedExtruder,
		setSelectedExtruder,
		selectedThermistor,
		setSelectedThermistor,
		selectedProbe,
		setSelectedProbe,
		selectedXEndstop,
		setSelectedXEndstop,
		selectedYEndstop,
		setSelectedYEndstop,
		selectedBoard,
		setSelectedBoard,
		selectedToolboard,
		setSelectedToolboard,
		selectedXAccelerometer,
		setSelectedXAccelerometer,
		selectedYAccelerometer,
		setSelectedYAccelerometer,
		performanceMode,
		setPerformanceMode,
		stealtchop: stealthchop,
		setStealthchop,
		selectedPrinterRails,
		setSelectedPrinterRails,
		selectedPartFan,
		setSelectedPartFan,
		selectedHotendFan,
		setSelectedHotendFan,
		selectedControllerFan,
		setSelectedControllerFan,
		hotends,
		extruders,
		thermistors,
		probes,
		xEndstops,
		yEndstops,
		partFanOptions,
		hotendFanOptions,
		controllerFanOptions,
		xAccelerometerOptions,
		yAccelerometerOptions,
		setPrinterDefaults,
		partialPrinterConfiguration: printerConfiguration,
		parsedPrinterConfiguration,
		isReady:
			hotends.data != null &&
			extruders.data != null &&
			thermistors.data != null &&
			probes.data != null &&
			xEndstops.data != null &&
			yEndstops.data != null &&
			boards.data != null,
	};
};
