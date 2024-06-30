import { KlipperAccelSubscriptionData } from '@/zods/analysis';
import BigNumber from 'bignumber.js';
import {
	Observable,
	asyncScheduler,
	bufferTime,
	concatMap,
	delay,
	distinctUntilChanged,
	first,
	firstValueFrom,
	from,
	map,
	of,
	scheduled,
	share,
	tap,
} from 'rxjs';

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
	const realTimeStamp = new Date().getTime();
	const subtractTimeStamp = ([time, x, y, z]: AccelSample): BigNumberAccelSample => [
		BigNumber(time).minus(timeStamp).shiftedBy(3),
		x,
		y,
		z,
	];

	const signal$ = scheduled(dataStream$, asyncScheduler).pipe(
		concatMap((data) => scheduled(from(data.data), asyncScheduler)),
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
		share(),
	);

	const timeMappedSignal$ = signal$.pipe(
		concatMap((sample) => {
			const offsetFromRealtime = new Date().getTime() - realTimeStamp;
			const offsetFromTimestamp = sample[0].toNumber();
			if (offsetFromRealtime < offsetFromTimestamp) {
				return scheduled(of(sample).pipe(delay(offsetFromTimestamp - offsetFromRealtime)), asyncScheduler);
			}
			return of(sample);
		}),
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
