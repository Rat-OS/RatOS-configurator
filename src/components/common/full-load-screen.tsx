import { Spinner } from '@/components/common/spinner';

export const FullLoadScreen = () => {
	return (
		<div className="flex h-full w-full flex-1 items-center justify-center">
			<Spinner />
		</div>
	);
};
