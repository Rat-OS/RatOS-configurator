import React from 'react';
import { NoSSR } from '@/components/common/no-ssr';
import Loading from '@/app/analysis/macros/[id]/edit/loading';
import { MacroRun } from '@/app/analysis/macros/[id]/recordings/[runId]/macro-run';

export default function Page({ params }: { params: { id: string; runId: string } }) {
	return (
		<div className="flex h-full @container">
			<NoSSR fallback={<Loading />}>
				<MacroRun {...params} />
			</NoSSR>
		</div>
	);
}
