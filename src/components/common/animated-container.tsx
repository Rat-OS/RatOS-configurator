import { useDebounce } from '@/app/_hooks/debounce';
import useResizeObserver from '@react-hook/resize-observer';
import { motion, SpringOptions } from 'framer-motion';
import { useState, useRef, PropsWithChildren, useCallback, useLayoutEffect, useEffect } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

export const AnimatedContainer = (
	props: PropsWithChildren<{ containerClassName?: string; className?: string; transition?: SpringOptions }>,
) => {
	const [height, setHeight] = useState(0);
	const heightRef = useRef(height);
	heightRef.current = height;
	const [isOverflowVisible, setIsOverflowVisible] = useState(false);
	const isOverflowVisibleRef = useRef(isOverflowVisible);
	isOverflowVisibleRef.current = isOverflowVisible;
	const containerRef = useRef<HTMLDivElement>(null);

	useResizeObserver(containerRef, (entry) => {
		if (entry.contentRect.height === heightRef.current) {
			return;
		}
		setHeight(entry.contentRect.height);
	});

	const onComplete = useDebounce(
		useCallback(() => {
			setIsOverflowVisible(true);
		}, []),
		200,
		true,
	);
	const onStart = useDebounce(
		useCallback(() => {
			setIsOverflowVisible(false);
		}, []),
		200,
		true,
	);

	return (
		<motion.div
			className={twMerge(isOverflowVisible ? 'overflow-visible' : 'overflow-hidden', props.containerClassName)}
			style={{ height }}
			onAnimationComplete={onComplete}
			onAnimationStart={onStart}
			animate={{ height }}
			transition={props.transition}
		>
			<div ref={containerRef} className={props.className}>
				{props.children}
			</div>
		</motion.div>
	);
};
