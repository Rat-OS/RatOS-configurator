import { Dropdown } from '../forms/dropdown';
import { Board, Toolboard } from '../../zods/boards';
import React, { useEffect, useMemo, useState } from 'react';
import { Drivers } from '../../data/drivers';
import { findPreset, Steppers } from '../../data/steppers';
import { BadgeProps } from '../common/badge';
import { TextInput } from '../forms/text-input';
import { Banner } from '../common/banner';
import { BoltIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { useSetRecoilState } from 'recoil';
import { PrinterRailState } from '../../hooks/usePrinterConfiguration';
import { FireIcon } from '@heroicons/react/24/solid';
import { BasePrinterRail, PrinterRailDefinition, getSupportedVoltages, matchesDefaultRail } from '../../zods/motion';
import { deserializeDriver, serializePrinterRail } from '../../utils/serialization';

interface PrinterRailSettingsProps {
	selectedBoard: Board | Toolboard | null;
	printerRail: Zod.infer<typeof BasePrinterRail>;
	printerRailDefault: Zod.infer<typeof PrinterRailDefinition>;
	performanceMode?: boolean | null;
}

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
	const [homingSpeed, setHomingSpeed] = useState(
		props.performanceMode
			? props.printerRailDefault.performanceMode?.homingSpeed ?? props.printerRailDefault.homingSpeed
			: props.printerRailDefault.homingSpeed,
	);
	const supportedVoltages = getSupportedVoltages(props.selectedBoard, driver).map((v) => {
		return {
			...v,
			badge:
				findPreset(stepper, driver, v.id, undefined, props.performanceMode) != null
					? ({
							children: 'Tuned Preset',
							color: 'sky',
					  } satisfies BadgeProps)
					: undefined,
		};
	});
	const [voltage, setVoltage] = useState(
		supportedVoltages.find(
			(v) =>
				v.id ===
				(props.performanceMode && props.printerRailDefault.performanceMode?.voltage
					? props.printerRailDefault.performanceMode.voltage
					: props.printerRailDefault.voltage),
		) ?? supportedVoltages[0],
	);
	const [current, setCurrent] = useState(
		props.performanceMode && props.printerRailDefault.performanceMode
			? props.printerRailDefault.performanceMode.current
			: props.printerRail.current,
	);
	const recommendedPreset = useMemo(
		() => findPreset(stepper, driver, voltage.id, undefined, props.performanceMode),
		[stepper, driver, voltage, props.performanceMode],
	);
	const matchingPreset = useMemo(
		() => findPreset(stepper, driver, voltage.id, current, props.performanceMode),
		[stepper, driver, voltage, props.performanceMode, current],
	);

	const supportedDrivers = Drivers.map((d) => {
		return {
			...d,
			badge:
				findPreset(stepper, d, voltage.id, undefined, props.performanceMode) != null
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
				findPreset(s, driver, voltage.id, undefined, props.performanceMode) != null
					? ({
							children: 'Tuned Preset',
							color: 'sky',
					  } satisfies BadgeProps)
					: undefined,
		};
	});

	useEffect(() => {
		// If current rail configuration matches the default rail configuration, adapt current and voltage
		// to match the performance mode when performance mode changes.
		if (matchesDefaultRail(props.printerRail, props.printerRailDefault, !props.performanceMode)) {
			if (props.performanceMode && props.printerRailDefault.performanceMode) {
				setHomingSpeed(props.printerRailDefault.performanceMode.homingSpeed ?? props.printerRail.homingSpeed);
				if (props.printerRailDefault.performanceMode.voltage != null) {
					setVoltage(
						supportedVoltages.find(
							(sv) => sv.id === (props.printerRailDefault.performanceMode?.voltage ?? props.printerRailDefault.voltage),
						) ?? supportedVoltages[0],
					);
				}
				if (props.printerRailDefault.performanceMode.current != null) {
					setCurrent(props.printerRailDefault.performanceMode.current);
				}
			} else {
				setHomingSpeed(props.printerRailDefault.homingSpeed);
				setVoltage(supportedVoltages.find((sv) => sv.id === props.printerRailDefault.voltage) ?? supportedVoltages[0]);
				setCurrent(props.printerRailDefault.current);
			}
		}
		// We don't want to react to anything other than performance mode changes.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.performanceMode]);

	useEffect(() => {
		const currentVoltage = supportedVoltages.find((sv) => sv.id === voltage.id);
		if (!currentVoltage) {
			setVoltage(
				recommendedPreset
					? supportedVoltages.find((sv) => sv.id === recommendedPreset.voltage) ?? supportedVoltages[0]
					: supportedVoltages[0],
			);
			if (recommendedPreset) {
				setCurrent(recommendedPreset.run_current);
			}
		}
	}, [supportedVoltages, voltage, recommendedPreset]);

	useEffect(() => {
		setPrinterRail(
			serializePrinterRail({
				axis: props.printerRail.axis,
				axisDescription: props.printerRail.axisDescription,
				rotationDistance: props.printerRail.rotationDistance,
				homingSpeed: homingSpeed,
				driver,
				voltage: voltage.id,
				stepper,
				current,
			}),
		);
	}, [
		current,
		driver,
		props.printerRail.axis,
		props.printerRail.axisDescription,
		homingSpeed,
		props.printerRail.rotationDistance,
		setPrinterRail,
		stepper,
		voltage.id,
	]);

	const isRecommendedPresetCompatible = recommendedPreset && recommendedPreset.run_current === current;

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
				{matchingPreset != null && (
					<Banner Icon={LightBulbIcon} color="brand" title="Driver tuning applied!" className="col-span-2">
						RatOS preset applied automatically.
					</Banner>
				)}
				{recommendedPreset && !isRecommendedPresetCompatible && (
					<Banner
						Icon={BoltIcon}
						color="sky"
						title="Recommended tuning preset available at different current"
						className="col-span-2"
					>
						RatOS has a recommended preset for your current settings at {recommendedPreset.run_current}A. You can{' '}
						<span
							className="cursor-pointer font-bold underline hover:no-underline"
							onClick={() => setCurrent(recommendedPreset.run_current)}
						>
							change the current to {recommendedPreset.run_current}A
						</span>{' '}
						to apply the preset automatically.
					</Banner>
				)}
			</div>
		</div>
	);
};
