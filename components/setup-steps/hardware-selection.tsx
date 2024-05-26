'use client';
import React, { useEffect, useState } from 'react';
import { StepNavButtons } from '@/components/step-nav-buttons';
import { StepScreenProps } from '@/hooks/useSteps';
import { DropdownWithPrinterQuery } from '@/components/forms/dropdown';
import { usePrinterConfiguration } from '@/hooks/usePrinterConfiguration';
import { ErrorMessage } from '@/components/common/error-message';
import { Toggle } from '@/components/forms/toggle';
import { PrinterRailSettings } from '@/components/setup-steps/printer-rail-settings';
import { deserializePrinterRailDefinition } from '@/utils/serialization';
import { ToolheadSettings } from '@/components/setup-steps/toolhead-settings';
import { Spinner } from '@/components/common/spinner';
import { BasePrinterRail, PrinterAxis } from '@/zods/motion';
import { z } from 'zod';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { AnimatedContainer } from '@/components/common/animated-container';
import { fanHelp } from '@/data/fans';

export const HardwareSelection: React.FC<StepScreenProps> = (props) => {
	const [advancedSteppers, setAdvancedSteppers] = useState(false);
	const {
		selectedControllerFan,
		selectedBoard,
		selectedPrinter,
		performanceMode,
		setPerformanceMode,
		stealthchop,
		setStealthchop,
		standstillStealth,
		setStandstillStealth,
		selectedPrinterRails,
		setSelectedControllerFan: setControllerFan,
		serializedPrinterConfiguration,
		parsedPrinterConfiguration,
		partialPrinterConfiguration,
	} = usePrinterConfiguration();
	const errors: string[] = [];
	let formattedErrors = parsedPrinterConfiguration.success === false ? parsedPrinterConfiguration.error.format() : null;
	const railErrors: {
		[i: string]: z.inferFormattedError<typeof BasePrinterRail>;
	} = {};
	partialPrinterConfiguration?.rails?.forEach((rail, ri) => {
		let railError: string[] = [];
		if (![PrinterAxis.extruder, PrinterAxis.extruder1].includes(rail.axis)) {
			if (rail.motorSlot == null) {
				errors.push(`Motor slot for ${rail.axis.toUpperCase()} is not set`);
				railError = [`Motor slot for ${rail.axis.toUpperCase()} is not set`];
			}
		}
		railErrors[ri] = {
			...(formattedErrors?.rails?.[ri] ?? {}),
			_errors: formattedErrors?.rails?.[ri]?._errors?.concat(railError ?? []) ?? railError,
		};
	});
	if (partialPrinterConfiguration != null) {
		if (parsedPrinterConfiguration.success === false) {
			parsedPrinterConfiguration.error.flatten().formErrors.forEach((message) => {
				errors.push(message);
			});
		}
	}
	useEffect(() => {
		if (parsedPrinterConfiguration.success === false) {
			if (parsedPrinterConfiguration.error.errors.some((e) => e.path[0] === 'rails')) {
				setAdvancedSteppers(true);
			}
		}
	}, [parsedPrinterConfiguration]);
	return (
		<div>
			<div className="p-8">
				<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">
						Select your printer hardware
					</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">
						If your hardware isn't listed, pick the one closest to it and override as necessary in printer.cfg later
					</p>
				</div>
				<AnimatedContainer>
					{errors.length > 0 && (
						<ErrorMessage className="mb-4">
							<AnimatePresence>
								{errors.map((e) => (
									<motion.div
										className="mt-2"
										key={e}
										exit={{ opacity: 0, scale: 0.9, y: -40 }}
										initial={{ opacity: 0, scale: 0.9, y: 40 }}
										animate={{ opacity: 1, scale: 1, y: 0 }}
									>
										{e}
									</motion.div>
								))}
							</AnimatePresence>
						</ErrorMessage>
					)}
					<AnimatedContainer className="space-y-4">
						<AnimatePresence>
							{serializedPrinterConfiguration?.toolheads?.map((th, i) =>
								th == null || th.axis == null ? null : (
									<motion.div
										key={i}
										exit={{ opacity: 0, scale: 0.9, y: -40 }}
										initial={{ opacity: 0, scale: 0.9, y: 40 }}
										animate={{ opacity: 1, scale: 1, y: 0 }}
									>
										<React.Suspense fallback={<Spinner />}>
											<ToolheadSettings toolOrAxis={th.axis} />
										</React.Suspense>
									</motion.div>
								),
							)}
						</AnimatePresence>
					</AnimatedContainer>
					<div className="mt-4 border-t border-zinc-100 pt-8 dark:border-zinc-700">
						<div className="flex">
							<h3 className="flex-1 text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100">Electronics</h3>
						</div>
						<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">
							Configure miscellaneous electronics settings
						</p>
					</div>
					<div className="mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-700 sm:grid-cols-2">
						<div>
							<DropdownWithPrinterQuery
								label="Controller fan"
								query="controllerFanOptions"
								vars={{ config: serializedPrinterConfiguration }}
								help={fanHelp}
								onSelect={setControllerFan}
								value={selectedControllerFan}
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
								label="Stealthchop"
								description="Silent operation at the cost of a 135 mm/s velocity limit and less positional accuracy. Not recommended unless quiteness is absolutely necessary."
								onChange={setStealthchop}
								value={!!stealthchop}
							/>
						</div>
						<div className="col-span-2">
							<Toggle
								label="Standstill Stealth"
								description="Makes steppers silent when idling, but can cause unpredictable behavior on some drivers. Can result in skipped steps and positional errors, use with caution."
								onChange={setStandstillStealth}
								value={!!standstillStealth}
							/>
						</div>
					</div>
				</AnimatedContainer>
				<div>
					{selectedPrinter && (
						<LayoutGroup id="rails">
							<AnimatedContainer className="grid gap-4 py-4 sm:grid-cols-2">
								{selectedPrinterRails.map((rail, ri) => {
									const defaultRail = selectedPrinter.defaults.rails.find((r) => r.axis === rail.axis);
									if (defaultRail == null) {
										throw new Error('No printer default for axis ' + rail.axis);
									}
									const errorCount =
										railErrors[ri] == null
											? 0
											: Object.keys(railErrors[ri]).reduce((acc, key) => {
													const objKey = key as keyof (typeof railErrors)[number];
													const keyErrors = railErrors[ri][objKey];
													if (keyErrors == null) {
														return acc;
													}
													const count = Array.isArray(keyErrors) ? keyErrors.length : keyErrors._errors?.length ?? 0;
													return acc + count;
												}, 0);
									return (
										<PrinterRailSettings
											key={rail.axis}
											errors={railErrors[ri]}
											selectedBoard={selectedBoard}
											printerRail={rail}
											printerRailDefault={deserializePrinterRailDefinition(defaultRail)}
											performanceMode={performanceMode}
											isVisible={advancedSteppers || errorCount > 0}
										/>
									);
								})}
							</AnimatedContainer>
						</LayoutGroup>
					)}
				</div>
			</div>
			<StepNavButtons
				left={{ onClick: props.previousScreen }}
				right={{
					onClick: props.nextScreen,
					disabled: !parsedPrinterConfiguration.success || errors.length > 0,
					title:
						parsedPrinterConfiguration.success === false || errors.length > 0
							? 'Invalid printer configuration selected'
							: undefined,
				}}
			/>
		</div>
	);
};
