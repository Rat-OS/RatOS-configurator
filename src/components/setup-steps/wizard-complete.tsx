'use client';
import React, { useCallback, useState } from 'react';
import { PrinterConfigurationState, XEndstopState, usePrinterConfiguration } from '../../hooks/usePrinterConfiguration';
import { StepScreen, StepScreenProps, useSteps } from '../../hooks/useSteps';
import { StepNavButtons } from '../step-nav-buttons';
import { ErrorMessage } from '../error-message';
import { trpc } from '../../helpers/trpc';
import { Badge } from '../common/badge';
import { InfoMessage } from '../info-message';
import { WarningMessage } from '../warning-message';
import { Button } from '../button';
import { useRecoilCallback } from 'recoil';
import { xEndstopOptions } from '../../data/endstops';
import { PrinterConfiguration } from '../../zods/printer-configuration';

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

export const ConfirmConfig: React.FC<StepScreenProps> = (props) => {
	const { parsedPrinterConfiguration, partialPrinterConfiguration, queryErrors } = usePrinterConfiguration();
	const [ignoreEndstopWarning, setIgnoreEndstopWarning] = useState(false);

	const setToolboardEndstop = useRecoilCallback(
		({ snapshot, set }) =>
			async () => {
				const printerConfig = await snapshot.getPromise(PrinterConfigurationState);
				if (printerConfig == null) {
					return;
				}
				const toolboardEndstop = xEndstopOptions(printerConfig).find((x) => x.id === 'endstop-toolboard');
				if (toolboardEndstop != null) {
					set(XEndstopState, toolboardEndstop);
				}
			},
		[],
	);

	const errors: React.ReactNode[] = queryErrors.slice();

	const controlboardDetected = trpc.useQuery(
		[
			'mcu.detect',
			{ boardPath: partialPrinterConfiguration != null ? partialPrinterConfiguration.controlboard?.path ?? '' : '' },
		],
		{
			enabled: partialPrinterConfiguration?.controlboard != null,
		},
	);
	const toolboardDetected = trpc.useQuery(
		[
			'mcu.detect',
			{ boardPath: partialPrinterConfiguration != null ? partialPrinterConfiguration.toolboard?.path ?? '' : '' },
		],
		{
			enabled: partialPrinterConfiguration != null && partialPrinterConfiguration.toolboard != null,
		},
	);

	const saveConfigurationMutation = trpc.useMutation('printer.save-configuration');
	const saveConfiguration = useCallback(async () => {
		if (parsedPrinterConfiguration.success) {
			const lol = saveConfigurationMutation.mutate(parsedPrinterConfiguration.data, {
				onSuccess: props.nextScreen,
			});
		}
	}, [parsedPrinterConfiguration, saveConfigurationMutation, props.nextScreen]);

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

	return (
		<>
			<div className="p-8">
				{' '}
				<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">{props.name}</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">{props.description}</p>
				</div>
				<div className="space-y-4 text-zinc-700 dark:text-zinc-300">
					{partialPrinterConfiguration != null && (
						<div>
							<div className="">
								<h3 className="text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100">
									The following setup will be written to the klipper config
								</h3>
							</div>
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
							<div className="mt-4">
								<dl className="grid grid-cols-1 gap-y-4 gap-x-4 border-t border-zinc-100 py-4 dark:border-zinc-700 sm:grid-cols-2">
									<div className="sm:col-span-2">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Printer</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{partialPrinterConfiguration.printer != null
												? `${partialPrinterConfiguration.printer.manufacturer} ${partialPrinterConfiguration.printer.name} ${partialPrinterConfiguration.size}`
												: 'None selected'}
										</dd>
									</div>
									<div className="sm:col-span-1">
										<dt className="space-x-2 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
											<span>Controlboard</span>
											{partialPrinterConfiguration.controlboard && (
												<Badge color={controlboardDetected.data === true ? 'green' : 'red'}>
													{controlboardDetected.data === true ? 'Detected' : 'Not detected'}
												</Badge>
											)}
										</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{partialPrinterConfiguration.controlboard != null
												? `${partialPrinterConfiguration.controlboard.manufacturer} ${partialPrinterConfiguration.controlboard.name}`
												: 'None selected'}
										</dd>
									</div>
									<div className="sm:col-span-1">
										<dt className="space-x-2 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
											<span>Toolboard</span>{' '}
											{partialPrinterConfiguration.toolboard && (
												<Badge color={toolboardDetected.data === true ? 'green' : 'red'}>
													{toolboardDetected.data === true ? 'Detected' : 'Not detected'}
												</Badge>
											)}
										</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{partialPrinterConfiguration.toolboard == null
												? 'None selected'
												: `${partialPrinterConfiguration.toolboard?.manufacturer} ${partialPrinterConfiguration.toolboard?.name}`}
										</dd>
									</div>
									{((partialPrinterConfiguration.toolboard != null && !toolboardDetected.data) ||
										(partialPrinterConfiguration.controlboard != null && !controlboardDetected.data)) && (
										<div className="sm:col-span-2">
											<WarningMessage className="mt-1 sm:mt-2">
												<div className="space-y-2">
													{partialPrinterConfiguration.toolboard != null && !toolboardDetected.data && (
														<div>
															The toolboard you have selected does not seem to be connected, you can still save the
															config and proceed to mainsail, but you will get an 'mcu' connection error.
														</div>
													)}
													{partialPrinterConfiguration.controlboard != null && !controlboardDetected.data && (
														<div>
															The controlboard you have selected does not seem to be connected, you can still save the
															config and proceed to mainsail, but you will get an 'mcu' connection error.
														</div>
													)}
												</div>
											</WarningMessage>
										</div>
									)}
								</dl>
								<dl className="grid grid-cols-1 gap-y-4 gap-x-4 border-t border-zinc-100 py-4 dark:border-zinc-700 sm:grid-cols-2">
									<div className="sm:col-span-1">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Hotend</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{partialPrinterConfiguration.hotend?.title ?? 'None selected'}
										</dd>
									</div>
									<div className="sm:col-span-1">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Thermistor</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{partialPrinterConfiguration.thermistor ?? 'None selected'}
										</dd>
									</div>
									<div className="sm:col-span-1">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Extruder</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{partialPrinterConfiguration.extruder?.title ?? 'None selected'}
										</dd>
									</div>
									<div className="sm:col-span-1">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Probe</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{partialPrinterConfiguration.probe?.title ?? 'None selected'}
										</dd>
									</div>
								</dl>
								<dl className="grid grid-cols-1 gap-y-4 gap-x-4  border-t border-zinc-100 py-4 dark:border-zinc-700 sm:grid-cols-2">
									<div className="sm:col-span-1">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">X Endstop</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{partialPrinterConfiguration.xEndstop?.title ?? 'None selected'}
										</dd>
									</div>
									<div className="sm:col-span-1">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Y Endstop</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{partialPrinterConfiguration.yEndstop?.title ?? 'None selected'}
										</dd>
									</div>
									{partialPrinterConfiguration.toolboard != null &&
										partialPrinterConfiguration.xEndstop?.id === 'endstop' &&
										!ignoreEndstopWarning && (
											<div className="sm:col-span-2">
												<WarningMessage className="mt-1 sm:mt-2">
													The current configuration assumes the X endstop is connected to your controlboard, do you want
													to use an endstop connected to the toolboard instead?
													<div className="mt-4 flex justify-end space-x-2">
														<Button onClick={setToolboardEndstop} color="warning">
															Yes, use the toolboard connection
														</Button>
														<Button onClick={() => setIgnoreEndstopWarning(true)} color="plain">
															No, use the controlboard connection
														</Button>
													</div>
												</WarningMessage>
											</div>
										)}
									<div className="border-t border-zinc-100 pt-5 dark:border-zinc-700 sm:col-span-2">
										<InfoMessage className="mt-1 sm:mt-2">
											If the above information is correct, go ahead and save the configuration. If not, go back and
											change the configuration by clicking the steps in the "Setup Progress" panel.
										</InfoMessage>
									</div>
								</dl>
							</div>
						</div>
					)}
				</div>
			</div>
			<StepNavButtons
				left={{ onClick: props.previousScreen }}
				right={{
					onClick: saveConfiguration,
					disabled: !parsedPrinterConfiguration.success,
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
