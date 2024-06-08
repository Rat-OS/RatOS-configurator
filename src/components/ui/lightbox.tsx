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

const wheelScale = 3;

export const Lightbox: React.FC<React.PropsWithChildren<{ id?: string; aspect: number }>> = ({
	id,
	children,
	aspect,
}) => {
	const [isOpen, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const prevZoom = useRef(1);
	const zoom = useMotionValue(1);
	const startDragPos = useRef({ x: 0, y: 0 });
	const offsetX = useMotionValue(0);
	const offsetY = useMotionValue(0);
	const left = useSpring(offsetX, { stiffness: 300, damping: 35 });
	const top = useSpring(offsetY, { stiffness: 300, damping: 35 });
	const scale = useSpring(zoom, { stiffness: 300, damping: 35 });
	const targetProps = useGesture(
		{
			onDrag: (state) => {
				if (state.first) {
					startDragPos.current = { x: offsetX.get(), y: offsetY.get() };
				}
				if (state.dragging) {
					offsetX.set(startDragPos.current.x + state.movement[0]);
					offsetY.set(startDragPos.current.y + state.movement[1]);
				}
				if (!state.dragging) {
					const rect = ref.current!.getBoundingClientRect();
					offsetX.set(
						Math.min(
							Math.max(offsetX.get(), (containerRef.current!.clientWidth - rect.width) / 2),
							(rect.width - containerRef.current!.clientWidth) / 2,
						),
					);
					offsetY.set(
						Math.min(
							Math.max(offsetY.get(), (containerRef.current!.clientHeight - rect.height) / 2),
							(rect.height - containerRef.current!.clientHeight) / 2,
						),
					);
				}
			},
			onWheel: ({ event, offset: [x, y] }) => {
				const newZoom = Math.min(Math.max((y + 100 * wheelScale) / (100 * wheelScale), 1), 3);
				const rect = ref.current!.getBoundingClientRect();
				const imgCenterOffset = {
					x: rect.x + rect.width / 2 - (1 + containerRef.current!.clientWidth / 2),
					y: rect.y + rect.height / 2 - (1 + containerRef.current!.clientHeight / 2),
				};

				const originOffset = {
					x: rect.x + rect.width / 2 - event.clientX,
					y: rect.y + rect.height / 2 - event.clientY,
				};
				const adjustment = {
					x: originOffset.x * (prevZoom.current / newZoom - 1),
					y: originOffset.y * (prevZoom.current / newZoom - 1),
				};
				const absolute = {
					x: imgCenterOffset.x - adjustment.x * (newZoom / prevZoom.current),
					y: imgCenterOffset.y - adjustment.y * (newZoom / prevZoom.current),
				};
				prevZoom.current = newZoom;
				zoom.set(newZoom);
				offsetX.set(absolute.x);
				offsetY.set(absolute.y);
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
				offsetX.set((memo.x + fromCenterToOrigin.x * -1) / newZoom);
				offsetY.set((memo.y + fromCenterToOrigin.y * -1) / newZoom);
				memo.x = 0;
				memo.y = 0;
				zoom.set(newZoom);
				return memo;
			},
		},
		{
			enabled: isOpen,
			drag: {
				eventOptions: {},
			},
			wheel: {
				bounds: {
					top: 0,
					bottom: 200 * wheelScale,
				},
				preventDefault: false,
				axis: 'y',
			},
			// pinch: {
			// 	scaleBounds: { min: 1, max: 10 },
			// 	distanceBounds: { min: 0 },
			// 	rubberband: true,
			// },
		},
	);

	const content = (
		<motion.div
			className="relative z-[60] flex h-full max-h-full max-w-full items-center"
			key={`content-${id}`}
			transition={transition}
			style={{
				aspectRatio: aspect,
				touchAction: 'none',
			}}
			{...(targetProps() as any)}
		>
			<motion.div
				layout
				transition={transition}
				layoutId={`image-${id}`}
				style={{
					scale: zoom,
					left: offsetX,
					top: offsetY,
				}}
				ref={ref}
				className="relative z-[60] flex w-full max-w-full items-center justify-center [&_text]:fill-zinc-300 [&_text]:text-center [&_text]:text-2xl [&_text]:font-semibold [&_text]:capitalize [&_text]:tracking-tight"
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
				ref={containerRef}
				// onClick={() => setOpen(false)}
			>
				{isOpen && content}
			</DialogContent>
		</Dialog>
	);
};
