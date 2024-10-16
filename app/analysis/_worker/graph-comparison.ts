import { PSD } from '@/zods/analysis';
import { SciChartSurface, XyMovingAverageFilter, XyDataSeries, FastLineRenderableSeries } from 'scichart';
import { calculatePercentile, maxArrayIndex, pearsonCorrelation } from '@/app/analysis/math';
import { PSD_CHART_AXIS_AMPLITUDE_ID } from '@/app/analysis/charts';

/**
 * Methods to compare responses from two signals.
 * Most of this is borrowed from https://github.com/Frix-x/klippain-shaketune by @Frix-x
 * and as such is licensed under GNU General Public License v3.0 (GPL-3.0).
 */

const DC_MAX_PEAKS = 2;
const DC_MAX_UNPAIRED_PEAKS_ALLOWED = 0;

type Peak = { freq: number; amplitude: number };

export const detectPeaks = (
	surface: SciChartSurface,
	psd: PSD,
	detectionThreshold: number,
	seriesColor?: string,
): Peak[] => {
	// Moving average
	const movingAverage = new XyMovingAverageFilter(
		new XyDataSeries(surface.webAssemblyContext2D, {
			containsNaN: false,
			isSorted: true,
			xValues: psd.frequencies,
			yValues: psd.estimates,
		}),
		{ length: 3, isSorted: true, containsNaN: false },
	);
	const avgValues = movingAverage.getNativeYValues();
	const peaks: Peak[] = [];

	if (seriesColor) {
		surface.renderableSeries.add(
			new FastLineRenderableSeries(surface.webAssemblyContext2D, {
				dataSeries: movingAverage,
				yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
				stroke: seriesColor,
				strokeThickness: 5,
				strokeDashArray: [5, 5],
			}),
		);
	}

	const vicinity = 10;
	const freqPerStep = psd.frequencies[1] - psd.frequencies[0];
	let vicinitySteps = Math.ceil(vicinity / freqPerStep);
	if (!isFinite(vicinitySteps)) {
		vicinitySteps = vicinity;
	}
	const peakIndex: number[] = [];
	for (let i = 1; i < avgValues.size(); i++) {
		const prev = avgValues.get(i - 1);
		const current = avgValues.get(i);
		const next = avgValues.get(i + 1);
		if (prev < current && current > next && current > detectionThreshold) {
			// peak identified.
			// Find the highest peak where psd.frequencies[index] is within `vicinity` hz.
			let highestPeakIndex = i;
			new Array(vicinitySteps).fill(0).forEach((_, j) => {
				const index = i - j;
				if (
					index > 0 &&
					index < psd.estimates.length &&
					psd.estimates[index] > psd.estimates[highestPeakIndex] &&
					psd.estimates[index - 1] < psd.estimates[index] &&
					psd.estimates[index + 1] < psd.estimates[index]
				) {
					highestPeakIndex = index;
				}
			});
			if (peakIndex.indexOf(highestPeakIndex) === -1) {
				peakIndex.push(highestPeakIndex);
				peaks.push({ freq: psd.frequencies[highestPeakIndex], amplitude: psd.estimates[highestPeakIndex] });
			}
		}
	}
	return peaks;
};

export type PeakPairingResult = {
	pairedPeaks: [Peak, Peak][];
	unpairedPeaks1: Peak[];
	unpairedPeaks2: Peak[];
};

export const pairPeaks = (
	peaks1: { freq: number; amplitude: number }[],
	peaks2: { freq: number; amplitude: number }[],
): PeakPairingResult => {
	const pairedPeaks: [Peak, Peak][] = [];
	const unpairedPeaks1: Peak[] = peaks1.slice();
	const unpairedPeaks2: Peak[] = peaks2.slice();

	let distances: number[] = [];
	for (let p1 of peaks1) {
		for (let p2 of peaks2) {
			distances.push(Math.abs(p1.freq - p2.freq));
		}
	}

	distances.sort((a, b) => a - b);

	const medianDistance = calculatePercentile(distances, 50);
	const iqr = calculatePercentile(distances, 75) - calculatePercentile(distances, 25);

	let threshold = medianDistance + 1.5 * iqr;
	threshold = Math.min(threshold, 10);

	// Pair peaks
	let i = 0;
	while (unpairedPeaks1.length > 0 && unpairedPeaks2.length > 0 && i < unpairedPeaks1.length * unpairedPeaks2.length) {
		i++;
		let min_distance = threshold + 1;
		let pair: [Peak, Peak] | null = null;
		for (const p1 of unpairedPeaks1) {
			for (const p2 of unpairedPeaks2) {
				const distance = Math.abs(p1.freq - p2.freq);
				if (distance < min_distance) {
					min_distance = distance;
					pair = [p1, p2];
				}
			}
		}
		if (pair) {
			pairedPeaks.push(pair);
			unpairedPeaks1.splice(unpairedPeaks1.indexOf(pair[0]), 1);
			unpairedPeaks2.splice(unpairedPeaks2.indexOf(pair[1]), 1);
		}
	}

	return { pairedPeaks, unpairedPeaks1, unpairedPeaks2 };
};

function mechanicalHealthLookupTable(mechanicalHealthIndicator: number): string {
	const ranges: [number, number, string][] = [
		[90, 100, 'Excellent mechanical health'],
		[70, 90, 'Good mechanical health'],
		[55, 70, 'Acceptable mechanical health'],
		[45, 55, 'Potential signs of overtensioning'],
		[30, 45, 'Potential signs of mechanical issues or overtensioning'],
		[15, 30, 'Very likely mechanical issues'],
		[0, 15, 'Mechanical issues detected'],
	];
	const mhi = Math.max(0, Math.min(mechanicalHealthIndicator, 100));
	for (const [min, max, label] of ranges) {
		if (mhi >= min && mhi <= max) {
			return label;
		}
	}
	return 'Unknown mechanical health';
}

export type MechanicalHealthResult = { mhi: number; label: string };

const padSignal = (signal: number[], targetLength: number): number[] => {
	if (signal.length >= targetLength) return signal;
	return [...signal, ...Array(targetLength - signal.length).fill(0)];
};

export function computeMechanicalHealth(
	signal1: { unpairedPeaks: Peak[]; pairedPeaks: [Peak, Peak][]; psd: PSD },
	signal2: { unpairedPeaks: Peak[]; pairedPeaks: [Peak, Peak][]; psd: PSD },
): MechanicalHealthResult {
	// Pad the PSDs to the same length
	const maxLength = Math.max(signal1.psd.estimates.length, signal2.psd.estimates.length);

	const signal1Estimates = padSignal(signal1.psd.estimates, maxLength);
	const signal2Estimates = padSignal(signal2.psd.estimates, maxLength);
	const similarityFactor = pearsonCorrelation(signal1Estimates, signal2Estimates) * 100;
	const numUnpairedPeaks = signal1.unpairedPeaks.length + signal2.unpairedPeaks.length;
	const numPairedPeaks = signal1.pairedPeaks.length;

	// Combine unpaired peaks from both signals, tagging each peak with its respective signal
	const combinedUnpairedPeaks = signal1.unpairedPeaks.concat(signal2.unpairedPeaks);

	const psdHighestMax = Math.max(signal1.psd.powerRange.max, signal2.psd.powerRange.max);

	// Start with the similarity factor directly scaled to a percentage
	let mhi = similarityFactor;

	// Bonus for ideal number of total peaks (2)
	if (numPairedPeaks >= DC_MAX_PEAKS) {
		mhi *= DC_MAX_PEAKS / numPairedPeaks; // Reduce MHI if more than ideal number of peaks
	}
	if (numPairedPeaks < DC_MAX_PEAKS) {
		mhi *= numPairedPeaks / DC_MAX_PEAKS; // Reduce MHI if less than ideal number of peaks
	}

	// Penalty from unpaired peaks weighted by their amplitude relative to the maximum PSD amplitude
	let unpairedPeakPenalty = 0;
	if (numUnpairedPeaks > DC_MAX_UNPAIRED_PEAKS_ALLOWED) {
		for (const peak of combinedUnpairedPeaks) {
			unpairedPeakPenalty += (peak.amplitude / psdHighestMax) * 30;
		}
		mhi -= unpairedPeakPenalty;
	}

	// Ensure the result lies between 0 and 100 by clipping the computed value
	mhi = Math.max(0, Math.min(mhi, 100));

	return { mhi, label: mechanicalHealthLookupTable(mhi) };
}
