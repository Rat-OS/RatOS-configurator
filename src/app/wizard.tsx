'use client';

import { KlippyStateBadge } from '../components/klippy-state-badge';
import { MoonrakerStateBadge } from '../components/moonraker-state-badge';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from '../helpers/trpc';
import { ActionsDropdown } from '../components/common/actions-dropdown';
import { RecoilRoot } from 'recoil';
import { SyncWithMoonraker } from '../components/sync-with-moonraker';
import React from 'react';
import { useIsClient } from '../hooks/isClient';
import { Spinner } from '../components/spinner';
import { SetupSteps } from '../components/setup-steps';

// Create a client
const queryClient = new QueryClient();

interface WizardProps {
	isConnectedToWifi?: boolean;
	hasWifiInterface?: boolean;
}

export const Wizard: React.FC<WizardProps> = (props) => {
	const { data: version } = trpc.version.useQuery();
	const { data: ip } = trpc.ipAddress.useQuery();
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
						<SetupSteps {...props} />
					</React.Suspense>
				</SyncWithMoonraker>
			</RecoilRoot>
		</QueryClientProvider>
	);
};
