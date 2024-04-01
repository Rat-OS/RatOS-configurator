import React from 'react';
import { NoSSR } from '@/components/common/no-ssr';
import { FullLoadScreen } from '@/components/common/full-load-screen';
import { EditMacro } from '@/app/analysis/macros/[id]/edit/edit';

export default function Page({ params }: { params: { id: string } }) {
	return (
		<div className="h-full @container">
			<NoSSR>
				<EditMacro id={params.id} />
			</NoSSR>
		</div>
	);
}
