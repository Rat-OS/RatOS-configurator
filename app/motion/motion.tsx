'use client';
import { AnimatedContainer } from '@/components/common/animated-container';
import { Button } from '@/components/common/button';
import { Card } from '@/components/common/card';
import { Spinner } from '@/components/common/spinner';
import { FileChanges } from '@/components/setup-steps/file-changes';
import { PrinterRailSettings } from '@/components/setup-steps/printer-rail-settings';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { serializePrinterConfiguration, usePrinterConfiguration } from '@/hooks/usePrinterConfiguration';
import { deserializePrinterRailDefinition } from '@/utils/serialization';
import { trpc } from '@/utils/trpc';
import { useQuery } from '@tanstack/react-query';
import { LayoutGroup } from 'framer-motion';
import { useState, useMemo, useCallback } from 'react';
import { toast } from 'sonner';

export const Motion = () => {
	const { selectedBoard, selectedPrinter, performanceMode, selectedPrinterRails, parsedPrinterConfiguration } =
		usePrinterConfiguration();
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
			<LayoutGroup id="rails">
				<AnimatedContainer className="grid gap-4 @3xl:grid-cols-2 @6xl:grid-cols-3">
					{selectedPrinterRails.map((rail, ri) => {
						const defaultRail = selectedPrinter?.defaults.rails.find((r) => r.axis === rail.axis);
						if (defaultRail == null) {
							throw new Error('No printer default for axis ' + rail.axis);
						}
						return (
							<PrinterRailSettings
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
