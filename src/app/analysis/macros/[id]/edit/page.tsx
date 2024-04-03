import React from 'react';
import { NoSSR } from '@/components/common/no-ssr';
import { EditMacro } from '@/app/analysis/macros/[id]/edit/edit';
import Loading from '@/app/analysis/macros/[id]/edit/loading';

export default function Page({ params }: { params: { id: string } }) {
	return (
		<div className="h-full @container">
			<NoSSR fallback={<Loading />}>
				<EditMacro id={params.id} />
			</NoSSR>
		</div>
	);
}
