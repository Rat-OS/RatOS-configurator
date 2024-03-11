'use client';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Spinner } from '../../components/common/spinner';
import { PrinterRailSettings } from '../../components/setup-steps/printer-rail-settings';
import { usePrinterConfiguration } from '../../hooks/usePrinterConfiguration';
import { deserializePrinterRailDefinition } from '../../utils/serialization';

export const Motion = () => {
	const [animate] = useAutoAnimate();
	const { selectedBoard, selectedPrinter, performanceMode, selectedPrinterRails, parsedPrinterConfiguration } =
		usePrinterConfiguration();
	let formattedErrors = parsedPrinterConfiguration.success === false ? parsedPrinterConfiguration.error.format() : null;
	if (selectedPrinter == null) {
		return (
			<div className="mx-auto flex items-center justify-center p-8">
				<Spinner />
			</div>
		);
	}
	return (
		<div className="grid gap-4 py-4 @lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4" ref={animate}>
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
		</div>
	);
};
