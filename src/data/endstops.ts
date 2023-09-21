import { z } from 'zod';
import { Endstop } from '../zods/hardware';
import { SerializedPartialPrinterConfiguration } from '../zods/printer-configuration';

export const xEndstopOptions = (
	config?: z.infer<typeof SerializedPartialPrinterConfiguration> | null,
): z.infer<typeof Endstop>[] => {
	const endstops: z.infer<typeof Endstop>[] = [
		{ id: 'endstop' as const, title: 'Physical Endstop' },
		{ id: 'sensorless' as const, title: 'Sensorless Homing' },
	];
	if (config?.toolboard != null) {
		endstops.splice(1, 0, { id: 'endstop-toolboard' as const, title: 'Physical Endstop (toolboard)' });
	}
	return endstops;
};

export const defaultXEndstop = { id: 'endstop' as const, title: 'Physical Endstop' };

export const yEndstopOptions = (
	config?: z.infer<typeof SerializedPartialPrinterConfiguration> | null,
): z.infer<typeof Endstop>[] => [
	{ id: 'endstop' as const, title: 'Physical Endstop' },
	{ id: 'sensorless' as const, title: 'Sensorless Homing' },
];
