'use client';
import { MacroRunChart } from '@/app/analysis/macros/[id]/recordings/[runId]/macro-run-chart';
import { useTopMenu } from '@/app/topmenu';
import { trpc } from '@/utils/trpc';
import {
	Antenna,
	AudioLines,
	AudioWaveform,
	ChevronLeft,
	FileCog,
	Minus,
	SkipBack,
	SkipForward,
	Spline,
	ThumbsUp,
} from 'lucide-react';
import { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import * as luxon from 'luxon';
import {
	InputShaperWorker,
	InputShaperWorkerInput,
	InputShaperWorkerOutput,
	ShaperCalibrationResult,
} from '@/app/analysis/_worker/input-shaper';
import { Spinner } from '@/components/common/spinner';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/common/card';
import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { shadableTWColors } from '@/app/_helpers/colors';
import { twJoin } from 'tailwind-merge';
import { Progress } from '@/components/ui/progress';
import { AnimatedContainer } from '@/components/common/animated-container';
import { getLogger } from '@/app/_helpers/logger';
import { INPUT_SHAPERS } from '@/app/analysis/_worker/shapers';

luxon.Settings.defaultLocale = 'en-GB';
const userLocale = luxon.DateTime.local().locale;

let _jobId = 1;

export const MacroRun = ({ id, runId }: { id: string; runId: string }) => {
	const [currentRun, _setCurrentRun] = useState(runId);
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

	const [isLoadingShapers, setIsLoadingShapers] = useState<boolean | number>(false);
	const [shaperEstimationProgress, setShaperEstimationProgress] = useState<number>(0);
	const shaperWorker = useRef<InputShaperWorker | null>(null);
	const currentJobId = useRef<number | null>(null);
	const [isWorkerReady, setIsWorkerReady] = useState(false);
	const [shapers, setShapers] = useState<ShaperCalibrationResult[]>([]);
	const [recommendedShaper, setRecommendedShaper] = useState<ShaperCalibrationResult | null>(null);

	const setCurrentRun = useCallback((runId: string) => {
		setShapers([]);
		setRecommendedShaper(null);
		_setCurrentRun(runId);
	}, []);

	useEffect(() => {
		shaperWorker.current = new Worker(
			new URL('@/app/analysis/_worker/input-shaper', import.meta.url),
		) as InputShaperWorker;
		shaperWorker.current.onmessage = (event) => {
			const data = event.data;
			if (data.type === 'findBestShaper' && data.jobId === currentJobId.current) {
				performance.mark('findBestShaperEnd');
				const measure = performance.measure('findBestShaper', 'findBestShaperStart', 'findBestShaperEnd');
				getLogger().info(measure, 'Best shaper found in ' + measure.duration + ' ms');
				let prevShaperTime = 0;
				for (let shaper of INPUT_SHAPERS) {
					const shaperMeasure = performance.measure('fitShaper-' + shaper.name, {
						start: measure.startTime,
						end: 'fitShaper-' + shaper.name,
					});
					getLogger().info(
						shaperMeasure,
						'Fitting ' + shaper.name + ' took ' + (shaperMeasure.duration - prevShaperTime) + ' ms',
					);
					prevShaperTime = shaperMeasure.duration;
				}
				setShapers(data.shapers.filter(Boolean));
				setRecommendedShaper(data.result);
				setIsLoadingShapers(false);
			}
			if (data.type === 'fitShaper' && data.jobId === currentJobId.current) {
				performance.mark('fitShaper-' + data.result?.name);
				if (data.result != null) {
					const newShaper = data.result;
					setShapers((prev) => [...prev.filter((s) => s.name != newShaper.name), newShaper]);
				}
			}
			if (data.type === 'findBestShaperProgress' && data.jobId === currentJobId.current) {
				setShaperEstimationProgress(data.progress);
			}
			if (data.type === 'jobCancelled' && data.id === currentJobId.current) {
				setIsLoadingShapers(false);
				setShaperEstimationProgress(0);
				setShapers([]);
				currentJobId.current = null;
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
			const id = _jobId++;
			currentJobId.current = id;
			setIsLoadingShapers(id);
			setShaperEstimationProgress(0);
			performance.mark('findBestShaperStart');
			shaperWorker.current?.postMessage({
				id: id,
				type: 'findBestShaper',
				calibrationData: recordings.result[0].psd.total,
				scv: recordings.result[0].scv,
			} satisfies InputShaperWorkerInput);
			return () => {
				shaperWorker.current?.postMessage({ type: 'cancelJob', id: id });
				setIsLoadingShapers(false);
			};
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
			<>
				<div title={date} className="min-w-0 truncate">
					{human}
				</div>
				<div className="min-w-0 truncate opacity-80">{duration}</div>
			</>
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
			[next, previous, setCurrentRun],
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
			<Card className="absolute right-4 top-4 w-[420px]">
				<CardHeader className="flex flex-row items-center gap-2 space-y-0 p-3 @sm:p-3">
					<CardTitle className="flex-1">{macro.name}</CardTitle>
					<CardDescription className="m-0 text-right text-xs">{date}</CardDescription>
				</CardHeader>
				<AnimatedContainer containerClassName="overflow-hidden">
					{(isLoadingShapers || shapers.length > 0) && (
						<Table className="rounded-none" containerClassName="rounded-none">
							<TableHeader>
								<TableRow className="text-xs">
									<TableHead className="">Shaper</TableHead>
									<TableHead className="">Freq.</TableHead>
									<TableHead className="text-right">
										<div className="flex justify-end">Vibr.</div>
									</TableHead>
									<TableHead className="text-right">
										<div className="flex justify-end">Smooth.</div>
									</TableHead>
									<TableHead className="text-right">
										<div className="flex justify-end">Rec. Accel.</div>
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{shapers.map((shaper) => (
									<TableRow
										key={shaper.name}
										style={{ color: shadableTWColors[shaper.color][400] }}
										className={twJoin('text-xs', recommendedShaper?.name === shaper.name && 'font-bold')}
									>
										<TableCell className="whitespace-nowrap text-nowrap">
											<Minus
												className="inline-block size-5"
												strokeWidth={shaper.name === recommendedShaper?.name ? '4' : '2'}
												strokeDasharray={shaper.name === recommendedShaper?.name ? '7, 6.5' : '3, 5'}
												strokeLinecap="square"
											/>{' '}
											{shaper.name.toLocaleUpperCase()}
										</TableCell>
										<TableCell>{(Math.round(shaper.freq * 100) / 100).toFixed(2)}hz</TableCell>
										<TableCell className="text-right">{(shaper.vibrs * 100).toFixed(2)}%</TableCell>
										<TableCell className="text-right">{shaper.smoothing.toFixed(2)}</TableCell>
										<TableCell className="whitespace-nowrap text-nowrap text-right">
											{Math.round(shaper.maxAccel)} mm/s
											<sup>2</sup>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</AnimatedContainer>
				{isLoadingShapers ? (
					<TableCaption className="mt-0 block space-y-3 p-3 text-xs">
						<Spinner className="mr-1 inline-block size-4" noMargin={true} strokeWidth={4} /> Calculating input shapers (
						{(shaperEstimationProgress * 100).toFixed(2)}%)...
						<Progress value={shaperEstimationProgress * 100}></Progress>
					</TableCaption>
				) : (
					recommendedShaper != null && (
						<TableCaption className="mt-0 block space-y-3 p-3 text-xs">
							{recommendedShaper.name.toLocaleUpperCase()} is recommended at{' '}
							{Math.round(recommendedShaper.freq * 100) / 100}Hz. Resulting in a resonance reduction of{' '}
							{100 - recommendedShaper.vibrs}%. Recommended maximum acceleration before noticeable smoothing is{' '}
							{Math.round(recommendedShaper.maxAccel)} mm/s<sup>2</sup>
						</TableCaption>
					)
				)}
			</Card>
			{/* <div className="absolute left-1/2 top-4 -translate-x-1/2 text-center">
				<h2 className="bg-gradient-to-b from-white/80 to-white/30 bg-clip-text text-2xl font-bold !leading-snug tracking-tight text-transparent transition-all lg:text-4xl xl:text-5xl 2xl:text-6xl">
					{macro.name}
				</h2>
				<div className="text-sm font-medium text-white/40 transition-all lg:text-lg xl:text-xl 2xl:text-2xl">
					{date}
				</div>
			</div> */}
		</div>
	);
};
