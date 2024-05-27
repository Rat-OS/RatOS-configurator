'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMacroSchema } from '@/zods/analysis';
import { z } from 'zod';
import { trpc } from '@/utils/trpc';
import { MacroForm } from '@/app/analysis/macros/components/macro-form';
import { useForm } from 'react-hook-form';
import React, { useCallback, useState } from 'react';
import {
	AlertDialog,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogCancel,
	AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { getLogger } from '@/app/_helpers/logger';
import { ChevronLeft } from 'lucide-react';
import { Form } from '@/components/ui/form';
import Link from 'next/link';
import { useTopMenu } from '@/app/topmenu';

interface EditMacroProps {
	id: string;
}

export const EditMacro: React.FC<EditMacroProps> = ({ id }) => {
	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const [hasConfirmedRecordDeletion, setHasConfirmedRecordDeletion] = useState(false);
	const [macro] = trpc.analysis.findMacro.useSuspenseQuery({ id: id });
	const form = useForm<z.input<typeof createMacroSchema>>({
		defaultValues: macro,
		resolver: zodResolver(createMacroSchema),
	});
	const saveMacro = trpc.analysis.updateMacro.useMutation();
	const submit = form.handleSubmit(async (data) => {
		const result = await saveMacro.mutateAsync(data);
		if (result.result == null) {
			getLogger().error('Failed to save macro', data);
			toast.error('Failed to save macro', {
				description:
					"An unknown error occurred and the macro seem to have disappeared from the database. This shouldn't happen. Please contact support.",
			});
			return false;
		}
		toast.success('Macro updated!', {
			description: 'The changes to the macro was succesfully saved.',
		});
		form.reset(result.result);
	});

	useTopMenu(
		'Analysis',
		useCallback((Menu) => {
			return (
				<>
					<Menu.MenubarMenu>
						<Menu.MenubarTrigger className="cursor-pointer" asChild>
							<span onClick={() => window.history.back()}>
								<Menu.MenubarIcon Icon={ChevronLeft} />
								<span className="hidden lg:inline">Cancel</span>
							</span>
						</Menu.MenubarTrigger>
						<Menu.MenubarContent className="hidden" />
					</Menu.MenubarMenu>
				</>
			);
		}, []),
	);

	return (
		<Form {...form}>
			<MacroForm form={form} submit={hasConfirmedRecordDeletion ? submit : async () => setIsAlertVisible(true)} />
			<AlertDialog open={isAlertVisible}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your previous recordings for this macro.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setIsAlertVisible(false)}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							variant="danger"
							onClick={() => {
								setHasConfirmedRecordDeletion(true);
								setIsAlertVisible(false);
								submit();
							}}
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Form>
	);
};
