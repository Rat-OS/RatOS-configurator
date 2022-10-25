import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KlippyStateBadge } from '../components/klippy-state-badge';
import { MoonrakerStateBadge } from '../components/moonraker-state-badge';
import { Step } from '../components/steps';
import { VerticalSteps } from '../components/vertical-steps';
import { PrinterSelection } from '../components/setup-steps/printer-selection';
import { CoreXYKinematics } from '../components/setup-steps/corexy-kinematics';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WifiSetup } from '../components/setup-steps/wifi-setup';
import { isConnectedToWifi } from '../helpers/wpa-cli';
import { MCUPreparation } from '../components/setup-steps/mcu-preparation';
import { useRouter } from 'next/router';
import { StepScreen, useSteps } from '../hooks/useSteps';
import { trpc } from '../helpers/trpc';
import { WizardComplete } from '../components/setup-steps/wizard-complete';

// Create a client
const queryClient = new QueryClient();

const steps: StepScreen[] = [
	{
		id: '00',
		name: 'Wifi Setup',
		description: 'Setup Wifi Connectivity',
		href: '#',
		renderScreen: (screenProps) => <WifiSetup {...screenProps} />,
	},
	{
		id: '01',
		name: 'Control board preparation',
		description: 'Firmware flashing and connectivity',
		href: '#',
		renderScreen: (screenProps) => <MCUPreparation {...screenProps} />,
	},
	{
		id: '02',
		name: 'Toolboard Preparation',
		description: 'Firmware flashing and connectivity',
		href: '#',
		renderScreen: (screenProps) => <MCUPreparation {...screenProps} toolboards={true} />,
	},
	{
		id: '03',
		name: 'Configure printer in Mainsail',
		description: 'Choose your hardware and start calibrating your printer',
		href: '#',
		renderScreen: (screenProps) => <WizardComplete {...screenProps} />,
	},
	// {
	// 	id: '02',
	// 	name: 'Printer Selection',
	// 	description: 'Select your printer',
	// 	href: '#',
	// 	renderScreen: (screenProps) => <PrinterSelection {...screenProps} />,
	// },
	// {
	// 	id: '03',
	// 	name: 'Hardware Selection',
	// 	description: 'Select your hardware',
	// 	href: '#',
	// 	renderScreen: () => null,
	// },
	// {
	// 	id: '04',
	// 	name: 'Kinematics',
	// 	description: 'Check directionality of your steppers',
	// 	href: '#',
	// 	renderScreen: (screenProps) => <CoreXYKinematics {...screenProps} />,
	// },
	// {
	// 	id: '05',
	// 	name: 'Heaters',
	// 	description: 'Calibrate your heaters',
	// 	href: '#',
	// 	renderScreen: () => null,
	// },
];

export async function getServerSideProps() {
	return {
		props: {
			isConnectedToWifi: await isConnectedToWifi(),
		}, // will be passed to the page component as props
	};
}

interface IndexProps {
	isConnectedToWifi: boolean;
}

const Home: NextPage<IndexProps> = (props) => {
	const router = useRouter();
	const uriStep = router.query.step ? parseInt(router.query.step as string, 10) : null;
	const { data: version } = trpc.useQuery(['version']);
	const { data: ip } = trpc.useQuery(['ip-address']);
	const { currentStepIndex, screenProps, currentStep } = useSteps({
		step: uriStep ?? undefined,
		onIncrementStep: (step) => {
			router.push('/?step=' + step, undefined, { shallow: true });
		},
		onDecrementStep: (step) => {
			router.push('/?step=' + step, undefined, { shallow: true });
		},
		steps,
	});

	return (
		<QueryClientProvider client={queryClient}>
			<React.Fragment>
				<Head>
					<title>RatOS Configurator</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				{/* Page header */}
				<div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
					<div className="flex items-center space-x-5">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">Printer Setup</h1>
							<p className="text-sm font-medium text-gray-500">
								RatOS {version} @ {ip}
							</p>
						</div>
					</div>
					<div className="mt-6 flex space-x-1 sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
						<KlippyStateBadge />
						<MoonrakerStateBadge />
					</div>
				</div>
				{/* Page body */}
				<div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
					<div className="lg:col-start-1 lg:col-span-2">
						<div className="bg-white rounded-lg shadow overflow-hidden relative">
							{currentStep.renderScreen(screenProps)}
						</div>
					</div>
					<div className="space-y-6 lg:col-start-3 lg:col-span-1">
						<div className="bg-white rounded-lg shadow overflow-hidden p-8">
							<div className="pb-5 mb-5 border-b border-gray-200">
								<h3 className="text-lg leading-6 font-medium text-gray-900">Setup Progress</h3>
							</div>
							<VerticalSteps steps={steps} screenProps={screenProps} currentStepIndex={currentStepIndex} />
						</div>
					</div>
				</div>
			</React.Fragment>
		</QueryClientProvider>
	);
};

export default Home;
