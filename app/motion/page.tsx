'use client';
import React from 'react';
import { Motion } from '@/app/motion/motion';
import { Spinner } from '@/components/common/spinner';
import { useIsClient } from '@/hooks/isClient';
import { NoSSR } from '@/components/common/no-ssr';
import { PrinterStateHeader } from '@/components/common/printer-state-header';

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

export default function Page() {
	const isClient = useIsClient();
	return isClient ? (
		<div className="mt-8 grid grid-cols-1 gap-6 @container">
			<PrinterStateHeader
				title="Motion Settings"
				description="You can change your motion settings below, be aware that any change will require the config to be regenerated"
			/>
			<div className="mx-auto max-w-7xl px-4">
				<React.Suspense fallback={<LoadScreen />}>
					<NoSSR fallback={<LoadScreen />}>
						<Motion />
					</NoSSR>
				</React.Suspense>
			</div>
		</div>
	) : null;
}
