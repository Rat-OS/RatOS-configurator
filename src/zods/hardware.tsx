import { z } from 'zod';
import { serverSchema } from '../env/schema.mjs';
import { Steppers } from '../data/steppers';
import { Drivers } from '../data/drivers';
import { Board, Toolboard } from './boards.jsx';

export const thermistors = [
	'EPCOS 100K B57560G104F',
	'ATC Semitec 104GT-2',
	'ATC Semitec 104NT-4-R025H42G',
	'Generic 3950',
	'Honeywell 100K 135-104LAG-J01',
	'NTC 100K MGB18-104F39050L32',
	'SliceEngineering 450',
	'TDK NTCG104LH104JT1',
	'PT1000',
] as const;

let startsWithServerValidation = '';
if (process.env.RATOS_CONFIGURATION_PATH) {
	const environment = serverSchema.parse(process.env);
	startsWithServerValidation = environment.RATOS_CONFIGURATION_PATH;
}
const hardwareType = z.object({
	path: z.string().startsWith(startsWithServerValidation).endsWith('.cfg'),
	id: z.string().endsWith('.cfg'),
});

export const Thermistor = z.enum(thermistors);

export const Hotend = hardwareType.extend({
	type: z.literal('hotend'),
	title: z.string(),
	thermistor: z.enum(thermistors),
});

export const Extruder = hardwareType.extend({
	type: z.literal('extruder'),
	title: z.string(),
});

export const Probe = hardwareType.extend({
	type: z.literal('static-probe').or(z.literal('stowable-probe')),
	title: z.string(),
});

export const Endstop = z.object({
	id: z.enum(['endstop', 'endstop-toolboard', 'sensorless']),
	title: z.string(),
});

export const Accelerometer = z.object({
	id: z.enum(['toolboard', 'controlboard', 'sbc', 'none']),
	title: z.string(),
});

export const Fan = z.object({
	id: z.enum(['2pin', '4pin', '4pin-dedicated']),
	title: z.string(),
});

export enum StepperVoltage {
	'24V' = 24,
	'36V' = 36,
	'48V' = 48,
	'56V' = 56,
	'60V' = 60,
}

export const Voltages: { id: StepperVoltage; title: string }[] = [
	{ id: StepperVoltage['24V'], title: '24V' },
	{ id: StepperVoltage['36V'], title: '36V' },
	{ id: StepperVoltage['48V'], title: '48V' },
	{ id: StepperVoltage['56V'], title: '56V' },
	{ id: StepperVoltage['60V'], title: '60V' },
];

export const getSupportedVoltages = (
	board: Board | Toolboard | null,
	driver?: z.infer<typeof Driver>,
): typeof Voltages => {
	if (driver?.external) {
		return Voltages.filter((v) => driver?.voltages?.includes(v.id) || v.id === StepperVoltage['24V']);
	}
	return Voltages.filter((v) => board?.driverVoltages?.includes(v.id) || v.id === StepperVoltage['24V']).filter(
		(v) => driver?.voltages?.includes(v.id) || v.id === StepperVoltage['24V'],
	);
};

export const Voltage = z.nativeEnum(StepperVoltage);

export const Driver = z.object({
	id: z.string(),
	title: z.string(),
	type: z.enum(['TMC2209', 'TMC2226', 'TMC5160', 'TMC2130']),
	protocol: z.enum(['SPI', 'UART']),
	senseResistor: z.number().min(0),
	coolingCurrentThreshold: z.number(),
	voltages: Voltage.array(),
	maxCurrent: z.number().min(0),
	external: z.boolean().optional(),
});

const BaseStepperPreset = z.object({
	voltage: Voltage,
	run_current: z.number(),
	driver: Driver.shape.id,
	sense_resistor: z.number(),
});

export const Stepper = z.object({
	id: z.string(),
	title: z.string(),
	fullStepsPerRotation: z.number().default(200),
	maxPeakCurrent: z.number().min(0),
	presets: z
		.array(
			z.discriminatedUnion('driver', [
				BaseStepperPreset.extend({
					driver: z.enum(['TMC2130', 'TMC5160']),
					driver_MSLUT0: z.number().optional(),
					driver_MSLUT1: z.number().optional(),
					driver_MSLUT2: z.number().optional(),
					driver_MSLUT3: z.number().optional(),
					driver_MSLUT4: z.number().optional(),
					driver_MSLUT5: z.number().optional(),
					driver_MSLUT6: z.number().optional(),
					driver_MSLUT7: z.number().optional(),
					driver_W0: z.number().optional(),
					driver_W1: z.number().optional(),
					driver_W2: z.number().optional(),
					driver_W3: z.number().optional(),
					driver_X1: z.number().optional(),
					driver_X2: z.number().optional(),
					driver_X3: z.number().optional(),
					driver_START_SIN: z.number().optional(),
					driver_START_SIN90: z.number().optional(),
					driver_IHOLDDELAY: z.number().optional(),
					driver_TPOWERDOWN: z.number().optional(),
					driver_TBL: z.number().optional(),
					driver_TOFF: z.number().optional(),
					driver_HEND: z.number().optional(),
					driver_HSTRT: z.number().optional(),
					driver_PWM_AUTOSCALE: z.boolean().optional(),
					driver_PWM_FREQ: z.number().optional(),
					driver_PWM_GRAD: z.number().optional(),
					driver_PWM_AMPL: z.number().optional(),
					driver_SGT: z.number().optional(),
				}),
				BaseStepperPreset.extend({
					driver: z.enum(['TMC2209', 'TMC2226']),
					driver_TBL: z.number().optional(),
					driver_TOFF: z.number().optional(),
					driver_HEND: z.number().optional(),
					driver_HSTRT: z.number().optional(),
				}),
			]),
		)
		.optional()
		.describe('Stepper presets are tightly coupled to the driver type, sense_resistor, stepper, voltage and current.'),
});

export enum PrinterAxis {
	'x' = 'x',
	'x1' = 'x1',
	'y' = 'y',
	'y1' = 'y1',
	'z' = 'z',
	'z1' = 'z1',
	'z2' = 'z2',
	'z3' = 'z3',
	'extruder' = 'extruder',
}

export const BasePrinterRail = z.object({
	axis: z.nativeEnum(PrinterAxis).describe('Axis of the rail'),
	axisDescription: z.string().optional().describe('Description of the axis'),
	driver: Driver.describe('Stepper driver used on this axis'),
	voltage: Voltage.default(StepperVoltage['24V']).describe('Voltage of the stepper driver'),
	stepper: Stepper.describe('Stepper motor connected to this axis'),
	current: z.number().min(0),
	rotationDistance: z.number().min(0).describe('Distance in mm the axis travels per stepper rotation'),
	gearRatio: z
		.string()
		.regex(/^\d+:\d+$/)
		.optional()
		.describe('Optional gear ratio of the axis'),
	homingSpeed: z.number().min(0).default(10).describe('Axis speed during homing in mm/s'),
	performanceMode: z
		.object({
			current: z.number().min(0),
			voltage: Voltage.default(StepperVoltage['24V']).describe('Voltage of the stepper driver in performance mode'),
			homingSpeed: z.number().min(0).optional().describe('Axis speed during homing in mm/s in performance mode'),
		})
		.optional(),
	microstepping: z
		.number()
		.min(16)
		.max(256)
		.default(64)
		.describe(
			'Microstepping of the stepper driver, higher values increase resolution and lower noise but increases load on the MCU',
		),
});

export const PrinterRail = BasePrinterRail
	// Don't enforce this, warn about temperatures in the frontend instead.
	// .refine(
	// 	(data) => data.current <= data.stepper.maxPeakCurrent / 1.41,
	// 	'Current must be less than max peak current of the stepper divided by 1.41',
	// )
	.refine((data) => data.current <= data.driver.maxCurrent, 'Current must be less than max current of the driver');

export const SerializedPrinterRail = BasePrinterRail.extend({
	driver: Driver.shape.id,
	stepper: Stepper.shape.id,
});

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

export const serializePrinterRail = (rail: z.input<typeof PrinterRail>): z.infer<typeof SerializedPrinterRail> => {
	return SerializedPrinterRail.parse({
		...rail,
		driver: rail.driver.id,
		stepper: rail.stepper.id,
	});
};
