import { useId } from 'react';
import { BackgroundBeams } from './background-beams';

export function HeroPattern() {
	return (
		<div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
			<div className="absolute left-1/2 top-0 -ml-[50%] h-[25rem] w-full dark:[mask-image:linear-gradient(white,transparent)]">
				<div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-brand-400 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-sky-400/30 dark:to-brand-400/30"></div>
				<div className="absolute inset-0 [mask-image:radial-gradient(farthest-side_at_top,white_60%,transparent)]">
					<BackgroundBeams />
				</div>
			</div>
		</div>
	);
}
