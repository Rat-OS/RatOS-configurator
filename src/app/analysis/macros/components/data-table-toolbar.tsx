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

export const hasColumnCapabilities = (
	column: ColumnDef<any, any>,
): column is ColumnDef<any, any> & ColumnCapabilities => {
	return 'getFacetedOptions' in column;
};

export type ColumnCapabilities = {
	getFacetedOptions?: () => {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
};

export function DataTableToolbar<TData>({ table, globalFilter, setGlobalFilter }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;
	const facets = useMemo(
		() =>
			table
				.getAllColumns()
				.map((column) => {
					const uniqueVals = column.getFacetedUniqueValues();
					if (column.getCanFilter() && hasColumnCapabilities(column) && uniqueVals.size > 0) {
						return {
							column,
							options: (column as ColumnCapabilities).getFacetedOptions?.() ?? [],
						};
					}
					return null;
				})
				.filter(Boolean),
		[table],
	);

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filter tasks..."
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
					<Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
						Reset
						<Cross2Icon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
