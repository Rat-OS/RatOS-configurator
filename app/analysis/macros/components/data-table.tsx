'use client';

import * as React from 'react';
import {
	ColumnDef,
	ColumnFiltersState,
	GroupingState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DataTablePagination } from '@/app/analysis/macros/components/data-table-pagination';
import { ColumnCapabilities, DataTableToolbar } from '@/app/analysis/macros/components/data-table-toolbar';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[] & ColumnCapabilities;
	initialColumnVisibility?: VisibilityState;
	initialGrouping?: GroupingState;
	initialSorting?: SortingState;
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
	initialColumnVisibility,
	initialGrouping,
	initialSorting,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = React.useState({});
	const [globalFilter, setGlobalFilter] = React.useState('');
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(initialColumnVisibility ?? {});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [grouping, setGrouping] = React.useState<GroupingState>(initialGrouping ?? []);
	const [sorting, setSorting] = React.useState<SortingState>(initialSorting ?? []);

	const cols = React.useMemo(
		() =>
			columns.map((c) => {
				c.enableGrouping = c.enableGrouping === true ? true : false;
				return c;
			}),
		[columns],
	);

	const table = useReactTable({
		data,
		columns: cols,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			grouping,
			globalFilter: globalFilter,
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onGroupingChange: setGrouping,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return (
		<div className="space-y-4">
			<DataTableToolbar table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										colSpan={header.colSpan}
										style={{ width: `${header.getSize()}px`, maxWidth: header.getSize() }}
									>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className="min-w-0 truncate" style={{ maxWidth: cell.column.getSize() }}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<DataTablePagination table={table} />
		</div>
	);
}
