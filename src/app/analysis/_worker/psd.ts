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
} from 'rxjs';
import { AccelSampleMs } from '@/app/analysis/_worker/processing';
import { powerSpectralDensity, sumPSDs } from '@/app/analysis/periodogram';
import { Rank, Tensor2D, reshape, split, sum, tensor2d, tidy } from '@tensorflow/tfjs-core';
import BigNumber from 'bignumber.js';
import { log } from '@/app/analysis/_worker/stream-utils';
import { runWorker } from 'observable-webworker';
import next from 'next';

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
		powerSpectralDensity(tensors.x, sampleRate),
		powerSpectralDensity(tensors.y, sampleRate),
		powerSpectralDensity(tensors.z, sampleRate),
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
	console.log('creating psd processor');
	return accumulation$.pipe(
		distinctUntilChanged(),
		log('accumulate$'),
		switchScan(
			(acc, accumulate) => {
				if (accumulate) {
					console.log('accumulating');
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
						cb(psd);
					});
				}
				// Don't accumulate
				return specSampleRate$.pipe(
					switchMap((sampleRate) => {
						console.log('buffering at sample rate', sampleRate);
						return signal$.pipe(bufferCount(sampleRate));
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
		throttle(() => psdProcess$.pipe(log('psdProcess$'))),
		log('throttle triggered'),
		concatMap(({ samples, onAccumulationComplete }) => {
			console.log('calculating psd on', samples.length, 'samples');
			return from(
				runPSD(samples).then((psd) => {
					console.log('triggering next PSD');
					psdProcess.next({}); // Allow the next batch through.
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
let sampleRatePassThrough$ = sampleRatePassThroughSubject.asObservable().pipe(shareReplay(1));
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
										accumulationSubject.next(resolve);
										this.isAccumulating = false;
									}),
								).pipe(
									map((result) => ({
										type: `accumulation_finished` as const,
										psd: result,
									})),
								),
							);
						} else {
							this.isAccumulating = false;
							accumulationSubject.next(false);
							return EMPTY;
						}
					}
					case 'sampleInput': {
						signalPassThroughSubject.next(input.payload);
						if (processor == null) {
							processor = createPSDProcessor(signalPassThrough$, sampleRatePassThrough$);
							console.log('processor created');
							accumulationSubject.next(false);
							// signal$.pipe(bufferCount(3200), take(1)).forEach((samples) => {
							// 	console.log('calling next psd process');
							// 	psdProcess.next({});
							// });
							return processor.pipe(
								map((psd) => {
									console.log('Sending psd', psd);
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
						console.log('passing through sample rate', input.payload);
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
}

runWorker(PSDWorker);
