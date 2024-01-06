import { z } from 'zod';

export const MoonrakerBaseResult = z.object({
	eventtime: z.number(),
});
export const MoonrakerPrinterState = MoonrakerBaseResult.extend({
	status: z.object({
		print_state: z.object({
			state: z.union([
				z.literal('paused'),
				z.literal('printing'),
				z.literal('complete'),
				z.literal('error'),
				z.literal('canceled'),
				z.literal('standby'),
			]),
		}),
	}),
});

export const MoonrakerHTTPResponse = z.object({
	result: MoonrakerBaseResult.passthrough(),
});

export const parseMoonrakerHTTPResponse = <T extends z.ZodType<z.output<typeof MoonrakerBaseResult>>>(
	result: unknown,
	responseZod: T,
): z.output<typeof MoonrakerHTTPResponse> & { result: z.output<T> } => {
	const response = MoonrakerHTTPResponse.parse(result);
	return {
		...response,
		result: responseZod.parse(response.result),
	};
};
