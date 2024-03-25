import { useRef, useCallback, useEffect } from 'react';

export const useDebounce = <T extends Function>(fn: T, delay: number, refreshTimeout: boolean = false) => {
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
				if (refreshTimeout) {
					clearTimeout(timeoutRef.current);
					timeoutRef.current = undefined;
				} else {
					return;
				}
			}
			timeoutRef.current = setTimeout(() => {
				fn(...argsRef.current);
				timeoutRef.current = undefined;
			}, delay);
		},
		[delay, refreshTimeout, fn],
	) as unknown as T;
};
