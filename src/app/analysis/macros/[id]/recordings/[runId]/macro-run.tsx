'use client';
import { MacroRunChart } from '@/app/analysis/macros/[id]/recordings/[runId]/macro-run-chart';
import { useTopMenu } from '@/app/topmenu';
import { trpc } from '@/utils/trpc';
import { ChevronLeft, Pencil, SkipBack, SkipForward } from 'lucide-react';
import { useCallback, useState } from 'react';
import { twJoin } from 'tailwind-merge';

export const MacroRun = ({ id, runId }: { id: string; runId: string }) => {
	const [currentRun, setCurrentRun] = useState(runId);
	const [macro] = trpc.analysis.findMacro.useSuspenseQuery({ id });
	const [recordings] = trpc.analysis.getRunRecordings.useSuspenseQuery(
		{ runId: currentRun, macroId: id },
		{ keepPreviousData: true },
	);
	const [{ next, previous }] = trpc.analysis.getNextAndPreviousRunRecordingIds.useSuspenseQuery(
		{
			macroId: id,
			runId: currentRun,
		},
		{ keepPreviousData: true },
	);

	useTopMenu(
		'Analysis',
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
							<Menu.MenubarTrigger
								className={twJoin(previous ? 'cursor-pointer' : 'cursor-not-allowed')}
								asChild
								disabled={previous == null}
							>
								<span onClick={() => previous != null && setCurrentRun(previous)}>
									<Menu.MenubarIcon Icon={SkipBack} />
									<span className="hidden lg:inline">Previous recording</span>
								</span>
							</Menu.MenubarTrigger>
							<Menu.MenubarContent className="hidden" />
						</Menu.MenubarMenu>
						<Menu.MenubarMenu>
							<Menu.MenubarTrigger
								className={twJoin(next ? 'cursor-pointer' : 'cursor-not-allowed')}
								asChild
								disabled={next == null}
							>
								<span onClick={() => next != null && setCurrentRun(next)}>
									<Menu.MenubarIcon Icon={SkipForward} />
									<span className="hidden lg:inline">Next recording</span>
								</span>
							</Menu.MenubarTrigger>
							<Menu.MenubarContent className="hidden" />
						</Menu.MenubarMenu>
					</>
				);
			},
			[next, previous],
		),
	);

	return <MacroRunChart sequences={macro.sequences} recordings={recordings.result} />;
};
