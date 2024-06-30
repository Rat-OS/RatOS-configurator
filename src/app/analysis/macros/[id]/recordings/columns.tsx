'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/app/analysis/macros/components/data-table-column-header';
import { MacroRecordingWithoutSourcePSDs } from '@/zods/analysis';
import { Badge, BadgeProps } from '@/components/common/badge';
import React from 'react';
import { ColumnCapabilities } from '@/app/analysis/macros/components/data-table-toolbar';
import * as luxon from 'luxon';
import { MacroRecordingDataTableRowActions } from '@/app/analysis/macros/[id]/recordings/recording-row-actions';
import { ArrowDownToDot, Cpu, Server, Target } from 'lucide-react';
import { KlipperAccelSensorName } from '@/zods/hardware';
import { RecordingBulkActions } from '@/app/analysis/macros/[id]/recordings/recordings-bulk-actions';
import Link from 'next/link';
luxon.Settings.defaultLocale = 'en-GB';
const userLocale = luxon.DateTime.local().locale;

export const columns: (ColumnDef<MacroRecordingWithoutSourcePSDs> & ColumnCapabilities)[] = [
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
		accessorKey: 'macroRecordingRunId',
		header: 'Macro Run ID',
		enableGrouping: true,
		enableHiding: false,
		enableSorting: false,
	},
	{
		id: 'date',
		size: 200,
		accessorKey: 'startTimeStamp',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
		cell: ({ row }) => {
			let leafRows = row.getLeafRows();
			if (leafRows.length === 0) {
				leafRows = [row];
			}
			const start = luxon.DateTime.fromMillis(leafRows[0].original.startTimeStamp);
			const end = luxon.DateTime.fromMillis(leafRows[leafRows.length - 1].original.endTimeStamp);
			const date = start.equals(end)
				? start.toFormat('yyyy-MM-dd HH:mm')
				: `${start.toFormat('yyyy-MM-dd HH:mm')} - ${end.toFormat('HH:mm')}`;
			const human = luxon.DateTime.fromMillis(row.original.startTimeStamp)
				.setLocale(userLocale)
				.toLocaleString({ dateStyle: 'long', timeStyle: 'short' });
			return (
				<div className="flex min-w-0">
					<span title={date} className="min-w-0 truncate">
						{human}
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
		size: 600,
		header: ({ column }) => <DataTableColumnHeader column={column} title="Recording" />,
		cell: ({ row }) => {
			let labels: {
				accel: KlipperAccelSensorName;
				label: string;
				color: BadgeProps['color'];
				icon: React.ComponentType;
			}[] = [];
			const name: string[] = [];

			let leafRows = row.getLeafRows();
			if (leafRows.length === 0) {
				leafRows = [row];
			}
			leafRows.forEach((r) => {
				name.push(r.original.name);
				if (labels.find((l) => l.accel === r.original.accelerometer)) {
					return;
				}
				switch (r.original.accelerometer) {
					case 'controlboard':
						labels.push({
							accel: r.original.accelerometer,
							label: r.original.recordingHardwareName,
							color: 'purple',
							icon: Cpu,
						});
						break;
					case 'rpi':
						labels.push({
							accel: r.original.accelerometer,
							label: r.original.recordingHardwareName,
							color: 'gray',
							icon: Server,
						});
						break;
					case 'toolboard_t0':
						labels.push({
							accel: r.original.accelerometer,
							label: `${r.original.recordingHardwareName} T0`,
							color: 'sky',
							icon: ArrowDownToDot,
						});
						break;
					case 'toolboard_t1':
						labels.push({
							accel: r.original.accelerometer,
							label: `${r.original.recordingHardwareName} T1`,
							color: 'pink',
							icon: ArrowDownToDot,
						});
						break;
					case 'beacon':
						labels.push({
							accel: r.original.accelerometer,
							label: r.original.recordingHardwareName,
							color: 'green',
							icon: Target,
						});
						break;
				}
			});

			return (
				<div className="flex min-w-0 max-w-fit items-center gap-2 truncate font-medium">
					{labels.map((l) => (
						<Badge color={l.color} key={l.label}>
							{l.label}
						</Badge>
					))}
					<Link
						href={`/analysis/macros/${row.original.macroId}/recordings/${row.original.macroRecordingRunId}`}
						className="truncate font-medium hover:text-brand-400"
					>
						{name.length > 1 ? name.slice(0, -1).join(', ') + ' & ' + name.slice(-1) : name[0]}
					</Link>
				</div>
			);
		},
		filterFn: (row, id, filterValues) => {
			const searchString = `${row.original.name} ${row.original.accelerometer} ${row.original.recordingHardwareName}`;
			return (
				Array.isArray(filterValues) &&
				filterValues.flat().some((filterValue: any) => searchString.includes(filterValue))
			);
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
	},
	{
		id: 'duration',
		size: 200,
		header: ({ column }) => <DataTableColumnHeader column={column} title="Duration" />,
		cell: ({ row }) => {
			let leafRows = row.getLeafRows();
			if (leafRows.length === 0) {
				leafRows = [row];
			}
			const duration = luxon.Duration.fromMillis(
				leafRows[leafRows.length - 1].original.endTimeStamp - leafRows[0].original.startTimeStamp,
			)
				.shiftTo('minutes', 'seconds')
				.toHuman({ unitDisplay: 'short', maximumSignificantDigits: 2 });
			return (
				<div className="flex min-w-0">
					<span className="min-w-0 truncate">{duration}</span>
				</div>
			);
		},
	},
	{
		id: 'actions',
		size: 25,
		header: ({ table }) => <RecordingBulkActions selection={table.getSelectedRowModel()} />,
		cell: ({ row }) => null,
	},
];
