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

export interface StepScreenProps {
	nextScreen?: () => void;
	previousScreen?: () => void;
	hasNextScreen: boolean;
	hasPreviousScreen: boolean;
}
interface StepScreen {
	renderScreen: (screenProps: StepScreenProps) => JSX.Element | null;
}

// Create a client
const queryClient = new QueryClient();

const steps: (Step & StepScreen)[] = [
	{
		id: '00',
		name: 'Wifi Setup',
		description: 'Setup Wifi Connectivity',
		href: '#',
		renderScreen: (screenProps) => <WifiSetup {...screenProps} />,
	},
	// {
	// 	id: '01',
	// 	name: 'MCU Preparation',
	// 	description: 'Initial firmware flashing and connectivity',
	// 	href: '#',
	// 	renderScreen: (screenProps) => <MCUPreparation {...screenProps} />,
	// },
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
	const [currentStepIndex, setCurrentStepIndex] = useState(
		uriStep != null && !isNaN(uriStep) ? uriStep : props.isConnectedToWifi && steps.length > 1 ? 1 : 0,
	);
	const currentStepRef = useRef(currentStepIndex);
	currentStepRef.current = currentStepIndex;
	useEffect(() => {
		if (uriStep && !isNaN(uriStep) && uriStep !== currentStepRef.current) {
			setCurrentStepIndex(uriStep);
		}
	}, [uriStep]);
	const hasNextScreen = currentStepIndex < steps.length - 1;
	const hasPreviousScreen = currentStepIndex > 0;
	const incrementStep = useCallback(() => {
		setCurrentStepIndex((csi) => {
			router.push('/?step=' + (csi + 1), undefined, { shallow: true });
			return csi + 1;
		});
	}, [router]);
	const decrementStep = useCallback(() => {
		setCurrentStepIndex((csi) => {
			router.push('/?step=' + (csi - 1), undefined, { shallow: true });
			return csi - 1;
		});
	}, [router]);
	const screenProps: StepScreenProps = {
		hasNextScreen: hasNextScreen,
		hasPreviousScreen: hasPreviousScreen,
		nextScreen: hasNextScreen ? incrementStep : undefined,
		previousScreen: hasPreviousScreen ? decrementStep : undefined,
	};

	return (
		<QueryClientProvider client={queryClient}>
			<React.Fragment>
				<Head>
					<title>RatOS Configurator</title>
					<link rel='icon' href='/favicon.ico' />
				</Head>
				{/* Page header */}
				<div className='max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8'>
					<div className='flex items-center space-x-5'>
						<div>
							<h1 className='text-2xl font-bold text-gray-900'>Printer Setup</h1>
							<p className='text-sm font-medium text-gray-500'>RatOS Version v1.0.1</p>
						</div>
					</div>
					<div className='mt-6 flex space-x-1 sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
						<KlippyStateBadge />
						<MoonrakerStateBadge />
					</div>
				</div>
				{/* Page body */}
				<div className='mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
					<div className='lg:col-start-1 lg:col-span-2'>
						<div className='bg-white rounded-lg shadow overflow-hidden '>
							{steps[currentStepIndex].renderScreen(screenProps)}
						</div>
					</div>
					<div className='space-y-6 lg:col-start-3 lg:col-span-1'>
						<div className='bg-white rounded-lg shadow overflow-hidden p-8'>
							<div className='pb-5 mb-5 border-b border-gray-200'>
								<h3 className='text-lg leading-6 font-medium text-gray-900'>Setup Progress</h3>
							</div>
							<VerticalSteps steps={steps} currentStepIndex={currentStepIndex} />
						</div>
					</div>
				</div>
			</React.Fragment>
		</QueryClientProvider>
	);
};

export default Home;
