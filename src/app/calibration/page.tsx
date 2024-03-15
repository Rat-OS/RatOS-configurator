'use client';

import { FullLoadScreen } from '@/components/common/full-load-screen';
import { NoSSR } from '@/components/common/no-ssr';
import React from 'react';
import { VAOC } from '@/app/calibration/vaoc';

export default function Page() {
	return (
		<div className="h-full @container">
			<React.Suspense fallback={<FullLoadScreen />}>
				<NoSSR>
					<VAOC />
				</NoSSR>
			</React.Suspense>
		</div>
	);
}
