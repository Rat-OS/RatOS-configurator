'use client';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	OnChangeFn,
	Row,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { MoonrakerHistoryJob, MoonrakerHistoryListResponse } from '../moonraker/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DateTime, Duration, DurationLikeObject } from 'luxon';
import { twMerge } from 'tailwind-merge';
import { useMoonraker } from '../moonraker/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getHost } from '../helpers/util';
import { ChevronUpDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Spinner } from '../components/common/spinner';
import CountUp from 'react-countup';

const findThumbnail = (thumbnails: MoonrakerHistoryJob['metadata']['thumbnails'], size: number) => {
	const thumbnail = thumbnails.find((t) => t.size >= size);
	if (thumbnail == null) {
		return null;
	}
	return thumbnail;
};

const thumbUrl = (thumbnail: MoonrakerHistoryJob['metadata']['thumbnails'][0]) => {
	return `http://${getHost()}/server/files/gcodes/${thumbnail.relative_path}?timestamp=${thumbnail}`;
};

const columns: ColumnDef<MoonrakerHistoryJob>[] = [
	{
		header: () => <span>Filename</span>,
		accessorKey: 'filename',
		enableSorting: false,
		size: 280,
		cell: (info) => {
			const thumbnail = findThumbnail(info.row.original.metadata.thumbnails, 32);
			return (
				<div className="flex min-w-0 items-center gap-x-4">
					{thumbnail == null ? null : (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={thumbUrl(thumbnail)} alt="" className="h-8 w-8 rounded-full bg-zinc-800" />
					)}
					<div className="truncate text-sm font-medium leading-6 text-white">{info.getValue() as string}</div>
				</div>
			);
		},
	},
	{
		header: () => <span>Started at</span>,
		sortDescFirst: true,
		enableSorting: true,
		enableMultiSort: false,
		accessorKey: 'start_time',
		cell: (info) => {
			const time = DateTime.fromSeconds(info.getValue<MoonrakerHistoryJob['start_time']>()).setLocale('en-GB');
			return (
				<div className="flex min-w-0 items-center gap-x-3">
					<div
						className="text-sm leading-6 text-zinc-400"
						title={time.toLocaleString({ dateStyle: 'full', timeStyle: 'medium' })}
					>
						{time.toRelative()}
					</div>
				</div>
			);
		},
	},
	{
		header: () => <span>Status</span>,
		size: 200,
		enableSorting: false,
		accessorKey: 'status',
		cell: (info) => {
			const status = info.getValue<MoonrakerHistoryJob['status']>();
			return (
				<div className="flex min-w-0 items-center justify-end gap-x-2  @screen-sm:justify-start">
					<div
						className={twMerge(
							status === 'completed' ? 'bg-green-400/10 text-green-400' : 'bg-rose-400/10 text-rose-400',
							'flex-none rounded-full p-1',
						)}
					>
						<div className="h-1.5 w-1.5 rounded-full bg-current" />
					</div>
					<div
						className={twMerge(
							'truncate capitalize text-white',
							status === 'completed' ? 'text-green-100/80' : ' text-rose-100/80',
						)}
					>
						{status.replace('_', ' ')}
					</div>
				</div>
			);
		},
	},
	{
		header: () => <span>Duration</span>,
		accessorKey: 'print_duration',
		enableSorting: false,
		cell: (info) => (
			<div className="flex min-w-0 items-center text-sm leading-6 text-zinc-400">
				{Duration.fromObject({ hours: info.getValue<number>() / 60 / 60 }, { locale: 'en-GB' })
					.normalize()
					.shiftTo(
						...(['minutes', info.getValue<number>() / 60 / 60 > 1 ? 'hours' : null].filter(
							Boolean,
						) as (keyof DurationLikeObject)[]),
					)
					.toHuman({ unitDisplay: 'short', listStyle: 'narrow', maximumFractionDigits: 0 })}
			</div>
		),
	},
	{
		header: () => <span>Slicer</span>,
		accessorKey: 'slicer',
		enableSorting: false,
		cell: (info) => {
			return (
				<span className="inline-flex items-center rounded-md bg-zinc-400/10 px-2 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-400/20">
					{info.row.original.metadata.slicer}
				</span>
			);
		},
	},
	{
		header: () => <span>Filament used</span>,
		accessorKey: 'filament_used',
		enableSorting: false,
		cell: (info) => {
			const filamentUsed = info.getValue<MoonrakerHistoryJob['filament_used']>() / 1000;
			return (
				<div className="flex min-w-0 items-center text-sm leading-6 text-zinc-400">
					<CountUp start={0} end={filamentUsed} preserveValue={true} decimals={2} /> meters
				</div>
			);
		},
	},
];

const PAGE_SIZE = 25;

const getColumnSizeClass = (key: string) => {
	const big = ['filament_used', 'slicer'].includes(key);
	const medium = ['status', 'print_duration'].includes(key);
	const small = [''].includes(key);
	const shrink = ['filename'].includes(key);
	return twMerge(
		small && '@screen-sm:flex hidden',
		medium && '@screen-md:flex hidden',
		big && '@screen-xl:flex hidden',
		!small && !medium && !big && 'flex',
		shrink && 'flex-shrink flex-grow-[5]',
	);
};

export const HistoryTable = () => {
	const moon = useMoonraker();
	const [sorting, setSorting] = useState<SortingState>([{ id: 'start_time', desc: true }]);
	const tableRef = useRef<HTMLTableElement>(null);
	const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage, isLoading } =
		useInfiniteQuery<MoonrakerHistoryListResponse>({
			queryKey: [
				'history',
				sorting, //refetch when sorting changes
			],
			queryFn: async ({ pageParam = 0 }) => {
				const start = (pageParam as number) * PAGE_SIZE;
				const fetchedData = await moon.query('server.history.list', {
					limit: PAGE_SIZE,
					start: start,
					order: sorting[0].desc ? 'desc' : 'asc',
				}); //pretend api call
				return fetchedData;
			},
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.count <= allPages.length ? undefined : allPages.length;
			},
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		});
	//flatten the array of arrays from the useInfiniteQuery hook
	const flatData = useMemo(() => data?.pages?.flatMap((page) => page.jobs) ?? [], [data]);
	const totalFetched = flatData.length;

	const table = useReactTable({
		data: flatData,
		columns,
		state: {
			sorting,
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		manualSorting: true,
		debugTable: true,
	});

	//scroll to top of table when sorting changes
	const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
		setSorting(updater);
		if (!!table.getRowModel().rows.length) {
			rowVirtualizer.scrollToIndex?.(0);
		}
	};

	//since this table option is derived from table row model state, we're using the table.setOptions utility
	table.setOptions((prev) => ({
		...prev,
		onSortingChange: handleSortingChange,
	}));

	const { rows } = table.getRowModel();

	const rowVirtualizer = useWindowVirtualizer({
		count: totalFetched,
		estimateSize: () => 64, //estimate row height for accurate scrollbar dragging
		//measure dynamic row height, except in firefox because it measures table border height incorrectly
		measureElement:
			typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
				? (element) => element?.getBoundingClientRect().height
				: undefined,
		overscan: 3,
		scrollMargin: tableRef.current?.offsetTop ?? 0,
		paddingEnd: (tableRef.current?.offsetParent as HTMLElement)?.offsetTop ?? 0,
	});

	useEffect(() => {
		const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
		if (!lastItem) {
			return;
		}
		if (lastItem.index >= totalFetched - 1 && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [hasNextPage, fetchNextPage, totalFetched, isFetchingNextPage, rowVirtualizer]);

	if (isLoading) {
		return (
			<div className="mt-6 flex h-48 w-full flex-col items-center justify-center space-y-2">
				<Spinner />
				<h3 className="animate-pulse font-normal text-zinc-100">Loading print history...</h3>
			</div>
		);
	}
	return (
		<table
			className="mt-6 w-full whitespace-nowrap text-left"
			style={{ display: 'grid', height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}
			ref={tableRef}
		>
			<thead
				className="border-b border-white/10 bg-[rgb(18,18,20)] text-sm leading-6 text-white"
				style={{
					display: 'grid',
					position: 'sticky',
					top: 0,
					zIndex: 1,
				}}
			>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id} style={{ display: 'flex', width: '100%' }}>
						{headerGroup.headers.map((header) => {
							return (
								<th
									scope="col"
									className={twMerge(
										'flex flex-grow items-center truncate px-4 py-2 font-semibold @screen-sm:px-6 @screen-lg:px-8',
										getColumnSizeClass(header.column.id),
									)}
									key={header.id}
									style={{
										width: header.getSize(),
									}}
								>
									<div
										{...{
											className: twMerge(
												header.column.getCanSort() && 'cursor-pointer select-none',
												'space-x-2 flex items-center',
											),
											onClick: header.column.getToggleSortingHandler(),
										}}
									>
										{flexRender(header.column.columnDef.header, header.getContext())}
										{{
											asc: <ChevronUpIcon className="h-4 w-4" />,
											desc: <ChevronDownIcon className="h-4 w-4" />,
										}[header.column.getIsSorted() as string] ??
											(header.column.getCanSort() ? <ChevronUpDownIcon className="h-4 w-4" /> : null)}
									</div>
								</th>
							);
						})}
					</tr>
				))}
			</thead>
			<tbody
				className="divide-y divide-white/5"
				style={{
					display: 'grid',
					height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
					position: 'relative', //needed for absolute positioning of rows
				}}
			>
				{rowVirtualizer.getVirtualItems().map((virtualRow) => {
					const row = rows[virtualRow.index] as Row<MoonrakerHistoryJob>;
					return (
						<tr
							data-index={virtualRow.index} //needed for dynamic row height measurement
							ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
							key={row.id}
							style={{
								display: 'flex',
								position: 'absolute',
								height: `${virtualRow.size}px`, //this should always be a `style` as it changes on scroll
								transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`, //this should always be a `style` as it changes on scroll
								width: '100%',
							}}
						>
							{row.getVisibleCells().map((cell) => {
								return (
									<td
										className={twMerge(
											'flex-grow p-4 @screen-sm:px-6 @screen-lg:px-8',
											getColumnSizeClass(cell.column.id),
										)}
										key={cell.id}
										style={{
											width: cell.column.getSize(),
										}}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								);
							})}
						</tr>
					);
				})}
				{totalFetched === 0 && (
					<tr>
						<td
							colSpan={columns.length}
							className="flex h-96 flex-grow flex-col items-center justify-center p-4 text-center text-zinc-100 @screen-sm:px-6 @screen-lg:px-8"
						>
							<h4 className="mb-4 text-4xl font-bold">No print history found</h4>
							<div className="text-xl text-zinc-400">What are you waiting for? Go print something!</div>
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};
