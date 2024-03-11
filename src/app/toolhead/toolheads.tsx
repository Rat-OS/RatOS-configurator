'use client';
import React from 'react';
import { Spinner } from '../../components/common/spinner';
import { ToolheadSettings } from '../../components/setup-steps/toolhead-settings';
import { usePrinterConfiguration } from '../../hooks/usePrinterConfiguration';

export const Toolheads = () => {
	'use client';
	const { serializedPrinterConfiguration } = usePrinterConfiguration();
	if (serializedPrinterConfiguration?.toolheads == null) {
		return (
			<div className="mx-auto flex items-center justify-center p-8">
				<Spinner />
			</div>
		);
	}
	return (
		<div className="space-y-4">
			{serializedPrinterConfiguration.toolheads.map((th, i) =>
				th == null || th.axis == null ? null : (
					<React.Suspense fallback={<Spinner />} key={i}>
						<ToolheadSettings toolOrAxis={th.axis} />
					</React.Suspense>
				),
			)}
		</div>
	);
};
