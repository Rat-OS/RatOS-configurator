'use client';
import { AnimatedContainer } from '@/components/common/animated-container';
import { Button } from '@/components/common/button';
import { Card } from '@/components/common/card';
import { Spinner } from '@/components/common/spinner';
import { FileChanges } from '@/components/setup-steps/file-changes';
import { PrinterRailSettings } from '@/components/setup-steps/printer-rail-settings';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { serializePrinterConfiguration, usePrinterConfiguration } from '@/hooks/usePrinterConfiguration';
import { deserializePrinterRailDefinition } from '@/utils/serialization';
import { trpc } from '@/utils/trpc';
import { useQuery } from '@tanstack/react-query';
import { TextInput } from '@/components/forms/text-input';
import { LayoutGroup } from 'framer-motion';
import { useState, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import { twJoin } from 'tailwind-merge';

export const Motion = () => {
	const {
		selectedBoard,
		selectedPrinter,
		performanceMode,
		selectedPrinterRails,
		parsedPrinterConfiguration,
		setBedMargin,
		bedMargin,
	} = usePrinterConfiguration();
	let formattedErrors = parsedPrinterConfiguration.success === false ? parsedPrinterConfiguration.error.format() : null;

	const [filesToOverwrite, setFilesToOverwrite] = useState<string[]>([]);
	const [filesToIgnore, setFilesToIgnore] = useState<string[]>([]);

	const serializedPrinterConfiguration = useMemo(() => {
		if (parsedPrinterConfiguration.success === true) {
			return serializePrinterConfiguration(parsedPrinterConfiguration.data);
		}
		return null;
	}, [parsedPrinterConfiguration]);

	const saveConfigurationMutation = trpc.printer.saveConfiguration.useMutation();
	const saveConfiguration = useCallback(async () => {
		if (parsedPrinterConfiguration.success) {
			saveConfigurationMutation.mutate(
				{
					config: serializePrinterConfiguration(parsedPrinterConfiguration.data),
					overwriteFiles: filesToOverwrite,
					skipFiles: filesToIgnore,
				},
				{
					onSuccess: () => toast.success('Configuration saved'),
					onError: () => toast.error('Failed to save configuration'),
				},
			);
		}
	}, [parsedPrinterConfiguration, saveConfigurationMutation, filesToOverwrite, filesToIgnore]);

	const client = trpc.useUtils().client;
	const filesToWrite = useQuery({
		queryKey: ['filesToWrite', serializedPrinterConfiguration],
		queryFn: async () => {
			const res = await client.printer.getFilesToWrite.mutate({
				config: serializedPrinterConfiguration ?? ({} as any),
			});
			return res;
		},
		enabled: parsedPrinterConfiguration.success,
	});

	const requiresExplicitFileActions = filesToWrite.data?.some(
		(f) =>
			f.state === 'changed' &&
			f.changedFromConfig === true &&
			f.overwrite === false &&
			!filesToIgnore.includes(f.fileName) &&
			!filesToOverwrite.includes(f.fileName),
	);

	if (selectedPrinter == null) {
		return (
			<div className="mx-auto flex items-center justify-center p-8">
				<Spinner />
			</div>
		);
	}
	return (
		<div className="grid gap-8">
			<div>
				<Card>
					<CardHeader>
						<CardTitle>General</CardTitle>
					</CardHeader>
					<CardContent className="@container">
						<div className="grid grid-cols-2 gap-4">
							<div className="">
								<Label className="block text-sm font-semibold leading-6 text-zinc-700 dark:text-zinc-300">
									Bed Margin
								</Label>
								<p className="text-sm text-zinc-500 dark:text-zinc-400">
									Available toolhead travel distance outside the print volume
								</p>
							</div>
							<div className="">
								<Label className="block text-sm font-semibold leading-6 text-zinc-700 dark:text-zinc-300">
									Z Probe Offset
								</Label>
								<p className="text-sm text-zinc-500 dark:text-zinc-400">
									Probe offset relative to the nozzle. If the probe is behind the nozzle, it's Y offset is positive. If
									the probe is left of the nozzle the X offset is negative
								</p>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className={twJoin('col-span-full grid grid-cols-2 gap-4')}>
									<div>
										<TextInput
											type="number"
											defaultValue={bedMargin?.x[0] ?? 0}
											label="Left of bed"
											inputMode="decimal"
											step="any"
											min={0}
										/>
									</div>
									<div>
										<TextInput
											type="number"
											defaultValue={bedMargin?.x[1] ?? 0}
											label="Right of bed"
											inputMode="decimal"
											step="any"
											min={0}
										/>
									</div>
									<div>
										<TextInput
											type="number"
											defaultValue={bedMargin?.y[0] ?? 0}
											label="Back of bed"
											inputMode="decimal"
											step="any"
											min={0}
										/>
									</div>
									<div>
										<TextInput
											type="number"
											defaultValue={bedMargin?.y[1] ?? 0}
											label="Front of bed"
											inputMode="decimal"
											step="any"
											min={0}
										/>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className={twJoin('col-span-full grid grid-cols-2 gap-4')}>
									<div>
										<TextInput type="number" label="X Offset" inputMode="decimal" step="any" min={0} />
									</div>
									<div>
										<TextInput type="number" label="Y Offset" inputMode="decimal" step="any" min={0} />
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<LayoutGroup id="rails">
				<AnimatedContainer className="grid gap-4 @container @3xl:grid-cols-2 @6xl:grid-cols-3">
					{selectedPrinterRails.map((rail, ri) => {
						const defaultRail = selectedPrinter?.defaults.rails.find((r) => r.axis === rail.axis);
						if (defaultRail == null) {
							throw new Error('No printer default for axis ' + rail.axis);
						}
						return (
							<PrinterRailSettings
								showPositions={true}
								showStepperDirection={true}
								key={rail.axis}
								errors={formattedErrors?.rails?.[ri] != null ? formattedErrors.rails[ri] : { _errors: [] }}
								selectedBoard={selectedBoard}
								printerRail={rail}
								printerRailDefault={deserializePrinterRailDefinition(defaultRail)}
								performanceMode={performanceMode}
								isVisible={true}
							/>
						);
					})}
				</AnimatedContainer>
			</LayoutGroup>
			<AnimatedContainer>
				{(filesToWrite.data?.filter((f) => f.state !== 'unchanged').length ?? 0) > 0 && (
					<Card>
						<CardHeader>
							<CardTitle>File Changes</CardTitle>
						</CardHeader>
						<CardContent>
							<FileChanges
								serializedConfig={parsedPrinterConfiguration.success ? serializedPrinterConfiguration : null}
								onFilesToIgnoreChange={setFilesToIgnore}
								onFilesToOverwriteChange={setFilesToOverwrite}
							/>
						</CardContent>
						<CardFooter>
							<Button
								onClick={saveConfiguration}
								disabled={
									saveConfigurationMutation.isLoading ||
									!parsedPrinterConfiguration.success ||
									requiresExplicitFileActions
								}
							>
								{saveConfigurationMutation.isLoading && <Spinner />} Save Configuration
							</Button>
						</CardFooter>
					</Card>
				)}
			</AnimatedContainer>
		</div>
	);
};
