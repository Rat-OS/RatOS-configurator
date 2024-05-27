'use client';
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
	const mediaQueryList = typeof window !== 'undefined' ? window.matchMedia(query) : null;
	const [matches, setMatches] = useState(mediaQueryList?.matches ?? false);

	useEffect(() => {
		if (mediaQueryList == null) {
			return;
		}
		const handleChange = (event: MediaQueryListEvent) => {
			setMatches(event.matches);
		};

		mediaQueryList.addEventListener('change', handleChange);

		return () => {
			mediaQueryList.removeEventListener('change', handleChange);
		};
	}, [mediaQueryList]);

	return matches;
}
