'use client';
import React from 'react';
import { Analysis } from '@/app/analysis/analysis';
import { Spinner } from '@/components/common/spinner';
import { NoSSR } from '@/components/common/no-ssr';
import Loading from '@/app/analysis/loading';

export default function Page() {
	return (
		<NoSSR fallback={<Loading />}>
			<div className="h-full p-4 @container">
				<Analysis />
				{/* <BeltTension /> */}
			</div>
		</NoSSR>
	);
}
