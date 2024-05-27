import { Dropdown } from '@/components/forms/dropdown';
import { Board } from '@/zods/boards';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Drivers } from '@/data/drivers';
import { findPreset, Steppers } from '@/data/steppers';
import { BadgeProps, badgeBackgroundColorStyle, badgeBorderColorStyle } from '@/components/common/badge';
import { TextInput } from '@/components/forms/text-input';
import { Banner } from '@/components/common/banner';
import { BoltIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { FireIcon } from '@heroicons/react/24/solid';
import {
	BasePrinterRail,
	PrinterAxis,
	PrinterRailDefinition,
	getSupportedVoltages,
	matchesDefaultRail,
} from '@/zods/motion';
import { deserializeDriver, serializePrinterRail } from '@/utils/serialization';
import { PrinterRailState, PrinterRailsState } from '@/recoil/printer';
import { useToolheads } from '@/hooks/useToolheadConfiguration';
import { trpc } from '@/utils/trpc';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '@/components/common/card';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const railArray = z.array(BasePrinterRail);

interface PrinterRailSettingsProps {
	selectedBoard: Board | null;
	printerRail: Zod.infer<typeof BasePrinterRail>;
	printerRailDefault: Zod.infer<typeof PrinterRailDefinition>;
	performanceMode?: boolean | null;
	errors?: z.inferFormattedError<typeof BasePrinterRail>;
	/**
	 * This component should always be rendered to ensure the settings are updated when
	 * switching performance mode, even if it isn't visible.
	 */
	isVisible?: boolean;
}

export const PrinterRailSettings: React.FC<PrinterRailSettingsProps> = (props) => {
	const toolheads = useToolheads();
	const toolhead = toolheads.find((th) => th.getExtruderAxis() === props.printerRail.axis);
	const canBeExtruderlessBoard = toolheads.every((th) => th.hasToolboard());
	const usesToolboard = toolhead?.getExtruderAxis() === props.printerRailDefault.axis && toolhead?.hasToolboard();
	const board = usesToolboard ? toolhead.getToolboard() : props.selectedBoard;
	const [performanceMode, setPerformanceMode] = useState(!!props.performanceMode);
	const setPrinterRail = useSetRecoilState(PrinterRailState(props.printerRail.axis));
	const printerRails = useRecoilValue(PrinterRailsState);
	const [motorSlot, setMotorSlot] = useState(
		props.printerRail.motorSlot && props.selectedBoard?.motorSlots?.[props.printerRail.motorSlot]
			? props.printerRail.motorSlot
			: undefined,
	);
	const integratedDriver = board?.integratedDrivers
		? board.integratedDrivers[
				motorSlot ?? (props.printerRail.axis.startsWith('extruder') ? PrinterAxis.extruder : props.printerRail.axis)
			] ??
			board.integratedDrivers[
				props.printerRail.axis.startsWith('extruder') ? PrinterAxis.extruder : props.printerRail.axis
			]
		: null;
	const [driver, setDriver] = useState(
		integratedDriver != null
			? deserializeDriver(integratedDriver) ?? props.printerRail.driver
			: props.printerRail.driver,
	);
	const [stepper, setStepper] = useState(props.printerRail.stepper);
	const [homingSpeed, setHomingSpeed] = useState(
		performanceMode
			? props.printerRailDefault.performanceMode?.homingSpeed ?? props.printerRailDefault.homingSpeed
			: props.printerRailDefault.homingSpeed,
	);
	const errorCount =
		props.errors == null
			? 0
			: Object.keys(props.errors).reduce((acc, key) => {
					const objKey = key as keyof typeof props.errors;
					const keyErrors = props.errors?.[objKey];
					if (keyErrors == null) {
						return acc;
					}
					const count = Array.isArray(keyErrors) ? keyErrors.length : keyErrors._errors.length;
					return acc + count;
				}, 0);

	const isSlotInUse = useCallback(
		(slot: string | undefined) => {
			if (slot == null) {
				return false;
			}
			return printerRails.some((pr) => {
				const railToolhead = toolheads.find((th) => th.getExtruderAxis() === pr.axis);
				if (pr.axis === props.printerRail.axis) {
					return false;
				}
				if (railToolhead?.hasToolboard()) {
					// The rail is an extruder rail and the toolhead has a toolboard, no chance of conflict.
					return false;
				}
				return pr.motorSlot === slot;
			});
		},
		[printerRails, props.printerRail.axis, toolheads],
	);

	const guessMotorSlot = trpc.mcu.reversePinLookup.useQuery(
		{
			axis: props.printerRail.axis,
			canUseExtruderlessConfigs: canBeExtruderlessBoard,
			boardPath: board?.path ?? '',
		},
		{ enabled: !!board },
	);
	useEffect(() => {
		if (guessMotorSlot.data && motorSlot == null && board?.motorSlots?.[guessMotorSlot.data] != null) {
			setMotorSlot(guessMotorSlot.data);
		}
	}, [board, guessMotorSlot.data, motorSlot, props.printerRailDefault.axis]);

	const supportedVoltages = getSupportedVoltages(board, driver).map((v) => {
		return {
			...v,
			badge:
				findPreset(stepper, driver, v.id, undefined, performanceMode) != null
					? ({
							children: 'Tuned Preset',
							color: 'sky',
						} satisfies BadgeProps)
					: undefined,
		};
	});
	const [voltage, setVoltage] = useState(
		supportedVoltages.find((v) => v.id === props.printerRail.voltage) ??
			supportedVoltages.find(
				(v) =>
					v.id ===
					(performanceMode && props.printerRailDefault.performanceMode?.voltage
						? props.printerRailDefault.performanceMode.voltage
						: props.printerRailDefault.voltage),
			) ??
			supportedVoltages[0],
	);
	const [current, setCurrent] = useState(props.printerRail.current);
	const defaultPreset = useMemo(
		() =>
			findPreset(
				props.printerRailDefault.stepper,
				props.printerRailDefault.driver,
				props.printerRailDefault.voltage,
				props.printerRailDefault.current,
			),
		[props.printerRailDefault],
	);
	const recommendedPreset = useMemo(
		() => findPreset(stepper, driver, voltage.id, undefined, performanceMode),
		[stepper, driver, voltage, performanceMode],
	);
	const matchingPreset = useMemo(
		() => findPreset(stepper, driver, voltage.id, current, performanceMode),
		[stepper, driver, voltage, performanceMode, current],
	);

	const supportedDrivers = Drivers.filter((d) => {
		return d.protocol === 'UART' || board?.stepperSPI != null;
	}).map((d) => {
		return {
			...d,
			badge:
				findPreset(stepper, d, voltage.id, undefined, performanceMode) != null
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
				findPreset(s, driver, voltage.id, undefined, performanceMode) != null
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
		setPerformanceMode(!!props.performanceMode);
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
		const newState = {
			axis: props.printerRail.axis,
			axisDescription: props.printerRail.axisDescription,
			rotationDistance: props.printerRail.rotationDistance,
			homingSpeed: homingSpeed,
			motorSlot: motorSlot,
			driver,
			voltage: voltage.id,
			stepper,
			current,
		};
		const serializedNew = serializePrinterRail(newState);
		const serializedOld = serializePrinterRail(props.printerRail);
		const isDirty = Object.keys(serializedNew).some((key) => {
			return serializedNew[key as keyof typeof serializedNew] !== serializedOld[key as keyof typeof serializedNew];
		});
		if (isDirty) {
			setPrinterRail(serializedNew);
		}
	}, [current, driver, props.printerRail, homingSpeed, setPrinterRail, stepper, voltage.id, motorSlot]);

	const isRecommendedPresetCompatible = recommendedPreset && recommendedPreset.run_current === current;
	const railName =
		props.printerRail.axis === 'extruder'
			? 'Extruder T0'
			: props.printerRail.axis === PrinterAxis.extruder1
				? 'Extruder T1'
				: 'Stepper ' + props.printerRail.axis.toLocaleUpperCase();
	const motorSlotOptions =
		board?.motorSlots != null && Object.keys(board.motorSlots).length > 0
			? Object.keys(board.motorSlots)
					.map((ms) => {
						if (board.motorSlots?.[ms].title == null) {
							return null;
						}
						const hasDiagPin = board.motorSlots?.[ms].diag_pin != null;
						const hasEndstopPin = board.motorSlots?.[ms].endstop_pin != null;
						const isInUse = isSlotInUse(ms);
						const disabled =
							(props.printerRailDefault.axis.startsWith('x') || props.printerRailDefault.axis.startsWith('y')) &&
							!hasDiagPin;
						return {
							id: ms,
							title: board.motorSlots?.[ms].title,
							disabled: disabled,
							badge: [
								!hasDiagPin
									? ({ children: 'No diag pin', color: disabled ? 'red' : 'gray' } satisfies BadgeProps)
									: undefined,
								!hasEndstopPin ? ({ children: 'No endstop pin', color: 'gray' } satisfies BadgeProps) : undefined,
								isInUse === true ? ({ children: 'In use', color: 'orange' } satisfies BadgeProps) : undefined,
							].filter(Boolean),
						};
					})
					.filter(Boolean)
			: null;
	const motorSlotBadge = useMemo(() => {
		if (motorSlot == null || board?.motorSlots?.[motorSlot].title == null) {
			return undefined;
		}
		const hasDiagPin = board.motorSlots?.[motorSlot].diag_pin != null;
		const disabled =
			(props.printerRailDefault.axis.startsWith('x') || props.printerRailDefault.axis.startsWith('y')) && !hasDiagPin;
		return !hasDiagPin && disabled ? ({ children: 'No diag pin', color: 'red' } satisfies BadgeProps) : undefined;
	}, [board, motorSlot, props.printerRailDefault.axis]);
	return (
		<AnimatePresence>
			{props.isVisible && (
				<Card
					key={props.printerRail.axis}
					exit={{ opacity: 0, scale: 0.9, y: -40 }}
					initial={{ opacity: 0, scale: 0.9, y: 40 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					className={twMerge(
						'break-inside-avoid-column',
						errorCount > 0 && badgeBorderColorStyle({ color: 'red' }),
						errorCount > 0 && badgeBackgroundColorStyle({ color: 'red' }),
					)}
				>
					<CardHeader className="">
						<CardTitle className={twMerge(errorCount > 0 && 'text-red-900/80 dark:text-red-100')}>{railName}</CardTitle>
						<CardDescription className={twMerge(errorCount > 0 && 'text-red-800/80 dark:text-red-100/60')}>
							{props.printerRail.axisDescription}
						</CardDescription>
					</CardHeader>
					<CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{motorSlotOptions && (
							<div className="col-span-2">
								<Dropdown
									label="Motor Slot"
									options={motorSlotOptions}
									error={props.errors?.motorSlot?._errors.join('\n')}
									onSelect={(ms) => {
										setMotorSlot(ms.id);
										if (board?.integratedDrivers?.[ms.id] != null) {
											setDriver(deserializeDriver(board.integratedDrivers[ms.id]) ?? driver);
										}
									}}
									value={motorSlot ? motorSlotOptions.find((ms) => ms.id === motorSlot) : undefined}
									badge={motorSlotBadge}
								/>
							</div>
						)}
						<div className="col-span-2">
							<Dropdown
								label="Driver"
								options={supportedDrivers}
								onSelect={setDriver}
								value={driver}
								disabled={integratedDriver != null}
								badge={[
									integratedDriver != null
										? ({ children: 'Integrated', color: 'sky' } satisfies BadgeProps)
										: undefined,
									usesToolboard ? ({ children: 'Toolboard', color: 'yellow' } satisfies BadgeProps) : undefined,
								].filter(Boolean)}
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
								Your stepper motor is rated for {Math.floor((stepper.maxPeakCurrent * 100) / 1.41) / 100}A RMS, but you
								are using {current}A.
							</Banner>
						)}
						{matchingPreset != null && (
							<Banner Icon={LightBulbIcon} color="brand" title="Driver tuning applied!" className="col-span-2">
								RatOS preset applied automatically.
							</Banner>
						)}
						{matchingPreset?.run_current !== defaultPreset?.run_current &&
							recommendedPreset &&
							!isRecommendedPresetCompatible && (
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
					</CardContent>
				</Card>
			)}
		</AnimatePresence>
	);
};
