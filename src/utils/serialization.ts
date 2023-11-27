import type { z } from 'zod';
import { Drivers } from '../data/drivers';
import {
	BasePrinterRail,
	Driver,
	PrinterRail,
	PrinterRailDefinition,
	SerializedPrinterRail,
	SerializedPrinterRailDefinition,
	Stepper,
} from '../zods/motion';
import { Steppers } from '../data/steppers';

export const deserializeDriver = (driverId: z.input<typeof Driver.shape.id>): z.infer<typeof Driver> | null => {
	return Drivers.find((d) => d.id === driverId) ?? null;
};

export const deserializeStepper = (stepperId: z.input<typeof Stepper.shape.id>): z.infer<typeof Stepper> | null => {
	return Steppers.find((d) => d.id === stepperId) ?? null;
};

export const deserializePrinterRail = (rail: z.input<typeof SerializedPrinterRail>): z.infer<typeof PrinterRail> => {
	const stepper = deserializeStepper(rail.stepper);
	const driver = deserializeDriver(rail.driver);
	if (stepper == null) {
		throw new Error(`Stepper ${rail.stepper} not found in database`);
	}
	if (driver == null) {
		throw new Error(`Driver ${rail.driver} not found in database`);
	}
	return BasePrinterRail.parse({
		...rail,
		stepper,
		driver,
	});
};

export const deserializePrinterRailDefinition = (
	rail: z.input<typeof SerializedPrinterRailDefinition>,
): z.infer<typeof PrinterRailDefinition> => {
	const stepper = deserializeStepper(rail.stepper);
	const driver = deserializeDriver(rail.driver);
	if (stepper == null) {
		throw new Error(`Stepper ${rail.stepper} not found in database`);
	}
	if (driver == null) {
		throw new Error(`Driver ${rail.driver} not found in database`);
	}
	return PrinterRailDefinition.parse({
		...rail,
		stepper,
		driver,
	});
};

export const serializePrinterRail = (rail: z.input<typeof PrinterRail>): z.infer<typeof SerializedPrinterRail> => {
	return SerializedPrinterRail.parse({
		...rail,
		driver: rail.driver.id,
		stepper: rail.stepper.id,
	});
};
