import React from 'react';
import { NoSSR } from '@/components/common/no-ssr';
import { FullLoadScreen } from '@/components/common/full-load-screen';
import AnalysisMacrosTable from '@/app/analysis/macros/macros';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Macros',
	description: 'User-modifiable macros for resonance analysis',
};

export default function Page() {
	return (
		<div className="h-full @container">
			<React.Suspense fallback={<FullLoadScreen />}>
				<NoSSR>
					<AnalysisMacrosTable />
				</NoSSR>
			</React.Suspense>
		</div>
	);
}
