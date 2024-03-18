import { z } from 'zod';
import { Fan } from '@/zods/hardware';
import { PrinterAxis } from '@/zods/motion';
import type { PartialPrinterConfiguration } from '@/zods/printer-configuration';
import type { PartialToolheadConfiguration } from '@/zods/toolhead';

export const partFanOptions = (
	config?: PartialPrinterConfiguration | null,
	toolheadConfig?: (PartialToolheadConfiguration & { axis: null | PrinterAxis }) | null,
): z.infer<typeof Fan>[] => {
	const fans: z.infer<typeof Fan>[] = [];
	if (toolheadConfig == null || toolheadConfig?.axis === PrinterAxis.x || toolheadConfig?.axis === null) {
		fans.push({ id: '2pin' as const, title: '2-pin fan' });
		fans.push({ id: '4pin' as const, title: '4-pin fan' });
	}
	if (config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 0) {
		fans.push({ id: '4pin-dedicated' as const, title: '4-pin fan (dedicated 4-pin header)' });
	}
	if (toolheadConfig?.toolboard != null) {
		fans.push({ id: '2pin-toolboard' as const, title: '2-pin toolboard fan' });
		fans.push({ id: '4pin-toolboard' as const, title: '4-pin toolboard fan' });
		if (
			toolheadConfig?.toolboard.fourPinFanConnectorCount != null &&
			toolheadConfig.toolboard.fourPinFanConnectorCount > 0
		) {
			fans.push({ id: '4pin-dedicated-toolboard' as const, title: '4-pin fan (dedicated 4-pin header on toolboard)' });
		}
	}
	return fans;
};

export const hotendFanOptions = (
	config?: z.infer<typeof PartialPrinterConfiguration> | null,
	toolheadConfig?: (PartialToolheadConfiguration & { axis: null | PrinterAxis }) | null,
): z.infer<typeof Fan>[] => {
	const fans: z.infer<typeof Fan>[] = [];
	if (toolheadConfig == null || toolheadConfig?.axis === PrinterAxis.x) {
		fans.push({ id: '2pin' as const, title: '2-pin fan' });
		fans.push({ id: '4pin' as const, title: '4-pin fan' });
	}
	if (
		(config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 2) ||
		(config?.controlboard?.fourPinFanConnectorCount != null &&
			config.controlboard.fourPinFanConnectorCount > 1 &&
			config.controllerFan?.id !== '4pin-dedicated')
	) {
		fans.push({ id: '4pin-dedicated' as const, title: '4-pin fan (dedicated 4-pin header)' });
	}
	if (toolheadConfig?.toolboard != null) {
		fans.push({ id: '2pin-toolboard' as const, title: '2-pin toolboard fan' });
		fans.push({ id: '4pin-toolboard' as const, title: '4-pin toolboard fan' });
		if (
			toolheadConfig?.toolboard.fourPinFanConnectorCount != null &&
			toolheadConfig.toolboard.fourPinFanConnectorCount > 0
		) {
			fans.push({ id: '4pin-dedicated-toolboard' as const, title: '4-pin fan (dedicated 4-pin header on toolboard)' });
		}
	}
	return fans;
};

export const controllerFanOptions = (
	config?: z.infer<typeof PartialPrinterConfiguration> | null,
	toolheadConfigs?: PartialToolheadConfiguration[] | null,
): z.infer<typeof Fan>[] => {
	const fans: z.infer<typeof Fan>[] = [
		{ id: '2pin' as const, title: '2-pin fan' },
		{ id: '4pin' as const, title: '4-pin fan' },
	];
	if (
		(config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 2) ||
		(config?.controlboard?.fourPinFanConnectorCount != null &&
			config.controlboard.fourPinFanConnectorCount > 1 &&
			toolheadConfigs?.some((th) => th?.hotendFan?.id !== '4pin-dedicated'))
	) {
		fans.push({ id: '4pin-dedicated' as const, title: '4-pin fan (dedicated 4-pin header)' });
	}
	fans.push({ id: 'none', title: 'No fan' });
	return fans;
};

export const defaultControllerFan = { id: '2pin' as const, title: '2-pin fan' };
