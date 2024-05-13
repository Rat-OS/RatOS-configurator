import { KlipperAccelSubscriptionData } from '@/zods/analysis';
import BigNumber from 'bignumber.js';
import {
	Observable,
	bufferTime,
	concatMap,
	delay,
	distinctUntilChanged,
	first,
	firstValueFrom,
	from,
	map,
	mergeMap,
	of,
	share,
} from 'rxjs';
import { log } from '@/app/analysis/_worker/stream-utils';

const expectedSampleRates = [100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200];
/**
 * The first element of the sample is the timestamp in seconds.
 */
export type AccelSample = [BigNumber | number, number, number, number];
/**
 * The first element of the sample is the timestamp in milliseconds.
 */
export type BigNumberAccelSample = [BigNumber, number, number, number];
export type AccelSampleMs = [number, number, number, number];

type KlipperAccelSubscriptionDataCompat = Omit<KlipperAccelSubscriptionData, 'data'> & { data: AccelSample[] };
export const createSignalBuffers = async (dataStream$: Observable<KlipperAccelSubscriptionDataCompat>) => {
	const timeStamp: number | BigNumber = await firstValueFrom(
		dataStream$.pipe(
			first(),
			map((data) => {
				return BigNumber(data.data[0][0]).decimalPlaces(0, BigNumber.ROUND_FLOOR).toNumber();
			}),
		),
	);
	const subtractTimeStamp = ([time, x, y, z]: AccelSample): BigNumberAccelSample => [
		BigNumber(time).minus(timeStamp).shiftedBy(3),
		x,
		y,
		z,
	];
	const signal$ = dataStream$.pipe(
		concatMap((data) => from(data.data)),
		map(subtractTimeStamp),
		share(),
	);

	const sampleRate$ = signal$.pipe(
		bufferTime(1000),
		map((samples) =>
			samples.length < 1
				? 1
				: Math.floor(samples.length / samples[samples.length - 1][0].minus(samples[0][0]).shiftedBy(-3).toNumber()),
		),
		distinctUntilChanged(),
		log('sampleRate$'),
		share(),
	);

	const timeMappedSignal$ = dataStream$.pipe(
		mergeMap((data) =>
			from(data.data).pipe(
				map(subtractTimeStamp),
				mergeMap((sample) => {
					const d = sample[0]
						.minus(subtractTimeStamp(data.data[0])[0])
						.decimalPlaces(0, BigNumber.ROUND_FLOOR)
						.toNumber();
					// downscale the delay, the scheduler is not perfect as it depends on the work on the main thread.
					const date = new Date(new Date().getTime() + d * 0.7);
					return of(sample).pipe(delay(date));
				}),
			),
		),
		share(),
	);

	const specSampleRate$ = sampleRate$.pipe(
		map((sr) =>
			expectedSampleRates.reduce((prev, cur) => {
				if (Math.abs(cur - sr) < Math.abs(prev - sr)) {
					return cur;
				}
				return prev;
			}, expectedSampleRates[0]),
		),
		distinctUntilChanged(),
		log('specSampleRate$'),
		share(),
	);

	return {
		/**
		 * All timestamps are relative to the first timestamp in the stream. This is that first timestamp.
		 */
		timeStamp,
		signal$,
		timeMappedSignal$,
		specSampleRate$,
		sampleRate$,
	};
};
