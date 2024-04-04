import { MoonrakerPrinterState, parseMoonrakerHTTPResponse } from '@/zods/moonraker';

export const queryPrinterState = async (): Promise<
	Zod.output<typeof MoonrakerPrinterState>['status']['print_stats']['state']
> => {
	return (
		await parseMoonrakerHTTPResponse(
			await fetch('http://localhost:7125/printer/objects/query?print_stats'),
			MoonrakerPrinterState,
		)
	).result.status.print_stats.state;
};

export const klipperRestart = async (force = false) => {
	if (force || ['error', 'complete', 'canceled', 'standby'].includes(await queryPrinterState())) {
		await fetch('http://localhost:7125/printer/restart', { method: 'POST' });
		return true;
	}
	return false;
};
