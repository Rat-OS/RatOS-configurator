import { z } from 'zod';
import { Accelerometer, Endstop } from '../zods/hardware';
import { PartialPrinterConfiguration } from '../zods/printer-configuration';

export const xAccelerometerOptions = (
	config?: z.infer<typeof PartialPrinterConfiguration> | null,
): z.infer<typeof Accelerometer>[] => {
	const accelerometers: z.infer<typeof Accelerometer>[] = [
		{ id: 'none' as const, title: 'None' },
		{ id: 'sbc' as const, title: 'Wired to Host Computer' },
	];
	if (config?.controlboard?.ADXL345SPI != null) {
		accelerometers.push({ id: 'controlboard' as const, title: 'Wired to Controlboard' });
	}
	if (config?.toolboard != null && config.toolboard.ADXL345SPI != null) {
		accelerometers.push({ id: 'toolboard' as const, title: 'Integrated on toolboard' });
	}
	return accelerometers;
};

export const yAccelerometerOptions = (
	config?: z.infer<typeof PartialPrinterConfiguration> | null,
): z.infer<typeof Accelerometer>[] => {
	const accelerometers: z.infer<typeof Accelerometer>[] = [
		{ id: 'none' as const, title: 'None' },
		{ id: 'sbc' as const, title: 'Wired to Host Computer' },
	];
	if (config?.controlboard?.ADXL345SPI != null) {
		accelerometers.push({ id: 'controlboard' as const, title: 'Wired to Controlboard' });
	}
	if (config?.toolboard != null && config.toolboard.ADXL345SPI != null) {
		accelerometers.push({ id: 'toolboard' as const, title: 'Integrated on toolboard' });
	}
	return accelerometers;
};
