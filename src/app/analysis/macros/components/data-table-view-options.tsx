'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/common/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface DataTableViewOptionsProps<TData> {
	table: Table<TData>;
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
	const isGroupable = table.getAllColumns().some((column) => {
		return column.getCanGroup();
	});
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
					<MixerHorizontalIcon className="mr-2 h-4 w-4" />
					View
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{table
					.getAllColumns()
					.filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>
								{column.id}
							</DropdownMenuCheckboxItem>
						);
					})}
				{isGroupable && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuLabel>Group rows</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{table
							.getAllColumns()
							.filter((column) => column.getCanGroup())
							.map((column) => {
								const header = table.getHeaderGroups()[0].headers.find((h) => h.id === column.id);
								if (typeof column.columnDef.header === 'function' && header == null) {
									return null;
								}
								const title =
									typeof column.columnDef.header === 'function' && header != null
										? column.columnDef.header({
												table,
												column,
												header,
											})
										: column.columnDef.header;
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsGrouped()}
										onCheckedChange={(value) => column.toggleGrouping()}
									>
										{title}
									</DropdownMenuCheckboxItem>
								);
							})
							.filter(Boolean)}
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
