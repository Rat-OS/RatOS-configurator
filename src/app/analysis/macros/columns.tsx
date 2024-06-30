'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/app/analysis/macros/components/data-table-column-header';
import { DataTableRowActions } from '@/app/analysis/macros/macro-row-actions';
import { Macro } from '@/zods/analysis';
import { Badge, BadgeProps } from '@/components/common/badge';
import { DotFilledIcon } from '@radix-ui/react-icons';
import React from 'react';
import { ColumnCapabilities } from '@/app/analysis/macros/components/data-table-toolbar';
import { ArrowDownToDot, Cpu, Play, Server, Target } from 'lucide-react';
import { MacroBulkActions } from '@/app/analysis/macros/macro-bulk-actions';
import Link from 'next/link';

export const columns: (ColumnDef<Macro> & ColumnCapabilities)[] = [
	{
		id: 'select',
		size: 30,
		minSize: 30,
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		size: 1000,
		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
		cell: ({ row }) => {
			let labels: { label: string; color: BadgeProps['color']; icon: React.ComponentType }[] = [];
			row.original.sequences.map((sequence) => {
				switch (sequence.recording?.accelerometer) {
					case 'controlboard':
						labels.push({ label: 'Control Board', color: 'purple', icon: Cpu });
						break;
					case 'rpi':
						labels.push({ label: 'Host', color: 'gray', icon: Server });
						break;
					case 'toolboard_t0':
						labels.push({ label: 'Tool Board T0', color: 'sky', icon: ArrowDownToDot });
						break;
					case 'toolboard_t1':
						labels.push({ label: 'Tool Board T1', color: 'pink', icon: ArrowDownToDot });
						break;
					case 'beacon':
						labels.push({ label: 'Beacon', color: 'green', icon: ArrowDownToDot });
						break;
				}
			});

			// make sure there's no duplicate labels
			labels = labels.filter((v, i, a) => a.findIndex((t) => t.label === v.label) === i);

			return (
				<div className="flex items-center space-x-2">
					{labels.map((l) => (
						<Badge color={l.color} key={l.label}>
							{l.label}
						</Badge>
					))}
					<Link
						href={`/analysis/macros/${row.original.id}/recordings`}
						className="truncate font-medium hover:text-brand-400"
					>
						{row.getValue('name')}
					</Link>
				</div>
			);
		},
		getUniqueValues: (row) => {
			return row.sequences.map((sequence) => sequence.recording?.accelerometer as string).concat([row.name]);
		},
		getFacetedOptions: () => {
			return [
				{ label: 'Control Board', value: 'controlboard', icon: Cpu },
				{ label: 'Host', value: 'rpi', icon: Server },
				{ label: 'Tool Board T0', value: 'toolboard_t0', icon: ArrowDownToDot },
				{ label: 'Tool Board T1', value: 'toolboard_t1', icon: ArrowDownToDot },
				{ label: 'Beacon', value: 'beacon', icon: Target },
			];
		},
		filterFn: (row, id, filterValues) => {
			const sequences = row.original.sequences.map((sequence) => sequence.recording?.accelerometer as string);
			return (Array.isArray(filterValues) ? filterValues : [filterValues]).some(
				(filterValue) => sequences.includes(filterValue) || row.original.name.includes(filterValue),
			);
		},
	},
	{
		accessorKey: 'sequences',
		size: 100,
		header: ({ column }) => <DataTableColumnHeader column={column} title="Sequences" />,
		cell: ({ row }) => {
			const actions = row.original.sequences.filter((sequence) => !sequence.recording?.capturePSD).length;
			const recordActions = row.original.sequences.filter((sequence) => sequence.recording?.capturePSD).length;

			return (
				<div className="flex items-center space-x-3">
					{actions > 0 && (
						<Badge className="flex gap-1.5" color="gray">
							<Play className="h-4 w-4 text-foreground" /> {actions}
						</Badge>
					)}
					{recordActions > 0 && (
						<Badge className="flex gap-1.5" color="gray">
							<DotFilledIcon className="h-4 w-4 scale-[250%] text-rose-400" /> {recordActions}
						</Badge>
					)}
				</div>
			);
		},
	},
	{
		id: 'actions',
		size: 16,
		minSize: 16,
		maxSize: 16,
		header: ({ table }) => <MacroBulkActions selection={table.getSelectedRowModel()} />,
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
