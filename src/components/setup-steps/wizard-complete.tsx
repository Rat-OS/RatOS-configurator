'use client';
import React, { useCallback } from 'react';
import { usePrinterConfiguration } from '../../hooks/usePrinterConfiguration';
import { StepScreen, StepScreenProps, useSteps } from '../../hooks/useSteps';
import { StepNavButtons } from '../step-nav-buttons';
import { ErrorMessage } from '../error-message';
import { trpc } from '../../helpers/trpc';
import { Badge } from '../common/badge';
import { InfoMessage } from '../info-message';

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
	const { parsedPrinterConfiguration, queryErrors } = usePrinterConfiguration();

	const errors = queryErrors.slice();

	const controlboardDetected = trpc.useQuery([
		'mcu.detect',
		{ boardPath: parsedPrinterConfiguration.success ? parsedPrinterConfiguration.data.controlboard.path ?? '' : '' },
	]);
	const toolboardDetected = trpc.useQuery(
		[
			'mcu.detect',
			{ boardPath: parsedPrinterConfiguration.success ? parsedPrinterConfiguration.data.toolboard?.path ?? '' : '' },
		],
		{
			enabled: parsedPrinterConfiguration.success && parsedPrinterConfiguration.data.toolboard != null,
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
		parsedPrinterConfiguration.error.flatten().formErrors.forEach((message) => {
			errors.push(message);
		});
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
					{errors.length > 0 && (
						<ErrorMessage>
							{errors.map((e) => (
								<div className="mt-2" key={e}>
									{e}
								</div>
							))}
						</ErrorMessage>
					)}
					{parsedPrinterConfiguration.success && (
						<div>
							<div className="">
								<h3 className="text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100">
									The following setup will be written to the klipper config
								</h3>
							</div>
							<div className="mt-4">
								<dl className="grid grid-cols-1 border-t border-zinc-100 dark:border-zinc-700 sm:grid-cols-2">
									<div className="py-4 sm:col-span-1">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Printer</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{parsedPrinterConfiguration.data.printer.manufacturer}{' '}
											{parsedPrinterConfiguration.data.printer.name} {parsedPrinterConfiguration.data.size}
										</dd>
									</div>
									<div className="py-4 sm:col-span-1">
										<dt className="space-x-2 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
											<span>Controlboard</span>
											<Badge color={controlboardDetected.data === true ? 'green' : 'red'}>
												{controlboardDetected.data === true ? 'Detected' : 'Not detected'}
											</Badge>
										</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{parsedPrinterConfiguration.data.controlboard.manufacturer}{' '}
											{parsedPrinterConfiguration.data.controlboard.name}
										</dd>
									</div>
									<div className="py-4 sm:col-span-1">
										<dt className="space-x-2 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">
											<span>Toolboard</span>{' '}
											{parsedPrinterConfiguration.data.toolboard && (
												<Badge color={toolboardDetected.data === true ? 'green' : 'red'}>
													{toolboardDetected.data === true ? 'Detected' : 'Not detected'}
												</Badge>
											)}
										</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{parsedPrinterConfiguration.data.toolboard == null
												? 'None'
												: `${parsedPrinterConfiguration.data.toolboard?.manufacturer} ${parsedPrinterConfiguration.data.toolboard?.name}`}
										</dd>
									</div>
								</dl>
								<dl className="grid grid-cols-1 border-t border-zinc-100 dark:border-zinc-700 sm:grid-cols-2">
									<div className="py-4 sm:col-span-1">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Hotend</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{parsedPrinterConfiguration.data.hotend.title}
										</dd>
									</div>
									<div className="py-4 sm:col-span-1">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Thermistor</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{parsedPrinterConfiguration.data.thermistor}
										</dd>
									</div>
									<div className="py-4 sm:col-span-1">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Extruder</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{parsedPrinterConfiguration.data.extruder.title}
										</dd>
									</div>
									<div className="py-4 sm:col-span-1">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Probe</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{parsedPrinterConfiguration.data.probe?.title ?? 'None'}
										</dd>
									</div>
								</dl>
								<dl className="grid grid-cols-1 border-t border-zinc-100 dark:border-zinc-700 sm:grid-cols-2">
									<div className="py-4 sm:col-span-1">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">X Endstop</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{parsedPrinterConfiguration.data.xEndstop.title}
										</dd>
									</div>
									<div className="py-4 sm:col-span-1">
										<dt className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">Y Endstop</dt>
										<dd className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300 sm:mt-2">
											{parsedPrinterConfiguration.data.yEndstop.title}
										</dd>
									</div>
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
