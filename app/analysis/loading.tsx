import { Card } from '@/components/common/card';
import { FullLoadScreen } from '@/components/common/full-load-screen';
import { Skeleton } from '@/components/ui/skeleton';
import { twJoin } from 'tailwind-merge';
export default function Loading() {
	// Or a custom loading skeleton component
	return (
		<div className="h-full p-4 @container">
			<div className="flex max-h-full min-h-full flex-col space-y-4 @container">
				<div className="grid grid-cols-1 gap-4 @screen-lg:grid-cols-3">
					<Card className="flex max-h-32 min-h-32 overflow-hidden @screen-lg:max-h-72 @screen-lg:min-h-72">
						<h3 className="text-md absolute left-0 right-0 top-0 flex items-center space-x-2 p-4 font-semibold">
							<div className={twJoin('flex-none rounded-full bg-yellow-400/10 p-1 text-yellow-400')}>
								<div className="h-2 w-2 rounded-full bg-current" />
							</div>
							<Skeleton className="h-4 w-32" />
						</h3>
						<FullLoadScreen className="" />
					</Card>
					<Card className="flex max-h-32 min-h-32 overflow-hidden @screen-lg:max-h-72 @screen-lg:min-h-72">
						<h3 className="text-md absolute left-0 right-0 top-0 flex items-center space-x-2 p-4 font-semibold">
							<div className={twJoin('flex-none rounded-full bg-sky-400/10 p-1 text-sky-400')}>
								<div className="h-2 w-2 rounded-full bg-current" />
							</div>
							<Skeleton className="h-4 w-32" />
						</h3>
						<FullLoadScreen className="" />
					</Card>
					<Card className="flex max-h-32 min-h-32 overflow-hidden @screen-lg:max-h-72 @screen-lg:min-h-72">
						<h3 className="text-md absolute left-0 right-0 top-0 flex items-center space-x-2 p-4 font-semibold">
							<div className={twJoin('flex-none rounded-full bg-rose-400/10 p-1 text-rose-400')}>
								<div className="h-2 w-2 rounded-full bg-current" />
							</div>
							<Skeleton className="h-4 w-32" />
						</h3>
						<FullLoadScreen className="" />
					</Card>
				</div>
				<Card className="relative flex flex-1 overflow-hidden">
					<FullLoadScreen className="absolute inset-0" />
				</Card>
			</div>
		</div>
	);
}
