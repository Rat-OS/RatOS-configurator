import { twJoin } from 'tailwind-merge';
import { useGestures } from '@/app/calibration/hooks';

export const SafetyVisualization: React.FC<{ gestureState: ReturnType<typeof useGestures> }> = ({ gestureState }) => (
	<>
		<div
			className={twJoin(
				'absolute inset-0',
				gestureState.dragOutside.x && gestureState.dragOutside.x > 0
					? 'left-0 right-2/3 bg-gradient-to-r from-red-500/70 to-red-500/0'
					: 'left-2/3 right-0 bg-gradient-to-l from-red-500/70 to-red-500/0',
			)}
			style={{
				opacity: gestureState.dragOutside.x
					? Math.abs(gestureState.dragOutside.x - gestureState.dragOffset.x) / 200
					: 0,
				transform: `translateX(${gestureState.scaledDragOffset.x}px) translateY(${gestureState.scaledDragOffset.y}px)`,
			}}
		/>
		<div
			className={twJoin(
				'absolute inset-0',
				gestureState.dragOutside.y && gestureState.dragOutside.y > 0
					? 'bottom-2/3 top-0 bg-gradient-to-b from-red-500/70 to-red-500/0'
					: 'bottom-0 top-2/3 bg-gradient-to-t from-red-500/70 to-red-500/0',
			)}
			style={{
				opacity: gestureState.dragOutside.y
					? Math.abs(gestureState.dragOutside.y - gestureState.dragOffset.y) / 200
					: 0,
				transform: `translateX(${gestureState.scaledDragOffset.x}px) translateY(${gestureState.scaledDragOffset.y}px)`,
			}}
		/>
	</>
);
