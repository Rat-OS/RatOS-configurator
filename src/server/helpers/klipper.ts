import { MoonrakerPrinterState, parseMoonrakerHTTPResponse } from '../../zods/moonraker';

export const klipperRestart = async (force = false) => {
	const printerState = (await parseMoonrakerHTTPResponse(
		await fetch('http://localhost:7125/printer/objects/query?print_stats'),
		MoonrakerPrinterState,
	)).result.status.print_stats.state;
	if (force || ['error', 'complete', 'canceled', 'standby'].includes(printerState)) {
		await fetch('http://localhost:7125/printer/restart', { method: 'POST' });
		return true;
	}
	return false;
};
