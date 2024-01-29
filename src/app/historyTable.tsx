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
import { useVirtualizer } from '@tanstack/react-virtual';
import { MoonrakerHistoryJob, MoonrakerHistoryListResponse } from '../moonraker/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DateTime, Duration, DurationLikeObject } from 'luxon';
import { twMerge } from 'tailwind-merge';
import { useMoonraker } from '../moonraker/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getHost } from '../helpers/util';

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
		header: 'Filename',
		accessorKey: 'filename',
		sortDescFirst: true,
		enableSorting: true,
		size: 360,
		cell: (info) => {
			const thumbnail = findThumbnail(info.row.original.metadata.thumbnails, 32);
			return (
				<div className="flex min-w-0 items-center gap-x-4">
					{thumbnail == null ? null : (
						<img src={thumbUrl(thumbnail)} alt="" className="h-8 w-8 rounded-full bg-zinc-800" />
					)}
					<div className="truncate text-sm font-medium leading-6 text-white">{info.getValue() as string}</div>
				</div>
			);
		},
	},
	{
		header: 'Started at',
		accessorKey: 'start_time',
		cell: (info) => (
			<div className="flex min-w-0 gap-x-3">
				<div className="text-sm leading-6 text-zinc-400">
					{DateTime.fromSeconds(info.getValue<MoonrakerHistoryJob['start_time']>()).toRelativeCalendar()}
				</div>
			</div>
		),
	},
	{
		header: 'Status',
		accessorKey: 'status',
		cell: (info) => {
			const status = info.getValue<MoonrakerHistoryJob['status']>();
			return (
				<div className="@screen-sm:justify-start flex items-center justify-end gap-x-2">
					<div
						className={twMerge(
							status === 'completed' ? 'bg-green-400/10 text-green-400' : 'bg-rose-400/10 text-rose-400',
							'flex-none rounded-full p-1',
						)}
					>
						<div className="h-1.5 w-1.5 rounded-full bg-current" />
					</div>
					<div className="@screen-sm:block hidden text-white">{status}</div>
				</div>
			);
		},
	},
	{
		header: 'Duration',
		accessorKey: 'print_duration',
		cell: (info) => (
			<div className="flex gap-x-3">
				<div className="text-sm leading-6 text-zinc-400">
					{Duration.fromObject({ hours: info.getValue<number>() / 60 / 60 })
						.normalize()
						.shiftTo(
							...(['minutes', info.getValue<number>() / 60 / 60 > 1 ? 'hours' : null].filter(
								Boolean,
							) as (keyof DurationLikeObject)[]),
						)
						.toHuman({ unitDisplay: 'short', listStyle: 'narrow', maximumFractionDigits: 0 })}
				</div>
				<span className="inline-flex items-center rounded-md bg-zinc-400/10 px-2 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-400/20">
					{info.row.original.metadata.slicer}
				</span>
			</div>
		),
	},
	{
		header: 'Filament used',
		accessorKey: 'filament_used',
		cell: (info) => {
			const filamentUsed = info.getValue<MoonrakerHistoryJob['filament_used']>() / 1000;
			return `${filamentUsed.toFixed(2)} meters`;
		},
	},
];

const PAGE_SIZE = 50;

export const HistoryTable = () => {
	const moon = useMoonraker();
	const tableContainerRef = useRef<HTMLDivElement>(null);
	const [sorting, setSorting] = useState<SortingState>([{ id: 'start_time', desc: true }]);
	const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery<MoonrakerHistoryListResponse>({
		queryKey: [
			'history',
			sorting, //refetch when sorting changes
		],
		queryFn: async ({ pageParam = 0 }) => {
			const start = (pageParam as number) * PAGE_SIZE;
			const fetchedData = await moon.query('server.history.list', {
				limit: PAGE_SIZE,
				offset: start,
				order: sorting[0].desc ? 'desc' : 'asc',
			}); //pretend api call
			return fetchedData;
		},
		getNextPageParam: (_lastGroup, groups) => groups.length,
		refetchOnWindowFocus: false,
	});
	//flatten the array of arrays from the useInfiniteQuery hook
	const flatData = useMemo(() => data?.pages?.flatMap((page) => page.jobs) ?? [], [data]);
	const totalDBRowCount = data?.pages?.[0]?.count ?? 0;
	const totalFetched = flatData.length;

	//called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
	const fetchMoreOnBottomReached = useCallback(
		(containerRefElement?: HTMLDivElement | null) => {
			if (containerRefElement) {
				const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
				//once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
				if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching && totalFetched < totalDBRowCount) {
					fetchNextPage();
				}
			}
		},
		[fetchNextPage, isFetching, totalFetched, totalDBRowCount],
	);

	//a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
	useEffect(() => {
		fetchMoreOnBottomReached(tableContainerRef.current);
	}, [fetchMoreOnBottomReached]);

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

	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		estimateSize: () => 42, //estimate row height for accurate scrollbar dragging
		getScrollElement: () => tableContainerRef.current,
		//measure dynamic row height, except in firefox because it measures table border height incorrectly
		measureElement:
			typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
				? (element) => element?.getBoundingClientRect().height
				: undefined,
		overscan: 5,
	});

	if (isLoading) {
		return <>Loading...</>;
	}
	return (
		<div
			className="container"
			onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
			ref={tableContainerRef}
			style={{
				overflow: 'auto', //our scrollable table container
				position: 'relative', //needed for sticky header
				height: '600px', //should be a fixed height
			}}
		>
			<table className="mt-6 w-full whitespace-nowrap text-left" style={{ display: 'grid' }}>
				{/* <colgroup>
				<col className="@screen-sm:w-4/12 w-full" />
				<col className="@screen-lg:w-2/12" />
				<col className="@screen-lg:w-2/12" />
				<col className="@screen-lg:w-3/12" />
				<col className="@screen-lg:w-1/12" />
			</colgroup> */}
				<thead
					className="border-b border-white/10 text-sm leading-6 text-white"
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
										className="@screen-sm:px-6 @screen-lg:px-8 py-2 font-semibold"
										key={header.id}
										style={{
											display: 'flex',
											width: header.getSize(),
										}}
									>
										<div
											{...{
												className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
												onClick: header.column.getToggleSortingHandler(),
											}}
										>
											{flexRender(header.column.columnDef.header, header.getContext())}
											{{
												asc: ' 🔼',
												desc: ' 🔽',
											}[header.column.getIsSorted() as string] ?? null}
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
						console.log(row);
						return (
							<tr
								data-index={virtualRow.index} //needed for dynamic row height measurement
								ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
								key={row.id}
								style={{
									display: 'flex',
									position: 'absolute',
									transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
									width: '100%',
								}}
							>
								{row.getVisibleCells().map((cell) => {
									return (
										<td
											className="@screen-sm:px-6 @screen-lg:px-8 py-4"
											key={cell.id}
											style={{
												display: 'flex',
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
				</tbody>
			</table>
		</div>
	);
};
