import { z } from 'zod';
import { Accelerometer } from '@/zods/hardware';
import { PartialPrinterConfiguration } from '@/zods/printer-configuration';
import { PartialToolheadConfiguration } from '@/zods/toolhead';

export const xAccelerometerOptions = (
	config?: z.infer<typeof PartialPrinterConfiguration> | null,
	toolheadConfig?: PartialToolheadConfiguration | null,
): z.infer<typeof Accelerometer>[] => {
	const accelerometers: z.infer<typeof Accelerometer>[] = [
		{ id: 'none' as const, title: 'None' },
		{ id: 'sbc' as const, title: 'Wired to Host Computer' },
	];
	if (config?.controlboard?.ADXL345SPI != null || config?.controlboard?.LIS2DW != null) {
		accelerometers.push({ id: 'controlboard' as const, title: 'Wired to Controlboard' });
	}
	if (
		toolheadConfig?.toolboard != null &&
		(toolheadConfig.toolboard.ADXL345SPI != null || toolheadConfig.toolboard.LIS2DW != null)
	) {
		accelerometers.push({ id: 'toolboard' as const, title: 'Integrated on toolboard' });
	}
	return accelerometers;
};

export const yAccelerometerOptions = (
	config?: z.infer<typeof PartialPrinterConfiguration> | null,
	toolheadConfig?: PartialToolheadConfiguration | null,
): z.infer<typeof Accelerometer>[] => {
	const accelerometers: z.infer<typeof Accelerometer>[] = [
		{ id: 'none' as const, title: 'None' },
		{ id: 'sbc' as const, title: 'Wired to Host Computer' },
	];
	if (config?.controlboard?.ADXL345SPI != null || config?.controlboard?.LIS2DW != null) {
		accelerometers.push({ id: 'controlboard' as const, title: 'Wired to Controlboard' });
	}
	if (
		toolheadConfig?.toolboard != null &&
		(toolheadConfig.toolboard.ADXL345SPI != null || toolheadConfig.toolboard.LIS2DW != null)
	) {
		accelerometers.push({ id: 'toolboard' as const, title: 'Integrated on toolboard' });
	}
	return accelerometers;
};
