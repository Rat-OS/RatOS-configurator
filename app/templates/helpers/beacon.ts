import { PrinterConfiguration } from '@/zods/printer-configuration';

type BeaconOverrides = {
	proximityMargins?: { left: number; right: number; top: number; bottom: number };
	contactMargins?: { left: number; right: number; top: number; bottom: number };
	offset?: { x: number; y: number };
};

export const maybeRenderBeaconOverrides = (config: PrinterConfiguration, options: BeaconOverrides): string => {
	// Customize beacon and related configuration when the primary toolhead uses the `beacon` probe.
	// Emit *after* probe includes to ensure proper overrides.
	const hasBeacon = config.toolheads?.some((th) => !th.toolNumber && th.probe?.id === 'beacon');
	if (!hasBeacon) {
		return '';
	}
	const results = [];
	if (options.proximityMargins) {
		results.push('');
		results.push('# Bed mesh area adjusted for beacon proximity sensing');
		results.push('[bed_mesh]');
		results.push(`mesh_min: ${options.proximityMargins.left},${options.proximityMargins.bottom}`);
		results.push(
			`mesh_max: ${config.size.x - options.proximityMargins.right},${config.size.y - options.proximityMargins.top}`,
		);
	}
	if (options.contactMargins) {
		results.push('');
		results.push('# Beacon contact mesh area adjusted for beacon contact sensing');
		results.push('[beacon]');
		results.push(`contact_mesh_min: ${options.contactMargins.left},${options.contactMargins.bottom}`);
		results.push(
			`contact_mesh_max: ${config.size.x - options.contactMargins.right},${config.size.y - options.contactMargins.top}`,
		);
	}
	if (options.offset) {
		results.push('');
		results.push('# Beacon offset adjustment');
		results.push('[beacon]');
		results.push(`x_offset: ${options.offset.x}`);
		results.push(`y_offset: ${options.offset.y}`);
	}
	return results.join('\n');
};
