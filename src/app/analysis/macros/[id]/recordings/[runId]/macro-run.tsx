'use client';
import { MacroRunChart } from '@/app/analysis/macros/[id]/recordings/[runId]/macro-run-chart';
import { useTopMenu } from '@/app/topmenu';
import { trpc } from '@/utils/trpc';
import { ChevronLeft, SkipBack, SkipForward } from 'lucide-react';
import { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import * as luxon from 'luxon';
import { useQuery } from '@tanstack/react-query';
import {
	findBestShaper,
	InputShaperWorkerInput,
	InputShaperWorkerOutput,
	ShaperCalibrationResult,
} from '@/app/analysis/_worker/input-shaper';
import { Spinner } from '@/components/common/spinner';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/common/card';

luxon.Settings.defaultLocale = 'en-GB';
const userLocale = luxon.DateTime.local().locale;

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

	const [isLoadingShapers, setIsLoadingShapers] = useState(false);
	const shaperWorker = useRef<Worker | null>(null);
	const [isWorkerReady, setIsWorkerReady] = useState(false);
	const [shapers, setShapers] = useState<ShaperCalibrationResult[]>([]);
	const [recommendedShaper, setRecommendedShaper] = useState<ShaperCalibrationResult | null>(null);

	useEffect(() => {
		shaperWorker.current = new Worker(new URL('@/app/analysis/_worker/input-shaper', import.meta.url));
		shaperWorker.current.onmessage = (event) => {
			const data = event.data as InputShaperWorkerOutput;
			if (data.type === 'findBestShaper') {
				setShapers(data.shapers.filter(Boolean));
				setRecommendedShaper(data.result);
				setIsLoadingShapers(false);
			}
			if (data.type === 'fitShaper') {
				if (data.result != null) {
					const newShaper = data.result;
					setShapers((prev) => [...prev.filter((s) => s.name != newShaper.name), newShaper]);
				}
			}
		};
		setIsWorkerReady(true);
		return () => {
			setIsWorkerReady(false);
			shaperWorker.current?.terminate();
		};
	}, []);

	useEffect(() => {
		if (recordings.result.length === 1 && isWorkerReady) {
			setIsLoadingShapers(true);
			shaperWorker.current?.postMessage({
				type: 'findBestShaper',
				calibrationData: recordings.result[0].psd.total,
				scv: recordings.result[0].scv,
			} satisfies InputShaperWorkerInput);
		} else {
			setShapers([]);
			setRecommendedShaper(null);
		}
	}, [recordings, isWorkerReady]);

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
			<span title={date} className="min-w-0 truncate">
				{human} ({duration})
			</span>
		);
	}, [recordings]);

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
			[next, previous],
		),
	);

	return (
		<div className="flex flex-1">
			<MacroRunChart
				sequences={macro.sequences}
				recordings={recordings.result}
				shapers={shapers}
				recommendedShaper={recommendedShaper}
			/>
			<Card className="absolute right-4 top-4 w-96">
				<CardHeader>
					<CardTitle>Input Shapers</CardTitle>
					{recommendedShaper && (
						<CardDescription>
							{recommendedShaper.name.toLocaleUpperCase()} is recommended at{' '}
							{Math.round(recommendedShaper.freq * 100) / 100}Hz. Resulting in a resonance reduction of{' '}
							{100 - recommendedShaper.vibrs}%. Recommended maximum acceleration before noticeable smoothing is{' '}
							{Math.round(recommendedShaper.maxAccel)} mm/s<sup>2</sup>
						</CardDescription>
					)}
				</CardHeader>
				<CardContent className="pt-0 @sm:pt-0">
					<div className="divide-y divide-border">
						{shapers.map((shaper) => (
							<div key={shaper.name} className="grid grid-cols-6 py-2 text-sm">
								<div className="col-span-2">{shaper.name.toLocaleUpperCase()}</div>
								<div>{Math.round(shaper.freq * 100) / 100}hz</div>
								<div>{shaper.vibrs.toFixed(2)}</div>
								<div className="col-span-2">
									{Math.round(shaper.maxAccel)} mm/s
									<sup>2</sup>
								</div>
							</div>
						))}
					</div>
					{isLoadingShapers && <Spinner />}
				</CardContent>
			</Card>
			<div className="absolute left-1/2 top-4 -translate-x-1/2 text-center">
				<h2 className="bg-gradient-to-b from-white/80 to-white/30 bg-clip-text text-2xl font-bold !leading-snug tracking-tight text-transparent transition-all lg:text-4xl xl:text-5xl 2xl:text-6xl">
					{macro.name}
				</h2>
				<div className="text-sm font-medium text-white/40 transition-all lg:text-lg xl:text-xl 2xl:text-2xl">
					{date}
				</div>
			</div>
		</div>
	);
};
