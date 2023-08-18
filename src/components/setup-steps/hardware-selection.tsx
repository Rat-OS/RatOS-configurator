import React, { useCallback, useState } from 'react';
import { StepNavButtons } from '../step-nav-buttons';
import { StepScreenProps } from '../../hooks/useSteps';
import { Dropdown } from '../forms/dropdown';
import { trpc } from '../../helpers/trpc';
import { z } from 'zod';
import { useRecoilState } from 'recoil';
import {
	ExtruderState,
	HotendState,
	ProbeState,
	ThermistorState,
	XEndstopState,
	YEndstopState,
} from '../../hooks/usePrinterConfiguration';
import { Hotend, Thermistor } from '../../zods/hardware';

const stringToTitleObject = <Item extends string>(data: Item | null): { id: Item; title: Item } | null => {
	if (data == null) {
		return null;
	}
	return { id: data, title: data };
};

export const HardwareSelection: React.FC<StepScreenProps> = (props) => {
	const [hasManuallySelectedThermistor, setHasManuallySelectedThermistor] = useState(false);
	const [selectedHotend, setSelectedHotend] = useRecoilState(HotendState);
	const [selectedExtruder, setSelectedExtruder] = useRecoilState(ExtruderState);
	const [selectedThermistor, setSelectedThermistor] = useRecoilState(ThermistorState);
	const [selectedProbe, setSelectedProbe] = useRecoilState(ProbeState);
	const [selectedXEndstop, setSelectedXEndstop] = useRecoilState(XEndstopState);
	const [selectedYEndstop, setSelectedYEndstop] = useRecoilState(YEndstopState);

	const hotends = trpc.useQuery(['printer.hotends']);
	const extruders = trpc.useQuery(['printer.extruders']);
	const thermistors = trpc.useQuery(['printer.thermistors'], {
		select(data) {
			return data?.map((t) => ({ id: t, title: t })) ?? [];
		},
	});
	const probes = trpc.useQuery(['printer.probes']);
	const xEndstops = trpc.useQuery(['printer.x-endstops']);
	const yEndstops = trpc.useQuery(['printer.y-endstops']);

	const onSelectHotend = useCallback(
		(hotend: z.infer<typeof Hotend>) => {
			setSelectedHotend(hotend);
			if (!hasManuallySelectedThermistor) {
				setSelectedThermistor(hotend.thermistor);
			}
		},
		[hasManuallySelectedThermistor],
	);

	const onSelectThermistor = (thermistor: { id: z.infer<typeof Thermistor> }) => {
		setSelectedThermistor(thermistor.id);
		setHasManuallySelectedThermistor(true);
	};

	return (
		<>
			<div className="p-8">
				{' '}
				<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">
						Select your printer hardware
					</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">
						If your hardware isn't listed, pick the one closest to it and modify it in printer.cfg later
					</p>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<Dropdown label="Hotend" options={hotends.data ?? []} onSelect={onSelectHotend} value={selectedHotend} />
					</div>
					<div>
						<Dropdown
							label="Hotend Thermistor"
							options={thermistors.data ?? []}
							onSelect={onSelectThermistor}
							value={stringToTitleObject(selectedThermistor)}
						/>
					</div>
					<div className="col-span-2">
						<Dropdown
							label="Extruder"
							options={extruders.data ?? []}
							onSelect={setSelectedExtruder}
							value={selectedExtruder}
						/>
					</div>
					<div className="col-span-2">
						<Dropdown label="Probe" options={probes.data ?? []} onSelect={setSelectedProbe} value={selectedProbe} />
					</div>
					<div>
						<Dropdown
							label="X Endstop"
							options={xEndstops.data ?? []}
							onSelect={setSelectedXEndstop}
							value={selectedXEndstop}
						/>
					</div>
					<div>
						<Dropdown
							label="Y Endstop"
							options={yEndstops.data ?? []}
							onSelect={setSelectedYEndstop}
							value={selectedYEndstop}
						/>
					</div>
				</div>
			</div>
			<StepNavButtons
				left={{ onClick: props.previousScreen }}
				right={{
					onClick: props.nextScreen,
					disabled:
						selectedHotend == null ||
						selectedThermistor == null ||
						selectedExtruder == null ||
						selectedProbe == null ||
						selectedXEndstop == null ||
						selectedYEndstop == null,
				}}
			/>
		</>
	);
};
