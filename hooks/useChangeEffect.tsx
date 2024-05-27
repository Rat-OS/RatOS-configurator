import { useCallback, useEffect, useRef, useState } from 'react';

export const useChangeEffect = (deps: unknown[], clearAfter?: number, resetTimeoutOnChange: boolean = false) => {
	const [hasChanged, setHasChanged] = useState(0);
	const lastDeps = useRef([...deps]);
	useEffect(() => {
		let changed = false;
		lastDeps.current.forEach((dep, i) => {
			if (dep !== deps[i]) {
				changed = true;
			}
		});
		if (changed) {
			setHasChanged((hasChanged) => (resetTimeoutOnChange ? hasChanged + 1 : 1));
		}
		lastDeps.current = [...deps];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps]);

	const clear = useCallback(() => {
		setHasChanged(0);
	}, []);

	useEffect(() => {
		if (clearAfter != null && hasChanged > 0) {
			const timeout = setTimeout(() => {
				setHasChanged(0);
			}, clearAfter);
			return () => {
				clearTimeout(timeout);
			};
		}
		return;
	}, [clearAfter, hasChanged]);

	return [hasChanged > 0, clear] as const;
};

export const useDelayedChangeEffect = (
	deps: unknown[],
	delay: number,
	clearAfter?: number,
	resetTimeoutOnChange: boolean = false,
) => {
	const [changeCount, setChangeCount] = useState(0);
	const lastDeps = useRef([...deps]);
	const timeout = useRef<number | null>(null);
	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		let changed = false;
		lastDeps.current.forEach((dep, i) => {
			if (dep !== deps[i]) {
				changed = true;
			}
		});
		if (changed) {
			const trigger = () => setChangeCount((hasChanged) => (resetTimeoutOnChange ? hasChanged + 1 : 1));
			timeout.current = window.setTimeout(() => {
				trigger();
				timeout.current = null;
			}, delay);
		}
		lastDeps.current = [...deps];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps]);
	useEffect(() => {
		return () => {
			if (timeout.current) {
				clearTimeout(timeout.current);
			}
		};
	}, []);
	const [hasChanged, clear] = useChangeEffect([changeCount], clearAfter, resetTimeoutOnChange);
	return [hasChanged, clear] as const;
};
