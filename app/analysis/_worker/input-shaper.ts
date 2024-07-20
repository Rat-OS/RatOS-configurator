'use client';
/**
 * Adapted from Dmitry Butyugin <dmbutyugin@google.com> input shaper code in Klipper.
 * This file may be distributed under the terms of the GNU GPLv3 license.
 */
import {
	Tensor1D,
	sum,
	max,
	pow,
	div,
	sub,
	mul,
	tensor1d,
	exp,
	sin,
	cos,
	outerProduct,
	slice,
	zeros,
	stack,
	sqrt,
	slice1d,
	tidy,
	setBackend,
} from '@tensorflow/tfjs-core';
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm';

import type { TypedArrayPSD } from '@/app/analysis/periodogram';
import { INPUT_SHAPERS, InputShaperModel, Shaper, ShaperModels } from '@/app/analysis/_worker/shapers';
import { PSD } from '@/zods/analysis';
import { shadableTWColors } from '@/app/_helpers/colors';
import { sumArray } from '@/app/analysis/math';

export type InputShaperWorkerInput =
	| {
			id?: number;
			type: 'findBestShaper';
			calibrationData: TypedArrayPSD | PSD;
			scv: number;
			shaperFreqs?: [number | null, number | null, number | null];
			dampingRatio?: number;
			maxSmoothing?: number;
			testDampingRatios?: number[];
			maxFreq?: number;
	  }
	| {
			type: 'cancelJob';
			id: number;
	  };

export type InputShaperWorkerOutput =
	| {
			type: 'findBestShaper';
			result: ShaperCalibrationResult | null;
			jobId: number;
			shapers: (ShaperCalibrationResult | null)[];
	  }
	| {
			type: 'fitShaper';
			jobId: number;
			result: ShaperCalibrationResult | null;
	  }
	| {
			type: 'jobCancelled';
			id: number;
	  }
	| {
			type: 'fitShaperProgress';
			model: ShaperModels;
			jobId: number;
			progress: number;
	  }
	| {
			type: 'findBestShaperProgress';
			jobId: number;
			progress: number;
	  };
declare function postMessage(message: InputShaperWorkerOutput, targetOrigin: string, transfer?: Transferable[]): void;
declare function postMessage(message: InputShaperWorkerOutput, options?: WindowPostMessageOptions): void;

export interface InputShaperWorker extends Worker {
	onmessage(this: Worker, ev: MessageEvent<InputShaperWorkerOutput>): any;
	postMessage(message: InputShaperWorkerInput, transfer?: Transferable[]): void;
	postMessage(message: InputShaperWorkerInput, options?: StructuredSerializeOptions): void;
}
class JobCancelledError extends Error {
	constructor() {
		super('Job cancelled');
	}
}

const jobs = new Map<number, AbortController>();
let _id = 0;

export const shaperDefaults = {
	DEFAULT_DAMPING_RATIO: 0.1,
	SHAPER_VIBRATION_REDUCTION: 20,
	TEST_DAMPING_RATIOS: [0.075, 0.1, 0.15],
	MAX_SHAPER_FREQ: 150,
	WINDOW_T_SEC: 0.5,
	MIN_FREQ: 5,
	MAX_FREQ: 200,
	// Just some empirically chosen value which produces good projections
	// for max_accel without much smoothing
	TARGET_SMOOTHING: 0.12,
};

const cancelJob = (id: number) => {
	const controller = jobs.get(id);
	if (controller && controller.signal.aborted === false) {
		controller.abort();
	}
	jobs.delete(id);
};

const throwIfCancelled = (signal: AbortSignal) => {
	if (signal.aborted) {
		throw new JobCancelledError();
	}
};

async function getShaperSmoothing(shaper: Shaper, accel: number = 5000, scv: number = 5): Promise<number> {
	const half_accel = accel * 0.5;

	const [A, T] = shaper;
	const inv_D = 1 / sumArray(A);
	const n = T.length;
	// Calculate input shaper shift
	const ts = sumArray(A.map((a, i) => a * T[i])) * inv_D;

	// Calculate offset for 90 and 180 degrees turn
	let offset_90 = 0;
	let offset_180 = 0;
	for (let i = 0; i < n; i++) {
		if (T[i] >= ts) {
			// Calculate offset for one of the axes
			offset_90 += A[i] * (scv + half_accel * (T[i] - ts)) * (T[i] - ts);
		}
		offset_180 += A[i] * half_accel * (T[i] - ts) ** 2;
	}
	offset_90 *= inv_D * Math.sqrt(2);
	offset_180 *= inv_D;
	return Math.max(offset_90, offset_180);
}

async function bisect(fn: (x: number) => Promise<boolean>): Promise<number> {
	let left = 1.0;
	let right = 1.0;
	if (!(await fn(1e-9))) {
		return 0.0;
	}
	while (!(await fn(left))) {
		right = left;
		left *= 0.5;
	}
	if (right === left) {
		while (await fn(right)) {
			right *= 2.0;
		}
	}
	while (right - left > 1e-8) {
		const middle = (left + right) * 0.5;
		if (await fn(middle)) {
			left = middle;
		} else {
			right = middle;
		}
	}
	return left;
}

async function findShaperMaxAccel(shaper: Shaper, scv: number): Promise<number> {
	const maxAccel = await bisect(
		async (testAccel: number) => (await getShaperSmoothing(shaper, testAccel, scv)) <= shaperDefaults.TARGET_SMOOTHING,
	);
	return maxAccel;
}

function estimateShaper(shaper: Shaper, test_damping_ratio: number, test_freqs: Tensor1D): Tensor1D {
	return tidy(() => {
		const A = tensor1d(shaper[0]);
		const T = tensor1d(shaper[1]);
		const inv_D = div(1, sum(A));
		const omega = mul<Tensor1D>(mul<Tensor1D>(test_freqs, 2), Math.PI);
		const damping = mul<Tensor1D>(omega, test_damping_ratio);
		const omega_d = mul<Tensor1D>(omega, Math.sqrt(1 - test_damping_ratio ** 2));
		const W = mul(A, exp(outerProduct(mul<Tensor1D>(damping, -1), sub<Tensor1D>(slice(T, T.size - 1, 1), T))));
		const S = mul(W, sin(outerProduct(omega_d, T)));
		const C = mul(W, cos(outerProduct(omega_d, T)));
		return mul(sqrt(sum(stack([pow(sum(S, 1), 2), pow(sum(C, 1), 2)]), 0)), inv_D);
	});
}

async function estimateRemainingVibrations(
	shaper: Shaper,
	test_damping_ratio: number,
	freq_bins: Tensor1D,
	psd: Tensor1D,
): Promise<[number, Tensor1D]> {
	const vals = estimateShaper(shaper, test_damping_ratio, freq_bins);
	const res = (await tidy(() => {
		// The input shaper can only reduce the amplitude of vibrations by
		// SHAPER_VIBRATION_REDUCTION times, so all vibrations below that
		// threshold can be ignored
		const vibr_threshold = div(max(psd), shaperDefaults.SHAPER_VIBRATION_REDUCTION);
		const remaining_vibrations = sum(max(sub(mul(vals, psd), vibr_threshold), 0));
		const all_vibrations = sum(max(sub(psd, vibr_threshold), 0));
		return div(remaining_vibrations, all_vibrations);
	}).array()) as number;
	return [res, vals];
}

export type ShaperCalibrationResult = {
	name: ShaperModels;
	color: keyof typeof shadableTWColors;
	freq: number;
	vals: number[];
	psd: number[];
	vibrs: number;
	smoothing: number;
	score: number;
	maxAccel: number;
};

const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

export async function fitShaper(
	jobId: number,
	signal: AbortSignal,
	shaperCfg: InputShaperModel,
	calibrationData: TypedArrayPSD | PSD,
	/**
	 * [start?, end?, step?]
	 * @type {[number, number, number]}
	 */
	scv: number,
	shaperFreqs: [number | null, number | null, number | null] = [null, null, null],
	dampingRatio?: number,
	maxSmoothing?: number,
	testDampingRatios?: number[],
	maxFreq?: number,
	onProgress?: (model: ShaperModels, progress: number) => void,
) {
	dampingRatio = dampingRatio || shaperDefaults.DEFAULT_DAMPING_RATIO;
	testDampingRatios = testDampingRatios || shaperDefaults.TEST_DAMPING_RATIOS;
	const freqEnd = shaperFreqs[1] ?? shaperDefaults.MAX_SHAPER_FREQ;
	const freqStart = Math.min(shaperFreqs[0] ?? shaperCfg.minFreq, freqEnd - 1e-7);
	const freqStep = shaperFreqs[2] ?? 0.2;
	throwIfCancelled(signal);

	maxFreq = Math.max(maxFreq || shaperDefaults.MAX_FREQ, freqEnd);

	const freqBins = slice1d(calibrationData.frequencies, 0, calibrationData.frequencies.length);
	const freqBinsFiltered = slice1d(
		freqBins,
		0,
		calibrationData.frequencies.findIndex((f) => f > maxFreq),
	);
	const psd = slice1d(calibrationData.estimates, 0, freqBins.size);
	freqBins.dispose();
	const zeroArray = zeros([psd.size]);
	// Two pass approach, start in 10hz increments, then refine in `freqStep` increments
	const freqsOfInterest = (
		await Promise.all(
			range(freqStart, freqEnd, 10).map(async (f) => {
				if (shaperCfg.minFreq > f) {
					return null;
				}
				const shaper = shaperCfg.initFunc(f, dampingRatio);
				let shaperVibrations = 0;
				let shaperVals = zeroArray.clone();
				for (const dr of testDampingRatios) {
					const [vibrations, vals] = await estimateRemainingVibrations(shaper, dr, freqBinsFiltered, psd);
					throwIfCancelled(signal);
					const oldShapervals = shaperVals;
					shaperVals = tidy(() => max<Tensor1D>(stack([oldShapervals, vals]), 0));
					oldShapervals.dispose();
					if (vibrations > shaperVibrations) {
						shaperVibrations = vibrations;
					}
				}
				if (shaperVibrations < 0.15) {
					return f;
				}
				return null;
			}),
		)
	).filter(Boolean);
	throwIfCancelled(signal);
	const testFrequencies = range(Math.min(...freqsOfInterest), Math.max(...freqsOfInterest), freqStep);
	const progressMap = new Map<number, number>();
	const reportProgress = (index: number, progress: number) => {
		progressMap.set(index, progress);
		const totalProgress = sumArray(Array.from(progressMap.values())) / testFrequencies.length;
		postMessage({ type: 'fitShaperProgress', model: shaperCfg.name, progress: totalProgress, jobId });
		onProgress?.(shaperCfg.name, totalProgress);
	};
	const bestShaper: ShaperCalibrationResult | null = (
		await Promise.all(
			testFrequencies.reverse().map(async (testFreq, index) => {
				reportProgress(testFreq, 0);
				throwIfCancelled(signal);
				let shaperVibrations = 0;
				let shaperVals = zeroArray.clone();
				const shaper = shaperCfg.initFunc(testFreq, dampingRatio);
				const shaperSmoothing = await getShaperSmoothing(shaper, undefined, scv);
				throwIfCancelled(signal);
				if (maxSmoothing && shaperSmoothing > maxSmoothing) {
					return null;
				}
				reportProgress(index, 1 / 3);
				for (const dr of testDampingRatios) {
					const [vibrations, vals] = await estimateRemainingVibrations(shaper, dr, freqBinsFiltered, psd);
					throwIfCancelled(signal);
					const oldShapervals = shaperVals;
					shaperVals = tidy(() => max<Tensor1D>(stack([oldShapervals, vals]), 0));
					oldShapervals.dispose();
					if (vibrations > shaperVibrations) {
						shaperVibrations = vibrations;
					}
				}

				reportProgress(index, 2 / 3);
				const maxAccel = await findShaperMaxAccel(shaper, scv);
				throwIfCancelled(signal);
				const shaperScore = shaperSmoothing * (Math.pow(shaperVibrations, 1.5) + shaperVibrations * 0.2 + 0.01);
				const shaperValsArray = (await shaperVals.array()) as number[];
				const adaptedPsd = (await mul(psd, shaperVals).array()) as number[];
				reportProgress(index, 3 / 3);
				const result = {
					name: shaperCfg.name,
					freq: testFreq,
					vals: shaperValsArray,
					psd: adaptedPsd,
					vibrs: shaperVibrations,
					smoothing: shaperSmoothing,
					score: shaperScore,
					color: shaperCfg.color,
					maxAccel: maxAccel,
				} satisfies ShaperCalibrationResult;
				return result;
			}),
		)
	).reduce(
		(selected, res) => {
			if (res === null) {
				return selected;
			}
			if (selected == null || (res.vibrs < selected.vibrs * 1.1 && res.score < selected.score)) {
				selected = res;
			}
			return selected;
		},
		null as ShaperCalibrationResult | null,
	);
	freqBinsFiltered.dispose();
	psd.dispose();
	zeroArray.dispose();

	throwIfCancelled(signal);
	postMessage({ type: 'fitShaper', result: bestShaper, jobId });

	return bestShaper;
}

setWasmPaths({
	'tfjs-backend-wasm.wasm': '/configure/tfjs-backend-wasm.wasm',
	'tfjs-backend-wasm-simd.wasm': '/configure/tfjs-backend-wasm-simd.wasm',
	'tfjs-backend-wasm-threaded-simd.wasm': '/configure/tfjs-backend-wasm-threaded-simd.wasm',
});
export async function findBestShaper(
	jobId: number,
	signal: AbortSignal,
	calibrationData: TypedArrayPSD | PSD,
	scv: number,
	shapers: InputShaperModel[] = INPUT_SHAPERS,
	shaperFreqs?: [number | null, number | null, number | null],
	dampingRatio?: number,
	maxSmoothing?: number,
	testDampingRatios?: number[],
	maxFreq?: number,
) {
	await setBackend('wasm');
	throwIfCancelled(signal);
	const fittedShapers: ShaperCalibrationResult[] = [];
	const totalProgress = new Map<ShaperModels, number>();
	shapers.forEach((s) => totalProgress.set(s.name, 0));
	postMessage({ type: 'findBestShaperProgress', progress: 0, jobId });
	const reportProgress = (model: ShaperModels, progress: number) => {
		totalProgress.set(model, progress);
		const total = sumArray(Array.from(totalProgress.values())) / shapers.length;
		postMessage({ type: 'findBestShaperProgress', progress: total, jobId });
	};
	for (const shaper of shapers) {
		const fittedShaper = await fitShaper(
			jobId,
			signal,
			shaper,
			calibrationData,
			scv,
			shaperFreqs,
			dampingRatio,
			maxSmoothing,
			testDampingRatios,
			maxFreq,
			reportProgress,
		);
		if (fittedShaper) {
			fittedShapers.push(fittedShaper);
		}
	}
	throwIfCancelled(signal);
	const best = fittedShapers.reduce((best, shaper) => {
		// Either the shaper significantly improves the score (by 20%),
		// or it improves the score and smoothing (by 5% and 10% resp.)
		if (
			!best ||
			(shaper && shaper.score * 1.2 < best.score) ||
			(shaper.score * 1.05 < best.score && shaper.smoothing * 1.1 < best.smoothing)
		) {
			best = shaper;
		}
		return best;
	});
	return {
		result: best,
		shapers: fittedShapers,
	};
}

onmessage = async (e: MessageEvent<InputShaperWorkerInput>) => {
	const command = e.data.type;
	switch (command) {
		case 'findBestShaper':
			const { calibrationData, scv, shaperFreqs, dampingRatio, maxSmoothing, testDampingRatios, maxFreq, id } = e.data;
			const jobId = id ?? _id++;
			const abortController = new AbortController();
			try {
				jobs.set(jobId, abortController);
				const result = await findBestShaper(
					jobId,
					abortController.signal,
					calibrationData,
					scv,
					INPUT_SHAPERS,
					shaperFreqs,
					dampingRatio,
					maxSmoothing,
					testDampingRatios,
					maxFreq,
				);
				postMessage({ type: 'findBestShaper', jobId, ...result } satisfies InputShaperWorkerOutput);
			} catch (e) {
				if (e instanceof JobCancelledError) {
					cancelJob(jobId);
					postMessage({ type: 'jobCancelled', id: jobId } satisfies InputShaperWorkerOutput);
				}
			}
			break;
		case 'cancelJob':
			cancelJob(e.data.id);
			break;
	}
};
