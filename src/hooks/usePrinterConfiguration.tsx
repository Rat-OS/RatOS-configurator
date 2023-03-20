import { useSetRecoilState, useRecoilState, atom } from 'recoil';
import { z } from 'zod';
import { SelectableCard, SelectedCard } from '../components/card-selector-with-options';
import { Endstop, Extruder, Hotend, Probe, Thermistor } from '../server/router/printer';
import { MoonrakerStatus } from './useMoonraker';

interface PrinterConfiguration extends SelectedCard<SelectableCard> {
	hotend: z.infer<typeof Hotend>;
	thermistor: z.infer<typeof Thermistor>;
	extruder: z.infer<typeof Extruder>;
	probe: z.infer<typeof Probe>;
	xEndstop: z.infer<typeof Endstop>;
	yEndstop: z.infer<typeof Endstop>;
}

export const PrinterConfigurationState = atom<PrinterConfiguration | null>({
	key: 'PrinterConfiguration',
	default: null,
});

const usePrinterConfiguration = () => {};
