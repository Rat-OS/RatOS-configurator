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
import { trpc } from '@/utils/trpc';
import {
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { getLogger } from '@/app/_helpers/logger';

interface DataTableRowActionsProps<TData extends z.infer<typeof macroSchema> = z.infer<typeof macroSchema>> {
	row: Row<TData>;
	onUpdate?: () => void;
}

export function DataTableRowActions<TData extends z.infer<typeof macroSchema> = z.infer<typeof macroSchema>>({
	row,
	onUpdate,
}: DataTableRowActionsProps<TData>) {
	const [isAlertVisible, setIsAlertVisible] = useState(false);

	const deleteMacro = trpc.analysis.deleteMacro.useMutation();

	return (
		<>
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
					<DropdownMenuItem onClick={() => setIsAlertVisible(true)}>Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={isAlertVisible}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete this macro and all associated recordings.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setIsAlertVisible(false)}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							variant="danger"
							onClick={async () => {
								setIsAlertVisible(false);
								try {
									const result = await deleteMacro.mutateAsync(row.original.id);
									if (result.result == null) {
										getLogger().error('Failed to delete macro', row.original.id);
										toast.error('Failed to delete macro', {
											description:
												"An unknown error occurred and the macro seem to have disappeared from the database. This shouldn't happen. Please contact support.",
										});
										return;
									}
									toast.success('Macro deleted!', {
										description: `The macro and ${result.totalRecordingsRemoved} recording(s) were successfully deleted.`,
									});
								} catch (e) {
									getLogger().error({ id: row.original.id, error: e }, 'Failed to delete macro');
									toast.error('Failed to delete macro', {
										description: `
											<div>
												<p>An error occurred while delete the macro.</p>
												<pre class="text-wrap mt-4 text-rose-400 font-medium whitespace-pre-wrap">${e instanceof Error ? e.message : e instanceof String ? e : 'Unknown error'}</pre>
											</div>
										`,
									});
								}
								onUpdate?.();
							}}
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
