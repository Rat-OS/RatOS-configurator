import { Spinner } from '@/components/common/spinner';
import { twJoin } from 'tailwind-merge';

export const FullLoadScreen = (props: { className?: string }) => {
	return (
		<div className={twJoin('flex h-full w-full flex-1 items-center justify-center', props.className)}>
			<Spinner className="h-8 w-8" />
		</div>
	);
};
