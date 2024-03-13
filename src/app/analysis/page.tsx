'use client';
import React from 'react';
import { Analysis } from '@/app/analysis/analysis';
import { Spinner } from '@/components/common/spinner';
import { useIsClient } from '@/hooks/isClient';
import { BeltTension } from '@/app/analysis/belt-tension';

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
	console.log('Weehooo rendering', isClient);
	return isClient ? (
		<div className="h-full p-4 @container">
			<React.Suspense fallback={<LoadScreen />}>
				<Analysis />
				{/* <BeltTension /> */}
			</React.Suspense>
		</div>
	) : null;
}
