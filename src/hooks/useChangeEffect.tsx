import { useCallback, useEffect, useRef, useState } from 'react';

export const useChangeEffect = (deps: unknown[], clearAfter?: number) => {
	const [hasChanged, setHasChanged] = useState(false);
	const lastDeps = useRef([...deps]);
	useEffect(() => {
		let changed = false;
		lastDeps.current.forEach((dep, i) => {
			if (dep !== deps[i]) {
				changed = true;
			}
		});
		if (changed) {
			setHasChanged(true);
		}
		lastDeps.current = [...deps];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps]);

	const clear = useCallback(() => {
		setHasChanged(false);
	}, []);

	useEffect(() => {
		if (clearAfter != null && hasChanged) {
			const timeout = setTimeout(() => {
				setHasChanged(false);
			}, clearAfter);
			return () => {
				clearTimeout(timeout);
			};
		}
		return;
	}, [clearAfter, hasChanged]);

	return [hasChanged, clear] as const;
};
