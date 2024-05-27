'use client';

import { FullLoadScreen } from '@/components/common/full-load-screen';
import { NoSSR } from '@/components/common/no-ssr';
import React from 'react';
import { VAOC } from '@/app/calibration/vaoc';
import { Spinner } from '@/components/common/spinner';

export default function Page() {
	const fallback = (
		<div className="absolute inset-0 flex h-[calc(100vh_-_64px)] items-center justify-center">
			<Spinner
				className="h-[40svh] w-[40svh] animate-spin transition-all dark:text-lime-400"
				noMargin={true}
				strokeWidth={1}
			/>
		</div>
	);
	return (
		<div className="flex h-full w-full items-center @container">
			<React.Suspense fallback={fallback}>
				<NoSSR fallback={fallback}>
					<VAOC />
				</NoSSR>
			</React.Suspense>
		</div>
	);
}
