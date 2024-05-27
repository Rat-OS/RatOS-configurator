'use client';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import {
	PrinterConfigurationState,
	serializePartialPrinterConfiguration,
	serializePrinterConfiguration,
	usePrinterConfiguration,
} from '@/hooks/usePrinterConfiguration';
import { StepScreen, StepScreenProps, useSteps } from '@/hooks/useSteps';
import { StepNavButtons } from '@/components/step-nav-buttons';
import { ErrorMessage } from '@/components/common/error-message';
import { trpc } from '@/helpers/trpc';
import { Badge } from '@/components/common/badge';
import { InfoMessage } from '@/components/common/info-message';
import { WarningMessage } from '@/components/warning-message';
import { Button } from '@/components/common/button';
import { useRecoilCallback } from 'recoil';
import { xEndstopOptions } from '@/data/endstops';
import { PrinterConfiguration } from '@/zods/printer-configuration';
import { PrinterAxis } from '@/zods/motion';
import { ToolOrAxis } from '@/zods/toolhead';
import { useToolheadConfiguration } from '@/hooks/useToolheadConfiguration';
import { Spinner } from '@/components/common/spinner';
import { useQuery } from '@tanstack/react-query';
import { FileChanges } from '@/components/setup-steps/file-changes';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { twJoin } from 'tailwind-merge';
import { AnimatedContainer } from '@/components/common/animated-container';

const CompletionSteps: StepScreen[] = [
	{
		id: '01',
		name: 'Confirm configuration',
		description: 'Confirm your printer configuration',
		href: '#',
		renderScreen: (screenProps) => <ConfirmConfig {...screenProps} key={screenProps.key} />,
	},
	{
		id: '02',
		name: 'Setup complete',
		description: "You've completed the initial setup, congratulations!",
		href: '#',
		renderScreen: (screenProps) => <ProceedToMainsail {...screenProps} key={screenProps.key} />,
	},
];

interface ConfirmToolheadProps {
	toolOrAxis: ToolOrAxis;
}

export const ConfirmToolhead: React.FC<ConfirmToolheadProps> = (props) => {
	const { toolhead, setToolhead } = useToolheadConfiguration(props.toolOrAxis);
	const toolboardDetected = trpc.mcu.detect.useQuery(
		{ boardPath: toolhead.getToolboard()?.path ?? '', toolhead: toolhead.serialize() },
		{
			enabled: toolhead.getToolboard() != null,
		},
	);
	const [ignoreEndstopWarning, setIgnoreEndstopWarning] = useState(false);
	const setToolboardEndstop = useRecoilCallback(
		({ snapshot, set }) =>
			async () => {
				const printerConfig = await snapshot.getPromise(PrinterConfigurationState);
				if (printerConfig == null) {
					return;
				}
				const toolboardEndstop = xEndstopOptions(printerConfig, toolhead.getConfig()).find(
					(x) => x.id === 'endstop-toolboard',
				);
				if (toolboardEndstop != null && toolhead != null) {
					setToolhead({
						...toolhead.getConfig(),
						xEndstop: toolboardEndstop,
					});
				}
			},
		[],
	);
	if (toolhead == null) {
		return (
			<dl className="grid grid-cols-1 gap-x-4 gap-y-4 border-t border-zinc-100 py-4 dark:border-zinc-700 sm:grid-cols-2">
				<div className="sm:col-span-2">
					<div className="space-x-2 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
						<Spinner />
					</div>
				</div>
			</dl>
		);
	}
	const hasWarnings =
		(toolhead.getToolboard() != null && !toolboardDetected.data) ||
		(toolhead.getToolboard()?.alternativePT1000Resistor && toolhead.getThermistor() === 'PT1000');
	return (
		<Disclosure as="div" className="" defaultOpen={!!hasWarnings}>
			{({ open }) => (
				<>
					<Disclosure.Button as="div" className="cursor-pointer border-b border-zinc-100 py-4 dark:border-zinc-800">
						<div className="flex items-center justify-between">
							<h3 className="flex items-center space-x-2 text-base font-bold leading-7 text-zinc-900 dark:text-zinc-100">
								<span>Toolhead {toolhead.getToolCommand()}</span>
								{hasWarnings && (
									<Badge color="yellow" size="md">
										Has Warnings
									</Badge>
								)}
							</h3>
							<button>
								<ChevronRightIcon
									className={twJoin('h-6 w-6 transition-all duration-200 ease-in-out', open ? 'rotate-90' : 'rotate-0')}
								/>
							</button>
						</div>
						<p className="mt-2 max-w-4xl text-sm">{toolhead.getDescription()}</p>
					</Disclosure.Button>
					<AnimatedContainer>
						<Disclosure.Panel className="pt-4">
							<dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
								<div className="sm:col-span-1">
									<dt className="space-x-2 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
										<span>Toolboard</span>{' '}
										{toolhead.getConfig().toolboard && (
											<Badge color={toolboardDetected.data === true ? 'green' : 'red'}>
												{toolboardDetected.data === true ? 'Detected' : 'Not detected'}
											</Badge>
										)}
									</dt>
									<dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
										{toolhead.getConfig().toolboard == null
											? 'None selected'
											: `${toolhead.getConfig().toolboard?.manufacturer} ${toolhead.getConfig().toolboard?.name}`}
									</dd>
								</div>
								{toolhead.getToolboard() != null && !toolboardDetected.data && (
									<div className="sm:col-span-2">
										<WarningMessage>
											<div className="space-y-2">
												<div>
													The toolboard you have selected does not seem to be connected, you can still save the config
													and proceed to mainsail, but you will get an 'mcu' connection error.
												</div>
											</div>
										</WarningMessage>
									</div>
								)}
								<div className="sm:col-span-1">
									<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Extruder</dt>
									<dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
										{toolhead.getConfig().extruder?.title ?? 'None selected'}
									</dd>
								</div>
								<div className="sm:col-span-1">
									<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Hotend</dt>
									<dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
										{toolhead.getConfig().hotend?.title ?? 'None selected'}
									</dd>
								</div>
								<div className="sm:col-span-1">
									<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Thermistor</dt>
									<dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
										{toolhead.getConfig().thermistor ?? 'None selected'}
									</dd>
								</div>
								{toolhead.getToolboard()?.alternativePT1000Resistor && toolhead.getThermistor() === 'PT1000' && (
									<div className="col-span-2">
										<WarningMessage title="RatOS uses your toolboards alternate pullup resistor setting">
											Your toolboard has an option to use a separate pullup resistor for PT1000 sensors. This is usually
											done by inserting a jumper. Make sure you read the documentation for your board on how to enable
											the alternative resistor or you'll get ADC temperature errors in klipper.
										</WarningMessage>
									</div>
								)}
							</dl>
							<dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 border-t border-zinc-100 py-4 dark:border-zinc-800 sm:grid-cols-2">
								<div className="sm:col-span-1">
									<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">X Endstop</dt>
									<dd className="mt-1 flex gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
										{toolhead.getConfig().xEndstop?.title ?? 'None selected'}
										{toolhead.getConfig().xEndstop?.badge?.map((b) => (
											<Badge color={b.color} key={b.children}>
												{b.children.replace('Tundefined', `T${toolhead.getTool()}`)}
											</Badge>
										))}
									</dd>
								</div>
								<div className="sm:col-span-1">
									<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Y Endstop</dt>
									<dd className="mt-1 flex gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
										{toolhead.getConfig().yEndstop?.title ?? 'None selected'}
										{toolhead.getConfig().yEndstop?.badge?.map((b) => (
											<Badge color={b.color} key={b.children}>
												{b.children}
											</Badge>
										))}
									</dd>
								</div>
								<div className="sm:col-span-1">
									<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Probe</dt>
									<dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
										{toolhead.getConfig().probe?.title ?? 'None selected'}
									</dd>
								</div>
								{toolhead.getConfig().toolboard != null &&
									toolhead.getConfig().xEndstop?.id === 'endstop' &&
									!ignoreEndstopWarning && (
										<div className="sm:col-span-2">
											<WarningMessage>
												The current configuration assumes the X endstop is connected to your controlboard, do you want
												to use an endstop connected to the toolboard instead?
												<div className="mt-4 flex justify-end space-x-2">
													<Button onClick={setToolboardEndstop} variant="warning">
														Yes, use the toolboard connection
													</Button>
													<Button onClick={() => setIgnoreEndstopWarning(true)} variant="plain">
														No, use the controlboard connection
													</Button>
												</div>
											</WarningMessage>
										</div>
									)}
							</dl>
							<dl className="grid grid-cols-1 gap-x-4 gap-y-4 border-t border-zinc-100 py-4 dark:border-zinc-800 sm:grid-cols-2">
								<div className="sm:col-span-1">
									<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Part cooling fan</dt>
									<dd className="mt-1 flex gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
										{toolhead.getConfig().partFan?.title ?? 'None selected'}
										{toolhead.getConfig().partFan?.badge?.map((b) => (
											<Badge color={b.color} key={b.children}>
												{b.children.replace('Tundefined', `T${toolhead.getTool()}`)}
											</Badge>
										))}
									</dd>
								</div>
								<div className="sm:col-span-1">
									<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Hotend cooling fan</dt>
									<dd className="mt-1 flex gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
										{toolhead.getConfig().hotendFan?.title ?? 'None selected'}
										{toolhead.getConfig().hotendFan?.badge?.map((b) => (
											<Badge color={b.color} key={b.children}>
												{b.children.replace('Tundefined', `T${toolhead.getTool()}`)}
											</Badge>
										))}
									</dd>
								</div>
							</dl>
							<dl className="grid grid-cols-1 gap-x-4 gap-y-4 border-t border-zinc-100 py-4 dark:border-zinc-800 sm:grid-cols-2">
								<div className="sm:col-span-1">
									<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">X Accelerometer</dt>
									<dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
										{toolhead.getConfig().xAccelerometer?.title ?? 'None'}
									</dd>
								</div>
								<div className="sm:col-span-1">
									<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Y Accelerometer</dt>
									<dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
										{toolhead.getConfig().yAccelerometer?.title ?? 'None'}
									</dd>
								</div>
							</dl>
						</Disclosure.Panel>
					</AnimatedContainer>
				</>
			)}
		</Disclosure>
	);
};

export const ConfirmConfig: React.FC<StepScreenProps> = (props) => {
	const { parsedPrinterConfiguration, partialPrinterConfiguration } = usePrinterConfiguration();

	const serializedPrinterConfiguration = useMemo(() => {
		if (parsedPrinterConfiguration.success === true) {
			return serializePrinterConfiguration(parsedPrinterConfiguration.data);
		}
		return null;
	}, [parsedPrinterConfiguration]);

	const errors: React.ReactNode[] = [];

	const [filesToOverwrite, setFilesToOverwrite] = useState<string[]>([]);

	const [filesToIgnore, setFilesToIgnore] = useState<string[]>([]);

	const controlboardDetected = trpc.mcu.detect.useQuery(
		{ boardPath: partialPrinterConfiguration != null ? partialPrinterConfiguration.controlboard?.path ?? '' : '' },
		{
			enabled: partialPrinterConfiguration?.controlboard != null,
		},
	);
	const saveConfigurationMutation = trpc.printer.saveConfiguration.useMutation();
	const saveConfiguration = useCallback(async () => {
		if (parsedPrinterConfiguration.success) {
			saveConfigurationMutation.mutate(
				{
					config: serializePrinterConfiguration(parsedPrinterConfiguration.data),
					overwriteFiles: filesToOverwrite,
					skipFiles: filesToIgnore,
				},
				{
					onSuccess: props.nextScreen,
					onError: () => window.scrollTo(0, 0),
				},
			);
		}
	}, [parsedPrinterConfiguration, saveConfigurationMutation, filesToOverwrite, filesToIgnore, props.nextScreen]);

	const client = trpc.useUtils().client;
	const filesToWrite = useQuery({
		queryKey: ['filesToWrite', serializedPrinterConfiguration],
		queryFn: async () => {
			const res = await client.printer.getFilesToWrite.mutate({
				config: serializedPrinterConfiguration ?? ({} as any),
			});
			return res;
		},
		enabled: parsedPrinterConfiguration.success,
	});

	const requiresExplicitFileActions = filesToWrite.data?.some(
		(f) =>
			f.state === 'changed' &&
			f.changedFromConfig === true &&
			f.overwrite === false &&
			!filesToIgnore.includes(f.fileName) &&
			!filesToOverwrite.includes(f.fileName),
	);

	if (saveConfigurationMutation.error) {
		errors.push(saveConfigurationMutation.error.message);
	}
	if (parsedPrinterConfiguration.success === false) {
		// console.error(parsedPrinterConfiguration.error);
		const formErrors = parsedPrinterConfiguration.error.flatten().formErrors;
		const fieldErrors = parsedPrinterConfiguration.error.flatten().fieldErrors;
		if (formErrors.length) {
			formErrors.forEach((message) => {
				errors.push(message);
			});
		} else {
			for (const field in fieldErrors) {
				errors.push(
					<>
						<span className="capitalize">{field}</span>: {fieldErrors[field as keyof PrinterConfiguration]?.[0]}
					</>,
				);
			}
		}
	}

	const motionErrors = useMemo(() => {
		if (parsedPrinterConfiguration.success) {
			return parsedPrinterConfiguration.data.rails
				.filter((r) => r.axis.startsWith('x') || r.axis.startsWith('y'))
				?.map((rail) => {
					const board = parsedPrinterConfiguration.data.controlboard;
					const motorSlot = rail.motorSlot;
					if (motorSlot == null || board?.motorSlots?.[motorSlot].title == null) {
						return null;
					}
					const hasDiagPin = board.motorSlots?.[motorSlot].diag_pin != null;
					const isSensorless =
						(rail.axis.startsWith('x') &&
							parsedPrinterConfiguration.data.toolheads.some((t) => t.xEndstop?.id === 'sensorless')) ||
						(rail.axis.startsWith('y') &&
							parsedPrinterConfiguration.data.toolheads.some((t) => t.yEndstop?.id === 'sensorless'));
					return !hasDiagPin && isSensorless ? (
						<ErrorMessage key={rail.axis} className="col-span-2" title="Driver Slot Allocation Invalid">
							<div className="space-y-2">
								<div>
									<span className="capitalize">{rail.axis}</span> is configured to use sensorless homing, but the{' '}
									<span className="capitalize">{board.motorSlots?.[motorSlot].title}</span> motor slot does not have a
									diag pin connected.
								</div>
							</div>
						</ErrorMessage>
					) : null;
				})
				.filter(Boolean);
		}
		return null;
	}, [parsedPrinterConfiguration]);

	return (
		<>
			<div className="p-8">
				{' '}
				<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">{props.name}</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">{props.description}</p>
				</div>
				<div className="space-y-4 text-zinc-700 dark:text-zinc-300">
					{parsedPrinterConfiguration.success && (
						<div>
							{errors.length > 0 && (
								<div className="mt-2">
									<ErrorMessage>
										{errors.map((e, i) => (
											<div className="mt-2" key={i}>
												{e}
											</div>
										))}
									</ErrorMessage>
								</div>
							)}
							<AnimatedContainer className="mt-4">
								<Disclosure as={Fragment}>
									{({ open }) => (
										<>
											<Disclosure.Button as="div" className="border-b border-zinc-100 py-4 dark:border-zinc-800">
												<div className="flex cursor-pointer items-center justify-between">
													<h3 className="flex items-center space-x-2 text-base font-bold leading-7 text-zinc-900 dark:text-zinc-100">
														<span>General</span>
														{parsedPrinterConfiguration.data.controlboard != null && !controlboardDetected.data && (
															<Badge color="yellow">Has Warnings</Badge>
														)}
													</h3>
													<button>
														<ChevronRightIcon
															className={twJoin(
																'h-6 w-6 transition-all duration-200 ease-in-out',
																open ? 'rotate-90' : 'rotate-0',
															)}
														/>
													</button>
												</div>
											</Disclosure.Button>
											<Disclosure.Panel as="dl" className="grid grid-cols-1 gap-x-4 gap-y-4 py-4 sm:grid-cols-2">
												<div className="sm:col-span-2">
													<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Printer</dt>
													<dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
														{parsedPrinterConfiguration.data.printer != null
															? `${parsedPrinterConfiguration.data.printer.manufacturer} ${parsedPrinterConfiguration.data.printer.name} ${Object.keys(parsedPrinterConfiguration.data.printer.sizes).length > 1 ? parsedPrinterConfiguration.data.size.x : ''}`
															: 'None selected'}
													</dd>
												</div>
												<div className="sm:col-span-1">
													<dt className="space-x-2 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
														<span>Controlboard</span>
														{parsedPrinterConfiguration.data.controlboard && (
															<Badge color={controlboardDetected.data === true ? 'green' : 'red'}>
																{controlboardDetected.data === true ? 'Detected' : 'Not detected'}
															</Badge>
														)}
													</dt>
													<dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
														{parsedPrinterConfiguration.data.controlboard != null
															? `${parsedPrinterConfiguration.data.controlboard.manufacturer} ${parsedPrinterConfiguration.data.controlboard.name}`
															: 'None selected'}
													</dd>
												</div>
												<div className="sm:col-span-1">
													<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
														Controller cooling fan
													</dt>
													<dd className="mt-1 flex gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
														{parsedPrinterConfiguration.data.controllerFan?.title ?? 'None selected'}
														{parsedPrinterConfiguration.data.controllerFan?.badge?.map((b) => (
															<Badge color={b.color} key={b.children}>
																{b.children}
															</Badge>
														))}
													</dd>
												</div>
												{parsedPrinterConfiguration.data.controlboard != null && !controlboardDetected.data && (
													<div className="sm:col-span-2">
														<WarningMessage>
															<div className="space-y-2">
																<div>
																	The controlboard you have selected does not seem to be connected, you can still save
																	the config and proceed to mainsail, but you will get an 'mcu' connection error.
																</div>
															</div>
														</WarningMessage>
													</div>
												)}
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
								<div className="">
									{parsedPrinterConfiguration.data.toolheads.map((tool) => (
										<ConfirmToolhead key={tool.axis} toolOrAxis={tool.axis} />
									))}
								</div>
								<Disclosure as={Fragment} defaultOpen={false}>
									{({ open }) => (
										<>
											<Disclosure.Button as="div" className="border-b border-zinc-100 py-4 dark:border-zinc-800">
												<div className="flex cursor-pointer items-center justify-between">
													<h3 className="flex items-center space-x-2 text-base font-bold leading-7 text-zinc-900 dark:text-zinc-100">
														<span>Motion</span>
														{(motionErrors?.length ?? 0) > 0 && <Badge color="red">Has Errors</Badge>}
													</h3>
													<button>
														<ChevronRightIcon
															className={twJoin(
																'h-6 w-6 transition-all duration-200 ease-in-out',
																open ? 'rotate-90' : 'rotate-0',
															)}
														/>
													</button>
												</div>
											</Disclosure.Button>
											<Disclosure.Panel>
												<dl className="grid grid-cols-1 gap-x-4 gap-y-4 py-4 sm:grid-cols-2">
													<div className="sm:col-span-1">
														<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
															Performance mode
														</dt>
														<dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
															{parsedPrinterConfiguration.data.performanceMode ? 'Enabled' : 'Disabled'}
														</dd>
													</div>
													<div className="sm:col-span-1">
														<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
															Stealtchop
														</dt>
														<dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
															{parsedPrinterConfiguration.data.stealthchop ? 'Enabled' : 'Disabled'}
														</dd>
													</div>
													<div className="sm:col-span-1">
														<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
															Standstill Stealth
														</dt>
														<dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
															{parsedPrinterConfiguration.data.standstillStealth ? 'Enabled' : 'Disabled'}
														</dd>
													</div>
												</dl>
												<dl className="grid grid-cols-1 gap-x-4 gap-y-4 border-t border-zinc-100 py-4 dark:border-zinc-700 sm:grid-cols-2">
													{parsedPrinterConfiguration.data.rails?.map((rail, i) => (
														<div className="sm:col-span-1" key={i}>
															<dt className="text-sm font-medium capitalize leading-6 text-zinc-900 dark:text-zinc-100">
																{rail.axis === PrinterAxis.extruder ? rail.axis : rail.axis.toLocaleUpperCase()} Motion
																Configuration
															</dt>
															<dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-2">
																<div className="font-medium">
																	{rail.driver.title} @ {rail.voltage}V
																</div>
																<div className="font-medium">
																	{rail.stepper.title} @ {rail.current}A RMS
																</div>
																<div className="font-medium">{rail.microstepping} microsteps</div>
															</dd>
														</div>
													))}
												</dl>
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>

								<div className="mb-5 mt-10 border-b border-zinc-200 pb-5 dark:border-zinc-700">
									<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">
										Configuration Files
									</h3>
									<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">
										Please review the changes to the configuration files.
									</p>
								</div>
								<dl className="grid grid-cols-1 gap-x-4 gap-y-4 pb-4 sm:grid-cols-2">
									<div className="dark:border-zinc-700 sm:col-span-2">
										<FileChanges
											serializedConfig={parsedPrinterConfiguration.success ? serializedPrinterConfiguration : null}
											onFilesToIgnoreChange={setFilesToIgnore}
											onFilesToOverwriteChange={setFilesToOverwrite}
										/>
									</div>
								</dl>
								<dl className="grid grid-cols-1 gap-x-4 gap-y-4 border-zinc-100 dark:border-zinc-700 sm:grid-cols-2">
									<div className="dark:border-zinc-700 sm:col-span-2">
										<InfoMessage>
											<ul className="ml-4 list-disc space-y-2">
												<li>
													If the above information is correct, and you agree with the changes, go ahead and save the
													configuration. If not, go back and change the configuration by clicking the steps in the
													"Setup Progress" panel.
												</li>
												<li>
													If you are unsure about the changes to a modified file, remember there's always a timestamped
													backup created next to the given file when a file is overwritten, you can easily copy paste
													from the old backup file in the Machine tab in mainsail, in case things go wrong.
												</li>
											</ul>
										</InfoMessage>
									</div>
								</dl>
							</AnimatedContainer>
						</div>
					)}
				</div>
			</div>
			<StepNavButtons
				left={{ onClick: props.previousScreen }}
				right={{
					onClick: saveConfiguration,
					disabled:
						!parsedPrinterConfiguration.success || (motionErrors?.length ?? 0) > 0 || requiresExplicitFileActions,
					title: requiresExplicitFileActions
						? 'You need to explicitly overwrite or ignore one or more files'
						: undefined,
					isLoading: saveConfigurationMutation.isLoading,
					label: 'Confirm and save',
				}}
			/>
		</>
	);
};

export const ProceedToMainsail: React.FC<StepScreenProps> = (props) => {
	const openMainsail = () => {
		window.location.href = 'http://' + window.location.hostname;
	};
	return (
		<>
			<div className="p-8">
				{' '}
				<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">{props.name}</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">{props.description}</p>
				</div>
				<div className="space-y-4 text-zinc-700 dark:text-zinc-300">
					Now that the base configuration has been saved, you can connect to your printer via Mainsail and start
					calibrating your printer.
					<div className="mt-5">
						You can now continue to{' '}
						<a
							href="https://os.ratrig.com/docs/configuration#initial-configuration"
							target="_blank"
							rel="noreferrer"
							className="cursor-pointer text-brand-700 hover:text-brand-600"
						>
							the next step in the documentation.
						</a>
					</div>
				</div>
			</div>
			<StepNavButtons
				left={{ onClick: props.previousScreen }}
				right={{
					onClick: openMainsail,
					label: 'Open Mainsail',
				}}
			/>
		</>
	);
};

export const WizardComplete: React.FC<StepScreenProps> = (props) => {
	const { currentStep, screenProps } = useSteps({
		steps: CompletionSteps,
		parentScreenProps: props,
	});

	return currentStep.renderScreen({
		...screenProps,
	});
};
