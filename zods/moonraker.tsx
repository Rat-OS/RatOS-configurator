import { z } from 'zod';
import { getLogger } from '../server/helpers/logger';

export const MoonrakerBaseResult = z.object({
	eventtime: z.number(),
});
export const MoonrakerPrinterState = MoonrakerBaseResult.extend({
	status: z.object({
		print_stats: z.object({
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

export const parseMoonrakerHTTPResponse = async <T extends z.ZodType<z.output<typeof MoonrakerBaseResult>>>(
	response: Response,
	responseZod: T,
): Promise<z.output<typeof MoonrakerHTTPResponse> & { result: z.output<T> }> => {
	const jsonResult = await response.json();
	try {
		const res = MoonrakerHTTPResponse.parse(jsonResult);
		return {
			...res,
			result: responseZod.parse(res.result),
		};
	} catch (e) {
		getLogger().error('Error parsing moonraker response');
		getLogger().error(jsonResult);
		throw e;
	}
};
