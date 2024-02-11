import { useRef, useCallback } from 'react';

export const useDebounce = <T extends Function>(fn: T, delay: number) => {
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
	return useCallback(
		(...args: any[]) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => {
				fn(...args);
			}, delay);
		},
		[fn, delay],
	) as unknown as T;
};
