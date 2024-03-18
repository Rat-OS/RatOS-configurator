import { z } from 'zod';
import { Endstop } from '@/zods/hardware';
import { PrinterAxis } from '@/zods/motion';
import type { SerializedPartialPrinterConfiguration } from '@/zods/printer-configuration';
import type { SerializedPartialToolheadConfiguration } from '@/zods/toolhead';

export const xEndstopOptions = (
	config?: SerializedPartialPrinterConfiguration | null,
	toolheadConfig?: SerializedPartialToolheadConfiguration | null,
): z.infer<typeof Endstop>[] => {
	const endstops: z.infer<typeof Endstop>[] = [];
	if (toolheadConfig?.toolboard != null) {
		endstops.push({ id: 'endstop-toolboard' as const, title: 'Physical Endstop (toolboard)' });
	}
	if (toolheadConfig?.axis === PrinterAxis.x) {
		endstops.push({ id: 'endstop' as const, title: 'Physical Endstop' });
		endstops.push({ id: 'sensorless' as const, title: 'Sensorless Homing' });
	}
	return endstops;
};

export const defaultXEndstop = { id: 'endstop' as const, title: 'Physical Endstop' };

export const yEndstopOptions = (
	config?: SerializedPartialPrinterConfiguration | null,
	toolheadConfig?: SerializedPartialToolheadConfiguration | null,
): z.infer<typeof Endstop>[] => [
	{ id: 'endstop' as const, title: 'Physical Endstop' },
	{ id: 'sensorless' as const, title: 'Sensorless Homing' },
];
