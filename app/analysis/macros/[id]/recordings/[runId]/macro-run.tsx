'use client';
import { MacroRunChart } from '@/app/analysis/macros/[id]/recordings/[runId]/macro-run-chart';
import { useTopMenu } from '@/app/topmenu';
import { trpc } from '@/utils/trpc';
import { ChevronLeft, SkipBack, SkipForward } from 'lucide-react';
import { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import * as luxon from 'luxon';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/common/card';
import { TWShadeableColorName } from '@/app/_helpers/colors';

import { useChart } from '@/app/analysis/hooks';
import { PSDChartNoSeriesDefinition } from '@/app/analysis/charts';
import { SequenceData, SequenceDataChartType, setupChart } from '@/app/analysis/macros/[id]/recordings/[runId]/setup';
import { SciChartSurface } from 'scichart';
import { InputShapers } from '@/app/analysis/macros/[id]/recordings/[runId]/input-shapers';
import { useInputShapersState, useSeriesSubcomponentsChart, useBeltTensionState } from '@/app/analysis/macros/hooks';
import { BeltTensionComparison } from '@/app/analysis/macros/[id]/recordings/[runId]/belt-tension-comparison';
import deepEqual from 'deep-equal';

luxon.Settings.defaultLocale = 'en-GB';
const userLocale = luxon.DateTime.local().locale;

export const MacroRun = ({ id, runId }: { id: string; runId: string }) => {
	const [currentRun, setCurrentRun] = useState(runId);
	const [macro] = trpc.analysis.findMacro.useSuspenseQuery({ id });
	const [recordings] = trpc.analysis.getRunRecordings.useSuspenseQuery(
		{ runId: currentRun, macroId: id },
		{ keepPreviousData: true },
	);

	const inputShapersState = useInputShapersState();
	const seriesSubcomponents = useSeriesSubcomponentsChart();
	const beltTensionState = useBeltTensionState();

	const [{ next, previous }] = trpc.analysis.getNextAndPreviousRunRecordingIds.useSuspenseQuery(
		{
			macroId: id,
			runId: currentRun,
		},
		{ keepPreviousData: true },
	);

	useHotkeys(
		'left',
		() => {
			if (previous != null) {
				setCurrentRun(previous);
			}
		},
		[previous],
	);
	useHotkeys(
		'right',
		() => {
			if (next != null) {
				setCurrentRun(next);
			}
		},
		[next],
	);

	const date = useMemo(() => {
		const start = luxon.DateTime.fromMillis(recordings.result[0].startTimeStamp);
		const end = luxon.DateTime.fromMillis(recordings.result[recordings.result.length - 1].endTimeStamp);
		const date = start.equals(end)
			? start.toFormat('yyyy-MM-dd HH:mm')
			: `${start.toFormat('yyyy-MM-dd HH:mm')} - ${end.toFormat('HH:mm')}`;
		const human = luxon.DateTime.fromMillis(recordings.result[0].startTimeStamp)
			.setLocale(userLocale)
			.toLocaleString({ dateStyle: 'long', timeStyle: 'short' });
		const duration = luxon.Duration.fromMillis(
			recordings.result[recordings.result.length - 1].endTimeStamp - recordings.result[0].startTimeStamp,
		)
			.shiftTo('minutes', 'seconds')
			.toHuman({ unitDisplay: 'short', maximumSignificantDigits: 2 });
		return (
			<>
				<div title={date} className="min-w-0 truncate">
					{human}
				</div>
				<div className="min-w-0 truncate opacity-80">{duration}</div>
			</>
		);
	}, [recordings]);

	const sequenceSeries: SequenceData[] = useMemo(
		() =>
			recordings.result
				.flatMap((rec) => {
					const sequence = macro.sequences.find((seq) => seq.id === rec.sequenceId);
					return sequence?.recording
						? {
								sequenceId: sequence.id,
								color: (sequence?.recording?.color ?? 'lime') as TWShadeableColorName,
								name: rec.name,
								psd: rec.psd,
								type: SequenceDataChartType.Mountain,
							}
						: null;
				})
				.filter(Boolean),
		[recordings, macro],
	);

	const chartInit = useCallback(
		(surface: SciChartSurface) => {
			setupChart(surface, sequenceSeries);
		},
		[sequenceSeries],
	);

	const chart = useChart(PSDChartNoSeriesDefinition, chartInit);

	const { setSubcomponentSeries } = seriesSubcomponents;
	const { setSequenceId } = inputShapersState;

	const { setSequencePair } = beltTensionState;
	const sequencePair = useRef(beltTensionState.sequencePair);
	sequencePair.current = beltTensionState.sequencePair;

	useEffect(() => {
		if (recordings.result.length === 1) {
			const sequenceId = recordings.result[0].sequenceId;
			setSequenceId(sequenceId);
			setSubcomponentSeries((series) => series.filter((s) => s !== sequenceId).concat([sequenceId]));
		} else {
			setSubcomponentSeries([]);
			setSequenceId(null);
		}
	}, [recordings.result, setSequenceId, setSubcomponentSeries]);

	useEffect(() => {
		const newPair: [SequenceData, SequenceData] = [sequenceSeries[0], sequenceSeries[1]];
		if (recordings.result.length === 2 && sequenceSeries.length === 2 && !deepEqual(sequencePair.current, newPair)) {
			setSequencePair(newPair);
		} else if (!deepEqual(sequencePair.current, newPair)) {
			setSequencePair(null);
		}
	}, [recordings.result.length, sequenceSeries, setSequencePair]);

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
							<Menu.MenubarTrigger asChild disabled={previous == null}>
								<span onClick={() => previous != null && setCurrentRun(previous)}>
									<Menu.MenubarIcon Icon={SkipBack} />
									<span className="hidden lg:inline">Previous recording</span>
								</span>
							</Menu.MenubarTrigger>
							<Menu.MenubarContent className="hidden" />
						</Menu.MenubarMenu>
						<Menu.MenubarMenu>
							<Menu.MenubarTrigger asChild disabled={next == null}>
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
			[next, previous, setCurrentRun],
		),
	);
	return (
		<div className="relative flex flex-1">
			<MacroRunChart
				sequenceSeries={sequenceSeries}
				chart={chart}
				shapers={inputShapersState.shapers}
				recommendedShaper={inputShapersState.recommendedShaper}
				subcomponentSeries={seriesSubcomponents.subcomponentSeries}
			/>
			<Card className="absolute right-4 top-4 w-[420px]">
				<CardHeader className="flex flex-row items-center gap-2 space-y-0 p-3 @sm:p-3">
					<CardTitle className="flex-1">{macro.name}</CardTitle>
					<CardDescription className="m-0 text-right text-xs">{date}</CardDescription>
				</CardHeader>
				<BeltTensionComparison chart={chart} {...beltTensionState} />
				{recordings.result.length === 1 && (
					<InputShapers currentRunId={currentRun} {...inputShapersState} recordings={recordings.result} />
				)}
			</Card>
		</div>
	);
};
