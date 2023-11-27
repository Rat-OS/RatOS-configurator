import React, { useCallback, useState } from 'react';
import { StepNavButtons } from '../step-nav-buttons';
import { StepScreenProps } from '../../hooks/useSteps';
import { Dropdown } from '../forms/dropdown';
import { z } from 'zod';
import { usePrinterConfiguration } from '../../hooks/usePrinterConfiguration';
import { Hotend, Thermistor } from '../../zods/hardware';
import { ShowWhenReady } from '../common/show-when-ready';
import { ErrorMessage } from '../error-message';
import { Toggle } from '../forms/toggle';
import { PrinterRailSettings } from './printer-rail-settings';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { PrinterAxis } from '../../zods/motion';
import { deserializePrinterRailDefinition } from '../../utils/serialization';

const stringToTitleObject = <Item extends string>(data: Item): { id: Item; title: Item } => {
	return { id: data, title: data };
};

export const HardwareSelection: React.FC<StepScreenProps> = (props) => {
	const [hasManuallySelectedThermistor, setHasManuallySelectedThermistor] = useState(false);
	const [advancedSteppers, setAdvancedSteppers] = useState(false);
	const {
		isReady,
		queryErrors,
		hotends,
		extruders,
		probes,
		xEndstops,
		yEndstops,
		xAccelerometerOptions,
		yAccelerometerOptions,
		thermistors,
		partFanOptions,
		hotendFanOptions,
		controllerFanOptions,
		selectedBoard,
		selectedToolboard,
		selectedPrinter,
		selectedHotend,
		setSelectedHotend,
		selectedExtruder,
		setSelectedExtruder,
		selectedProbe,
		setSelectedProbe,
		selectedXEndstop,
		setSelectedXEndstop,
		selectedYEndstop,
		setSelectedYEndstop,
		selectedThermistor,
		setSelectedThermistor,
		parsedPrinterConfiguration,
		performanceMode,
		setPerformanceMode,
		stealthchop,
		setStealthchop,
		standstillStealth,
		setStandstillStealth,
		selectedPrinterRails,
		selectedXAccelerometer,
		setSelectedXAccelerometer,
		selectedYAccelerometer,
		setSelectedYAccelerometer,
		selectedPartFan: partFan,
		setSelectedPartFan: setPartFan,
		selectedHotendFan: hotendFan,
		setSelectedHotendFan: setHotendFan,
		selectedControllerFan: controllerFan,
		setSelectedControllerFan: setControllerFan,
	} = usePrinterConfiguration();

	const onSelectHotend = useCallback(
		(hotend: z.infer<typeof Hotend>) => {
			setSelectedHotend(hotend);
			if (!hasManuallySelectedThermistor) {
				setSelectedThermistor(hotend.thermistor);
			}
		},
		[hasManuallySelectedThermistor, setSelectedHotend, setSelectedThermistor],
	);

	const onSelectThermistor = (thermistor: { id: z.infer<typeof Thermistor> }) => {
		setSelectedThermistor(thermistor.id);
		setHasManuallySelectedThermistor(true);
	};

	const errors = queryErrors.slice();

	if (parsedPrinterConfiguration.success === false) {
		parsedPrinterConfiguration.error.flatten().formErrors.forEach((message) => {
			errors.push(message);
		});
	}

	const [animate] = useAutoAnimate();

	return (
		<>
			<div className="p-8" ref={animate}>
				{' '}
				<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">
						Select your printer hardware
					</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">
						If your hardware isn't listed, pick the one closest to it and override as necessary in printer.cfg later
					</p>
				</div>
				{errors.length > 0 && (
					<ErrorMessage className="mb-4">
						{errors.map((e) => (
							<div className="mt-2" key={e}>
								{e}
							</div>
						))}
					</ErrorMessage>
				)}
				<ShowWhenReady isReady={isReady} queryErrors={queryErrors} showErrors={false}>
					<div className="mt-4">
						<h3 className="text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100">Toolhead</h3>
						<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">Describe your toolhead hardware</p>
					</div>
					<div className="mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-700 sm:grid-cols-2">
						<div>
							<Dropdown label="Hotend" options={hotends.data ?? []} onSelect={onSelectHotend} value={selectedHotend} />
						</div>
						<div>
							<Dropdown
								label="Hotend Thermistor"
								options={thermistors.data?.map(stringToTitleObject) ?? []}
								onSelect={onSelectThermistor}
								value={selectedThermistor ? stringToTitleObject(selectedThermistor) : null}
							/>
						</div>
						<div>
							<Dropdown
								label="Extruder"
								options={extruders.data ?? []}
								onSelect={setSelectedExtruder}
								value={selectedExtruder}
							/>
						</div>
						<div>
							<Dropdown label="Probe" options={probes.data ?? []} onSelect={setSelectedProbe} value={selectedProbe} />
						</div>
					</div>

					<div className="mt-4 border-t border-zinc-100 pt-8 dark:border-zinc-700">
						<h3 className="text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100">Endstops</h3>
						<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">Define your endstop setup</p>
					</div>
					<div className="mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-700 sm:grid-cols-2">
						<div>
							<Dropdown
								label="X Endstop"
								options={xEndstops.data ?? []}
								onSelect={setSelectedXEndstop}
								value={selectedXEndstop}
							/>
						</div>
						<div>
							<Dropdown
								label="Y Endstop"
								options={yEndstops.data ?? []}
								onSelect={setSelectedYEndstop}
								value={selectedYEndstop}
							/>
						</div>
					</div>
					<div className="mt-4 border-t border-zinc-100 pt-8 dark:border-zinc-700">
						<h3 className="text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100">Fans</h3>
						<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">Select your fan types.</p>
					</div>
					<div className="mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-700 sm:grid-cols-2">
						<div>
							<Dropdown
								label="Part cooling fan"
								options={partFanOptions.data ?? []}
								onSelect={setPartFan}
								value={partFan}
							/>
						</div>
						<div>
							<Dropdown
								label="Hotend fan"
								options={hotendFanOptions.data ?? []}
								onSelect={setHotendFan}
								value={hotendFan}
							/>
						</div>
						<div>
							<Dropdown
								label="Controller fan"
								options={controllerFanOptions.data ?? []}
								onSelect={setControllerFan}
								value={controllerFan}
							/>
						</div>
					</div>
					<div className="mt-4 border-t border-zinc-100 pt-8 dark:border-zinc-700">
						<h3 className="text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100">Accelerometer</h3>
						<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">
							You can use the same accelerometer for both axes. If you don't plan on using an accelerometer, you can
							skip this and come back later if you change your mind.
						</p>
					</div>
					<div className="mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-700 sm:grid-cols-2">
						<div>
							<Dropdown
								label="X axis accelerometer"
								options={xAccelerometerOptions.data ?? []}
								onSelect={setSelectedXAccelerometer}
								value={selectedXAccelerometer}
								sort={false}
							/>
						</div>
						<div>
							<Dropdown
								label="Y axis accelerometer"
								options={yAccelerometerOptions.data ?? []}
								onSelect={setSelectedYAccelerometer}
								value={selectedYAccelerometer}
								sort={false}
							/>
						</div>
					</div>
					<div className="mt-4 border-t border-zinc-100 pt-8 dark:border-zinc-700">
						<div className="flex">
							<h3 className="flex-1 text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100">Motion</h3>
							<div>
								<Toggle label="Simple" onLabel="Advanced" onChange={setAdvancedSteppers} value={!!advancedSteppers} />
							</div>
						</div>
						<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">
							Configure your stepper motor and driver settings
						</p>
					</div>
					<div className="mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-700 sm:grid-cols-2">
						{selectedPrinter?.speedLimits.performance && (
							<div className="col-span-2">
								<Toggle
									label="Performance mode"
									description="Increases the stepper power, max acceleration and velocity. Not recommended for initial setup. Requires actively cooled drivers (controller fan)."
									onChange={setPerformanceMode}
									value={!!performanceMode}
								/>
							</div>
						)}
						<div className="col-span-2">
							<Toggle
								label="Stealtchop"
								description="Silent operation at the cost of a 135 mm/s velocity limit and less positional accuracy. Not recommended unless quiteness is absolutely necessary."
								onChange={setStealthchop}
								value={!!stealthchop}
							/>
						</div>
						<div className="col-span-2">
							<Toggle
								label="Standstill Stealth"
								description="Makes steppers stilent when idling, but can cause unpredictable behavior on some drivers. Can result in skipped steps and positional errors, use with caution."
								onChange={setStandstillStealth}
								value={!!standstillStealth}
							/>
						</div>
					</div>
					{advancedSteppers && selectedPrinter && (
						<div className="grid gap-4 py-4 sm:grid-cols-2">
							{selectedPrinterRails.map((rail) => {
								const defaultRail = selectedPrinter.defaults.rails.find((r) => r.axis === rail.axis);
								if (defaultRail == null) {
									throw new Error('No printer default for axis ' + rail.axis);
								}
								return (
									<div className="break-inside-avoid-column" key={rail.axis + (performanceMode ? 'performance' : '')}>
										<PrinterRailSettings
											selectedBoard={
												rail.axis === PrinterAxis.extruder && selectedToolboard ? selectedToolboard : selectedBoard
											}
											printerRail={rail}
											printerRailDefault={deserializePrinterRailDefinition(defaultRail)}
											performanceMode={performanceMode}
										/>
									</div>
								);
							})}
						</div>
					)}
				</ShowWhenReady>
			</div>
			<StepNavButtons
				left={{ onClick: props.previousScreen }}
				right={{
					onClick: props.nextScreen,
					disabled: !parsedPrinterConfiguration.success,
					title: parsedPrinterConfiguration.success === false ? 'Invalid printer configuration selected' : undefined,
				}}
			/>
		</>
	);
};
