import { z } from 'zod';
import { Board } from './boards';
import { Hotend, Thermistor, Extruder, Probe, Endstop } from './hardware';
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
	})
	.refine(
		(data) => data.size == null || ((data.printer.sizes?.length ?? 0) > 0 && data.size != null),
		'Printer size must be selected if printer has size options, otherwise it must be omitted',
	);
