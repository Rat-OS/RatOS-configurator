import { z } from 'zod';
import { Board } from './boards';
import { Hotend, Thermistor, Extruder, Probe, Endstop, Fan } from './hardware';
import { Printer } from './printer';

export const PrinterConfiguration = z
	.object({
		printer: Printer,
		hotend: Hotend,
		thermistor: Thermistor,
		extruder: Extruder,
		probe: Probe.optional(),
		xEndstop: Endstop,
		yEndstop: Endstop,
		controlboard: Board,
		toolboard: Board.optional().nullable(),
		size: z.number().optional(),
		partFan: Fan,
		controllerFan: Fan,
		hotendFan: Fan,
	})
	.refine(
		(data) => data.size == null || ((data.printer.sizes?.length ?? 0) > 0 && data.size != null),
		'Printer size must be provided if printer has size options, otherwise it must be omitted',
	)
	.refine(
		(data) => data.toolboard !== null || data.xEndstop.id !== 'endstop-toolboard',
		'Cannot use toolboard endstop without a toolboard',
	)
	.refine(
		(data) => data.controlboard.driverCount >= data.printer.driverCountRequired || data.toolboard != null,
		'You have to select a toolboard to use this printer and controlboard combo',
	);

export const SerializedPrinterConfiguration = z.object({
	printer: Printer.shape.id,
	hotend: Hotend.shape.id,
	thermistor: Thermistor,
	extruder: Extruder.shape.id,
	probe: Probe.shape.id.optional(),
	xEndstop: Endstop.shape.id,
	yEndstop: Endstop.shape.id,
	controlboard: Board.shape.serialPath,
	toolboard: Board.shape.serialPath.optional().nullable(),
	size: z.number().optional(),
	partFan: Fan.shape.id,
	controllerFan: Fan.shape.id,
	hotendFan: Fan.shape.id,
});

export const PartialPrinterConfiguration = PrinterConfiguration.innerType()
	.innerType()
	.innerType()
	.partial()
	.optional();

export const SerializedPartialPrinterConfiguration = SerializedPrinterConfiguration.partial();

export type PrinterConfiguration = z.infer<typeof PrinterConfiguration>;
export type PartialPrinterConfiguration = z.infer<typeof PartialPrinterConfiguration>;
export type SerializedPrinterConfiguration = z.infer<typeof SerializedPrinterConfiguration>;
export type SerializedPartialPrinterConfiguration = z.infer<typeof SerializedPartialPrinterConfiguration>;
