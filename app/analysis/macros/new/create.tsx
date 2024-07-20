'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMacroSchema } from '@/zods/analysis';
import { z } from 'zod';
import * as uuid from 'uuid';
import { trpc } from '@/utils/trpc';
import { MacroForm } from '@/app/analysis/macros/components/macro-form';
import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { Form } from '@/components/ui/form';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useTopMenu } from '@/app/topmenu';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const CreateMacro = () => {
	const memoed = useMemo(
		() => ({
			defaultValues: {
				id: uuid.v4(),
			},
			resolver: zodResolver(createMacroSchema),
		}),
		[],
	);
	const router = useRouter();
	const form = useForm<z.input<typeof createMacroSchema>>(memoed);
	const saveMacro = trpc.analysis.createMacro.useMutation();
	const submit = form.handleSubmit(async (data) => {
		try {
			await saveMacro.mutateAsync(data);
			toast.success('Macro created!', {
				description: `The macro "${data.name}" has been created successfully.`,
			});
			router.back();
		} catch (e) {
			toast.error('Failed to create macro', {
				description: `
					<div>
						<p>An error occurred while saving the macro.</p>
						<pre class="text-wrap mt-4 text-rose-400 font-medium whitespace-pre-wrap">${e instanceof Error ? e.message : e instanceof String ? e : 'Unknown error'}</pre>
					</div>
				`,
			});
		}
	});

	useTopMenu(
		'Analysis',
		useCallback(
			(Menu) => {
				return (
					<>
						<Menu.MenubarMenu>
							<Menu.MenubarTrigger className="cursor-pointer" onClick={() => router.back()}>
								<Menu.MenubarIcon Icon={ChevronLeft} />
								<span className="hidden lg:inline">Cancel</span>
							</Menu.MenubarTrigger>
							<Menu.MenubarContent className="hidden" />
						</Menu.MenubarMenu>
					</>
				);
			},
			[router],
		),
	);

	return (
		<Form {...form}>
			<MacroForm form={form} submit={submit} isNew={true} />
		</Form>
	);
};
