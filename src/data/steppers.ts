import { z } from 'zod';
import { Drivers } from '@/data/drivers';
import { Stepper, StepperVoltage } from '@/zods/motion';

export const findPreset = (
	stepper: (typeof Steppers)[number],
	driver: (typeof Drivers)[number],
	voltage: StepperVoltage,
	current?: number,
	performanceMode?: boolean | null,
) => {
	return stepper.presets
		?.slice()
		.sort((a, b) => (performanceMode ? b.run_current - a.run_current : a.run_current - b.run_current))
		.find(
			(p) =>
				p.driver === driver.type &&
				p.voltage === voltage &&
				(driver.type === 'TMC2240' || ('sense_resistor' in p && p.sense_resistor === driver.senseResistor)) &&
				(current == null || p.run_current === current),
		);
};

export const Steppers = z.array(Stepper).parse([
	{
		id: 'generic',
		title: 'Generic Stepper',
		maxPeakCurrent: 2.8,
	},
	{
		id: 'BONDTECH-42H025H-0704-002',
		title: 'Bondtech LGX Stepper',
		maxPeakCurrent: 0.7,
	},
	{
		id: 'LDO-42STH48-2504AC',
		title: 'LDO-42STH48-2504AC',
		maxPeakCurrent: 2.5,
		presets: [
			{
				run_current: 1.1,
				voltage: 24,
				driver: 'TMC2209',
				sense_resistor: 0.11,
				driver_TBL: 1,
				driver_TOFF: 3,
				driver_HEND: 0,
				driver_HSTRT: 0,
			},
			{
				run_current: 1.6,
				voltage: 24,
				driver: 'TMC2209',
				sense_resistor: 0.11,
				driver_TBL: 2,
				driver_TOFF: 3,
				driver_HEND: 0,
				driver_HSTRT: 6,
			},
			{
				run_current: 1.6,
				voltage: 24,
				driver: 'TMC5160',
				sense_resistor: 0.075,
				driver_TBL: 2,
				driver_TOFF: 3,
				driver_HEND: 0,
				driver_HSTRT: 6,
			},
			{
				run_current: 1.768,
				voltage: 48,
				driver: 'TMC5160',
				sense_resistor: 0.075,
				driver_TBL: 0,
				driver_TOFF: 4,
				driver_HEND: 0,
				driver_HSTRT: 4,
			},
		],
	},
	{
		id: 'LDO-42STH40-1684AC',
		title: 'LDO-42STH40-1684AC',
		maxPeakCurrent: 1.68,
		presets: [
			{
				run_current: 0.4,
				voltage: 24,
				driver: 'TMC2130',
				sense_resistor: 0.22,
				driver_IHOLDDELAY: 8,
				driver_TPOWERDOWN: 0,
				driver_TBL: 2,
				driver_TOFF: 3,
				driver_HEND: 1,
				driver_HSTRT: 5,
				driver_PWM_FREQ: 2,
				driver_PWM_GRAD: 2,
				driver_PWM_AMPL: 230,
				driver_PWM_AUTOSCALE: true,
				driver_SGT: 5,
			},
			{
				run_current: 0.52,
				voltage: 24,
				driver: 'TMC2130',
				sense_resistor: 0.22,
				driver_IHOLDDELAY: 8,
				driver_TPOWERDOWN: 0,
				driver_TBL: 2,
				driver_TOFF: 3,
				driver_HEND: 1,
				driver_HSTRT: 5,
				driver_PWM_FREQ: 2,
				driver_PWM_GRAD: 4,
				driver_PWM_AMPL: 240,
				driver_PWM_AUTOSCALE: true,
				driver_SGT: 3,
			},
			{
				run_current: 0.8,
				voltage: 24,
				driver: 'TMC2209',
				sense_resistor: 0.11,
				driver_TBL: 1,
				driver_TOFF: 3,
				driver_HEND: 3,
				driver_HSTRT: 0,
			},
			{
				run_current: 1.188,
				voltage: 24,
				driver: 'TMC2209',
				sense_resistor: 0.11,
				driver_TBL: 0,
				driver_TOFF: 3,
				driver_HEND: 0,
				driver_HSTRT: 0,
			},
		],
	},
	{
		id: 'LDO-42STH48-2004MAH',
		title: 'LDO-42STH48-2004MAH',
		maxPeakCurrent: 2.0,
		fullStepsPerRotation: 400,
	},
	{
		id: 'LDO-42STH48-2004AC',
		title: 'LDO-42STH48-2004AC',
		maxPeakCurrent: 2.0,
	},
	{
		id: 'LDO-42STH25-1404MAC',
		title: 'LDO-42STH25-1404MAC',
		maxPeakCurrent: 1.4,
		fullStepsPerRotation: 400,
		presets: [
			{
				voltage: 24,
				driver: 'TMC2209',
				sense_resistor: 0.11,
				run_current: 0.85,
				driver_TBL: 1,
				driver_TOFF: 3,
				driver_HEND: 2,
				driver_HSTRT: 0,
			},
		],
	},
	{
		id: 'LDO-42STH25-1004CL200E',
		title: 'LDO-42STH25-1004CL200E',
		maxPeakCurrent: 1.0,
	},
	{
		id: 'LDO-36STH20-1004AHG',
		title: 'LDO-36STH20-1004AHG',
		maxPeakCurrent: 1.0,
		presets: [
			{
				voltage: 24,
				driver: 'TMC2209',
				sense_resistor: 0.11,
				run_current: 0.707,
				driver_TBL: 0,
				driver_HEND: 6,
				driver_HSTRT: 7,
				driver_TOFF: 4,
			},
			// {
			// 	voltage: 24,
			// 	driver: 'TMC2209',
			// 	sense_resistor: 0.11,
			// 	run_current: 0.85,
			// 	driver_TBL: 0,
			// 	driver_HEND: 6,
			// 	driver_HSTRT: 7,
			// 	driver_TOFF: 4,
			// },
		],
	},
	{
		id: 'LDO-36STH17-1004AHG',
		title: 'LDO-36STH17-1004AHG',
		maxPeakCurrent: 1.0,
	},
	{
		id: 'LDO-35STH48-1684AH',
		title: 'LDO-35STH48-1684AH',
		maxPeakCurrent: 1.68,
	},
] satisfies z.input<typeof Stepper>[]);
