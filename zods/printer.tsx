import { z } from 'zod';
import { serverSchema } from '@/env/schema.mjs';
import path from 'path';
import { SerializedPrinterRailDefinition } from '@/zods/motion';
import { SerializedToolheadConfiguration, ToolheadConfiguration } from '@/zods/toolhead';
import { Fan } from '@/zods/hardware';
import { BoardID } from '@/zods/boards';

let startsWithServerValidation = '';
if (process.env.RATOS_CONFIGURATION_PATH) {
	const environment = serverSchema.parse(process.env);
	startsWithServerValidation = path.join(environment.RATOS_CONFIGURATION_PATH, 'printers');
}

const SpeedLimits = z
	.object({
		velocity: z.number().min(0).describe('Maximum velocity for this printer'),
		accel: z.number().min(0).describe('Maximum acceleration for this printer'),
		z_velocity: z.number().min(0).describe('Maximum z velocity for this printer'),
		z_accel: z.number().min(0).describe('Maximum z acceleration for this printer'),
		square_corner_velocity: z.number().min(0).default(5).describe('Maximum square corner velocity for this printer'),
		travel_velocity: z.number().min(0).default(200).describe('Maximum travel velocity for this printer'),
		travel_accel: z.number().min(0).default(3000).describe('Maximum travel velocity for this printer'),
	})
	.strict();

export const PrinterSizeDefinition = z
	.object({
		x: z.number().min(0).describe('The print volume in X'),
		y: z.number().min(0).describe('The print volume in Y'),
		z: z.number().min(0).describe('The print volume in Z'),
	})
	.describe('The print volume of a printer');

export const PrinterDefinition = z
	.object({
		id: z.string().transform((data) => {
			return data === 'caramba-chonk'
				? 'v-chonk'
				: data.startsWith('caramba-')
					? data.replace('caramba-', 'v-core-4-')
					: data;
		}),
		name: z.string().describe('The name of the printer'),
		releaseDate: z.string().optional().describe('The release date of the printer in ISO 8601/RFC3339 eg. 2023-12-31'),
		description: z.string().describe('A description of the printer'),
		manufacturer: z.string().describe('The name of the manufacturer of this printer'),
		documentationLink: z.string().describe('Link to the RatOS documentation for this printer'),
		image: z.string().describe('Link to an image of the printer'),
		sizes: z.record(z.string(), PrinterSizeDefinition).describe('Size options for this printer'),
		template: z.string().describe('Printer.cfg template for this printer'),
		path: z.string().startsWith(startsWithServerValidation),
		driverCountRequired: z.number().describe('Number of drivers required for this printer'),
		kinematics: z
			.union([z.literal('cartesian'), z.literal('corexy'), z.literal('hybrid-corexy'), z.literal('hybrid-corexy-idex')])
			.optional(),
		bedMargin: z
			.object({
				x: z.tuple([z.number().default(0), z.number().default(0)]),
				y: z.tuple([z.number().default(0), z.number().default(0)]),
			})
			.describe('Margin of available movement around the bed for this printer')
			.default({ x: [0, 0], y: [0, 0] }),
		speedLimits: z
			.object({
				basic: SpeedLimits,
				performance: SpeedLimits.optional(),
			})
			.strict()
			.describe('Speed limits for this printer'),
		defaults: z
			.object({
				toolheads: z.array(SerializedToolheadConfiguration).describe('Default toolheads for this printer'),
				board: BoardID.describe('Default board for this printer. Should be the name of the board directory.'),
				rails: z.array(SerializedPrinterRailDefinition).describe('Default rails for this printer'),
				controllerFan: Fan.shape.id.optional().describe('Default controller fan for this printer'),
			})
			.strict()
			.describe('Default hardware for this printer'),
	})
	.describe('A RatOS supported 3d printer');

export const PrinterDefinitionWithResolvedToolheads = PrinterDefinition.extend({
	defaults: PrinterDefinition.shape.defaults
		.extend({
			toolheads: z.array(ToolheadConfiguration),
		})
		.strict(),
});

export type PrinterDefinition = z.infer<typeof PrinterDefinition>;
export type PrinterDefinitionWithResolvedToolheads = z.infer<typeof PrinterDefinitionWithResolvedToolheads>;
