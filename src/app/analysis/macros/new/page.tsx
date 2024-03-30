'use client';
import React from 'react';
import { NoSSR } from '@/components/common/no-ssr';
import { FullLoadScreen } from '@/components/common/full-load-screen';
import { CreateMacro } from '@/app/analysis/macros/new/create';

export default function Page() {
	return (
		<div className="h-full @container">
			<React.Suspense fallback={<FullLoadScreen />}>
				<NoSSR>
					<CreateMacro />
				</NoSSR>
			</React.Suspense>
		</div>
	);
}
