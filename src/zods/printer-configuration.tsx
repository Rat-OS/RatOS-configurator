import { z } from 'zod';
import { Board } from './boards';
import { Fan } from './hardware';
import { PrinterDefinition } from './printer';
import { PrinterRail, SerializedPrinterRail } from './motion';
import {
	PartialToolheadConfiguration,
	SerializedPartialToolheadConfiguration,
	SerializedToolheadConfiguration,
	ToolheadConfiguration,
} from './toolhead';

const BasePrinterConfiguration = z.object({
	printer: PrinterDefinition,
	controlboard: Board,
	toolheads: z.array(ToolheadConfiguration).min(1).max(2),
	size: z.number().optional().nullable(),
	controllerFan: Fan,
	performanceMode: z.boolean().default(false),
	stealthchop: z.boolean().default(false),
	standstillStealth: z.boolean().default(false),
	rails: z.array(PrinterRail),
});

export const PrinterConfiguration = BasePrinterConfiguration.refine(
	(data) => data.size == null || ((data.printer.sizes?.length ?? 0) > 0 && data.size != null),
	'Printer size must be provided if printer has size options, otherwise it must be omitted',
).refine(
	(data) =>
		data.toolheads.map((t) => t.toolboard).filter(Boolean).length + data.controlboard.driverCount >=
		data.printer.driverCountRequired,
	'Your combination of controlboard and toolboards do not have enough stepper drivers for this printer',
);

export const SerializedPrinterConfiguration = BasePrinterConfiguration.extend({
	printer: PrinterDefinition.shape.id,
	controlboard: Board.shape.id,
	toolheads: z.array(SerializedToolheadConfiguration).min(1).max(2),
	controllerFan: Fan.shape.id,
	rails: z.array(SerializedPrinterRail),
});

export const PartialPrinterConfiguration = PrinterConfiguration.innerType()
	.innerType()
	.extend({
		toolheads: z.array(PartialToolheadConfiguration).min(1).max(2),
	})
	.partial()
	.optional();

export const SerializedPartialPrinterConfiguration = SerializedPrinterConfiguration.extend({
	toolheads: z.array(SerializedPartialToolheadConfiguration).min(1).max(2),
}).partial();

export type PrinterConfiguration = z.infer<typeof PrinterConfiguration>;
export type PartialPrinterConfiguration = z.infer<typeof PartialPrinterConfiguration>;
export type SerializedPrinterConfiguration = z.infer<typeof SerializedPrinterConfiguration>;
export type SerializedPartialPrinterConfiguration = z.infer<typeof SerializedPartialPrinterConfiguration>;
