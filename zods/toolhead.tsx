import { z } from 'zod';
import { BoardID, Toolboard } from './boards';
import { Hotend, Thermistor, Extruder, Probe, Endstop, Fan, Accelerometer, Nozzle } from './hardware';
import { PrinterAxis } from './motion';
import { getDefaultNozzle } from '../data/nozzles';

export const BaseToolheadConfiguration = z
	.object({
		hotend: Hotend,
		thermistor: Thermistor,
		extruder: Extruder,
		xEndstop: Endstop,
		yEndstop: Endstop,
		hotendFan: Fan,
		partFan: Fan,
		nozzle: Nozzle.default(getDefaultNozzle()),
		xAccelerometer: Accelerometer.optional().nullable(),
		yAccelerometer: Accelerometer.optional().nullable(),
		toolboard: Toolboard.nullable(),
		probe: Probe.optional(),
		axis: z.literal(PrinterAxis.x).or(z.literal(PrinterAxis.dual_carriage)),
		description: z.string().optional(),
		toolNumber: z.number().optional(),
	})
	.strict();

export const ToolNumber = z.union([z.literal(0), z.literal(1)]);
export const ToolAxis = z.union([
	z.literal(PrinterAxis.x),
	z.literal(PrinterAxis.dual_carriage),
	z.literal(PrinterAxis.extruder),
	z.literal(PrinterAxis.extruder1),
]);
export const ToolOrAxis = z.union([ToolAxis, ToolNumber]);
export type ToolNumber = z.infer<typeof ToolNumber>;
export type ToolAxis = z.infer<typeof ToolAxis>;
export type ToolOrAxis = z.infer<typeof ToolOrAxis>;

export const ToolheadConfiguration = BaseToolheadConfiguration.refine(
	(data) => data.toolboard !== null || data.xEndstop.id !== 'endstop-toolboard',
	'Cannot use toolboard endstop without a toolboard',
)
	.refine(
		(data) =>
			data.toolboard !== null ||
			!['2pin-toolboard', '4pin-toolboard', '4pin-dedicated-toolboard'].includes(data.hotendFan.id),
		'Cannot use toolboard hotend fan without a toolboard',
	)
	.refine(
		(data) =>
			data.toolboard !== null ||
			!['2pin-toolboard', '4pin-toolboard', '4pin-dedicated-toolboard'].includes(data.partFan.id),
		'Cannot use toolboard part cooling fan without a toolboard',
	);

export const PartialToolheadConfiguration = BaseToolheadConfiguration.partial().optional();
export const SerializedToolheadConfiguration = BaseToolheadConfiguration.extend({
	hotend: Hotend.shape.id,
	extruder: Extruder.shape.id,
	thermistor: Thermistor,
	xEndstop: Endstop.shape.id,
	yEndstop: Endstop.shape.id,
	hotendFan: Fan.shape.id,
	partFan: Fan.shape.id,
	xAccelerometer: Accelerometer.shape.id.optional().nullable(),
	yAccelerometer: Accelerometer.shape.id.optional().nullable(),
	toolboard: BoardID.optional().nullable(),
	probe: Probe.shape.id.optional().nullable(),
}).strict();
export const SerializedPartialToolheadConfiguration = SerializedToolheadConfiguration.partial().optional();

export type ToolheadConfiguration<T extends boolean> = z.infer<typeof ToolheadConfiguration> & {
	toolboard: T extends true ? Toolboard : null;
};
export type PartialToolheadConfiguration = z.infer<typeof PartialToolheadConfiguration>;
export type SerializedToolheadConfiguration = z.infer<typeof SerializedToolheadConfiguration>;
export type SerializedPartialToolheadConfiguration = z.infer<typeof SerializedPartialToolheadConfiguration>;
