'use client';

import { DotsHorizontalIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { Row, RowModel } from '@tanstack/react-table';

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

interface DataTableBulkActionsProps<TData extends z.infer<typeof macroSchema> = z.infer<typeof macroSchema>> {
	selection: RowModel<TData>;
	onUpdate?: () => void;
}

export function DataTableBulkActions<TData extends z.infer<typeof macroSchema> = z.infer<typeof macroSchema>>({
	selection,
	onUpdate,
}: DataTableBulkActionsProps<TData>) {
	const [isAlertVisible, setIsAlertVisible] = useState(false);

	const deleteMacros = trpc.analysis.deleteMacros.useMutation();

	return (
		<div className="flex justify-end">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="plain" size="sm" className="flex data-[state=open]:bg-muted">
						<DotsVerticalIcon className="h-4 w-4" />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[160px]">
					<DropdownMenuItem onClick={() => setIsAlertVisible(true)} disabled={selection.rows.length === 0}>
						Delete {selection.rows.length > 0 ? selection.rows.length : ''}{' '}
						{selection.rows.length === 1 ? 'Macro' : 'Macros'}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={isAlertVisible}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the selected macros and all associated
							recordings.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setIsAlertVisible(false)}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							variant="danger"
							onClick={async () => {
								setIsAlertVisible(false);
								try {
									const result = await deleteMacros.mutateAsync(selection.rows.map((row) => row.original.id));
									const failed = result.result.filter((r) => !r.success);
									if (failed.length > 0) {
										getLogger().error(failed, 'Failed to delete one or more macros');
										toast.error('Failed to delete one or more macros', {
											description:
												"An unknown error occurred and some of the macros you marked for deletion seem to have disappeared from the database. This shouldn't happen. Please contact support.",
										});
									}
									toast.success('Macros deleted!', {
										description: `${result.macrosRemoved} out of ${result.result.length} macro(s) and ${result.result.reduce((prev, current) => prev + current.totalRecordingsRemoved, 0)} recording(s) were successfully deleted.`,
									});
								} catch (e) {
									getLogger().error(
										{ ids: selection.rows.map((row) => row.original.id), error: e },
										'Failed to delete macros',
									);
									toast.error('Failed to delete macros', {
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
		</div>
	);
}
