'use client';
import { MacroRunChart } from '@/app/analysis/macros/[id]/recordings/[runId]/macro-run-chart';
import { useTopMenu } from '@/app/topmenu';
import { trpc } from '@/utils/trpc';
import { ChevronLeft, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';

export const MacroRun = ({ id, runId }: { id: string; runId: string }) => {
	const [macro] = trpc.analysis.findMacro.useSuspenseQuery({ id });
	const [recordings] = trpc.analysis.getRunRecordings.useSuspenseQuery({ runId: runId, macroId: id });

	useTopMenu(
		'Analysis',
		useCallback(
			(Menu) => {
				return (
					<>
						<Menu.MenubarMenu>
							<Menu.MenubarTrigger className="cursor-pointer" asChild>
								<Link href={`/analysis/macros/${id}/recordings`}>
									<Menu.MenubarIcon Icon={ChevronLeft} />
									<span className="hidden lg:inline">Back</span>
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

	return <MacroRunChart sequences={macro.sequences} recordings={recordings.result} />;
};
