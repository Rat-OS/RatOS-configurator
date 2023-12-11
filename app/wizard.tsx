'use client';

import { KlippyStateBadge } from '../components/klippy-state-badge';
import { MoonrakerStateBadge } from '../components/moonraker-state-badge';
import { VerticalSteps } from '../components/vertical-steps';
import { PrinterSelection } from '../components/setup-steps/printer-selection';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WifiSetup } from '../components/setup-steps/wifi-setup';
import { MCUPreparation } from '../components/setup-steps/mcu-preparation';
import { useRouter } from 'next/router';
import { StepScreen, useSteps } from '../hooks/useSteps';
import { trpc } from '../helpers/trpc';
import { WizardComplete } from '../components/setup-steps/wizard-complete';
import { ActionsDropdown } from '../components/common/actions-dropdown';
import { HardwareSelection } from '../components/setup-steps/hardware-selection';
import { RecoilRoot } from 'recoil';
import { SyncWithMoonraker } from '../components/sync-with-moonraker';
import React from 'react';
import { useIsClient } from '../hooks/isClient';
import { Spinner } from '../components/spinner';

// Create a client
const queryClient = new QueryClient();

const steps: StepScreen[] = [
	{
		id: '00',
		name: 'Network connectivity',
		description: 'Setup Wifi or Ethernet',
		href: '#',
		renderScreen: (screenProps) => <WifiSetup {...screenProps} key={screenProps.key} />,
	},
	{
		id: '01',
		name: 'Printer Selection',
		description: 'Select your printer',
		href: '#',
		renderScreen: (screenProps) => <PrinterSelection {...screenProps} key={screenProps.key} />,
	},
	{
		id: '02',
		name: 'Control board preparation',
		description: 'Firmware flashing and connectivity',
		href: '#',
		renderScreen: (screenProps) => <MCUPreparation {...screenProps} key={screenProps.key} />,
	},
	{
		id: '03',
		name: 'Toolboard Preparation',
		description: 'Firmware flashing and connectivity',
		href: '#',
		renderScreen: (screenProps) => <MCUPreparation {...screenProps} key={screenProps.key} toolboards={true} />,
	},
	{
		id: '04',
		name: 'Hardware Selection',
		description: 'Select your printer',
		href: '#',
		renderScreen: (screenProps) => <HardwareSelection {...screenProps} key={screenProps.key} />,
	},
	{
		id: '05',
		name: 'Confirm your setup',
		description: 'Confirm your setup and start printing',
		href: '#',
		renderScreen: (screenProps) => <WizardComplete {...screenProps} key={screenProps.key} />,
	},
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

interface WizardProps {
	isConnectedToWifi?: boolean;
	hasWifiInterface?: boolean;
}

export const Wizard: React.FC<WizardProps> = (props) => {
	const router = useRouter();
	const uriStep = router.query.step ? parseInt(router.query.step as string, 10) : null;
	const defaultStep = props.hasWifiInterface && !props.isConnectedToWifi ? 0 : 1;
	const { data: version } = trpc.version.useQuery();
	const { data: ip } = trpc.ipAddress.useQuery();
	const { currentStepIndex, setCurrentStepIndex, screenProps, currentStep } = useSteps({
		step: uriStep != null ? uriStep : defaultStep,
		onStepChange: (step) => {
			router.push('/?step=' + step, undefined, { shallow: true });
			window.scrollTo(0, 0);
		},
		steps,
	});
	const isClient = useIsClient();
	return !isClient ? null : (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<SyncWithMoonraker>
					<React.Suspense
						fallback={
							<div className="mb-4 flex h-96 items-center justify-center">
								<Spinner />
							</div>
						}
					>
						{/* Page header */}
						<div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
							<div className="flex items-center space-x-5">
								<div>
									<h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Printer Setup</h1>
									<p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
										RatOS {version} @ {ip}
									</p>
								</div>
							</div>
							<div className="mt-6 md:mt-0">
								<div className="flex space-x-1 sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:flex-row md:space-x-3">
									<KlippyStateBadge />
									<MoonrakerStateBadge />
								</div>
								<div className="mt-2 flex justify-end">
									<ActionsDropdown />
								</div>
							</div>
						</div>
						{/* Page body */}
						<div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
							<div className="lg:col-span-2 lg:col-start-1">
								<div className="relative rounded-lg bg-white shadow dark:bg-zinc-800">
									{currentStep.renderScreen(screenProps)}
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
					</React.Suspense>
				</SyncWithMoonraker>
			</RecoilRoot>
		</QueryClientProvider>
	);
};
