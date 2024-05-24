'use client';

import { atom, selector, useRecoilValue, useRecoilState, waitForAll, noWait } from 'recoil';
import { z } from 'zod';
import { Fan } from '@/zods/hardware';
import {
	PartialPrinterConfiguration,
	PrinterConfiguration,
	SerializedPartialPrinterConfiguration,
	SerializedPrinterConfiguration,
} from '@/zods/printer-configuration';
import { syncEffect } from 'recoil-sync';
import { getRefineCheckerForZodSchema } from 'zod-refine';
import { useMemo } from 'react';
import {
	serializePartialToolheadConfiguration,
	serializePrinterRail,
	serializeToolheadConfiguration,
} from '@/utils/serialization';
import {
	ControlboardState,
	LoadablePrinterRailsState,
	PrinterRailsState,
	PrinterSizeState,
	PrinterState,
} from '@/recoil/printer';
import { PrinterToolheadsState } from '@/recoil/toolhead';
import { defaultControllerFan } from '@/data/fans';
import { moonrakerWriteEffect } from '@/components/sync-with-moonraker';
import { getLogger } from '@/app/_helpers/logger';

export const PerformanceModeState = atom<boolean | null | undefined>({
	key: 'PerformanceMode',
	default: false,
	effects: [
		moonrakerWriteEffect(),
		syncEffect({
			refine: getRefineCheckerForZodSchema(z.boolean().optional().nullable()),
		}),
	],
});

export const StealthchopState = atom<boolean | null | undefined>({
	key: 'Stealchop',
	default: false,
	effects: [
		moonrakerWriteEffect(),
		syncEffect({
			refine: getRefineCheckerForZodSchema(z.boolean().optional().nullable()),
		}),
	],
});

export const StandstillStealthState = atom<boolean | null | undefined>({
	key: 'StandstillStealth',
	default: false,
	effects: [
		moonrakerWriteEffect(),
		syncEffect({
			refine: getRefineCheckerForZodSchema(z.boolean().optional().nullable()),
		}),
	],
});
export const ControllerFanState = atom<z.infer<typeof Fan> | null>({
	key: 'ControllerFan',
	default: defaultControllerFan,
	effects: [
		moonrakerWriteEffect(),
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
		} satisfies {
			[key in keyof PrinterConfiguration]: NonNullable<PartialPrinterConfiguration>[key] | null | undefined;
		});
		if (printerConfig.success === false) {
			getLogger().error(printerConfig.error.flatten().fieldErrors, "Couldn't parse printer configuration");
		}
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
	const printerConfiguration = useRecoilValue(PrinterConfigurationState);
	const serializedPrinterConfiguration = useMemo(
		() => serializePartialPrinterConfiguration(printerConfiguration ?? {}),
		[printerConfiguration],
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
	const selectedPrinterRails = useRecoilValue(PrinterRailsState);
	const printerConfiguration = useRecoilValue(PrinterConfigurationState);
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
