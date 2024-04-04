import React from 'react';
import { NoSSR } from '@/components/common/no-ssr';
import MacroRecordings from '@/app/analysis/macros/[id]/recordings/recordings';

export default function MacroRecordingsPage({ params }: { params: { id: string } }) {
	return (
		<div className="h-full @container">
			<NoSSR>
				<MacroRecordings id={params.id} />
			</NoSSR>
		</div>
	);
}
