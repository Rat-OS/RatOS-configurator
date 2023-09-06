import { atom, selector, useRecoilValue } from 'recoil';
import { set, z } from 'zod';
import { Board, Toolboard } from '../zods/boards';
import type { Hotend, Thermistor, Extruder, Probe, Endstop } from '../zods/hardware';
import { Printer } from '../zods/printer';
import { PrinterConfiguration } from '../zods/printer-configuration';
import { useRecoilState } from 'recoil';
import { trpc } from '../helpers/trpc';

export const PrinterState = atom<z.infer<typeof Printer> | null>({
	key: 'Printer',
	default: null,
});

export const PrinterSizeState = atom<Unpacked<z.infer<typeof Printer>['sizes']>>({
	key: 'PrinterOption',
	default: undefined,
});

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

export const ToolboardState = atom<Toolboard | null>({
	key: 'Toolboard',
	default: null,
});

export const PrinterConfigurationState = selector<z.infer<typeof PrinterConfiguration> | null>({
	key: 'PrinterConfiguration',
	get: ({ get }) => {
		const printer = get(PrinterState);
		const printerSize = get(PrinterSizeState);
		const hotend = get(HotendState);
		const thermistor = get(ThermistorState);
		const extruder = get(ExtruderState);
		const probe = get(ProbeState);
		const xEndstop = get(XEndstopState);
		const yEndstop = get(YEndstopState);
		const controlboard = get(ControlboardState);
		const toolboard = get(ToolboardState);

		const printerConfig = PrinterConfiguration.safeParse({
			printer,
			hotend,
			thermistor,
			extruder,
			probe,
			xEndstop,
			yEndstop,
			controlboard,
			toolboard,
			size: printerSize,
		});
		return printerConfig.success ? printerConfig.data : null;
	},
});

export const usePrinterConfiguration = () => {
	const [selectedPrinter, setSelectedPrinter] = useRecoilState(PrinterState);
	const [selectedPrinterOption, setSelectedPrinterOption] = useRecoilState(PrinterSizeState);
	const [selectedHotend, setSelectedHotend] = useRecoilState(HotendState);
	const [selectedExtruder, setSelectedExtruder] = useRecoilState(ExtruderState);
	const [selectedThermistor, setSelectedThermistor] = useRecoilState(ThermistorState);
	const [selectedProbe, setSelectedProbe] = useRecoilState(ProbeState);
	const [selectedXEndstop, setSelectedXEndstop] = useRecoilState(XEndstopState);
	const [selectedYEndstop, setSelectedYEndstop] = useRecoilState(YEndstopState);
	const [selectedBoard, setSelectedBoard] = useRecoilState(ControlboardState);
	const [selectedToolboard, setSelectedToolboard] = useRecoilState(ToolboardState);
	const printerConfiguration = useRecoilValue(PrinterConfigurationState);

	const hotends = trpc.useQuery(['printer.hotends']);
	const boards = trpc.useQuery(['mcu.boards']);
	const extruders = trpc.useQuery(['printer.extruders']);
	const thermistors = trpc.useQuery(['printer.thermistors']);
	const probes = trpc.useQuery(['printer.probes']);
	const xEndstops = trpc.useQuery(['printer.x-endstops']);
	const yEndstops = trpc.useQuery(['printer.y-endstops']);

	const setPrinterDefaults = (printer: z.infer<typeof Printer>) => {
		const board = boards.data?.find((board) => board.serialPath === '/dev/' + printer.defaults?.board);
		const toolboard = boards.data?.find((board) => board.serialPath === '/dev/' + printer.defaults?.board);
		const hotend = hotends.data?.find((h) => h.id === printer.defaults.hotend + '.cfg');
		const extruder = extruders.data?.find((e) => e.id === printer.defaults.extruder + '.cfg');
		const thermistor = thermistors.data?.find((t) => t === hotend?.thermistor);
		const probe = probes.data?.find((p) => p.id === printer.defaults.probe + '.cfg');
		const xEndstop = xEndstops.data?.find((e) => e.id === printer.defaults.xEndstop);
		const yEndstop = yEndstops.data?.find((e) => e.id === printer.defaults.yEndstop);

		if (board) {
			setSelectedBoard(board);
		}

		if (toolboard) {
			const _toolboard = Toolboard.safeParse(toolboard);
			if (_toolboard.success) {
				setSelectedToolboard(_toolboard.data);
			}
		}

		if (hotend) {
			setSelectedHotend(hotend);
		}

		if (extruder) {
			setSelectedExtruder(extruder);
		}

		if (thermistor) {
			setSelectedThermistor(thermistor);
		}

		if (probe) {
			setSelectedProbe(probe);
		}

		if (xEndstop) {
			setSelectedXEndstop(xEndstop);
		}

		if (yEndstop) {
			setSelectedYEndstop(yEndstop);
		}
	};

	const parsedPrinterConfiguration = PrinterConfiguration.safeParse({
		controlboard: selectedBoard,
		toolboard: selectedToolboard,
		printer: selectedPrinter,
		hotend: selectedHotend,
		extruder: selectedExtruder,
		thermistor: selectedThermistor,
		probe: selectedProbe,
		xEndstop: selectedXEndstop,
		yEndstop: selectedYEndstop,
		size: selectedPrinterOption,
	});

	const queryErrors: string[] = [];
	if (hotends.error) {
		queryErrors.push(hotends.error.message);
	}
	if (extruders.error) {
		queryErrors.push(extruders.error.message);
	}
	if (thermistors.error) {
		queryErrors.push(thermistors.error.message);
	}
	if (probes.error) {
		queryErrors.push(probes.error.message);
	}
	if (xEndstops.error) {
		queryErrors.push(xEndstops.error.message);
	}
	if (yEndstops.error) {
		queryErrors.push(yEndstops.error.message);
	}
	if (boards.error) {
		queryErrors.push(boards.error.message);
	}

	return {
		queryErrors,
		selectedPrinter,
		setSelectedPrinter,
		selectedPrinterOption,
		setSelectedPrinterOption,
		selectedHotend,
		setSelectedHotend,
		selectedExtruder,
		setSelectedExtruder,
		selectedThermistor,
		setSelectedThermistor,
		selectedProbe,
		setSelectedProbe,
		selectedXEndstop,
		setSelectedXEndstop,
		selectedYEndstop,
		setSelectedYEndstop,
		hotends,
		extruders,
		thermistors,
		probes,
		xEndstops,
		yEndstops,
		setPrinterDefaults,
		printerConfiguration,
		parsedPrinterConfiguration,
		isReady:
			hotends.data != null &&
			hotends.data != null &&
			extruders.data != null &&
			thermistors.data != null &&
			probes.data != null &&
			xEndstops.data != null &&
			yEndstops.data != null &&
			boards.data != null,
	};
};
