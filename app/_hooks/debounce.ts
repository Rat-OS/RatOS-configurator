import { useRef, useCallback, useEffect } from 'react';

export const useDebounce = <T extends Function>(fn: T, delay: number) => {
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
	const argsRef = useRef<any[]>([]);
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);
	return useCallback(
		(...args: any[]) => {
			argsRef.current = args;
			if (timeoutRef.current) {
				return;
			}
			timeoutRef.current = setTimeout(() => {
				fn(...argsRef.current);
				timeoutRef.current = undefined;
			}, delay);
		},
		[fn, delay],
	) as unknown as T;
};
