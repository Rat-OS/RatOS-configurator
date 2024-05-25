'use client';
import { cva } from 'class-variance-authority';
import React from 'react';
import { type MotionProps, motion } from 'framer-motion';

const cardVariants = cva([
	'relative rounded-lg  bg-white dark:bg-zinc-900/60',
	'shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.05)]',
	'dark:before:-inset-px dark:before:rounded-xl',
	'dark:before:pointer-events-none dark:before:absolute dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.07)_inset]',
]);

type CardProps = React.PropsWithChildren<
	{
		className?: string;
	} & MotionProps
>;

export const Card: React.FC<CardProps> = (props) => {
	return (
		<motion.div {...props} className={cardVariants({ className: props.className })}>
			{props.children}
		</motion.div>
	);
};
