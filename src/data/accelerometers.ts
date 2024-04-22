import { z } from 'zod';
import { Accelerometer } from '@/zods/hardware';
import { PartialPrinterConfiguration } from '@/zods/printer-configuration';
import { PartialToolheadConfiguration } from '@/zods/toolhead';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { getLogger } from '@/server/helpers/logger';

const hasBeaconAccel = () => {
	// I really need a better way to detect this :(
	try {
		const beaconID = existsSync('/dev/beacon')
			? execSync(`udevadm info /dev/beacon | grep "ID_MODEL"`).toString().trim()
			: null;
		if (beaconID && beaconID.endsWith('RevH')) {
			return true;
		}
	} catch (e) {
		return false;
	}
	return false;
};

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
	if (hasBeaconAccel()) {
		accelerometers.push({ id: 'beacon' as const, title: 'Beacon' });
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
	if (hasBeaconAccel()) {
		accelerometers.push({ id: 'beacon' as const, title: 'Beacon' });
	}
	return accelerometers;
};
