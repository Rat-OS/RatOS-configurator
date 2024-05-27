import React from 'react';
import { NoSSR } from '@/components/common/no-ssr';
import { FullLoadScreen } from '@/components/common/full-load-screen';
import { CreateMacro } from '@/app/analysis/macros/new/create';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'New Macro',
	description: 'Create a new resonance analysis macro.',
};

export default function Page() {
	return (
		<div className="h-full @container">
			<NoSSR>
				<CreateMacro />
			</NoSSR>
		</div>
	);
}
