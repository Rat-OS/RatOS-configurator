import { z } from 'zod';
import { Board } from './boards';
import { Hotend, Thermistor, Extruder, Probe, Endstop, Fan, Accelerometer } from './hardware';
import { Printer } from './printer';
import { PrinterRail, SerializedPrinterRail } from './motion';

const BasePrinterConfiguration = z.object({
	printer: Printer,
	hotend: Hotend,
	thermistor: Thermistor,
	extruder: Extruder,
	probe: Probe.optional(),
	xEndstop: Endstop,
	yEndstop: Endstop,
	controlboard: Board,
	toolboard: Board.optional().nullable(),
	size: z.number().optional().nullable(),
	partFan: Fan,
	controllerFan: Fan,
	hotendFan: Fan,
	xAccelerometer: Accelerometer.optional().nullable(),
	yAccelerometer: Accelerometer.optional().nullable(),
	performanceMode: z.boolean().default(false),
	stealthchop: z.boolean().default(false),
	standstillStealth: z.boolean().default(false),
	rails: z.array(PrinterRail),
});

export const PrinterConfiguration = BasePrinterConfiguration.refine(
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

export const SerializedPrinterConfiguration = BasePrinterConfiguration.extend({
	printer: Printer.shape.id,
	hotend: Hotend.shape.id,
	thermistor: Thermistor,
	extruder: Extruder.shape.id,
	probe: Probe.shape.id.optional().nullable(),
	xEndstop: Endstop.shape.id,
	yEndstop: Endstop.shape.id,
	controlboard: Board.shape.serialPath,
	toolboard: Board.shape.serialPath.optional().nullable(),
	partFan: Fan.shape.id,
	controllerFan: Fan.shape.id,
	hotendFan: Fan.shape.id,
	xAccelerometer: Accelerometer.shape.id.optional().nullable(),
	yAccelerometer: Accelerometer.shape.id.optional().nullable(),
	rails: z.array(SerializedPrinterRail),
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
