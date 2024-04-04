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
import Link from 'next/link';
import { macroSchema } from '@/zods/analysis';
import { z } from 'zod';

interface DataTableRowActionsProps<TData extends z.infer<typeof macroSchema> = z.infer<typeof macroSchema>> {
	row: Row<TData>;
}

export function DataTableRowActions<TData extends z.infer<typeof macroSchema> = z.infer<typeof macroSchema>>({
	row,
}: DataTableRowActionsProps<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="plain" size="sm" className="flex data-[state=open]:bg-muted">
					<DotsHorizontalIcon className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem asChild>
					<Link href={`/analysis/macros/${row.original.id}/recordings`}>View Recordings</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href={`/analysis/macros/${row.original.id}/edit`}>Edit</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
