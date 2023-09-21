import { z } from 'zod';
import { Fan } from '../zods/hardware';
import { PartialPrinterConfiguration } from '../zods/printer-configuration';

export const partFanOptions = (config?: z.infer<typeof PartialPrinterConfiguration> | null): z.infer<typeof Fan>[] => {
	const fans: z.infer<typeof Fan>[] = [
		{ id: '2pin' as const, title: '2-pin fan' },
		{ id: '4pin' as const, title: '4-pin fan' },
	];
	if (config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 0) {
		fans.push({ id: '4pin-dedicated' as const, title: '4-pin fan (dedicated 4-pin header)' });
	}
	return fans;
};

export const hotendFanOptions = (
	config?: z.infer<typeof PartialPrinterConfiguration> | null,
): z.infer<typeof Fan>[] => {
	const fans: z.infer<typeof Fan>[] = [
		{ id: '2pin' as const, title: '2-pin fan' },
		{ id: '4pin' as const, title: '4-pin fan' },
	];
	if (
		(config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 2) ||
		(config?.controlboard?.fourPinFanConnectorCount != null &&
			config.controlboard.fourPinFanConnectorCount > 1 &&
			config.controllerFan?.id !== '4pin-dedicated')
	) {
		fans.push({ id: '4pin-dedicated' as const, title: '4-pin fan (dedicated 4-pin header)' });
	}
	return fans;
};

export const controllerFanOptions = (
	config?: z.infer<typeof PartialPrinterConfiguration> | null,
): z.infer<typeof Fan>[] => {
	const fans: z.infer<typeof Fan>[] = [
		{ id: '2pin' as const, title: '2-pin fan' },
		{ id: '4pin' as const, title: '4-pin fan' },
	];
	if (
		(config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 2) ||
		(config?.controlboard?.fourPinFanConnectorCount != null &&
			config.controlboard.fourPinFanConnectorCount > 1 &&
			config.hotendFan?.id !== '4pin-dedicated')
	) {
		fans.push({ id: '4pin-dedicated' as const, title: '4-pin fan (dedicated 4-pin header)' });
	}
	return fans;
};
