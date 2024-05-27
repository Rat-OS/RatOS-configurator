import { useCallback, useEffect, useRef, useState } from 'react';

export const useActiveElement = () => {
	const [activeElement, setActiveElement] = useState<Element | null>(document.activeElement);
	const activeElementRef = useRef(activeElement);
	activeElementRef.current = activeElement;
	const updateElement = useCallback(() => {
		if (document.activeElement !== activeElementRef.current) {
			setActiveElement(document.activeElement);
		}
	}, []);
	useEffect(() => {
		document.addEventListener('focus', updateElement, true);
		document.addEventListener('blur', updateElement, true);
		return () => {
			document.removeEventListener('focus', updateElement, true);
			document.removeEventListener('blur', updateElement, true);
		};
	}, [updateElement]);
	return activeElement;
};
