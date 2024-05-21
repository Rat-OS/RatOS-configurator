import { getLogger } from '@/app/_helpers/logger';
import { map, scan, pipe, filter, Observable, UnaryFunction } from 'rxjs';
export const log = (msg: string) =>
	map(<T>(x: T) => {
		// getLogger().debug(x, msg);
		console.log(x, msg);
		return x;
	});

export const bufferFifo = <T>(bufferSize: number): UnaryFunction<Observable<T>, Observable<T[]>> =>
	pipe(
		scan((acc, input: T) => {
			const buffer = [...acc, input].slice(-bufferSize);
			return buffer;
		}, [] as T[]),
		filter((buffer) => buffer.length >= bufferSize),
	);
