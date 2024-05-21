import {
	Observable,
	switchMap,
	switchScan,
	bufferCount,
	scan,
	throttle,
	Subject,
	map,
	from,
	concatMap,
	distinctUntilChanged,
	filter,
	mergeMap,
	of,
	shareReplay,
	EMPTY,
	merge,
	share,
	take,
	sample,
	audit,
} from 'rxjs';
import { AccelSampleMs } from '@/app/analysis/_worker/processing';
import { powerSpectralDensity, sumPSDs } from '@/app/analysis/periodogram';
import { Rank, Tensor2D, reshape, setBackend, split, sum, tensor2d, tidy } from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgpu';
import BigNumber from 'bignumber.js';
import { DoWork, runWorker } from 'observable-webworker';
import { bufferFifo } from '@/app/analysis/_worker/stream-utils';

// setWasmPaths({
// 	'tfjs-backend-wasm.wasm': '/configure/tfjs-backend-wasm.wasm',
// 	'tfjs-backend-wasm-simd.wasm': '/configure/tfjs-backend-wasm-simd.wasm',
// 	'tfjs-backend-wasm-threaded-simd.wasm': '/configure/tfjs-backend-wasm-threaded-simd.wasm',
// });
setBackend('webgl');

const runPSD = async (samples: AccelSampleMs[], includeSource: boolean = false) => {
	const sampleRate = new BigNumber(samples.length)
		.div(new BigNumber(samples[samples.length - 1][0]).minus(samples[0][0]).shiftedBy(-3))
		.decimalPlaces(0, BigNumber.ROUND_FLOOR)
		.toNumber();
	const tensors = tidy(() => {
		const signal = tensor2d(samples.map((s) => [s[1], s[2], s[3]]));
		const [x2d, y2d, z2d] = split<Tensor2D>(signal, 3, 1);
		const x = reshape<Rank.R1>(x2d, [x2d.shape[0]]);
		const y = reshape<Rank.R1>(y2d, [y2d.shape[0]]);
		const z = reshape<Rank.R1>(z2d, [z2d.shape[0]]);
		return { x, y, z };
	});
	const [xPsd, yPsd, zPsd] = await Promise.all([
		powerSpectralDensity(tensors.x, sampleRate, { isDetrended: true }),
		powerSpectralDensity(tensors.y, sampleRate, { isDetrended: true }),
		powerSpectralDensity(tensors.z, sampleRate, { isDetrended: true }),
	]);
	Object.values(tensors).forEach((t) => t.dispose());
	return {
		x: xPsd,
		y: yPsd,
		z: zPsd,
		total: sumPSDs([xPsd, yPsd, zPsd]),
		// source: includeSource ? samples.map((s) => new Float64Array([s[0].toNumber(), s[1], s[2], s[3]])) : undefined,
	};
};

export type PSDResult = Awaited<ReturnType<typeof runPSD>>;

export type AccumulateAndCallback = false | ((psd: Awaited<ReturnType<typeof runPSD>>) => void);

const psdProcess = new Subject();
const psdProcess$ = psdProcess.asObservable();
const accumulationSubject = new Subject<AccumulateAndCallback>();
const accumulation$ = accumulationSubject.asObservable();
const createPSDProcessor = (signal$: Observable<AccelSampleMs>, specSampleRate$: Observable<number>) => {
	// console.log('creating psd processor');
	console.time('sincelast psd');
	let first = true;
	return accumulation$.pipe(
		distinctUntilChanged(),
		switchScan(
			(acc, accumulate) => {
				if (accumulate) {
					// console.log('accumulating');
					// setTimeout(() => {
					// 	console.log('Starting psd loop');
					// 	psdProcess.next({}); // Allow the next batch through.
					// }, 2000);
					return signal$.pipe(
						scan((sampleAcc, sample) => sampleAcc.concat([sample]), [] as AccelSampleMs[]),
						filter((samples) => samples.length > 3200),
						map((samples) => {
							// if (samples.length % (3200 * 4) === 0) {
							// 	console.log('rendering psd of', samples.length, 'samples');
							// 	psdProcess.next({});
							// }
							return {
								samples,
								onAccumulationComplete: accumulate,
							};
						}),
					);
				}
				console.log('passing through');
				if (!accumulate && acc.onAccumulationComplete) {
					console.log('calculating psd and calling callback');
					const cb = acc.onAccumulationComplete;
					runPSD(acc.samples, true).then((psd) => {
						console.log('calling back');
						cb(psd);
					});
				}
				// Don't accumulate
				return specSampleRate$.pipe(
					switchMap((sampleRate) => {
						console.log('buffering at sample rate', sampleRate);
						return signal$.pipe(bufferFifo(sampleRate)); // Returns the last sampleRate sample on each sample.
					}),
					map((samples) => {
						return {
							samples,
							onAccumulationComplete: false,
						};
					}),
				);
			},
			{ samples: [] as AccelSampleMs[], onAccumulationComplete: false as AccumulateAndCallback },
		),
		throttle(() => psdProcess$, { leading: first, trailing: true }),
		concatMap(({ samples, onAccumulationComplete }) => {
			console.log('calculating psd on', samples.length, 'samples');
			console.timeEnd('sincelast psd');
			console.time('sincelast psd');
			console.time('psd');
			if (first) {
				first = false;
			}
			return from(
				runPSD(samples).then((psd) => {
					console.timeEnd('psd');
					setTimeout(() => {
						psdProcess.next({}); // Allow the next batch through.
					}, 10);
					return psd;
				}),
			);
		}),
	);
};

export type PSDWorkerInput =
	| {
			command: 'sampleInput';
			payload: AccelSampleMs;
	  }
	| {
			command: 'specSampleRateInput';
			payload: number;
	  }
	| {
			command: 'accumulate';
			payload: boolean;
	  };
export type PSDWorkerOutput =
	| {
			type: 'accumulation_finished';
			psd: PSDResult;
	  }
	| {
			type: 'accumulation_started';
	  }
	| {
			type: 'psd';
			psd: PSDResult;
	  };

let processor: ReturnType<typeof createPSDProcessor> | null = null;
let signalPassThroughSubject = new Subject<AccelSampleMs>();
let signalPassThrough$ = signalPassThroughSubject.asObservable();
let sampleRatePassThroughSubject = new Subject<number>();
let sampleRatePassThrough$ = sampleRatePassThroughSubject
	.asObservable()
	.pipe(shareReplay({ bufferSize: 1, refCount: true }));
export class PSDWorker implements DoWork<PSDWorkerInput, PSDWorkerOutput> {
	private isAccumulating = false;
	public work(input$: Observable<PSDWorkerInput>) {
		return input$.pipe(
			mergeMap((input): Observable<PSDWorkerOutput> => {
				switch (input.command) {
					case 'accumulate': {
						console.log('accumulation command', input.payload);
						if (!this.isAccumulating && input.payload === true) {
							this.isAccumulating = true;
							return merge(
								of({
									type: `accumulation_started` as const,
								}),
								from(
									new Promise<PSDResult>((resolve, reject) => {
										accumulationSubject.next((val) => {
											console.log('accumulated result was returned');
											resolve(val);
										});
									}),
								).pipe(
									map((result) => {
										console.log('mapping callback to stream event');
										return {
											type: `accumulation_finished` as const,
											psd: result,
										};
									}),
								),
							);
						} else {
							this.isAccumulating = false;
							accumulationSubject.next(false);
							psdProcess.next({});
							return EMPTY;
						}
					}
					case 'sampleInput': {
						signalPassThroughSubject.next(input.payload);
						if (processor == null) {
							processor = createPSDProcessor(signalPassThrough$, sampleRatePassThrough$);
							// console.log('processor created');
							accumulationSubject.next(false);
							return processor.pipe(
								map((psd) => {
									return {
										type: 'psd',
										psd,
									} as {
										type: 'psd';
										psd: PSDResult;
									};
								}),
							);
						}
						return EMPTY;
					}
					case 'specSampleRateInput': {
						// console.log('passing through sample rate', input.payload);
						if (!this.isAccumulating) {
							accumulationSubject.next(false);
						}
						sampleRatePassThroughSubject.next(input.payload);
						return EMPTY;
					}
					default: {
						return EMPTY;
					}
				}
			}),
		);
	}
	public selectTransferables(output: PSDWorkerOutput): Transferable[] {
		switch (output.type) {
			case 'psd': {
				return [
					output.psd.x.estimates.buffer,
					output.psd.x.frequencies.buffer,
					output.psd.y.estimates.buffer,
					output.psd.y.frequencies.buffer,
					output.psd.z.estimates.buffer,
					output.psd.z.frequencies.buffer,
					output.psd.total.estimates.buffer,
					output.psd.total.frequencies.buffer,
				];
			}
			case 'accumulation_finished': {
				return [
					output.psd.x.estimates.buffer,
					output.psd.x.frequencies.buffer,
					output.psd.y.estimates.buffer,
					output.psd.y.frequencies.buffer,
					output.psd.z.estimates.buffer,
					output.psd.z.frequencies.buffer,
					output.psd.total.estimates.buffer,
					output.psd.total.frequencies.buffer,
				];
			}
			default: {
				return [];
			}
		}
	}
}

runWorker(PSDWorker);
