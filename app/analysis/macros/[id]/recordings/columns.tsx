'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/app/analysis/macros/components/data-table-column-header';
import { MacroRecordingWithoutSourcePSDs } from '@/zods/analysis';
import { Badge, BadgeProps } from '@/components/common/badge';
import { ArrowDownOnSquareIcon, CpuChipIcon, ServerIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { ColumnCapabilities } from '@/app/analysis/macros/components/data-table-toolbar';
import * as luxon from 'luxon';
import { MacroRecordingDataTableRowActions } from '@/app/analysis/macros/[id]/recordings/recording-row-actions';
luxon.Settings.defaultLocale = 'en-GB';

export const columns: (ColumnDef<MacroRecordingWithoutSourcePSDs> & ColumnCapabilities)[] = [
	{
		id: 'select',
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
		accessorKey: 'macroRecordingRunId',
		enableGrouping: true,
	},
	{
		id: 'date',
		accessorKey: 'startTimeStamp',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
		cell: ({ row }) => {
			const start = luxon.DateTime.fromMillis(row.original.startTimeStamp);
			const end = luxon.DateTime.fromMillis(row.original.endTimeStamp);
			const date = start.equals(end)
				? start.toFormat('yyyy-MM-dd HH:mm')
				: `${start.toFormat('yyyy-MM-dd HH:mm')} - ${end.toFormat('HH:mm')}`;
			const human = luxon.DateTime.fromMillis(row.original.startTimeStamp).toRelative();
			const duration = luxon.Duration.fromMillis(row.original.endTimeStamp - row.original.startTimeStamp).toFormat(
				'hh:mm:ss',
			);
			return (
				<div className="flex">
					<span title={date}>
						{human} ({duration})
					</span>
				</div>
			);
		},
		enableSorting: true,
		sortingFn: (a, b) => a.original.startTimeStamp - b.original.startTimeStamp,
		sortDescFirst: true,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Recording" />,
		cell: ({ row }) => {
			let labels: { label: string; color: BadgeProps['color']; icon: React.ComponentType }[] = [];
			switch (row.original.accelerometer) {
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
		id: 'actions',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
		cell: ({ row }) => <MacroRecordingDataTableRowActions row={row} />,
	},
];
