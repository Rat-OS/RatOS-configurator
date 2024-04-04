import { useId } from 'react';
import { BackgroundBeams } from '@/components/common/background-beams';

export function HeroPattern() {
	return (
		<div className="absolute inset-0 -z-10 mx-auto max-w-7xl overflow-hidden lg:left-72">
			<div className="absolute left-1/2 top-0 -ml-[50%] h-[25rem] w-full bg-background dark:[mask-image:linear-gradient(white,transparent)]">
				<div className="absolute inset-0 bg-gradient-to-r from-brand-400/60 to-lime-400/15 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]"></div>
				{/* <div className="absolute inset-0 [mask-image:radial-gradient(farthest-side_at_top,white_60%,transparent)]">
					<BackgroundBeams />
				</div> */}
				<div className="relative flex h-full w-full items-center justify-center bg-grid-small-black/[0.2] [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:bg-grid-small-brand-400/[0.3]">
					{/* Radial gradient for the container to give a faded look */}
					<div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
				</div>
			</div>
		</div>
	);
}
