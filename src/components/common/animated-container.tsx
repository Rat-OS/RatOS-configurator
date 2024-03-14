import useResizeObserver from '@react-hook/resize-observer';
import { motion } from 'framer-motion';
import { useState, useRef, PropsWithChildren } from 'react';
import { twJoin } from 'tailwind-merge';

export const AnimatedContainer = (props: PropsWithChildren<{ containerClassName?: string; className?: string }>) => {
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	useResizeObserver(containerRef, (entry) => {
		setHeight(entry.contentRect.height);
		setWidth(entry.contentRect.width);
	});
	return (
		<motion.div className={twJoin(props.containerClassName, 'overflow-hidden')} style={{ height }} animate={{ height }}>
			<div ref={containerRef} className={props.className}>
				{props.children}
			</div>
		</motion.div>
	);
};
