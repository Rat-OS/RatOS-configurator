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
} from 'rxjs';
import { BigNumberAccelSample } from '@/app/analysis/_worker/processing';
import { powerSpectralDensity } from '@/app/analysis/periodogram';
import { Rank, Tensor2D, reshape, split, sum, tensor2d } from '@tensorflow/tfjs-core';
import BigNumber from 'bignumber.js';
import { log } from '@/app/analysis/_worker/stream-utils';

const runPSD = async (samples: BigNumberAccelSample[], includeSource: boolean = false) => {
	const sampleRate = new BigNumber(samples.length)
		.div(samples[samples.length - 1][0].minus(samples[0][0]).shiftedBy(-3))
		.decimalPlaces(0, BigNumber.ROUND_FLOOR)
		.toNumber();
	const signal = tensor2d(samples.map((s) => [s[1], s[2], s[3]]));
	const [x2d, y2d, z2d] = split<Tensor2D>(signal, 3, 1);
	const x = reshape<Rank.R1>(x2d, [x2d.shape[0]]);
	const y = reshape<Rank.R1>(y2d, [y2d.shape[0]]);
	const z = reshape<Rank.R1>(z2d, [z2d.shape[0]]);
	const [xPsd, yPsd, zPsd, totalPsd] = await Promise.all([
		powerSpectralDensity(x, sampleRate),
		powerSpectralDensity(y, sampleRate),
		powerSpectralDensity(z, sampleRate),
		powerSpectralDensity(sum(signal, 1), sampleRate),
	]);
	return {
		x: xPsd,
		y: yPsd,
		z: zPsd,
		total: totalPsd,
		source: includeSource ? samples.map((s) => new Float64Array([s[0].toNumber(), s[1], s[2], s[3]])) : undefined,
	};
};

export type PSDResult = Awaited<ReturnType<typeof runPSD>>;

export type AccumulateAndCallback = false | ((psd: Awaited<ReturnType<typeof runPSD>>) => void);

export const createPSDProcessor = (
	signal$: Observable<BigNumberAccelSample>,
	accumulate$: Observable<AccumulateAndCallback>,
	specSampleRate$: Observable<number>,
) => {
	const psdProcess = new Subject();
	const psdProcess$ = psdProcess.asObservable();
	console.log('creating psd processor');
	const sampleRate$ = specSampleRate$.pipe(shareReplay(1));
	return accumulate$.pipe(
		distinctUntilChanged(),
		switchScan(
			(acc, accumulate) => {
				if (accumulate) {
					console.log('accumulating');
					return signal$.pipe(
						scan((sampleAcc, sample) => sampleAcc.concat([sample]), [] as BigNumberAccelSample[]),
						map((samples) => {
							return {
								samples,
								onComplete: accumulate,
							};
						}),
					);
				}
				console.log('passing through');
				if (!accumulate && acc.onComplete) {
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
			{ samples: [] as BigNumberAccelSample[], onComplete: false as AccumulateAndCallback },
		),
		throttle(() => psdProcess$),
		mergeMap((s) => {
			return sampleRate$.pipe(switchMap((sampleRate) => of(s).pipe(filter((s) => s.samples.length >= sampleRate))));
		}),
		concatMap(({ samples }) => {
			console.log('calculating psd on', samples.length, 'samples');
			return from(
				runPSD(samples).then((psd) => {
					psdProcess.next({}); // Allow the next batch through.
					return psd;
				}),
			);
		}),
	);
};
