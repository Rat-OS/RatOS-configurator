import { Metadata } from 'next';

import { columns } from '@/app/analysis/macros/[id]/recordings/columns';
import { DataTable } from '@/app/analysis/macros/components/data-table';
import { trpc } from '@/utils/trpc';

export const metadata: Metadata = {
	title: 'Macros',
	description: 'User-modifiable macros for resonance analysis',
};

export default async function MacroRecordingsPage({ params }: { params: { id: string } }) {
	const macroRecordingsQuery = trpc.analysis.getRecordings.useQuery({ macroId: params.id });

	return (
		<>
			<div className="md:hidden">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Hold on sailor!</h2>
						<p className="text-muted-foreground">
							Resonance analysis requires hefty compute power, please visit this page on a desktop device!
						</p>
					</div>
				</div>
			</div>
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
						<p className="text-muted-foreground">Here&apos;s a list of your macro's ready for analysis!</p>
					</div>
					<div className="flex items-center space-x-2">Nothing here</div>
				</div>
				<DataTable data={macroRecordingsQuery.data?.result ?? []} columns={columns} />
			</div>
		</>
	);
}
