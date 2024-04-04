import React from 'react';
import { NoSSR } from '@/components/common/no-ssr';
import AnalysisMacrosTable from '@/app/analysis/macros/macros';
import { Metadata } from 'next';
import Loading from '@/app/analysis/macros/loading';

export const metadata: Metadata = {
	title: 'Macros',
	description: 'User-modifiable macros for resonance analysis',
};

export default function Page() {
	return (
		<div className="h-full @container">
			<NoSSR fallback={<Loading />}>
				<AnalysisMacrosTable />
			</NoSSR>
		</div>
	);
}
