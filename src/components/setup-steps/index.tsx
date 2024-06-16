import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { ToolheadHelper } from '@/helpers/toolhead';
import { StepScreen, useSteps } from '@/hooks/useSteps';
import { LoadablePrinterToolheadsState } from '@/recoil/toolhead';
import { ToolheadConfiguration } from '@/zods/toolhead';
import { Spinner } from '@/components/common/spinner';
import { VerticalSteps } from '@/components/common/vertical-steps';
import { HardwareSelection } from '@/components/setup-steps/hardware-selection';
import { MCUPreparation } from '@/components/setup-steps/mcu-preparation';
import { PrinterSelection } from '@/components/setup-steps/printer-selection';
import { WifiSetup } from '@/components/setup-steps/wifi-setup';
import { WizardComplete } from '@/components/setup-steps/wizard-complete';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLocalPathname } from '@/app/_hooks/navigation';
import { Card } from '@/components/common/card';

interface WizardProps {
	isConnectedToWifi?: boolean;
	hasWifiInterface?: boolean;
}

const makeSteps = (toolheads: ToolheadConfiguration<any>[], isConfigValid: boolean): StepScreen[] => {
	let nextIndex = 0;
	const getNextIndex = () => {
		nextIndex++;
		return (nextIndex + '').padStart(2, '0');
	};
	const result: StepScreen[] = [
		{
			id: getNextIndex(),
			name: 'Network connectivity',
			description: 'Setup Wifi or Ethernet connectivity',
			href: '#',
			renderScreen: (screenProps) => <WifiSetup {...screenProps} key={screenProps.key} />,
		},
		{
			id: getNextIndex(),
			name: 'Printer Selection',
			description: 'Select the printer you want to configure',
			href: '#',
			renderScreen: (screenProps) => <PrinterSelection {...screenProps} key={screenProps.key} />,
		},
		{
			id: getNextIndex(),
			name: 'Control board preparation',
			canBeSkippedTo: isConfigValid,
			description: 'Connect to and flash your control board',
			href: '#',
			renderScreen: (screenProps) => <MCUPreparation {...screenProps} key={screenProps.key} />,
		},
	];
	toolheads.forEach((toolhead) => {
		const th = new ToolheadHelper(toolhead);
		result.push({
			id: getNextIndex(),
			name: `${th.getToolCommand()} Toolboard Preparation`,
			canBeSkippedTo: isConfigValid,
			description: `Connect to and flash an optional toolboard located on ${th.getDescription().toLocaleLowerCase()}`,
			href: '#',
			renderScreen: (screenProps) => (
				<MCUPreparation {...screenProps} key={screenProps.key} toolOrAxis={toolhead.axis} />
			),
		});
	});
	result.push({
		id: getNextIndex(),
		name: 'Hardware Selection',
		canBeSkippedTo: isConfigValid,
		description: 'Tell RatOS about that hardware you have installed on your printer',
		href: '#',
		renderScreen: (screenProps) => <HardwareSelection {...screenProps} key={screenProps.key} />,
	});
	result.push({
		id: getNextIndex(),
		name: 'Confirm your setup',
		canBeSkippedTo: isConfigValid,
		description: 'Confirm your setup and start printing',
		href: '#',
		renderScreen: (screenProps) => <WizardComplete {...screenProps} key={screenProps.key} />,
	});
	// {
	// 	id: '06',
	// 	name: 'Kinematics',
	// 	description: 'Check directionality of your steppers',
	// 	href: '#',
	// 	renderScreen: (screenProps) => <CoreXYKinematics {...screenProps} />,
	// },
	// {
	// 	id: '07',
	// 	name: 'Heaters',
	// 	description: 'Calibrate your heaters',
	// 	href: '#',
	// 	renderScreen: () => null,
	// },
	return result;
};

const LoadScreen: React.FC = () => {
	return (
		<div className="">
			<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700">
				<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">
					Loading printer configuration...
				</h3>
				<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">
					Please wait while RatOS loads your printer configuration
				</p>
			</div>
			<div className="mt-4 flex h-48 items-center justify-center">
				<Spinner />
			</div>
		</div>
	);
};

export const SetupSteps: React.FC<WizardProps> = (props) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = useLocalPathname();
	const ths = useRecoilValue(LoadablePrinterToolheadsState);
	const steps = useMemo(() => makeSteps(ths, ths?.length > 0), [ths]);
	const uriStep = searchParams?.get('step') ? parseInt(searchParams?.get('step') ?? '', 10) : null;
	const defaultStep = props.hasWifiInterface && !props.isConnectedToWifi ? 0 : 1;

	const { currentStepIndex, setCurrentStepIndex, screenProps, currentStep } = useSteps({
		step: uriStep != null && uriStep < steps.length ? uriStep : defaultStep,
		onStepChange: (step) => {
			'use client';
			router.push(`${pathname}?step=${step}`, undefined);
			window.scrollTo(0, 0);
		},
		steps,
	});

	const isReady = uriStep == null || uriStep === currentStepIndex;

	return (
		<div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 px-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
			<div className="lg:col-span-2 lg:col-start-1">
				<Card>
					<React.Suspense fallback={<LoadScreen />}>
						{isReady ? currentStep.renderScreen(screenProps) : <LoadScreen />}
					</React.Suspense>
				</Card>
			</div>
			<div className="space-y-6 lg:col-span-1 lg:col-start-3">
				<Card className="p-8">
					<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-800">
						<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">Setup Progress</h3>
					</div>
					<VerticalSteps
						steps={steps}
						screenProps={screenProps}
						currentStepIndex={currentStepIndex}
						setCurrentStepIndex={setCurrentStepIndex}
					/>
				</Card>
			</div>
		</div>
	);
};
