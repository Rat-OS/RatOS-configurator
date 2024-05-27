'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/common/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { macroRecordingSchemaWithoutSourcePSDs, macroSchema } from '@/zods/analysis';
import { z } from 'zod';
import React from 'react';
import { AreaChart } from 'lucide-react';

interface DataTableRowActionsProps<
	TData extends z.infer<typeof macroRecordingSchemaWithoutSourcePSDs> = z.infer<
		typeof macroRecordingSchemaWithoutSourcePSDs
	>,
> {
	row: Row<TData>;
}

export function MacroRecordingDataTableRowActions<
	TData extends z.infer<typeof macroRecordingSchemaWithoutSourcePSDs> = z.infer<
		typeof macroRecordingSchemaWithoutSourcePSDs
	>,
>({ row }: DataTableRowActionsProps<TData>) {
	return (
		<Button
			variant="indeterminate"
			size="sm"
			className="flex-grow-0 data-[state=open]:bg-muted"
			href={`/analysis/macros/${row.original.macroId}/recordings/${row.original.macroRecordingRunId}`}
		>
			<AreaChart className="h-4 w-4" />
			View Graph
		</Button>
	);
}
