import { Dropdown } from '../forms/dropdown';
import {
	BasePrinterRail,
	deserializeDriver,
	getSupportedVoltages,
	serializePrinterRail,
	Voltages,
} from '../../zods/hardware';
import { Board, Toolboard } from '../../zods/boards';
import React, { useEffect, useMemo, useState } from 'react';
import { Drivers } from '../../data/drivers';
import { Steppers } from '../../data/steppers';
import { BadgeProps } from '../common/badge';
import { TextInput } from '../forms/text-input';
import { Banner } from '../common/banner';
import { BoltIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { useSetRecoilState } from 'recoil';
import { PrinterRailState } from '../../hooks/usePrinterConfiguration';
import { FireIcon } from '@heroicons/react/24/solid';

interface PrinterRailSettingsProps {
	selectedBoard: Board | Toolboard | null;
	printerRail: Zod.infer<typeof BasePrinterRail>;
	performanceMode?: boolean | null;
}

const findPreset = (
	stepper: (typeof Steppers)[number],
	driver: (typeof Drivers)[number],
	voltage: (typeof Voltages)[number],
	current?: number,
	performanceMode?: boolean | null,
) => {
	return stepper.presets
		?.slice()
		.sort((a, b) => (performanceMode ? b.run_current - a.run_current : a.run_current - b.run_current))
		.find(
			(p) =>
				p.driver === driver.type &&
				p.voltage === voltage.id &&
				p.sense_resistor === driver.senseResistor &&
				(current == null || p.run_current === current),
		);
};

export const PrinterRailSettings: React.FC<PrinterRailSettingsProps> = (props) => {
	const setPrinterRail = useSetRecoilState(PrinterRailState(props.printerRail.axis));
	const integratedDriver =
		props.selectedBoard?.integratedDrivers && props.selectedBoard.integratedDrivers[props.printerRail.axis];
	const [driver, setDriver] = useState(
		integratedDriver != null
			? deserializeDriver(integratedDriver) ?? props.printerRail.driver
			: props.printerRail.driver,
	);
	const [stepper, setStepper] = useState(props.printerRail.stepper);
	const supportedVoltages = getSupportedVoltages(props.selectedBoard, driver).map((v) => {
		return {
			...v,
			badge:
				findPreset(stepper, driver, v, undefined, props.performanceMode) != null
					? ({
							children: 'Tuned Preset',
							color: 'sky',
					  } satisfies BadgeProps)
					: undefined,
		};
	});
	const [voltage, setVoltage] = useState(
		supportedVoltages.find((v) => v.id === props.printerRail.voltage) ?? supportedVoltages[0],
	);
	const preset = useMemo(
		() => findPreset(stepper, driver, voltage, undefined, props.performanceMode),
		[stepper, driver, voltage, props.performanceMode],
	);
	const [current, setCurrent] = useState(props.printerRail.current);

	const supportedDrivers = Drivers.map((d) => {
		return {
			...d,
			badge:
				findPreset(stepper, d, voltage, undefined, props.performanceMode) != null
					? ({
							children: 'Tuned Preset',
							color: 'sky',
					  } satisfies BadgeProps)
					: undefined,
		};
	});
	const steppers = Steppers.map((s) => {
		return {
			...s,
			badge:
				findPreset(s, driver, voltage, undefined, props.performanceMode) != null
					? ({
							children: 'Tuned Preset',
							color: 'sky',
					  } satisfies BadgeProps)
					: undefined,
		};
	});

	useEffect(() => {
		if (preset) {
			setCurrent(preset.run_current);
		}
	}, [preset]);

	useEffect(() => {
		const currentVoltage = supportedVoltages.find((sv) => sv.id === voltage.id);
		if (!currentVoltage) {
			setVoltage(
				preset
					? supportedVoltages.find((sv) => sv.id === preset.voltage) ?? supportedVoltages[0]
					: supportedVoltages[0],
			);
			if (preset) {
				setCurrent(preset.run_current);
			}
		}
	}, [supportedVoltages, voltage, preset]);

	useEffect(() => {
		setPrinterRail(
			serializePrinterRail({
				axis: props.printerRail.axis,
				axisDescription: props.printerRail.axisDescription,
				driver,
				voltage: voltage.id,
				stepper,
				current,
			}),
		);
	}, [current, driver, props.printerRail.axis, props.printerRail.axisDescription, setPrinterRail, stepper, voltage.id]);

	const isPresetCompatible = preset && preset.run_current === current;

	return (
		<div className="rounded-md border border-zinc-300 p-4 shadow-lg dark:border-zinc-700">
			<div className="">
				<h3 className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300">
					{props.printerRail.axis === 'extruder' ? (
						'Extruder'
					) : (
						<span>Stepper {props.printerRail.axis.toLocaleUpperCase()}</span>
					)}
				</h3>
				<p className="text-sm text-zinc-500 dark:text-zinc-400">{props.printerRail.axisDescription}</p>
			</div>
			<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div className="col-span-2">
					<Dropdown
						label="Driver"
						options={supportedDrivers}
						onSelect={setDriver}
						value={driver}
						disabled={integratedDriver != null}
						badge={
							integratedDriver != null ? ({ children: 'Integrated', color: 'sky' } satisfies BadgeProps) : undefined
						}
					/>
				</div>
				<div className="col-span-2">
					<Dropdown label="Stepper" options={steppers} onSelect={setStepper} value={stepper} />
				</div>
				<div className="col-span-1">
					<Dropdown label="Voltage" options={supportedVoltages} onSelect={setVoltage} value={voltage} />
				</div>
				<div className="col-span-1">
					<TextInput
						type="number"
						label="Current"
						value={current}
						onChange={setCurrent}
						inputMode="decimal"
						step="any"
						min={0}
						max={driver.maxCurrent}
					/>
				</div>
				{stepper.maxPeakCurrent / 1.41 < current && (
					<Banner Icon={FireIcon} color="yellow" title="Stepper overcurrent!" className="col-span-2">
						Your stepper motor is rated for {Math.floor((stepper.maxPeakCurrent * 100) / 1.41) / 100}A RMS, but you are
						using {current}A.
					</Banner>
				)}
				{isPresetCompatible && (
					<Banner Icon={LightBulbIcon} color="brand" title="Driver tuning applied!" className="col-span-2">
						RatOS preset applied automatically.
					</Banner>
				)}
				{preset && !isPresetCompatible && (
					<Banner
						Icon={BoltIcon}
						color="sky"
						title="Tuning preset available at different current"
						className="col-span-2"
					>
						These settings have a supported RatOS tuning preset at {preset.run_current}A, but you are using {current}A.
						You can{' '}
						<span
							className="cursor-pointer font-bold underline hover:no-underline"
							onClick={() => setCurrent(preset.run_current)}
						>
							change the current to {preset.run_current}A
						</span>{' '}
						to apply the preset automatically.
					</Banner>
				)}
			</div>
		</div>
	);
};
