import { useCallback, useEffect, useState } from 'react';

export const useDrop = (ref: React.RefObject<HTMLElement>, onDrop: (e: DragEvent) => void) => {
	const over = useCallback((e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		return false;
	}, []);
	const drop = useCallback(
		(e: DragEvent) => {
			e.preventDefault();
			onDrop(e);
		},
		[onDrop],
	);
	useEffect(() => {
		const el = ref.current;
		if (el) {
			el.addEventListener('dragover', over, false);
			el.addEventListener('drop', drop, false);
			return () => {
				el.removeEventListener('dragover', over, false);
				el.removeEventListener('drop', drop, false);
			};
		}
	}, [over, drop, ref]);
};

const getDomNode = (domNode: HTMLElement | React.RefObject<HTMLElement>): HTMLElement | null => {
	if (domNode instanceof HTMLElement) {
		return domNode;
	} else {
		return domNode.current;
	}
};

interface Position {
	x: number;
	y: number;
}

export const useDragPosition = (ref: React.RefObject<HTMLElement>) => {
	const [pageXY, setPageXY] = useState<Position | null>(null);
	const [clientXY, setClientXY] = useState<Position | null>(null);
	const reset = useCallback(() => {
		setPageXY(null);
		setClientXY(null);
	}, []);
	useEffect(() => {
		const over = (e: DragEvent) => {
			setPageXY({ x: e.pageX, y: e.pageY });
			setClientXY({ x: e.clientX, y: e.clientY });
		};
		const el = ref.current;
		el?.addEventListener('dragover', over, true);
		return () => {
			el?.removeEventListener('dragover', over, true);
		};
	}, [ref]);
	return { pageXY, clientXY, reset };
};
