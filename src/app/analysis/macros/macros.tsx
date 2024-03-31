'use client';
import { columns } from '@/app/analysis/macros/columns';
import { DataTable } from '@/app/analysis/macros/components/data-table';
import { trpc } from '@/helpers/trpc';
import { Button } from '@/components/common/button';
import { PlusCircleIcon } from 'lucide-react';

export default function AnalysisMacrosTable() {
	const macroQuery = trpc.analysis.getMacros.useQuery({});

	return (
		<div className="flex h-full flex-1 flex-col space-y-8 p-8">
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Resonance analysis macros</h2>
					<p className="font-medium text-muted-foreground">Here&apos;s a list of your macro's ready for analysis!</p>
				</div>
				<div className="flex items-center space-x-2">
					<Button href="/analysis/macros/new" variant="primary">
						<PlusCircleIcon className="size-4" />
						<span>New Macro</span>
					</Button>
				</div>
			</div>
			<DataTable data={macroQuery.data?.result ?? []} columns={columns} />
		</div>
	);
}
