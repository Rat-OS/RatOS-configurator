import { twJoin } from 'tailwind-merge';
import { FillViewport } from '@/app/calibration/framing';
import { CrossHairStateProps, useCrossHairState } from '@/app/calibration/hooks';

export const CrossHair: React.FC<CrossHairStateProps & { isConnected: boolean }> = (props) => {
	const {
		canRender,
		outerNozzleRadius,
		nozzleRadius,
		outerNozzleRadiusPercentWidth,
		outerNozzleRadiusPercentHeight,
		crosshairStrokeWidth,
		delayedIsLockingCoordinates,
	} = useCrossHairState(props);
	return (
		<FillViewport>
			<svg width="100%" height="100%">
				<g className={twJoin(props.isConnected && outerNozzleRadius > 0 ? 'opacity-100' : 'opacity-0')}>
					<rect
						x="50%"
						y={!canRender ? '50%' : `${50 - outerNozzleRadiusPercentHeight}%`}
						height={!canRender ? 0 : `${outerNozzleRadiusPercentHeight * 2}%`}
						width={!canRender ? 0 : crosshairStrokeWidth}
						shapeRendering="geometricPrecision"
						className="fill-brand-500 transition-all ease-in-out"
						style={{ transform: `translateX(-${crosshairStrokeWidth / 2})` }}
					/>
					<rect
						x={!canRender ? '50%' : `${50 - outerNozzleRadiusPercentWidth}%`}
						y="50%"
						width={!canRender ? 0 : `${outerNozzleRadiusPercentWidth * 2}%`}
						height={!canRender ? 0 : crosshairStrokeWidth}
						shapeRendering="geometricPrecision"
						className="fill-brand-500 transition-all ease-in-out"
						style={{ transform: `translateY(-${crosshairStrokeWidth / 2})` }}
					/>
				</g>
				<circle
					cx="50%"
					cy="50%"
					r={!canRender ? 0 : delayedIsLockingCoordinates ? outerNozzleRadius : outerNozzleRadius * 1.5}
					fill="none"
					className={twJoin(
						'ease-out',
						delayedIsLockingCoordinates ? 'fill-brand-300' : 'fill-brand-300/0 transition-all duration-700',
					)}
					shapeRendering="geometricPrecision"
					strokeWidth={0}
				/>
				<circle
					cx="50%"
					cy="50%"
					r={!canRender ? 0 : nozzleRadius}
					fill="none"
					className={twJoin(
						'stroke-brand-500 transition-all ease-in-out',
						props.isConnected && outerNozzleRadius > 0 ? 'opacity-100' : 'opacity-0',
					)}
					shapeRendering="geometricPrecision"
					strokeWidth={crosshairStrokeWidth}
				/>
				<circle
					cx="50%"
					cy="50%"
					r={!canRender ? 0 : outerNozzleRadius}
					fill="none"
					className={twJoin(
						'stroke-brand-500 transition-all ease-in-out',
						props.isConnected && outerNozzleRadius > 0 ? 'opacity-100' : 'opacity-0',
					)}
					shapeRendering="geometricPrecision"
					strokeWidth={crosshairStrokeWidth}
				/>
			</svg>
		</FillViewport>
	);
};
