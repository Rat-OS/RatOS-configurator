import { twJoin } from 'tailwind-merge';
import { FillViewport } from '@/app/calibration/framing';
import { CrossHairStateProps, useCrossHairState } from '@/app/calibration/hooks';

export const CrossHair: React.FC<CrossHairStateProps & { isConnected: boolean }> = (props) => {
	const {
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
						y={`${50 - outerNozzleRadiusPercentHeight}%`}
						height={`${outerNozzleRadiusPercentHeight * 2}%`}
						width={crosshairStrokeWidth}
						shapeRendering="geometricPrecision"
						className="fill-brand-500 transition-all ease-in-out"
						style={{ transform: `translateX(-${crosshairStrokeWidth / 2})` }}
					/>
					<rect
						x={`${50 - outerNozzleRadiusPercentWidth}%`}
						y="50%"
						width={`${outerNozzleRadiusPercentWidth * 2}%`}
						height={crosshairStrokeWidth}
						shapeRendering="geometricPrecision"
						className="fill-brand-500 transition-all ease-in-out"
						style={{ transform: `translateY(-${crosshairStrokeWidth / 2})` }}
					/>
				</g>
				<circle
					cx="50%"
					cy="50%"
					r={delayedIsLockingCoordinates ? outerNozzleRadius : outerNozzleRadius * 1.5}
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
					r={nozzleRadius}
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
					r={outerNozzleRadius}
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
