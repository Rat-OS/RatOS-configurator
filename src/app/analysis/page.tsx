import React from 'react';
import { Analysis } from '@/app/analysis/analysis';
import { NoSSR } from '@/components/common/no-ssr';
import Loading from '@/app/analysis/loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Resonance Analysis',
	description: 'Real time accelerometer data',
};

export default function Page() {
	return (
		<NoSSR fallback={<Loading />}>
			<div className="h-full p-4 @container">
				<Analysis />
			</div>
		</NoSSR>
	);
}
