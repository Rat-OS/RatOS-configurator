'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMacroSchema } from '@/zods/analysis';
import { z } from 'zod';
import * as uuid from 'uuid';
import { trpc } from '@/utils/trpc';
import { MacroForm } from '@/app/analysis/macros/components/macro-form';
import { useForm } from 'react-hook-form';

export const CreateMacro = () => {
	const form = useForm<z.input<typeof createMacroSchema>>({
		defaultValues: {
			id: uuid.v4(),
		},
		resolver: zodResolver(createMacroSchema),
	});
	const saveMacro = trpc.analysis.createMacro.useMutation();
	const submit = form.handleSubmit((data) => {
		saveMacro.mutate(data);
	});
	return <MacroForm form={form} submit={submit} />;
};
