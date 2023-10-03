import { z } from 'zod';
import { Accelerometer, Endstop } from '../zods/hardware';
import { SerializedPartialPrinterConfiguration } from '../zods/printer-configuration';

export const xAccelerometerOptions = (
	config?: z.infer<typeof SerializedPartialPrinterConfiguration> | null,
): z.infer<typeof Accelerometer>[] => {
	const accelerometers: z.infer<typeof Accelerometer>[] = [
		{ id: 'none' as const, title: 'None' },
		{ id: 'controlboard' as const, title: 'Wired to Controlboard' },
		{ id: 'sbc' as const, title: 'Wired to Host Computer' },
	];
	if (config?.toolboard != null) {
		accelerometers.push({ id: 'toolboard' as const, title: 'Integrated on toolboard' });
	}
	return accelerometers;
};

export const yAccelerometerOptions = (
	config?: z.infer<typeof SerializedPartialPrinterConfiguration> | null,
): z.infer<typeof Accelerometer>[] => {
	const accelerometers: z.infer<typeof Accelerometer>[] = [
		{ id: 'none' as const, title: 'None' },
		{ id: 'controlboard' as const, title: 'Wired to Controlboard' },
		{ id: 'sbc' as const, title: 'Wired to Host Computer' },
	];
	if (config?.toolboard != null) {
		accelerometers.push({ id: 'toolboard' as const, title: 'Integrated on toolboard' });
	}
	return accelerometers;
};
