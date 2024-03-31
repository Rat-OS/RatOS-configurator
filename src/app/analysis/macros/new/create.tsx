'use client';
import { Bird, Check, CircleFadingPlus, Rabbit, Share, Turtle } from 'lucide-react';

import { Button } from '@/components/common/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Fieldset } from '@/components/common/fieldset';
import { Badge, BadgeProps } from '@/components/common/badge';
import { Card } from '@/components/common/card';
import { usePrinterConfiguration } from '@/hooks/usePrinterConfiguration';
import { CpuChipIcon, ServerIcon, ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { TWShadeableColorName, shadableTWColors } from '@/app/_helpers/colors';
import { Switch } from '@/components/ui/switch';
import { FormField, FormItem, FormLabel, FormDescription, FormControl, Form, FormMessage } from '@/components/ui/form';
import { useFieldArray, useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ADXL345SensorName, createMacroSchema, macroSchema, macroSequenceSchema } from '@/zods/analysis';
import { z } from 'zod';
import * as uuid from 'uuid';
import { AnimatedContainer } from '@/components/common/animated-container';
import { AnimatePresence, motion } from 'framer-motion';
import { trpc } from '@/utils/trpc';

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

export const CreateMacro = () => {
	let labels: AccelOptions[] = useMemo(() => {
		return [
			{
				label: 'Control Board',
				value: 'controlboard',
				description: 'Record data with an ADXL345 connected to the main control board',
				icon: CpuChipIcon,
			},
			{
				label: 'Host',
				value: 'rpi',
				description: 'Record data with an ADXL345 connected to the Raspberry Pi or other host computer',
				icon: ServerIcon,
			},
			{
				label: 'Tool Board T0',
				value: 'toolboard_t0',
				description: 'Record data with an ADXL345 on the toolboard on toolhead T0',
				icon: ArrowDownOnSquareIcon,
			},
			{
				label: 'Tool Board T1',
				value: 'toolboard_t1',
				description: 'Record data with an ADXL345 on the toolboard on toolhead T1',
				icon: ArrowDownOnSquareIcon,
			},
		] satisfies AccelOptions[];
	}, []);
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
	const sequences = useFieldArray({
		control: form.control,
		name: 'sequences',
	});
	return (
		<div className="grid h-full w-full">
			<div className="flex flex-col">
				<Form {...form}>
					<header className="sticky top-0 z-10 flex items-center gap-1 border-b border-zinc-100/10 bg-zinc-700/25 px-4 py-4 backdrop-blur-sm">
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
						<Button variant="primary" size="sm" className="ml-auto text-sm" onClick={submit}>
							<Check className="size-3.5" />
							Save
						</Button>
					</header>
					<main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
						<div className="relative hidden flex-col items-start gap-8 md:flex">
							{sequences.fields.map((sequence, index) => {
								return (
									<div className="grid w-full items-start gap-6" key={sequence.id}>
										<Fieldset className="grid gap-6 p-4">
											<legend className="-ml-1 px-1 text-sm font-medium">
												{form.watch(`sequences.${index}.name`) ?? `Sequence ${index + 1}`}
											</legend>
											<div className="grid gap-3">
												<FormField
													control={form.control}
													name={`sequences.${index}.name`}
													render={({ field }) => (
														<FormItem>
															<FormLabel className="text-base">Macro name</FormLabel>
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
											<div className="grid gap-3 rounded-lg border p-4">
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
														{form.watch(`sequences.${index}.recording.capturePSD`) && (
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
																className="grid grid-cols-2 gap-3"
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
																						<SelectValue placeholder="Select a model" />
																					</SelectTrigger>
																					<SelectContent>
																						{labels.map(({ label, value, icon: Icon, description }) => (
																							<SelectItem value={value} key={label}>
																								<div className="flex items-start gap-3 text-muted-foreground">
																									<Icon className="size-5" />
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
																								<div className="flex items-start gap-3 text-muted-foreground">
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
										</Fieldset>
										{index < sequences.fields.length - 1 && (
											<Button
												variant="outline"
												className="justify-center text-center"
												onClick={() =>
													sequences.insert(index + 1, {
														gcode: '',
														name: `Sequence ${sequences.fields.length}`,
														recording: { capturePSD: false },
														id: uuid.v4(),
													})
												}
											>
												<CircleFadingPlus className="flex size-4" />
												<span>Add new sequence</span>
											</Button>
										)}
									</div>
								);
							})}
							<Button
								variant="outline"
								className="w-full justify-center text-center"
								onClick={() =>
									sequences.append({
										gcode: '',
										name: `Sequence ${sequences.fields.length}`,
										recording: { capturePSD: false },
										id: uuid.v4(),
									})
								}
							>
								<CircleFadingPlus className="flex size-4" />
								<span>Add new sequence</span>
							</Button>
						</div>
						<Card className="relative flex h-full min-h-[50vh] flex-col lg:col-span-2">
							<Badge color="sky" className="absolute right-3 top-3">
								Graph Example Preview
							</Badge>
							<div className="flex-1" />
						</Card>
					</main>
				</Form>
			</div>
		</div>
	);
};
