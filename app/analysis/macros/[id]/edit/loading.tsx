import { Card } from '@/components/common/card';
import { Skeleton } from '@/components/ui/skeleton';
export default function Loading() {
	// Or a custom loading skeleton component
	return (
		<div className="grid h-full w-full">
			<div className="flex flex-col">
				<header className="sticky top-0 z-10 flex items-center gap-1 border-b border-zinc-100/10 bg-zinc-700/25 px-4 py-4 backdrop-blur-sm">
					<div className="flex-1">
						<div className="flex flex-row items-center justify-between">
							<div className="flex h-auto flex-1 border-none p-0 text-xl font-medium text-transparent">
								<Skeleton className="scale-y-75">Loading macro...</Skeleton>
								Loading...
							</div>
						</div>
						<div className="flex flex-row items-center justify-between text-transparent">
							<div className="font-regular flex h-auto flex-1 border-none p-0 text-base">
								<Skeleton className="scale-y-75">Loading macro description...</Skeleton>
								Loading macro description...
							</div>
							Loading...
						</div>
					</div>
				</header>
			</div>
		</div>
	);
}
