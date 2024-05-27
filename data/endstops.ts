import { z } from 'zod';
import { Endstop } from '@/zods/hardware';
import { PrinterAxis } from '@/zods/motion';
import { PartialToolheadConfiguration } from '@/zods/toolhead';
import { PartialPrinterConfiguration } from '@/zods/printer-configuration';

export const xEndstopOptions = (
	config?: PartialPrinterConfiguration | null,
	toolheadConfig?: (PartialToolheadConfiguration & { axis: null | PrinterAxis }) | null,
): z.infer<typeof Endstop>[] => {
	const endstops: z.infer<typeof Endstop>[] = [];
	if (toolheadConfig?.toolboard != null) {
		endstops.push({
			id: 'endstop-toolboard' as const,
			title: 'Physical Endstop',
			badge: [
				{
					color: 'sky',
					children: `${toolheadConfig.toolboard.name}${toolheadConfig.toolNumber != null && ` T${toolheadConfig.toolNumber}`}`,
				},
			],
		});
	}
	if (toolheadConfig?.axis === PrinterAxis.x) {
		endstops.push({
			id: 'endstop' as const,
			title: 'Physical Endstop',
			badge: [{ color: 'purple', children: config?.controlboard?.name ?? 'Control Board' }],
		});
		endstops.push({
			id: 'sensorless' as const,
			title: 'Sensorless Homing',
			badge: [{ color: 'purple', children: config?.controlboard?.name ?? 'Control Board' }],
		});
	}
	return endstops;
};

export const defaultXEndstop = {
	id: 'endstop' as const,
	title: 'Physical Endstop',
	badge: [{ color: 'purple' as const, children: 'Control Board' }],
};

export const yEndstopOptions = (
	config?: PartialPrinterConfiguration | null,
	toolheadConfig?: (PartialToolheadConfiguration & { axis: null | PrinterAxis }) | null,
): z.infer<typeof Endstop>[] => [
	{
		id: 'endstop' as const,
		title: 'Physical Endstop',
		badge: [{ color: 'purple', children: config?.controlboard?.name ?? 'Control Board' }],
	},
	{
		id: 'sensorless' as const,
		title: 'Sensorless Homing',
		badge: [{ color: 'purple', children: config?.controlboard?.name ?? 'Control Board' }],
	},
];
