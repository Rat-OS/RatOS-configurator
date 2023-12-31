'use client';

import { atom, selector, useRecoilValue, useRecoilState, waitForAll, noWait } from 'recoil';
import { z } from 'zod';
import { Fan } from '../zods/hardware';
import {
	PartialPrinterConfiguration,
	PrinterConfiguration,
	SerializedPartialPrinterConfiguration,
	SerializedPrinterConfiguration,
} from '../zods/printer-configuration';
import { syncEffect } from 'recoil-sync';
import { getRefineCheckerForZodSchema } from 'zod-refine';
import { useMemo, useRef } from 'react';
import {
	serializePartialToolheadConfiguration,
	serializePrinterRail,
	serializeToolheadConfiguration,
} from '../utils/serialization';
import {
	ControlboardState,
	LoadablePrinterRailsState,
	PrinterRailsState,
	PrinterSizeState,
	PrinterState,
} from '../recoil/printer';
import { PrinterToolheadsState } from '../recoil/toolhead';
import { defaultControllerFan } from '../data/fans';

export const PerformanceModeState = atom({
	key: 'PerformanceMode',
	default: false,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(z.boolean().optional().nullable()),
		}),
	],
});

export const StealthchopState = atom({
	key: 'Stealchop',
	default: false,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(z.boolean().optional().nullable()),
		}),
	],
});

export const StandstillStealthState = atom({
	key: 'StandstillStealth',
	default: false,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(z.boolean().optional().nullable()),
		}),
	],
});
export const ControllerFanState = atom({
	key: 'ControllerFan',
	default: defaultControllerFan,
	effects: [
		syncEffect({
			refine: getRefineCheckerForZodSchema(Fan.nullable()),
		}),
	],
});

export const PrinterConfigurationState = selector<z.infer<typeof PartialPrinterConfiguration> | null>({
	key: 'PrinterConfiguration',
	get: async ({ get }) => {
		const {
			printer,
			printerSize,
			performanceMode,
			stealthchop,
			standstillStealth,
			rails,
			controlboard,
			controllerFan,
			toolheads,
		} = get(
			waitForAll({
				printer: PrinterState,
				printerSize: PrinterSizeState,
				performanceMode: PerformanceModeState,
				stealthchop: StealthchopState,
				standstillStealth: StandstillStealthState,
				rails: PrinterRailsState,
				controlboard: ControlboardState,
				controllerFan: ControllerFanState,
				toolheads: PrinterToolheadsState,
			}),
		);

		const printerConfig = PartialPrinterConfiguration.safeParse({
			printer:
				printer == null
					? null
					: {
							...printer,
							defaults: {
								...printer.defaults,
								toolheads: printer?.defaults.toolheads.map((th) => serializeToolheadConfiguration(th)),
							},
					  },
			size: printerSize,
			performanceMode,
			stealthchop,
			standstillStealth,
			rails,
			controlboard,
			controllerFan,
			toolheads,
		} satisfies { [key in keyof PrinterConfiguration]: PrinterConfiguration[key] | null | undefined });
		return printerConfig.success ? printerConfig.data : null;
	},
});

export const LoadablePrinterConfigurationState = selector<z.infer<typeof PartialPrinterConfiguration>>({
	key: 'LoadablePrinterConfigurationState',
	get: async ({ get }) => {
		const loadable = get(noWait(PrinterConfigurationState));
		return {
			hasValue: () => loadable.contents,
			hasError: () => null,
			loading: () => null,
		}[loadable.state]();
	},
});

export const serializePrinterConfiguration = (config: PrinterConfiguration): SerializedPrinterConfiguration => {
	const serializedConfig: SerializedPrinterConfiguration = {
		printer: config.printer.id,
		toolheads: config.toolheads.map((toolhead) => serializeToolheadConfiguration(toolhead)),
		size: config.size,
		controlboard: config.controlboard.id,
		controllerFan: config.controllerFan.id,
		performanceMode: config.performanceMode,
		stealthchop: config.stealthchop,
		standstillStealth: config.standstillStealth,
		rails: config.rails.map((rail) => serializePrinterRail(rail)),
	};
	return SerializedPrinterConfiguration.parse(serializedConfig);
};
export const serializePartialPrinterConfiguration = (
	config: PartialPrinterConfiguration,
): SerializedPartialPrinterConfiguration => {
	const toolheads = config?.toolheads?.map((toolhead) => serializePartialToolheadConfiguration(toolhead));
	const serializedConfig: SerializedPartialPrinterConfiguration = {
		printer: config?.printer?.id,
		toolheads: toolheads,
		size: config?.size,
		controlboard: config?.controlboard?.id,
		controllerFan: config?.controllerFan?.id,
		performanceMode: config?.performanceMode,
		stealthchop: config?.stealthchop,
		standstillStealth: config?.standstillStealth,
	};
	return SerializedPartialPrinterConfiguration.parse(serializedConfig);
};

export const useSerializedPrinterConfiguration = () => {
	const printerConfiguration = useRecoilValue(LoadablePrinterConfigurationState);
	const printerConfigurationCache = useRef(printerConfiguration);
	if (printerConfiguration != null) {
		printerConfigurationCache.current = printerConfiguration;
	}
	const serializedPrinterConfiguration = useMemo(
		() => serializePartialPrinterConfiguration(printerConfigurationCache.current ?? {}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[printerConfigurationCache.current],
	);
	return serializedPrinterConfiguration;
};
export const usePrinterConfiguration = () => {
	const [selectedPrinter, setSelectedPrinter] = useRecoilState(PrinterState);
	const [selectedPrinterOption, setSelectedPrinterOption] = useRecoilState(PrinterSizeState);
	const [selectedBoard, setSelectedBoard] = useRecoilState(ControlboardState);
	const [performanceMode, setPerformanceMode] = useRecoilState(PerformanceModeState);
	const [stealthchop, setStealthchop] = useRecoilState(StealthchopState);
	const [standstillStealth, setStandstillStealth] = useRecoilState(StandstillStealthState);
	const [selectedControllerFan, setSelectedControllerFan] = useRecoilState(ControllerFanState);
	const selectedPrinterRails = useRecoilValue(LoadablePrinterRailsState);
	const printerConfiguration = useRecoilValue(LoadablePrinterConfigurationState);
	const serializedPrinterConfiguration = useSerializedPrinterConfiguration();
	const parsedPrinterConfiguration = PrinterConfiguration.safeParse(printerConfiguration);

	return {
		selectedPrinter,
		setSelectedPrinter,
		selectedPrinterOption,
		setSelectedPrinterOption,
		selectedBoard,
		setSelectedBoard,
		performanceMode,
		setPerformanceMode,
		stealthchop,
		setStealthchop,
		standstillStealth,
		setStandstillStealth,
		selectedPrinterRails,
		selectedControllerFan,
		setSelectedControllerFan,
		partialPrinterConfiguration: printerConfiguration,
		serializedPrinterConfiguration,
		parsedPrinterConfiguration,
	};
};
