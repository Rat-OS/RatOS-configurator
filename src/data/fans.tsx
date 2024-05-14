import { z } from 'zod';
import { Fan } from '@/zods/hardware';
import { PrinterAxis } from '@/zods/motion';
import type { PartialPrinterConfiguration } from '@/zods/printer-configuration';
import type { PartialToolheadConfiguration } from '@/zods/toolhead';
import { Strong } from '@/components/ui/typography';
import React from 'react';

export const fanHelp = (
	<>
		<p>
			<Strong className="dark:text-sky-300/70">Input Voltage PWM</Strong> is used on fans that have no dedicated pwm pin
			(2 and 3-pin fans).
		</p>
		<p>
			<Strong className="dark:text-sky-300/70">Digital PWM</Strong> is used for fans that have a dedicated PWM signal
			wire (requires a 4-pin fan).
		</p>
	</>
);

export const partFanOptions = (
	config?: PartialPrinterConfiguration | null,
	toolheadConfig?: (PartialToolheadConfiguration & { axis: null | PrinterAxis }) | null,
): z.infer<typeof Fan>[] => {
	const fans: z.infer<typeof Fan>[] = [];
	if (toolheadConfig == null || toolheadConfig?.axis === PrinterAxis.x || toolheadConfig?.axis === null) {
		fans.push({
			id: '2pin' as const,
			title: 'Input Voltage PWM',
			badge: [{ color: 'purple', children: config?.controlboard?.name ?? 'Control Board' }],
		});
		fans.push({
			id: '4pin' as const,
			title: 'Digital PWM on 2-pin port',
			badge: [{ color: 'purple', children: config?.controlboard?.name ?? 'Control Board' }],
		});
	}
	if (config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 0) {
		fans.push({
			id: '4pin-dedicated' as const,
			title: 'Digital PWM on 4-pin port',
			badge: [{ color: 'purple', children: config.controlboard.name }],
		});
	}
	if (toolheadConfig?.toolboard != null) {
		fans.push({
			id: '2pin-toolboard' as const,
			title: 'Input Voltage PWM',
			badge: [
				{
					color: 'sky',
					children: `${toolheadConfig.toolboard.name}${toolheadConfig.toolNumber != null && ` T${toolheadConfig.toolNumber}`}`,
				},
			],
		});
		fans.push({
			id: '4pin-toolboard' as const,
			title: 'Digital PWM on 2-pin port',
			badge: [
				{
					color: 'sky',
					children: `${toolheadConfig.toolboard.name}${toolheadConfig.toolNumber != null && ` T${toolheadConfig.toolNumber}`}`,
				},
			],
		});
		if (
			toolheadConfig?.toolboard.fourPinFanConnectorCount != null &&
			toolheadConfig.toolboard.fourPinFanConnectorCount > 0
		) {
			fans.push({
				id: '4pin-dedicated-toolboard' as const,
				title: 'Digital PWM on 4-pin port',
				badge: [
					{
						color: 'sky',
						children: `${toolheadConfig.toolboard.name}${toolheadConfig.toolNumber != null && ` T${toolheadConfig.toolNumber}`}`,
					},
				],
			});
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
		fans.push({
			id: '2pin' as const,
			title: 'Input Voltage PWM',
			badge: [{ color: 'purple', children: config?.controlboard?.name ?? 'Control Board' }],
		});
		fans.push({
			id: '4pin' as const,
			title: 'Digital PWM on 2-pin port',
			badge: [{ color: 'purple', children: config?.controlboard?.name ?? 'Control Board' }],
		});
	}
	if (
		(config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 2) ||
		(config?.controlboard?.fourPinFanConnectorCount != null &&
			config.controlboard.fourPinFanConnectorCount > 1 &&
			config.controllerFan?.id !== '4pin-dedicated')
	) {
		fans.push({
			id: '4pin-dedicated' as const,
			title: 'Digital PWM on 4-pin port',
			badge: [{ color: 'purple', children: config?.controlboard?.name ?? 'Control Board' }],
		});
	}
	if (toolheadConfig?.toolboard != null) {
		fans.push({
			id: '2pin-toolboard' as const,
			title: 'Input Voltage PWM',
			badge: [
				{
					color: 'sky',
					children: `${toolheadConfig.toolboard.name}${toolheadConfig.toolNumber != null && ` T${toolheadConfig.toolNumber}`}`,
				},
			],
		});
		fans.push({
			id: '4pin-toolboard' as const,
			title: 'Digital PWM on 2-pin port',
			badge: [
				{
					color: 'sky',
					children: `${toolheadConfig.toolboard.name}${toolheadConfig.toolNumber != null && ` T${toolheadConfig.toolNumber}`}`,
				},
			],
		});
		if (
			toolheadConfig?.toolboard.fourPinFanConnectorCount != null &&
			toolheadConfig.toolboard.fourPinFanConnectorCount > 1
		) {
			fans.push({
				id: '4pin-dedicated-toolboard' as const,
				title: 'Digital PWM on 4-pin port',
				badge: [
					{
						color: 'sky',
						children: `${toolheadConfig.toolboard.name}${toolheadConfig.toolNumber != null && ` T${toolheadConfig.toolNumber}`}`,
					},
				],
			});
		}
	}
	return fans;
};

export const controllerFanOptions = (
	config?: z.infer<typeof PartialPrinterConfiguration> | null,
	toolheadConfigs?: PartialToolheadConfiguration[] | null,
): z.infer<typeof Fan>[] => {
	const fans: z.infer<typeof Fan>[] = [
		{
			id: '2pin' as const,
			title: 'Input Voltage PWM',
			badge: [{ color: 'purple', children: config?.controlboard?.name ?? 'Control Board' }],
		},
		{
			id: '4pin' as const,
			title: 'Digital PWM on 2-pin port',
			badge: [{ color: 'purple', children: config?.controlboard?.name ?? 'Control Board' }],
		},
	];
	if (
		(config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 2) ||
		(config?.controlboard?.fourPinFanConnectorCount != null &&
			config.controlboard.fourPinFanConnectorCount > 1 &&
			toolheadConfigs?.some((th) => th?.hotendFan?.id !== '4pin-dedicated'))
	) {
		fans.push({
			id: '4pin-dedicated' as const,
			title: 'Digital PWM on 4-pin port',
			badge: [{ color: 'purple', children: config?.controlboard?.name ?? 'Control Board' }],
		});
	}
	fans.push({ id: 'none', title: 'No fan' });
	return fans;
};

export const defaultControllerFan = {
	id: '2pin' as const,
	title: 'Input Voltage PWM',
	badge: [{ color: 'purple' as const, children: 'Control Board' }],
};
