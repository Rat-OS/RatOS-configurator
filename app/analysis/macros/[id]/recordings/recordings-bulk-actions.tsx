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
import { MacroRecordingWithoutSourcePSDs, macroRecordingSchema, macroSchema } from '@/zods/analysis';
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

interface RecordingBulkActionsProps<TData extends MacroRecordingWithoutSourcePSDs = MacroRecordingWithoutSourcePSDs> {
	selection: RowModel<TData>;
	onUpdate?: () => void;
}

export function RecordingBulkActions<TData extends MacroRecordingWithoutSourcePSDs = MacroRecordingWithoutSourcePSDs>({
	selection,
	onUpdate,
}: RecordingBulkActionsProps<TData>) {
	const [isAlertVisible, setIsAlertVisible] = useState(false);

	const deleteRecordings = trpc.analysis.deleteRecordings.useMutation();

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
						{selection.rows.length === 1 ? 'Recording' : 'Recordings'}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={isAlertVisible}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the {selection.flatRows.length} selected
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
									const result = await deleteRecordings.mutateAsync({
										macroId: selection.rows[0].original.macroId,
										recordingIds: selection.flatRows.map((row) => row.original.id),
									});
									if (result.success) {
										if (result.recordingsRemoved !== selection.flatRows.length) {
											getLogger().error(result, 'Failed to delete one or more macros');
											toast.error('Failed to delete one or more macros', {
												description:
													"An unknown error occurred and some of the recordings you marked for deletion seem to have disappeared from the database. This shouldn't happen. Please contact support.",
											});
										}
										toast.success('Recordings deleted!', {
											description: `${result.recordingsRemoved} recording(s) were successfully deleted.`,
										});
										return;
									} else {
										getLogger().error(result, 'Failed to delete recordings');
										toast.error('Failed to delete recordings', {
											description: `
												<div>
													<p>An error occurred while deleting the selected recordings.</p>
													<pre class="text-wrap mt-4 text-rose-400 font-medium whitespace-pre-wrap">${result.msg ?? 'Unknown error'}</pre>
												</div>
											`,
										});
									}
								} catch (e) {
									getLogger().error(
										{
											ids: selection.rows.map((row) => row.original.id),
											macroId: selection.rows[0].original.macroId,
											error: e,
										},
										'Failed to delete recordings',
									);
									toast.error('Failed to delete recordings', {
										description: `
											<div>
												<p>An error occurred while deleting the recordings.</p>
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
