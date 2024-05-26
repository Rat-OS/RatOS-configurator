import { twMerge } from 'tailwind-merge';
import { FullLoadScreen } from '@/components/common/full-load-screen';
import { useIsClient } from '@/hooks/isClient';
import { Badge } from '@/components/common/badge';
import { useMainsailQuery } from '@/hooks/useMainsail';
import { useMoonrakerQuery, usePrinterObjectQuery } from '@/moonraker/hooks';
import { trpc } from '@/utils/trpc';
import React from 'react';

export const PrinterStateHeader: React.FC<{ title?: string; description: string }> = (props) => {
	const printerName = useMainsailQuery('general.printername', { initialData: 'Loading...' });
	const savedPrinterName = trpc.printer.getSavedPrinterName.useQuery(undefined, { initialData: 'Loading...' });
	const klippyState = useMoonrakerQuery('server.info');
	const printerStateQuery = usePrinterObjectQuery('print_stats');
	const printerState = printerStateQuery.data?.print_stats.state;
	const isClient = useIsClient();
	return isClient ? (
		<div className="bg-zinc-700/15 backdrop-blur-sm">
			<div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-x-8 px-4 py-4 @screen-sm:flex-row @screen-sm:items-center">
				<div>
					<div className="flex items-center gap-x-3">
						<div
							className={twMerge(
								'flex-none rounded-full bg-green-400/10 p-1 text-zinc-400',
								klippyState.data?.klippy_state === 'error' && 'bg-red-400/10 text-red-400',
								klippyState.data?.klippy_state === 'startup' && 'bg-amber-400/10 text-amber-400',
								klippyState.data?.klippy_state === 'ready' && 'bg-green-400/10 text-green-400',
								klippyState.data?.klippy_state === 'shutdown' && 'bg-red-400/10 text-red-400',
							)}
						>
							<div className="h-2 w-2 rounded-full bg-current" />
						</div>
						<h1 className="flex gap-x-3 text-base leading-7">
							<span className="font-semibold text-white">{printerName.data}</span>
							<span className="text-zinc-600">/</span>
							<span className="font-semibold text-white">{savedPrinterName.data}</span>
						</h1>
					</div>
				</div>
				<Badge
					className="order-first capitalize @screen-sm:order-none"
					color={
						printerState === undefined
							? 'gray'
							: printerState == 'canceled'
								? 'pink'
								: printerState == 'complete'
									? 'green'
									: printerState == 'error'
										? 'red'
										: printerState === 'paused'
											? 'sky'
											: printerState === 'printing'
												? 'yellow'
												: printerState === 'standby'
													? 'brand'
													: 'gray'
					}
				>
					{printerState === undefined ? 'Offline' : printerState ?? 'Loading...'}
				</Badge>
			</div>
			<header className="sticky top-14 z-10 flex flex-grow-0 items-center gap-1 border-y border-white/5 bg-zinc-700/10 backdrop-blur-sm">
				<div className="mx-auto w-full max-w-7xl gap-x-8 px-4 py-4">
					<h3 className="dark:focus-ring-0 flex h-auto flex-1 border-none p-0 text-xl font-medium focus:ring-0 focus:ring-offset-0">
						{props.title}
					</h3>
					<p className="dark:focus-ring-0 flex h-auto flex-1 border-none p-0 text-base font-medium text-muted-foreground focus:ring-0 focus:ring-offset-0 dark:text-muted-foreground">
						{props.description}
					</p>
				</div>
			</header>
		</div>
	) : (
		<FullLoadScreen />
	);
};
