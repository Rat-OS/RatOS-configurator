'use client';
import { MacroRunChart } from '@/app/analysis/macros/[id]/recordings/[runId]/macro-run-chart';
import { trpc } from '@/utils/trpc';

export const MacroRun = ({ id, runId }: { id: string; runId: string }) => {
	const [macro] = trpc.analysis.findMacro.useSuspenseQuery({ id });
	const [recordings] = trpc.analysis.getRunRecordings.useSuspenseQuery({ runId: runId, macroId: id });
	return <MacroRunChart sequences={macro.sequences} recordings={recordings} />;
};
