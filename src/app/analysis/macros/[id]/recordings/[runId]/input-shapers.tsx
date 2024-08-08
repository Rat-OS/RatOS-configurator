import { getLogger } from '@/app/_helpers/logger';
import {
	InputShaperWorker,
	ShaperCalibrationResult,
	InputShaperWorkerInput,
} from '@/app/analysis/_worker/input-shaper';
import { INPUT_SHAPERS } from '@/app/analysis/_worker/shapers';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { Progress } from '@/components/ui/progress';
import { AnimatedContainer } from '@/components/common/animated-container';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { Spinner } from '@/components/common/spinner';
import { Minus } from 'lucide-react';
import { TypedArrayPSD } from '@/app/analysis/periodogram';
import { PSD } from '@/zods/analysis';
import { shadableTWColors } from '@/app/_helpers/colors';

interface InputShapersProps {
	recordings: {
		sequenceId: string;
		psd: {
			total: PSD | TypedArrayPSD;
		};
		scv: number;
	}[];
	sequenceId: string | null;
	currentRunId: string;
	recommendedShaper?: ShaperCalibrationResult | null;
	shapers: ShaperCalibrationResult[];
	setRecommendedShaper: React.Dispatch<React.SetStateAction<ShaperCalibrationResult | null>>;
	setShapers: React.Dispatch<React.SetStateAction<ShaperCalibrationResult[]>>;
}

let _jobId = 1;

export const InputShapers: React.FC<InputShapersProps> = (props) => {
	const { recordings, sequenceId, currentRunId, setRecommendedShaper, setShapers, shapers, recommendedShaper } = props;
	const [isLoadingShapers, setIsLoadingShapers] = useState<boolean | number>(false);
	const [shaperEstimationProgress, setShaperEstimationProgress] = useState<number>(0);
	const shaperWorker = useRef<InputShaperWorker | null>(null);
	const currentJobId = useRef<number | null>(null);
	const [isWorkerReady, setIsWorkerReady] = useState(false);
	const recording = sequenceId != null ? recordings.find((r) => r.sequenceId === props.sequenceId) : null;

	// Reset shapers as soon as runId changes.
	useEffect(() => {
		setShapers([]);
		setRecommendedShaper(null);
	}, [currentRunId, setRecommendedShaper, setShapers]);

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
	}, [setRecommendedShaper, setShapers]);

	useEffect(() => {
		if (recording != null && isWorkerReady) {
			const id = _jobId++;
			currentJobId.current = id;
			setIsLoadingShapers(id);
			setShaperEstimationProgress(0);
			performance.mark('findBestShaperStart');
			shaperWorker.current?.postMessage({
				id: id,
				type: 'findBestShaper',
				calibrationData: recording.psd.total,
				scv: recording.scv,
			} satisfies InputShaperWorkerInput);
			return () => {
				shaperWorker.current?.postMessage({ type: 'cancelJob', id: id });
				setIsLoadingShapers(false);
			};
		} else {
			setShapers([]);
			setRecommendedShaper(null);
		}
	}, [recording, isWorkerReady, setShapers, setRecommendedShaper]);

	return (
		<div>
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
				<div className="mt-0 block space-y-3 p-3 text-xs text-muted-foreground">
					<Spinner className="mr-1 inline-block size-4" noMargin={true} strokeWidth={4} /> Calculating input shapers (
					{(shaperEstimationProgress * 100).toFixed(2)}%)...
					<Progress value={shaperEstimationProgress * 100}></Progress>
				</div>
			) : (
				recommendedShaper != null && (
					<div className="mt-0 block space-y-3 p-3 text-xs text-muted-foreground">
						{recommendedShaper.name.toLocaleUpperCase()} is recommended at {recommendedShaper.freq.toFixed(2)}
						Hz. Resulting in a resonance reduction of {(100 - recommendedShaper.vibrs).toFixed(2)}%. Recommended maximum
						acceleration before noticeable smoothing is {Math.round(recommendedShaper.maxAccel)} mm/s
						<sup>2</sup>
					</div>
				)
			)}
		</div>
	);
};
