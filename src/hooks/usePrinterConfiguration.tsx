'use client';

import { atom, selector, useRecoilValue } from 'recoil';
import { z } from 'zod';
import { Board, Toolboard } from '../zods/boards';
import { Hotend, Thermistor, Extruder, Probe, Endstop, Fan } from '../zods/hardware';
import { Printer } from '../zods/printer';
import {
	PartialPrinterConfiguration,
	PrinterConfiguration,
	SerializedPartialPrinterConfiguration,
	SerializedPrinterConfiguration,
} from '../zods/printer-configuration';
import { useRecoilState } from 'recoil';
import { trpc } from '../helpers/trpc';
import { syncEffect } from 'recoil-sync';
import { getRefineCheckerForZodSchema } from 'zod-refine';
import { defaultXEndstop, xEndstopOptions } from '../data/endstops';

export const PrinterState = atom({
	key: 'Printer',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Printer.nullable()),
		}),
	],
});

export const PrinterSizeState = atom({
	key: 'PrinterOption',
	default: undefined,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Printer.shape.sizes.unwrap().element.optional()),
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
			refine: getRefineCheckerForZodSchema(Board.nullable()),
		}),
	],
});

const _ToolboardState = atom({
	key: 'Toolboard',
	default: null,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Toolboard.nullable()),
		}),
	],
});

const PerformanceModeState = atom({
	key: 'PerformanceMode',
	default: false,
});

const StealthchopState = atom({
	key: 'Stealchop',
	default: false,
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
	};
	return SerializedPrinterConfiguration.parse(serializedConfig);
};
export const serializePartialPrinterConfiguration = (
	config: PartialPrinterConfiguration,
): SerializedPartialPrinterConfiguration => {
	const serializedConfig: SerializedPartialPrinterConfiguration = {
		printer: config?.printer?.id,
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
	const [performanceMode, setPerformanceMode] = useRecoilState(PerformanceModeState);
	const [stealtchop, setStealthchop] = useRecoilState(StealthchopState);
	const [partFan, setPartFan] = useRecoilState(PartFanState);
	const [hotendFan, setHotendFan] = useRecoilState(HotendFanState);
	const [controllerFan, setControllerFan] = useRecoilState(ControllerFanState);
	const printerConfiguration = useRecoilValue(PrinterConfigurationState);
	const serializedPrinterConfiguration = serializePartialPrinterConfiguration(printerConfiguration ?? {});

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

	const setPrinterDefaults = (printer: z.infer<typeof Printer>) => {
		const board = boards.data?.find((board) => board.serialPath === '/dev/' + printer.defaults?.board);
		const toolboard = boards.data?.find((board) => board.serialPath === '/dev/' + printer.defaults?.board);
		const hotend = hotends.data?.find((h) => h.id === printer.defaults.hotend + '.cfg');
		const extruder = extruders.data?.find((e) => e.id === printer.defaults.extruder + '.cfg');
		const thermistor = thermistors.data?.find((t) => t === hotend?.thermistor);
		const probe = probes.data?.find((p) => p.id === printer.defaults.probe + '.cfg');
		const xEndstop = xEndstops.data?.find((e) => e.id === printer.defaults.xEndstop);
		const yEndstop = yEndstops.data?.find((e) => e.id === printer.defaults.yEndstop);
		const partFan = partFanOptions.data?.[0];
		const hotendFan = hotendFanOptions.data?.[0];
		const controllerFan = controllerFanOptions.data?.[0];

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
			setPartFan(partFan);
		}

		if (hotendFan) {
			setHotendFan(hotendFan);
		}

		if (controllerFan) {
			setControllerFan(controllerFan);
		}
	};

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
		partFan,
		hotendFan,
		controllerFan,
		size: selectedPrinterOption,
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
		performanceMode,
		setPerformanceMode,
		stealtchop,
		setStealthchop,
		partFan,
		setPartFan,
		hotendFan,
		setHotendFan,
		controllerFan,
		setControllerFan,
		hotends,
		extruders,
		thermistors,
		probes,
		xEndstops,
		yEndstops,
		partFanOptions,
		hotendFanOptions,
		controllerFanOptions,
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
