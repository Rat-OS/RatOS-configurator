'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/app/analysis/macros/components/data-table-column-header';
import { DataTableRowActions } from '@/app/analysis/macros/components/data-table-row-actions';
import { Macro } from '@/zods/analysis';
import { Badge, BadgeProps } from '@/components/common/badge';
import { DotFilledIcon, DotIcon } from '@radix-ui/react-icons';
import { ArrowDownOnSquareIcon, CpuChipIcon, ServerIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { ColumnCapabilities } from '@/app/analysis/macros/components/data-table-toolbar';

export const columns: (ColumnDef<Macro> & ColumnCapabilities)[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
		cell: ({ row }) => {
			let labels: { label: string; color: BadgeProps['color']; icon: React.ComponentType }[] = [];
			row.original.sequences.map((sequence) => {
				switch (sequence.recording?.accelerometer) {
					case 'controlboard':
						labels.push({ label: 'Control Board', color: 'plain', icon: CpuChipIcon });
						break;
					case 'rpi':
						labels.push({ label: 'Host', color: 'plain', icon: ServerIcon });
						break;
					case 'toolboard_t0':
						labels.push({ label: 'Tool Board T0', color: 'plain', icon: ArrowDownOnSquareIcon });
						break;
					case 'toolboard_t1':
						labels.push({ label: 'Tool Board T1', color: 'plain', icon: ArrowDownOnSquareIcon });
						break;
				}
			});

			return (
				<div className="flex space-x-2">
					{labels.map((l) => (
						<Badge color={l.color} key={l.label}>
							{l.label}
						</Badge>
					))}
					<span className="max-w-[500px] truncate font-medium">{row.getValue('name')}</span>
				</div>
			);
		},
		getFacetedOptions: () => {
			return [
				{ label: 'Control Board', value: 'controlboard', icon: CpuChipIcon },
				{ label: 'Host', value: 'rpi', icon: ServerIcon },
				{ label: 'Tool Board T0', value: 'toolboard_t0', icon: ArrowDownOnSquareIcon },
				{ label: 'Tool Board T1', value: 'toolboard_t1', icon: ArrowDownOnSquareIcon },
			];
		},
	},
	{
		accessorKey: 'sequences',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Sequences" />,
		cell: ({ row }) => {
			const actions = row.original.sequences.filter((sequence) => sequence.recording == null).length;
			const recordActions = row.original.sequences.filter((sequence) => sequence.recording?.capturePSD == true).length;

			if (!status) {
				return null;
			}

			return (
				<div className="flex w-[100px] items-center space-x-3">
					{actions > 0 && (
						<Badge className="space-x-1" color="plain">
							<DotIcon className="h-4 w-4 scale-150 text-foreground" /> {actions}
						</Badge>
					)}
					{recordActions > 0 && (
						<Badge className="space-x-1" color="plain">
							<DotFilledIcon className="h-4 w-4 scale-150 text-rose-400" /> {recordActions}
						</Badge>
					)}
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
