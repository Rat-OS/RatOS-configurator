import { twJoin } from 'tailwind-merge';

export const FillViewport = (props: React.PropsWithChildren<{ className?: string }>) => (
	<div className={twJoin('pointer-events-none absolute inset-0 flex items-center justify-center', props.className)}>
		{props.children}
	</div>
);

type FillVideoFrameProps = {
	className?: string;
	videoAspectRatio: number;
	containerAspectRatio: number;
	zoom: number;
};

export const FillVideoFrame = (props: React.PropsWithChildren<FillVideoFrameProps>) => (
	<div
		className={twJoin('pointer-events-none absolute inset-0 top-1/2 -translate-y-1/2 transition-all', props.className)}
		style={
			props.videoAspectRatio
				? { aspectRatio: Math.max(props.videoAspectRatio / props.zoom, props.containerAspectRatio) }
				: {}
		}
	>
		{props.children}
	</div>
);
