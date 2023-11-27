import { z } from 'zod';
import { serverSchema } from '../env/schema.mjs';
import path from 'path';
import { SerializedPrinterRailDefinition } from './motion';

let startsWithServerValidation = '';
if (process.env.RATOS_CONFIGURATION_PATH) {
	const environment = serverSchema.parse(process.env);
	startsWithServerValidation = path.join(environment.RATOS_CONFIGURATION_PATH, 'printers');
}

const SpeedLimits = z.object({
	velocity: z.number().min(0).describe('Maximum velocity for this printer'),
	accel: z.number().min(0).describe('Maximum acceleration for this printer'),
	z_velocity: z.number().min(0).describe('Maximum z velocity for this printer'),
	z_accel: z.number().min(0).describe('Maximum z acceleration for this printer'),
	square_corner_velocity: z.number().min(0).default(5).describe('Maximum square corner velocity for this printer'),
});

export const Printer = z
	.object({
		id: z.string(),
		name: z.string().describe('The name of the printer'),
		description: z.string().describe('A description of the printer'),
		manufacturer: z.string().describe('The name of the manufacturer of this printer'),
		documentationLink: z.string().describe('Link to the RatOS documentation for this printer'),
		image: z.string().describe('Link to an image of the printer'),
		sizes: z.array(z.number()).describe('Size options for this printer').optional(),
		template: z.string().describe('Printer.cfg template for this printer'),
		path: z.string().startsWith(startsWithServerValidation),
		driverCountRequired: z.number().describe('Number of drivers required for this printer'),
		speedLimits: z
			.object({
				basic: SpeedLimits,
				performance: SpeedLimits.optional(),
			})
			.describe('Speed limits for this printer'),
		defaults: z
			.object({
				extruder: z
					.string()
					.describe('Default extruder for this printer. Should be the name of the config without the file extension.'),
				board: z.string().describe('Default board for this printer. Should be the name of the board directory.'),
				toolboard: z
					.string()
					.describe('Default toolboard for this printer. Should be the name of the board directory.')
					.optional(),
				hotend: z
					.string()
					.describe('Default hotend for this printer. Should be the name of the config without the file extension.'),
				probe: z
					.string()
					.describe('Default probe for this printer. Should be the name of the config without the file extension.')
					.optional(),
				xEndstop: z.enum(['endstop', 'endstop-toolboard', 'sensorless']).describe('Default x endstop for this printer'),
				yEndstop: z.enum(['sensorless', 'endstop']).describe('Default y endstop for this printer'),
				rails: z.array(SerializedPrinterRailDefinition).describe('Default rails for this printer'),
			})
			.describe('Default hardware for this printer'),
	})
	.describe('A RatOS supported 3d printer');

export type Printer = z.infer<typeof Printer>;
