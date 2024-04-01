import { Card } from '@/components/common/card';
import { Skeleton } from '@/components/ui/skeleton';
export default function Loading() {
	return (
		<div className="mx-auto flex h-full items-center justify-center">
			<Card className="min-w-96 max-w-7xl p-4">
				<div className="flex flex-col space-y-3">
					<Skeleton className="h-[125px] w-[250px] rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			</Card>
		</div>
	);
}
