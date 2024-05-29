'use client';

import { KlippyStateBadge } from '@/components/klippy-state-badge';
import { MoonrakerStateBadge } from '@/components/moonraker-state-badge';
import { trpc } from '@/helpers/trpc';
import React from 'react';
import { SetupSteps } from '@/components/setup-steps';
import { useRecoilValue } from 'recoil';
import { PrinterState } from '@/recoil/printer';
import { PrinterConnectionHeader } from '@/components/common/printer-state-header';

interface WizardProps {
	isConnectedToWifi?: boolean;
	hasWifiInterface?: boolean;
}

export const Wizard: React.FC<WizardProps> = (props) => {
	const { data: version } = trpc.version.useQuery(undefined, { keepPreviousData: true, refetchOnMount: false });
	const { data: ip } = trpc.ipAddress.useQuery(undefined, { keepPreviousData: true, refetchOnMount: false });
	const selectedPrinter = useRecoilValue(PrinterState);
	return (
		<>
			<PrinterConnectionHeader
				title={`${selectedPrinter?.name ?? 'Printer'} Setup`}
				description={`RatOS ${version} @ ${ip}`}
			/>
			{/* Page body */}
			<SetupSteps {...props} />
		</>
	);
};
