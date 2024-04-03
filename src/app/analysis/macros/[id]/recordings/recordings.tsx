'use client';
import { Metadata } from 'next';

import { columns } from '@/app/analysis/macros/[id]/recordings/columns';
import { DataTable } from '@/app/analysis/macros/components/data-table';
import { trpc } from '@/utils/trpc';

export const metadata: Metadata = {
	title: 'Macros',
	description: 'User-modifiable macros for resonance analysis',
};

export default function MacroRecordings({ id }: { id: string }) {
	const [macroRecordingsQuery] = trpc.analysis.getRecordings.useSuspenseQuery({ macroId: id });
	const [macro] = trpc.analysis.findMacro.useSuspenseQuery({ id: id });

	return (
		<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-xl font-semibold leading-none tracking-tight">Recordings for {macro.name}</h2>
					<p className="text-base font-medium text-muted-foreground">
						You have recorded {macroRecordingsQuery.total} run(s) so far.
					</p>
				</div>
				<div className="flex items-center space-x-2">Nothing here</div>
			</div>
			<DataTable data={macroRecordingsQuery.result ?? []} columns={columns} />
		</div>
	);
}
