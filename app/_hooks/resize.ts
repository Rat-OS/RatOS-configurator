import { useEffect, useState } from 'react';

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		width: typeof window === 'undefined' ? 0 : window.innerWidth,
		height: typeof window === 'undefined' ? 0 : window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			requestAnimationFrame(() => {
				setWindowSize({
					width: typeof window === 'undefined' ? 0 : window.innerWidth,
					height: typeof window === 'undefined' ? 0 : window.innerHeight,
				});
			});
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
};
