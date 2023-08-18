import { atom, selector } from 'recoil';
import { z } from 'zod';
import { Board } from '../zods/boards';
import { Hotend, Thermistor, Extruder, Probe, Endstop } from '../zods/hardware';

interface PrinterConfiguration {
	hotend: z.infer<typeof Hotend>;
	thermistor: z.infer<typeof Thermistor>;
	extruder: z.infer<typeof Extruder>;
	probe: z.infer<typeof Probe>;
	xEndstop: z.infer<typeof Endstop>;
	yEndstop: z.infer<typeof Endstop>;
	controlboard: z.infer<typeof Board>;
	toolboard: Board | null;
}

export const HotendState = atom<z.infer<typeof Hotend> | null>({
	key: 'Hotend',
	default: null,
});

export const ThermistorState = atom<z.infer<typeof Thermistor> | null>({
	key: 'Thermistor',
	default: null,
});

export const ExtruderState = atom<z.infer<typeof Extruder> | null>({
	key: 'Extruder',
	default: null,
});

export const ProbeState = atom<z.infer<typeof Probe> | null>({
	key: 'Probe',
	default: null,
});

export const XEndstopState = atom<z.infer<typeof Endstop> | null>({
	key: 'XEndstop',
	default: null,
});

export const YEndstopState = atom<z.infer<typeof Endstop> | null>({
	key: 'YEndstop',
	default: null,
});

export const ControlboardState = atom<Board | null>({
	key: 'Board',
	default: null,
});

export const ToolboardState = atom<Board | null>({
	key: 'Toolboard',
	default: null,
});

export const PrinterConfigurationState = selector<PrinterConfiguration | null>({
	key: 'PrinterConfiguration',
	get: ({ get }) => {
		const hotend = get(HotendState);
		const thermistor = get(ThermistorState);
		const extruder = get(ExtruderState);
		const probe = get(ProbeState);
		const xEndstop = get(XEndstopState);
		const yEndstop = get(YEndstopState);
		const controlboard = get(ControlboardState);
		const toolboard = get(ToolboardState);

		if (
			hotend == null ||
			thermistor == null ||
			extruder == null ||
			probe == null ||
			xEndstop == null ||
			yEndstop == null ||
			controlboard == null
		) {
			return null;
		}

		return {
			hotend,
			thermistor,
			extruder,
			probe,
			xEndstop,
			yEndstop,
			controlboard,
			toolboard,
		};
	},
});
