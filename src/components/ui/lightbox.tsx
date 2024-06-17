'use client';
import * as React from 'react';
import { useState, useRef } from 'react';
import { motion, useDomEvent, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { twJoin } from 'tailwind-merge';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { useGesture } from '@use-gesture/react';

const transition = {
	type: 'spring',
	damping: 32,
	stiffness: 500,
};

const wheelScale = 3;

export const Lightbox: React.FC<React.PropsWithChildren<{ id?: string; aspect: number | null }>> = ({
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
	const negativeOffsetX = useTransform(offsetX, (v) => -v);
	const negativeOffsetY = useTransform(offsetY, (v) => -v);
	const left = useSpring(offsetX, { stiffness: 500, damping: 32 });
	const top = useSpring(offsetY, { stiffness: 500, damping: 32 });
	const right = useSpring(negativeOffsetX, { stiffness: 500, damping: 32 });
	const bottom = useSpring(negativeOffsetY, { stiffness: 500, damping: 32 });
	const scale = useSpring(zoom, { stiffness: 500, damping: 32 });
	const clamp = React.useCallback(
		(x = offsetX.get(), y = offsetY.get()) => {
			const rect = ref.current!.getBoundingClientRect();
			offsetX.set(
				Math.min(
					Math.max(x, (containerRef.current!.clientWidth - rect.width * prevZoom.current) / 2),
					Math.max(0, (rect.width * prevZoom.current - containerRef.current!.clientWidth) / 2),
				),
			);
			offsetY.set(
				Math.min(
					Math.max(y, (containerRef.current!.clientHeight - rect.height * prevZoom.current) / 2),
					Math.max(0, (rect.height * prevZoom.current - containerRef.current!.clientHeight) / 2),
				),
			);
		},
		[offsetX, offsetY],
	);
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
					clamp();
				}
			},
			onWheel: ({ event, offset: [x, y], memo = containerRef.current!.getBoundingClientRect() }) => {
				const newZoom = Math.min(Math.max((y + 100 * wheelScale) / (100 * wheelScale), 1), 3);
				const imgCenterOffset = {
					x: offsetX.get(),
					y: offsetY.get(),
				};
				const originOffset = {
					x: imgCenterOffset.x + (memo.x + containerRef.current!.clientWidth / 2) - event.clientX,
					y: imgCenterOffset.y + (memo.y + containerRef.current!.clientHeight / 2) - event.clientY,
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
				clamp(absolute.x, absolute.y);
				return memo;
			},
			onPinch: ({ origin: [ox, oy], offset: [s], memo = containerRef.current!.getBoundingClientRect() }) => {
				const newZoom = Math.min(Math.max(s, 1), 6);
				const imgCenterOffset = {
					x: offsetX.get(),
					y: offsetY.get(),
				};

				const originOffset = {
					x: imgCenterOffset.x + (memo.x + containerRef.current!.clientWidth / 2) - ox,
					y: imgCenterOffset.y + (memo.x + containerRef.current!.clientHeight / 2) - oy,
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
				clamp(absolute.x, absolute.y);
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
			pinch: {
				scaleBounds: { min: 1, max: 6 },
				distanceBounds: { min: 0 },
				rubberband: true,
			},
		},
	);

	const content = (
		<motion.div
			className="relative flex h-full max-h-full max-w-full items-center"
			key={`content-${id}`}
			transition={transition}
			style={{
				aspectRatio:
					aspect ??
					(containerRef.current ? containerRef.current.clientWidth / containerRef.current.clientHeight : undefined),
				touchAction: 'none',
			}}
			ref={ref}
			{...(targetProps() as any)}
		>
			<motion.div
				layout
				transition={transition}
				layoutId={`image-${id}`}
				style={{
					scale: scale,
					left: left,
					top: top,
					right: right,
					bottom: bottom,
				}}
				className="absolute flex w-full max-w-full items-center justify-center outline-none outline-offset-0"
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
				className="z-60 relative flex h-auto w-auto cursor-pointer items-center justify-center"
				onClick={() => setOpen(true)}
				style={{
					aspectRatio:
						aspect ??
						(containerRef.current ? containerRef.current.clientWidth / containerRef.current.clientHeight : undefined),
				}}
				key={`container-${id}`}
			>
				{!isOpen && content}
			</motion.div>
			<DialogContent
				className="flex max-h-full max-w-full items-center justify-center border-none border-transparent bg-transparent p-0 outline-transparent ring-transparent ring-offset-transparent data-[state=closed]:fade-out-100 data-[state=open]:fade-in-100 focus:border-none focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
				key={`dialog-${id}`}
				fixedCloseButton={true}
				style={{
					touchAction: 'none',
					aspectRatio:
						aspect ??
						(containerRef.current ? containerRef.current.clientWidth / containerRef.current.clientHeight : undefined),
				}}
				ref={containerRef}
				// onClick={() => setOpen(false)}
			>
				{content}
			</DialogContent>
		</Dialog>
	);
};
