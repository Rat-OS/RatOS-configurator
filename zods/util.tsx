import { z } from 'zod';

export const PinoLogLevel = z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']);

export const PinoLogEvent = z.object({
	ts: z.number(),
	messages: z.array(z.any()),
	bindings: z.array(z.record(z.string(), z.any())),
	level: z.object({
		label: PinoLogLevel,
		value: z.number(),
	}),
});
