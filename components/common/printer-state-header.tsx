import { twJoin, twMerge } from 'tailwind-merge';
import { useIsClient } from '@/hooks/isClient';
import { Badge } from '@/components/common/badge';
import { useMainsailQuery } from '@/hooks/useMainsail';
import { useMoonrakerQuery, usePrinterObjectQuery } from '@/moonraker/hooks';
import { trpc } from '@/utils/trpc';
import React, { Fragment, useMemo } from 'react';
import { KlippyStateBadge } from '@/components/klippy-state-badge';
import { MoonrakerStateBadge } from '@/components/moonraker-state-badge';
import { LoadablePrinterState } from '@/recoil/printer';
import { useRecoilValue } from 'recoil';

interface PrinterHeaderProps {
	stateColorClass?: string;
	breadcrumb?: React.ReactNode[];
	badges?: React.ReactNode;
	title: React.ReactNode;
	description: React.ReactNode;
}

export const PrinterHeader: React.FC<PrinterHeaderProps> = (props) => {
	return (
		<div className="mt-6 @container">
			<div className="border-t border-white/10 bg-zinc-700/15 backdrop-blur-sm">
				<div className="mx-auto flex max-w-7xl flex-row items-center justify-between gap-x-8 gap-y-4 px-4 py-4">
					<div className="flex items-center gap-x-3">
						<div className={twMerge('flex-none rounded-full bg-green-400/10 p-1 text-zinc-400', props.stateColorClass)}>
							<div className="h-2 w-2 rounded-full bg-current" />
						</div>
						<h1 className="flex gap-x-3 text-base leading-7">
							{props.breadcrumb?.map((bc, index) => {
								return (
									<Fragment key={index}>
										<span className="font-semibold text-white">{bc}</span>
										{index < (props.breadcrumb?.length ?? 0) - 1 && <span className="text-zinc-400">/</span>}
									</Fragment>
								);
							})}
						</h1>
					</div>
					<div className="capitalize">{props.badges}</div>
				</div>
			</div>
			<header className="sticky top-14 z-10 flex flex-grow-0 items-center gap-1 border-y border-b-white/10 border-t-white/5 bg-zinc-700/10 backdrop-blur-sm">
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
	);
};

export const PrinterStateHeader: React.FC<{ title?: string; description: string }> = (props) => {
	const printerName = useMainsailQuery('general.printername', { initialData: 'Loading...' });
	const savedPrinter = useRecoilValue(LoadablePrinterState);
	const klippyState = useMoonrakerQuery('server.info');
	const printerStateQuery = usePrinterObjectQuery('print_stats');
	const printerState = printerStateQuery.data?.print_stats.state;
	const breadCrumbs = useMemo(() => {
		const crumbs: string[] = [printerName.data ?? 'RatOS'];
		if (klippyState.isLoading) {
			crumbs.push('Loading...');
		} else if (savedPrinter?.name) {
			crumbs.push(savedPrinter.name);
		}
		return crumbs;
	}, [klippyState.isLoading, printerName.data, savedPrinter?.name]);
	const isClient = useIsClient();
	return isClient ? (
		<PrinterHeader
			stateColorClass={twJoin(
				klippyState.data?.klippy_state === 'error' && 'bg-red-400/10 text-red-400',
				klippyState.data?.klippy_state === 'startup' && 'bg-amber-400/10 text-amber-400',
				klippyState.data?.klippy_state === 'ready' && 'bg-green-400/10 text-green-400',
				klippyState.data?.klippy_state === 'shutdown' && 'bg-red-400/10 text-red-400',
			)}
			breadcrumb={breadCrumbs}
			badges={
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
			}
			title={props.title}
			description={props.description}
		/>
	) : (
		<PrinterStateLoadingHeader />
	);
};

export const PrinterConnectionHeader: React.FC<{ title?: string; description: string }> = (props) => {
	const printerName = useMainsailQuery('general.printername', { initialData: 'Loading...' });
	const savedPrinter = useRecoilValue(LoadablePrinterState);
	const klippyState = useMoonrakerQuery('server.info');
	const isClient = useIsClient();
	const breadCrumbs = useMemo(() => {
		const crumbs: string[] = [printerName.data ?? 'RatOS'];
		if (klippyState.isLoading) {
			crumbs.push('Loading...');
		} else if (savedPrinter?.name) {
			crumbs.push(savedPrinter.name);
		}
		return crumbs;
	}, [klippyState.isLoading, printerName.data, savedPrinter?.name]);
	return isClient ? (
		<PrinterHeader
			stateColorClass={twJoin(
				klippyState.data?.klippy_state === 'error' && 'bg-red-400/10 text-red-400',
				klippyState.data?.klippy_state === 'startup' && 'bg-amber-400/10 text-amber-400',
				klippyState.data?.klippy_state === 'ready' && 'bg-green-400/10 text-green-400',
				klippyState.data?.klippy_state === 'shutdown' && 'bg-red-400/10 text-red-400',
			)}
			breadcrumb={breadCrumbs}
			badges={
				<div className="inline-flex space-x-1 sm:flex-row-reverse sm:justify-end sm:space-x-2 sm:space-y-0 md:flex-row">
					<KlippyStateBadge />
					<MoonrakerStateBadge />
				</div>
			}
			title={props.title}
			description={props.description}
		/>
	) : (
		<PrinterStateLoadingHeader />
	);
};

export const PrinterStateLoadingHeader: React.FC = () => (
	<PrinterHeader
		stateColorClass="bg-gray-400/10 text-gray-400"
		breadcrumb={['RatOS', 'Loading...']}
		title="Loading printer state..."
		description="Please wait while RatOS loads your printer state"
		badges={
			<div className="flex space-x-1 sm:flex-row-reverse sm:justify-end sm:space-x-2 sm:space-y-0 md:flex-row">
				<KlippyStateBadge />
				<MoonrakerStateBadge />
			</div>
		}
	/>
);
