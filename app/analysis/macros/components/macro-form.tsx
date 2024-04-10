'use client';
import { ArrowDownToDot, Check, CircleFadingPlus, Cpu, Cross, Server, X } from 'lucide-react';

import { Button } from '@/components/common/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Fieldset } from '@/components/common/fieldset';
import { Badge } from '@/components/common/badge';
import { Card } from '@/components/common/card';
import React, { PointerEvent, PropsWithChildren, useCallback, useMemo } from 'react';
import { TWShadeableColorName, shadableTWColors } from '@/app/_helpers/colors';
import { Switch } from '@/components/ui/switch';
import { FormField, FormItem, FormLabel, FormDescription, FormControl, Form, FormMessage } from '@/components/ui/form';
import { UseFormReturn, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { ADXL345SensorName, createMacroSchema } from '@/zods/analysis';
import { z } from 'zod';
import * as uuid from 'uuid';
import { AnimatedContainer } from '@/components/common/animated-container';
import { AnimatePresence, motion, Reorder, useDragControls } from 'framer-motion';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { MacroChartPreview } from '@/app/analysis/macros/components/macro-chart-preview';
import { ScrollContainer } from '@/components/common/scroll-container';

const colorOptions = Object.keys(shadableTWColors).map((c) => {
	return {
		label: c,
		value: c,
		color: shadableTWColors[c as TWShadeableColorName][500] as string,
	};
});

type AccelOptions = {
	label: string;
	value: ADXL345SensorName;
	description: string;
	icon: React.ComponentType<React.SVGAttributes<SVGElement>>;
};

interface MacroFormProps {
	form: UseFormReturn<z.input<typeof createMacroSchema>>;
	submit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

interface SequenceFormProps extends PropsWithChildren {
	value: unknown;
}

const MacroSequence: React.FC<SequenceFormProps> = ({ value, children }) => {
	const controls = useDragControls();
	const onPointerDown = useCallback(
		(e: PointerEvent<HTMLFieldSetElement>) => {
			if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
				return;
			}
			e.stopPropagation();
			e.preventDefault();
			controls.start(e);
		},
		[controls],
	);
	return (
		<Reorder.Item
			as="div"
			className="grid w-full items-start gap-6"
			dragListener={false}
			dragControls={controls}
			value={value}
			exit={{
				opacity: 0,
				scale: 1,
				y: -10,
				transition: { duration: 0.2 },
			}}
			initial={{ opacity: 0, scale: 1, y: -10 }}
			animate={{
				opacity: 1,
				scale: 1,
				y: 0,
				transition: { delay: 0.2, staggerChildren: 0.2 },
			}}
		>
			<Fieldset className="grid gap-6 p-4" onPointerDown={onPointerDown}>
				{children}
			</Fieldset>
		</Reorder.Item>
	);
};

const useFormValues = () => {
	const { getValues } = useFormContext<z.input<typeof createMacroSchema>>();

	return {
		...useWatch(), // subscribe to form value updates

		...getValues(), // always merge with latest form values
	};
};

export const MacroForm: React.FC<MacroFormProps> = ({ form, submit }) => {
	let labels: AccelOptions[] = useMemo(() => {
		return [
			{
				label: 'Control Board',
				value: 'controlboard',
				description: 'Record data with an ADXL345 connected to the main control board',
				icon: Cpu,
			},
			{
				label: 'Host',
				value: 'rpi',
				description: 'Record data with an ADXL345 connected to the Raspberry Pi or other host computer',
				icon: Server,
			},
			{
				label: 'Tool Board T0',
				value: 'toolboard_t0',
				description: 'Record data with an ADXL345 on the toolboard on toolhead T0',
				icon: ArrowDownToDot,
			},
			{
				label: 'Tool Board T1',
				value: 'toolboard_t1',
				description: 'Record data with an ADXL345 on the toolboard on toolhead T1',
				icon: ArrowDownToDot,
			},
		] satisfies AccelOptions[];
	}, []);
	const sequences = useFieldArray({
		control: form.control,
		name: 'sequences',
		keyName: 'key',
		shouldUnregister: true,
	});
	const onReorder = useCallback(
		(seqs: typeof sequences.fields) => {
			seqs.forEach((seq, i) => sequences.update(i, seq));
		},
		[sequences],
	);
	const formValues = useFormValues();
	if (sequences.fields == null) {
		return;
	}
	return (
		<div className="flex max-h-[calc(100vh_-_56px)] min-h-full w-full flex-col">
			<header className="sticky top-14 z-10 flex flex-grow-0 items-center gap-1 border-b border-zinc-100/10 bg-zinc-700/25 px-4 py-4 backdrop-blur-sm">
				<div className="flex-1">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between">
								<FormControl className="flex flex-1">
									<Input
										className="flex h-auto flex-1 border-none p-0 text-xl font-medium"
										type="text"
										placeholder="Enter macro name..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between">
								<FormControl className="flex flex-1">
									<Input
										placeholder="Enter a description..."
										className="font-regular flex h-auto flex-1 border-none p-0 text-base text-muted-foreground"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="ml-auto flex flex-row flex-nowrap items-center gap-2">
					<Button
						variant="primary"
						size="sm"
						className="ml-auto text-sm"
						onClick={submit}
						disabled={!form.formState.isDirty}
					>
						<Check className="size-3.5" />
						Save
					</Button>
				</div>
			</header>
			<ResizablePanelGroup direction="horizontal" className="flex max-h-full flex-1">
				<ResizablePanel defaultSize={35} className="flex" minSize={20}>
					<ScrollContainer className="flex-1 overflow-y-scroll p-4">
						<Reorder.Group
							axis="y"
							as="div"
							className="relative flex flex-col items-start gap-4"
							values={sequences.fields ?? []}
							onReorder={onReorder}
						>
							{sequences.fields.map((sequence, index) => {
								return (
									<MacroSequence key={sequence.id ?? sequence.key} value={sequence}>
										<>
											<legend className="-ml-1 px-1 text-sm font-medium">
												{formValues.sequences[index]?.name ?? sequence.name ?? `Sequence ${index + 1}`}
											</legend>
											<div className="absolute -right-2 -top-5">
												<Button variant="danger" size="icon-xs" onClick={() => sequences.remove(index)}>
													<X className="size-3" />
												</Button>
											</div>
											<input type="hidden" {...form.register(`sequences.${index}.id`)} />
											<div className="grid gap-3">
												<FormField
													control={form.control}
													name={`sequences.${index}.name`}
													render={({ field }) => (
														<FormItem>
															<FormLabel className="text-base">Sequence name</FormLabel>
															<FormControl>
																<Input type="text" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
											<div className="grid gap-3">
												<FormField
													control={form.control}
													name={`sequences.${index}.gcode`}
													render={({ field }) => (
														<FormItem>
															<FormLabel className="text-base">G-code</FormLabel>
															<FormControl>
																<Textarea
																	id="temperature"
																	placeholder={'; Example \nOSCILLATE FREQ=60 TIME=1'}
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
											<div className="grid gap-3 rounded-lg border p-4 @container">
												<FormField
													control={form.control}
													name={`sequences.${index}.recording.capturePSD`}
													render={({ field }) => (
														<FormItem className="flex flex-row items-center justify-between">
															<div className="space-y-0.5">
																<FormLabel className="text-base">Record resonances</FormLabel>
																<FormDescription className="font-medium">
																	Enable the calculation and persistence of power spectral density.
																</FormDescription>
															</div>
															<FormControl>
																<Switch checked={field.value} onCheckedChange={field.onChange} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<AnimatedContainer>
													<AnimatePresence>
														{sequence.recording?.capturePSD && (
															<motion.div
																exit={{
																	opacity: 0,
																	scale: 1,
																	y: -10,
																	transition: { duration: 0.2 },
																}}
																initial={{ opacity: 0, scale: 1, y: -10 }}
																animate={{
																	opacity: 1,
																	scale: 1,
																	y: 0,
																	transition: { delay: 0.2, staggerChildren: 0.2 },
																}}
																className="grid gap-3 @xs:grid-cols-2"
															>
																<FormField
																	control={form.control}
																	name={`sequences.${index}.recording.accelerometer`}
																	render={({ field }) => (
																		<FormItem>
																			<FormLabel>Accelerometer</FormLabel>
																			<FormControl>
																				<Select onValueChange={field.onChange} value={field.value}>
																					<SelectTrigger
																						id="model"
																						className="items-start [&_[data-description]]:hidden"
																					>
																						<SelectValue placeholder="Select an accelerometer..." />
																					</SelectTrigger>
																					<SelectContent>
																						{labels.map(({ label, value, icon: Icon, description }) => (
																							<SelectItem value={value} key={label}>
																								<div className="flex items-start gap-1 text-muted-foreground">
																									<Icon className="size-5 shrink-0" />
																									<div className="grid gap-0.5">
																										<p>
																											<span className="font-medium text-foreground">{label}</span>
																										</p>
																										<p className="text-sm" data-description>
																											{description}
																										</p>
																									</div>
																								</div>
																							</SelectItem>
																						))}
																					</SelectContent>
																				</Select>
																			</FormControl>
																			<FormMessage />
																		</FormItem>
																	)}
																/>
																<FormField
																	control={form.control}
																	name={`sequences.${index}.recording.color`}
																	render={({ field }) => (
																		<FormItem>
																			<FormLabel>Sequence Color</FormLabel>
																			<FormControl>
																				<Select onValueChange={field.onChange} value={field.value}>
																					<SelectTrigger id="sequence-color" className="items-start">
																						<SelectValue placeholder="Select a color..." />
																					</SelectTrigger>
																					<SelectContent>
																						{colorOptions.map(({ label, color, value }) => (
																							<SelectItem value={value} key={value}>
																								<div className="flex items-start gap-2 text-muted-foreground">
																									<div className="size-5 rounded" style={{ backgroundColor: color }} />
																									<div className="grid gap-0.5">
																										<p>
																											<span className="font-medium capitalize text-foreground">
																												{label}
																											</span>
																										</p>
																									</div>
																								</div>
																							</SelectItem>
																						))}
																					</SelectContent>
																				</Select>
																			</FormControl>
																			<FormMessage />
																		</FormItem>
																	)}
																/>
															</motion.div>
														)}
													</AnimatePresence>
												</AnimatedContainer>
											</div>
										</>
									</MacroSequence>
								);
							})}
						</Reorder.Group>
						<Button
							variant="outline"
							className="mt-4 w-full justify-center text-center"
							onClick={() => {
								const toAppend = {
									gcode: '',
									name: `Sequence ${sequences.fields.length}`,
									recording: { capturePSD: false },
									id: uuid.v4(),
								};
								sequences.append(toAppend);
							}}
						>
							<CircleFadingPlus className="flex size-4" />
							<span>Add new sequence</span>
						</Button>
					</ScrollContainer>
				</ResizablePanel>
				<ResizableHandle withHandle={true} />
				<ResizablePanel className="mt-[9px] flex p-4" defaultSize={65} minSize={20}>
					<Card className="sticky top-0 flex min-h-72 w-full flex-1">
						<Badge color="sky" className="absolute right-3 top-3">
							Graph Example Preview
						</Badge>
						<div className="flex flex-1">
							<MacroChartPreview sequences={formValues.sequences} />
						</div>
					</Card>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
};
