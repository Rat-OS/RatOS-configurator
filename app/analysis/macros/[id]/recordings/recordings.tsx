'use client';
import { Metadata } from 'next';

import { columns } from '@/app/analysis/macros/[id]/recordings/columns';
import { DataTable } from '@/app/analysis/macros/components/data-table';
import { trpc } from '@/utils/trpc';
import { useTopMenu } from '@/app/topmenu';
import { ChevronLeft, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';

export const metadata: Metadata = {
	title: 'Macros',
	description: 'User-modifiable macros for resonance analysis',
};

export default function MacroRecordings({ id }: { id: string }) {
	const [macroRecordingsQuery] = trpc.analysis.getRecordings.useSuspenseQuery({ macroId: id });
	const [macro] = trpc.analysis.findMacro.useSuspenseQuery({ id: id });

	useTopMenu(
		'Analysis Recordings',
		useCallback(
			(Menu) => {
				return (
					<>
						<Menu.MenubarMenu>
							<Menu.MenubarTrigger className="cursor-pointer" asChild>
								<span onClick={() => window.history.back()}>
									<Menu.MenubarIcon Icon={ChevronLeft} />
									<span className="hidden lg:inline">Back</span>
								</span>
							</Menu.MenubarTrigger>
							<Menu.MenubarContent className="hidden" />
						</Menu.MenubarMenu>
						<Menu.MenubarMenu>
							<Menu.MenubarTrigger asChild className="cursor-pointer">
								<Link href={`/analysis/macros/${id}/edit`}>
									<Menu.MenubarIcon Icon={Pencil} />
									<span className="hidden lg:inline">Edit</span>
								</Link>
							</Menu.MenubarTrigger>
							<Menu.MenubarContent className="hidden" />
						</Menu.MenubarMenu>
					</>
				);
			},
			[id],
		),
	);

	const runs = macroRecordingsQuery.result
		.map((recording) => recording.macroRecordingRunId)
		.filter((value, index, self) => self.indexOf(value) === index);

	return (
		<div className="flex h-full flex-1 flex-col space-y-8 p-8">
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Recordings for {macro.name}</h2>
					<p className="text-base font-medium text-muted-foreground">
						You have recorded {macroRecordingsQuery.result.length} sequence(s) over a total of {runs.length} run
						{runs.length === 1 ? '' : 's'} for this macro so far.
					</p>
				</div>
			</div>
			<DataTable
				data={macroRecordingsQuery.result ?? []}
				columns={columns}
				initialGrouping={['macroRecordingRunId']}
				initialColumnVisibility={{ macroRecordingRunId: false }}
				initialSorting={[{ desc: true, id: 'date' }]}
			/>
		</div>
	);
}
