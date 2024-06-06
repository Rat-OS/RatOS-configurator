'use client';
import * as React from 'react';
import { useState, useRef } from 'react';
import { motion, useDomEvent, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { twJoin } from 'tailwind-merge';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { useGesture } from '@use-gesture/react';

const transition = {
	type: 'spring',
	damping: 25,
	stiffness: 200,
};

export const Lightbox: React.FC<React.PropsWithChildren<{ id?: string; aspect: number }>> = ({
	id,
	children,
	aspect,
}) => {
	const [isOpen, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const zoom = useMotionValue(1);
	const offsetX = useMotionValue(0);
	const offsetY = useMotionValue(0);
	const left = useSpring(offsetX, { stiffness: 300, damping: 35 });
	const top = useSpring(offsetY, { stiffness: 300, damping: 35 });
	const scale = useSpring(zoom, { stiffness: 300, damping: 35 });
	const wasZoomed = useRef(false);
	const targetProps = useGesture(
		{
			onDrag: (state) => {
				if (state.dragging) {
					offsetX.set(state.offset[0]);
					offsetY.set(state.offset[1]);
					wasZoomed.current = false;
				}
			},
			onPinch: ({ origin: [ox, oy], first, offset: [s, a], memo }) => {
				if (first) {
					memo = {};
					memo.x = offsetX.get();
					memo.y = offsetX.get();
				}
				// let prevZoom = zoom.get();
				// let newZoom = Math.max(s / 5, 1);
				// const rect = ref.current!.getBoundingClientRect();
				// memo = { ...memo, x: rect.x, y: rect.y, width: rect.width, height: rect.height };
				// memo.tx = memo.ox - (memo.x + memo.width) / 2 / prevZoom;
				// memo.ty = memo.oy - (memo.y + memo.height) / 2 / prevZoom;
				// const x = memo.tx * -1;
				// const y = memo.ty * -1;
				let prevZoom = zoom.get();
				let newZoom = Math.max(1 + s / 5, 1);
				const rect = ref.current!.getBoundingClientRect();
				const imgCenter = {
					x: (rect.x + rect.width / 2) / prevZoom,
					y: (rect.y + rect.height / 2) / prevZoom,
				};
				const fromCenterToOrigin = {
					x: ox - imgCenter.x,
					y: oy - imgCenter.y,
				};
				console.log({
					orgX: ox,
					orgY: oy,
					imgX: imgCenter.x,
					imgY: imgCenter.y,
					distX: fromCenterToOrigin.x,
					distY: fromCenterToOrigin.y,
					s,
					newS: newZoom,
				});
				offsetX.set((memo.x + fromCenterToOrigin.x * -1) / newZoom);
				offsetY.set((memo.y + fromCenterToOrigin.y * -1) / newZoom);
				memo.x = 0;
				memo.y = 0;
				zoom.set(newZoom);
				wasZoomed.current = true;
				return memo;
			},
		},
		{
			enabled: isOpen,
			drag: {
				bounds: {
					left: -window.innerWidth,
					right: window.innerWidth,
					top: -window.innerHeight,
					bottom: window.innerHeight,
				},
				rubberband: true,
			},
			pinch: {
				scaleBounds: { min: 1, max: 10 },
				distanceBounds: { min: 0 },
				pinchOnWheel: true,
				modifierKey: null,
				rubberband: true,
			},
		},
	);

	const content = (
		<motion.div
			className="relative z-[60] h-full max-h-full max-w-full"
			key={`content-${id}`}
			transition={transition}
			ref={ref}
			style={{
				aspectRatio: aspect,
				scale: scale,
				left: left,
				top: top,
			}}
			{...(targetProps() as any)}
		>
			<motion.div
				layout
				transition={transition}
				layoutId={`image-${id}`}
				className="z-[60] flex w-full max-w-full items-center justify-center [&_text]:fill-zinc-300 [&_text]:text-center [&_text]:text-2xl [&_text]:font-semibold [&_text]:capitalize [&_text]:tracking-tight"
			>
				{children}
			</motion.div>
		</motion.div>
	);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(val) => {
				if (val === false) {
					zoom.set(1);
					offsetX.set(0);
					offsetY.set(0);
				}
				setOpen(val);
			}}
		>
			<motion.div
				className="z-60 relative flex w-full cursor-pointer items-center justify-center"
				onClick={() => setOpen(true)}
				style={{ aspectRatio: aspect }}
				key={`container-${id}`}
			>
				{!isOpen && content}
			</motion.div>
			<DialogContent
				className="flex h-full max-h-full w-full max-w-full items-center justify-center bg-transparent"
				key={`dialog-${id}`}
				style={{ touchAction: 'none' }}
				// onClick={() => setOpen(false)}
			>
				{isOpen && content}
			</DialogContent>
		</Dialog>
	);
};
