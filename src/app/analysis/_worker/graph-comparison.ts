import { PSD } from '@/zods/analysis';
import { SciChartSurface, XyMovingAverageFilter, XyDataSeries, FastLineRenderableSeries } from 'scichart';
import { calculatePercentile, pearsonCorrelation } from '@/app/analysis/math';
import { PSD_CHART_AXIS_AMPLITUDE_ID } from '@/app/analysis/charts';

/**
 * Methods to compare responses from two signals.
 * Most of this is borrowed from https://github.com/Frix-x/klippain-shaketune by @Frix-x
 * and as such is licensed under GNU General Public License v3.0 (GPL-3.0).
 */

const DC_MAX_PEAKS = 2;
const DC_MAX_UNPAIRED_PEAKS_ALLOWED = 0;

type Peak = { freq: number; amplitude: number };

export const detectPeaks = (surface: SciChartSurface, psd: PSD): Peak[] => {
	// Moving average
	const movingAverage = new XyMovingAverageFilter(
		new XyDataSeries(surface.webAssemblyContext2D, {
			containsNaN: false,
			isSorted: true,
			xValues: psd.frequencies,
			yValues: psd.estimates,
		}),
		{ length: 2, isSorted: true, containsNaN: false },
	);
	const avgValues = movingAverage.getNativeYValues();
	const detectionThreshold = psd.powerRange.max * 0.05;
	const peaks: Peak[] = [];

	for (let i = 1; i < avgValues.size(); i++) {
		const prev = avgValues.get(i - 1);
		const current = avgValues.get(i);
		const next = avgValues.get(i + 1);
		if (prev < current && current > next) {
			// peak identified.
			if (current - prev > detectionThreshold) {
				if (psd.estimates[i] < psd.estimates[i - 1]) {
					peaks.push({ freq: psd.frequencies[i - 1], amplitude: psd.estimates[i - 1] });
				} else {
					peaks.push({ freq: psd.frequencies[i], amplitude: psd.estimates[i] });
				}
			} else if (current - next > detectionThreshold) {
				peaks.push({ freq: psd.frequencies[i], amplitude: psd.estimates[i] });
			}
		}
	}

	// sort by amplitude
	return peaks.sort((a, b) => b.amplitude - a.amplitude);
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
	const unpairedPeaks1: Peak[] = [];
	const unpairedPeaks2: Peak[] = [];

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
	for (const peak1 of peaks1) {
		const peak2 = peaks2.find((p) => Math.abs(p.freq - peak1.freq) < threshold);
		if (peak2) {
			pairedPeaks.push([peak1, peak2]);
		} else {
			unpairedPeaks1.push(peak1);
		}
	}

	// Find unpaired peaks
	for (const peak2 of peaks2) {
		if (!pairedPeaks.some((p) => p[1].freq === peak2.freq)) {
			unpairedPeaks2.push(peak2);
		}
	}

	return { pairedPeaks, unpairedPeaks1, unpairedPeaks2 };
};

function mechanicalHealthLookupTable(mechanicalHealthIndicator: number): string {
	const ranges: [number, number, string][] = [
		[70, 100, 'Excellent mechanical health'],
		[55, 70, 'Good mechanical health'],
		[45, 55, 'Acceptable mechanical health'],
		[30, 45, 'Potential signs of mechanical issues'],
		[15, 30, 'Likely mechanical issues'],
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

export function computeMechanicalHealth(
	signal1: { unpairedPeaks: Peak[]; pairedPeaks: [Peak, Peak][]; psd: PSD },
	signal2: { unpairedPeaks: Peak[]; pairedPeaks: [Peak, Peak][]; psd: PSD },
): MechanicalHealthResult {
	const similarityFactor = pearsonCorrelation(signal1.psd.estimates, signal2.psd.estimates);
	const numUnpairedPeaks = signal1.unpairedPeaks.length + signal2.unpairedPeaks.length;
	const numPairedPeaks = signal1.pairedPeaks.length;

	// Combine unpaired peaks from both signals, tagging each peak with its respective signal
	const combinedUnpairedPeaks = signal1.unpairedPeaks.concat(signal2.unpairedPeaks);

	const psdHighestMax = Math.max(signal1.psd.powerRange.max, signal2.psd.powerRange.max);

	// Start with the similarity factor directly scaled to a percentage
	let mhi = similarityFactor;

	// Bonus for ideal number of total peaks (1 or 2)
	if (numPairedPeaks >= DC_MAX_PEAKS) {
		mhi *= DC_MAX_PEAKS / numPairedPeaks; // Reduce MHI if more than ideal number of peaks
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
