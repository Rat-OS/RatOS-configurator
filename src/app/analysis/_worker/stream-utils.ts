import { scan, pipe, filter, Observable, UnaryFunction } from 'rxjs';

export const bufferFifo = <T>(bufferSize: number): UnaryFunction<Observable<T>, Observable<T[]>> =>
	pipe(
		scan((acc, input: T) => {
			const buffer = [...acc, input].slice(-bufferSize);
			return buffer;
		}, [] as T[]),
		filter((buffer) => buffer.length >= bufferSize),
	);
