'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMacroSchema } from '@/zods/analysis';
import { z } from 'zod';
import * as uuid from 'uuid';
import { trpc } from '@/utils/trpc';
import { MacroForm } from '@/app/analysis/macros/components/macro-form';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { Form } from '@/components/ui/form';

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
	const form = useForm<z.input<typeof createMacroSchema>>(memoed);
	const saveMacro = trpc.analysis.createMacro.useMutation();
	const submit = form.handleSubmit((data) => {
		saveMacro.mutate(data);
	});
	return (
		<Form {...form}>
			<MacroForm form={form} submit={submit} />
		</Form>
	);
};
