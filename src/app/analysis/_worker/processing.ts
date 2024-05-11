import { KlipperAccelSubscriptionData } from '@/zods/analysis';
import BigNumber from 'bignumber.js';
import {
	Observable,
	animationFrames,
	audit,
	buffer,
	bufferCount,
	bufferTime,
	bufferWhen,
	concatMap,
	delay,
	distinctUntilChanged,
	first,
	firstValueFrom,
	from,
	interval,
	last,
	lastValueFrom,
	map,
	mergeMap,
	of,
	race,
	switchMap,
	switchScan,
	tap,
	timestamp,
	shareReplay,
	share,
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
const log = (msg: string) =>
	map(<T>(x: T) => {
		console.log(msg, x);
		return x;
	});
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
	console.log('got timestamp', timeStamp);
	const subtractTimeStamp = ([time, x, y, z]: AccelSample): BigNumberAccelSample => [
		BigNumber(time).minus(timeStamp).shiftedBy(3),
		x,
		y,
		z,
	];
	const signal$ = dataStream$.pipe(
		concatMap((data) => from(data.data)),
		map(subtractTimeStamp),
	);

	const sampleRate$ = signal$.pipe(
		bufferTime(1000),
		map((samples) =>
			new BigNumber(samples.length)
				.div(samples[samples.length - 1][0].minus(samples[0][0]).shiftedBy(-3))
				.decimalPlaces(0, BigNumber.ROUND_FLOOR)
				.toNumber(),
		),
		distinctUntilChanged(),
		log('sampleRate$'),
	);
	const rxRate$ = signal$.pipe(
		timestamp(),
		bufferTime(1000),
		map((samples) =>
			Math.floor(samples.length / ((samples[samples.length - 1].timestamp - samples[0].timestamp) / 1000)),
		),
		distinctUntilChanged(),
		log('rxRate$'),
	);

	const timeMappedSignal$ = dataStream$.pipe(
		concatMap((data) =>
			from(data.data).pipe(
				map(subtractTimeStamp),
				mergeMap((sample) => {
					const d = sample[0]
						.minus(subtractTimeStamp(data.data[0])[0])
						.decimalPlaces(0, BigNumber.ROUND_FLOOR)
						.toNumber();
					return of(sample).pipe(delay(d));
				}),
			),
		),
	);
	// const signalFrameBuffer$ = sampleRate$.pipe(switchMap((sampleRate) => signal$.pipe(bufferCount(sampleRate / fps))));
	const sanityCheck$ = timeMappedSignal$
		.pipe(
			bufferCount(2),
			map((samples) => {
				const [first, second] = samples;
				if (first[0].isGreaterThan(second[0])) {
					console.log(
						`Timestamps are not monotonically increasing! ${first[0].toString()} came before ${second[0].toString()}`,
					);
				}
			}),
		)
		.subscribe(() => {});

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
	);
	const psdSignalBuffer$ = specSampleRate$.pipe(switchMap((sampleRate) => signal$.pipe(bufferCount(sampleRate))));

	return {
		/**
		 * All timestamps are relative to the first timestamp in the stream. This is that first timestamp.
		 */
		timeStamp,
		// signalFrameBuffer$,
		timeMappedSignal$,
		psdSignalBuffer$,
		rxRate$,
		specSampleRate$,
		sampleRate$,
	};
};
