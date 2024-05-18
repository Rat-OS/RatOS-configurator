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
export const createPSDProcessor = (
	signal$: Observable<AccelSampleMs>,
	accumulate$: Observable<AccumulateAndCallback>,
	specSampleRate$: Observable<number>,
) => {
	console.log('creating psd processor');
	const sampleRate$ = specSampleRate$.pipe(shareReplay(1));
	return accumulate$.pipe(
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
						map((samples) => {
							if (samples.length % (3200 * 4) === 0) {
								console.log('rendering psd of', samples.length, 'samples');
								psdProcess.next({});
							}
							return {
								samples,
								onComplete: accumulate,
							};
						}),
					);
				}
				console.log('passing through');
				if (!accumulate && acc.onComplete) {
					console.log('calculating psd and calling callback');
					const cb = acc.onComplete;
					runPSD(acc.samples, true).then((psd) => {
						cb(psd);
					});
				}
				// Don't accumulate
				return sampleRate$.pipe(
					switchMap((sampleRate) => signal$.pipe(bufferCount(sampleRate))),
					map((samples) => {
						return {
							samples,
							onComplete: false,
						};
					}),
				);
			},
			{ samples: [] as AccelSampleMs[], onComplete: false as AccumulateAndCallback },
		),
		throttle(() => psdProcess$.pipe(log('psdProcess$'))),
		mergeMap((s) => {
			return sampleRate$.pipe(switchMap((sampleRate) => of(s).pipe(filter((s) => s.samples.length >= sampleRate))));
		}),
		concatMap(({ samples, onComplete }) => {
			console.log('calculating psd on', samples.length, 'samples');
			return from(
				runPSD(samples).then((psd) => {
					console.log('triggering next PSD');
					if (!onComplete) {
						psdProcess.next({}); // Allow the next batch through.
					}
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

export class PSDWorker implements DoWork<PSDWorkerInput, PSDWorkerOutput> {
	private accumulationSubject = new Subject<AccumulateAndCallback>();
	private processor: ReturnType<typeof createPSDProcessor> | null = null;
	private psd$: Observable<{
		type: 'psd';
		psd: PSDResult;
	}> | null = null;
	public work(input$: Observable<PSDWorkerInput>) {
		if (this.processor == null) {
			const signal$ = input$.pipe(
				filter((input): input is { command: 'sampleInput'; payload: AccelSampleMs } => input.command === 'sampleInput'),
				map((input) => input.payload),
			);
			this.processor = createPSDProcessor(
				signal$,
				this.accumulationSubject.asObservable(),
				input$.pipe(
					filter(
						(input): input is { command: 'specSampleRateInput'; payload: number } =>
							input.command === 'specSampleRateInput',
					),
					map((input) => input.payload),
				),
			);
			console.log('processor created');
			setTimeout(() => {
				console.log('sending accumulation false');
				this.accumulationSubject.next(false);
			}, 200);
			signal$.pipe(bufferCount(3200), take(1)).forEach((samples) => {
				psdProcess.next({});
			});
		}
		return input$.pipe(
			mergeMap((input): Observable<PSDWorkerOutput> => {
				const response = (): Observable<PSDWorkerOutput> => {
					switch (input.command) {
						case 'accumulate': {
							console.log('accumulation command', input.payload);
							return merge(
								of({
									type: `accumulation_started` as const,
								}),
								from(
									new Promise<PSDResult>((resolve, reject) => {
										this.accumulationSubject.next(resolve);
									}),
								).pipe(
									map((result) => ({
										type: `accumulation_finished` as const,
										psd: result,
									})),
								),
							);
						}
					}
					return EMPTY;
				};
				return merge(
					this.processor.pipe(
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
						share(),
					),
					response(),
				).pipe(log('response from psd'));
			}),
		);
	}
}

runWorker(PSDWorker);
