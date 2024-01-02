import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { ToolheadHelper } from '../../helpers/toolhead';
import { StepScreen, useSteps } from '../../hooks/useSteps';
import { LoadablePrinterToolheadsState } from '../../recoil/toolhead';
import { ToolheadConfiguration } from '../../zods/toolhead';
import { Spinner } from '../common/spinner';
import { VerticalSteps } from '../common/vertical-steps';
import { HardwareSelection } from './hardware-selection';
import { MCUPreparation } from './mcu-preparation';
import { PrinterSelection } from './printer-selection';
import { WifiSetup } from './wifi-setup';
import { WizardComplete } from './wizard-complete';

interface WizardProps {
	isConnectedToWifi?: boolean;
	hasWifiInterface?: boolean;
}

const makeSteps = (toolheads: ToolheadConfiguration<any>[]): StepScreen[] => {
	let nextIndex = 0;
	const getNextIndex = () => {
		nextIndex++;
		return (nextIndex + '').padStart(2, '0');
	};
	const result: StepScreen[] = [
		{
			id: getNextIndex(),
			name: 'Network connectivity',
			description: 'Setup Wifi or Ethernet',
			href: '#',
			renderScreen: (screenProps) => <WifiSetup {...screenProps} key={screenProps.key} />,
		},
		{
			id: getNextIndex(),
			name: 'Printer Selection',
			description: 'Select your printer',
			href: '#',
			renderScreen: (screenProps) => <PrinterSelection {...screenProps} key={screenProps.key} />,
		},
		{
			id: getNextIndex(),
			name: 'Control board preparation',
			description: 'Firmware flashing and connectivity',
			href: '#',
			renderScreen: (screenProps) => <MCUPreparation {...screenProps} key={screenProps.key} />,
		},
	];
	toolheads.forEach((toolhead) => {
		const th = new ToolheadHelper(toolhead);
		result.push({
			id: getNextIndex(),
			name: `${th.getToolCommand()} Toolboard Preparation`,
			description: `Firmware flashing and connectivity for toolboard on ${th.getDescription().toLocaleLowerCase()}`,
			href: '#',
			renderScreen: (screenProps) => (
				<MCUPreparation {...screenProps} key={screenProps.key} toolOrAxis={toolhead.axis} />
			),
		});
	});
	result.push({
		id: getNextIndex(),
		name: 'Hardware Selection',
		description: 'Select your printer',
		href: '#',
		renderScreen: (screenProps) => <HardwareSelection {...screenProps} key={screenProps.key} />,
	});
	result.push({
		id: getNextIndex(),
		name: 'Confirm your setup',
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
		<div className="p-8">
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
	const router = useRouter();
	const ths = useRecoilValue(LoadablePrinterToolheadsState);
	const steps = useMemo(() => makeSteps(ths), [ths]);
	const uriStep = router.query.step ? parseInt(router.query.step as string, 10) : null;
	const defaultStep = props.hasWifiInterface && !props.isConnectedToWifi ? 0 : 1;

	const { currentStepIndex, setCurrentStepIndex, screenProps, currentStep } = useSteps({
		step: uriStep != null && uriStep < steps.length ? uriStep : defaultStep,
		onStepChange: (step) => {
			router.push('/?step=' + step, undefined, { shallow: true });
			window.scrollTo(0, 0);
		},
		steps,
	});

	const isReady = uriStep == null || uriStep === currentStepIndex;

	return (
		<div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
			<div className="lg:col-span-2 lg:col-start-1">
				<div className="relative rounded-lg bg-white shadow dark:bg-zinc-800">
					<React.Suspense fallback={<LoadScreen />}>
						{isReady ? currentStep.renderScreen(screenProps) : <LoadScreen />}
					</React.Suspense>
				</div>
			</div>
			<div className="space-y-6 lg:col-span-1 lg:col-start-3">
				<div className="overflow-hidden rounded-lg bg-white p-8 shadow dark:bg-zinc-800">
					<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-800">
						<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">Setup Progress</h3>
					</div>
					<VerticalSteps
						steps={steps}
						screenProps={screenProps}
						currentStepIndex={currentStepIndex}
						setCurrentStepIndex={setCurrentStepIndex}
					/>
				</div>
			</div>
		</div>
	);
};
