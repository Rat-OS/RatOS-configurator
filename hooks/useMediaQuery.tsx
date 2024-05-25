'use client';
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
	const mediaQueryList = window.matchMedia(query);
	const [matches, setMatches] = useState(mediaQueryList.matches);

	useEffect(() => {
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
