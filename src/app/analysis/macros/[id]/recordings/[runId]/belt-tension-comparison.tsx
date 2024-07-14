import {
	detectPeaks,
	pairPeaks,
	computeMechanicalHealth,
	MechanicalHealthResult,
	PeakPairingResult,
} from '@/app/analysis/_worker/graph-comparison';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SciChartSurface } from 'scichart';
import recordings from '@/app/analysis/macros/[id]/recordings/recordings';
import { SequenceData } from '@/app/analysis/macros/[id]/recordings/[runId]/setup';
import { initBeltTensionChartAnnotations, updateBeltTensionChartAnnotations } from '@/app/analysis/macros/hooks';
import { AnimatedContainer } from '@/components/common/animated-container';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { shadableTWColors } from '@/app/_helpers/colors';
import { Spinner } from '@/components/common/spinner';
import { Minus } from 'lucide-react';
import { twJoin } from 'tailwind-merge';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/common/card';
import { useChart } from '@/app/analysis/hooks';

interface BeltTensionComparisonProps {
	sequencePair: [SequenceData, SequenceData] | null;
	chart: ReturnType<typeof useChart>;
	peakPairingResults: PeakPairingResult | null;
	mechanicalHealth: MechanicalHealthResult | null;
	setPeakPairingResults: React.Dispatch<React.SetStateAction<PeakPairingResult | null>>;
	setMechanicalHealth: React.Dispatch<React.SetStateAction<MechanicalHealthResult | null>>;
}

export const BeltTensionComparison: React.FC<BeltTensionComparisonProps> = (props) => {
	const { sequencePair, chart, setPeakPairingResults, setMechanicalHealth, peakPairingResults, mechanicalHealth } =
		props;
	const initializedSurfaceId = useRef<string | null>(null);
	const [surfaceId, setSurfaceId] = useState<string | null>(null);

	const updateSurfaceId = useCallback((surface: SciChartSurface) => {
		setSurfaceId(surface.id);
	}, []);

	useEffect(() => {
		chart.onInitialize(updateSurfaceId);
	}, [chart, chart.onInitialize, updateSurfaceId]);

	useEffect(() => {
		if (!chart.isInitialized) {
			return;
		}
		if (sequencePair != null && sequencePair.length === 2 && chart.surface.current != null) {
			const peaks1 = detectPeaks(chart.surface.current, sequencePair[0].psd.total);
			const peaks2 = detectPeaks(chart.surface.current, sequencePair[1].psd.total);
			const newPeakPairingResults = pairPeaks(peaks1, peaks2);
			const newMechanicalHealth = computeMechanicalHealth(
				{
					pairedPeaks: newPeakPairingResults.pairedPeaks,
					unpairedPeaks: newPeakPairingResults.unpairedPeaks1,
					psd: sequencePair[0].psd.total,
				},
				{
					pairedPeaks: newPeakPairingResults.pairedPeaks,
					unpairedPeaks: newPeakPairingResults.unpairedPeaks2,
					psd: sequencePair[1].psd.total,
				},
			);
			setPeakPairingResults(newPeakPairingResults);
			setMechanicalHealth(newMechanicalHealth);
			if (surfaceId !== initializedSurfaceId.current) {
				initBeltTensionChartAnnotations(chart.surface.current, sequencePair, newPeakPairingResults);
				initializedSurfaceId.current = surfaceId;
			} else {
				updateBeltTensionChartAnnotations(chart.surface.current, sequencePair, newPeakPairingResults);
			}
		} else if (sequencePair == null && initializedSurfaceId.current != null) {
			setPeakPairingResults(null);
			setMechanicalHealth(null);
			updateBeltTensionChartAnnotations(chart.surface.current, null, null);
			initializedSurfaceId.current = null;
		}
	}, [sequencePair, setMechanicalHealth, chart.surface, setPeakPairingResults, chart.isInitialized, surfaceId]);

	return (
		<AnimatedContainer containerClassName="overflow-hidden">
			{peakPairingResults && sequencePair && (
				<div>
					<Table className="rounded-none" containerClassName="rounded-none">
						<TableHeader>
							<TableRow className="text-xs">
								<TableHead className="">Pair</TableHead>
								<TableHead className="text-right">
									<div className="flex justify-end">Freq. Delta</div>
								</TableHead>
								<TableHead className="text-right">
									<div className="flex justify-end">Ampl. Delta</div>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{peakPairingResults.pairedPeaks.map((pair, i) => (
								<TableRow key={pair[0].freq + pair[1].freq} className={twJoin('text-xs')}>
									<TableCell className="whitespace-nowrap text-nowrap">Peaks {String.fromCharCode(65 + i)}</TableCell>
									<TableCell>{(Math.round(Math.abs(pair[0].freq - pair[1].freq) * 10) / 10).toFixed(1)}hz</TableCell>
									<TableCell className="text-right">
										{(
											(Math.abs(pair[0].amplitude - pair[1].amplitude) /
												Math.max(pair[0].amplitude, pair[1].amplitude)) *
											100
										).toFixed(1)}
										%
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<div className="mt-0 grid grid-cols-2 gap-3 p-3">
						<div>
							<CardTitle className="text-sm">Estimated Similarity</CardTitle>
							<CardDescription className="text-xs">{mechanicalHealth?.mhi.toFixed(1)}%</CardDescription>
						</div>
						<div>
							<CardTitle className="text-sm">Status</CardTitle>
							<CardDescription className="text-xs">{mechanicalHealth?.label}</CardDescription>
						</div>
					</div>
				</div>
			)}
		</AnimatedContainer>
	);
};
