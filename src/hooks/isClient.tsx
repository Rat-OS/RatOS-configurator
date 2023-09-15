'use client';
import { useEffect, useState } from 'react';

export const useIsClient = () => {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		console.log('setting client!');
		setIsClient(true);
	}, []);
	return isClient;
};
