'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { ColumnDef, Table } from '@tanstack/react-table';

import { Button } from '@/components/common/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/app/analysis/macros/components/data-table-view-options';

import { DataTableFacetedFilter } from '@/app/analysis/macros/components/data-table-faceted-filter';
import { useMemo } from 'react';

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	globalFilter: string;
	setGlobalFilter: (value: string) => void;
}

export const hasColumnCapabilities = (column: object): column is ColumnCapabilities => {
	return 'getFacetedOptions' in column;
};

export type ColumnCapabilities = {
	getFacetedOptions?: () => {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
};

export function DataTableToolbar<TData>(props: DataTableToolbarProps<TData>) {
	const { table, globalFilter, setGlobalFilter } = props;
	const isFiltered = table.getState().columnFilters.length > 0;
	const facets = table
		.getAllColumns()
		.map((column) => {
			try {
				const uniqueVals = column.getFacetedUniqueValues();
				const columnDef = column.columnDef;
				if (hasColumnCapabilities(columnDef) && uniqueVals.size > 0) {
					return {
						column,
						options: columnDef.getFacetedOptions?.() ?? [],
					};
				}
			} catch (e) {
				return null;
			}
			return null;
		})
		.filter(Boolean);

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filter items..."
					value={globalFilter ?? ''}
					onChange={(event) => setGlobalFilter(event.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{facets.map((facet) => (
					<DataTableFacetedFilter
						key={facet.column.id}
						column={facet.column}
						title={facet.column.id}
						options={facet.options}
					/>
				))}
				{isFiltered && (
					<Button variant="outline" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
						Reset
						<Cross2Icon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
