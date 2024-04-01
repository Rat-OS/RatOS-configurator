'use client';

import { KlippyStateBadge } from '@/components/klippy-state-badge';
import { MoonrakerStateBadge } from '@/components/moonraker-state-badge';
import { trpc } from '@/helpers/trpc';
import { ActionsDropdown } from '@/components/common/actions-dropdown';
import React from 'react';
import { useIsClient } from '@/hooks/isClient';
import { Spinner } from '@/components/common/spinner';
import { SetupSteps } from '@/components/setup-steps';

interface WizardProps {
	isConnectedToWifi?: boolean;
	hasWifiInterface?: boolean;
}

export const Wizard: React.FC<WizardProps> = (props) => {
	const { data: version } = trpc.version.useQuery(undefined, { keepPreviousData: true, refetchOnMount: false });
	const { data: ip } = trpc.ipAddress.useQuery(undefined, { keepPreviousData: true, refetchOnMount: false });
	return (
		<>
			{/* Page header */}
			<div className="mx-auto max-w-3xl px-4 md:flex md:items-center md:justify-between md:space-x-4 lg:max-w-7xl">
				<div className="flex items-center">
					<div>
						<h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Printer Setup</h1>
						<p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
							RatOS {version} @ {ip}
						</p>
					</div>
				</div>
				<div className="mt-6 flex flex-col items-stretch md:mt-0">
					<div className="flex space-x-1 sm:flex-row-reverse sm:justify-end sm:space-x-2 sm:space-y-0 md:flex-row">
						<KlippyStateBadge />
						<MoonrakerStateBadge />
					</div>
					<div className="mt-2 flex">
						<ActionsDropdown className="block flex-1" />
					</div>
				</div>
			</div>
			{/* Page body */}
			<SetupSteps {...props} />
		</>
	);
};
