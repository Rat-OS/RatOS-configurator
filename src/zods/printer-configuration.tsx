import { z } from 'zod';
import { Board, BoardID } from './boards';
import { Fan } from './hardware';
import { PrinterDefinition } from './printer';
import { PrinterAxis, PrinterRail, SerializedPrinterRail } from './motion';
import {
	PartialToolheadConfiguration,
	SerializedPartialToolheadConfiguration,
	SerializedToolheadConfiguration,
	ToolheadConfiguration,
} from './toolhead';
import { ToolheadHelper } from '../helpers/toolhead';

const BasePrinterConfiguration = z
	.object({
		printer: PrinterDefinition,
		controlboard: Board,
		toolheads: z.array(ToolheadConfiguration).min(1).max(2),
		size: z.number().optional().nullable(),
		controllerFan: Fan,
		performanceMode: z.boolean().default(false),
		stealthchop: z.boolean().default(false),
		standstillStealth: z.boolean().default(false),
		rails: z.array(PrinterRail),
	})
	.strict();

export const PrinterConfiguration = BasePrinterConfiguration.superRefine((arg, ctx) => {
	// Size validation
	if (arg.size != null) {
		const sizes = arg.printer.sizes ?? [];
		if (!sizes.includes(arg.size)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `Size ${arg.size} is not a valid size for a ${arg.printer.name} config`,
			});
		}
	} else if (arg.printer.sizes != null && arg.printer.sizes.length > 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: `Size is required for a ${arg.printer.name} config`,
		});
	}
})
	.superRefine((arg, ctx) => {
		// Driver count validation
		const toolboardCount = arg.toolheads.map((t) => t.toolboard).filter(Boolean).length;
		if (toolboardCount + arg.controlboard.driverCount < arg.printer.driverCountRequired) {
			ctx.addIssue({
				code: z.ZodIssueCode.too_small,
				message: `Your combination of controlboard and toolboards do not have enough stepper drivers for a ${arg.printer.name} config`,
				minimum: arg.printer.driverCountRequired,
				inclusive: true,
				type: 'number',
			});
		}
	})
	.superRefine((arg, ctx) => {
		// Rail motor slot validation
		const toolheads = arg.toolheads.map((t) => new ToolheadHelper(t));
		const errors = arg.rails
			.map((r, i) => {
				const toolhead = toolheads.find((th) => th.getExtruderAxis() === r.axis);
				if (r.motorSlot != null) {
					const conflicts = arg.rails.filter((pr) => {
						const conflictingToolhead = toolheads.find((th) => th.getExtruderAxis() === pr.axis);
						if (pr.axis === r.axis || toolhead?.hasToolboard() != null) {
							return false;
						}
						if (conflictingToolhead?.hasToolboard != null) {
							// The rail is an extruder rail and the toolhead has a toolboard, no chance of conflict.
							return false;
						}
						return pr.motorSlot === r.motorSlot;
					});
					const railName = (axis: PrinterAxis) =>
						axis === 'extruder'
							? 'Extruder T0'
							: axis === PrinterAxis.extruder1
								? 'Extruder T1'
								: 'Stepper ' + axis.toLocaleUpperCase();
					if (conflicts.length === 1) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: `Motor slot ${r.motorSlot} is already in use on ${railName(conflicts[0].axis)}`,
							path: ['rails', i, 'motorSlot'],
						});
					} else if (conflicts.length > 1) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: `Motor slot ${r.motorSlot} is already in use on ${conflicts
								.slice(0, -1)
								.map((cr) => railName(cr.axis))
								.join(', ')} and ${railName(conflicts[conflicts.length - 1].axis)}`,
							path: ['rails', i, 'motorSlot'],
						});
					}
					return conflicts.length > 0 ? { rail: r, conflicts } : 0;
				}
				return null;
			})
			.filter(Boolean);
		if (errors.length > 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Motor slot conflicts detected',
			});
		}
	});

export const SerializedPrinterConfiguration = BasePrinterConfiguration.extend({
	printer: PrinterDefinition.shape.id,
	controlboard: BoardID,
	toolheads: z.array(SerializedToolheadConfiguration).min(1).max(2),
	controllerFan: Fan.shape.id,
	rails: z.array(SerializedPrinterRail),
}).strict();

export const PartialPrinterConfiguration = BasePrinterConfiguration.extend({
	toolheads: z.array(PartialToolheadConfiguration).min(1).max(2),
})
	.strict()
	.partial()
	.optional();

export const SerializedPartialPrinterConfiguration = SerializedPrinterConfiguration.extend({
	toolheads: z.array(SerializedPartialToolheadConfiguration).min(1).max(2),
})
	.strict()
	.partial();

export type PrinterConfiguration = z.infer<typeof PrinterConfiguration>;
export type PartialPrinterConfiguration = z.infer<typeof PartialPrinterConfiguration>;
export type SerializedPrinterConfiguration = z.infer<typeof SerializedPrinterConfiguration>;
export type SerializedPartialPrinterConfiguration = z.infer<typeof SerializedPartialPrinterConfiguration>;
