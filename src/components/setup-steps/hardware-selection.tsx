import React, { useMemo } from 'react';
import { StepNavButtons } from '../step-nav-buttons';
import { StepScreenProps } from '../../hooks/useSteps';
import { Dropdown } from '../forms/dropdown';
import { trpc } from '../../helpers/trpc';

export const HardwareSelection: React.FC<StepScreenProps> = (props) => {
	const hotends = trpc.useQuery(['printer.hotends']);
	const extruders = trpc.useQuery(['printer.extruders']);
	const thermistors = trpc.useQuery(['printer.thermistors']);
	const probes = trpc.useQuery(['printer.probes']);
	const xEndstops = trpc.useQuery(['printer.x-endstops']);
	const yEndstops = trpc.useQuery(['printer.y-endstops']);

	const hotendData = useMemo(() => {
		return hotends.data?.map((h) => ({ id: h.id, name: h.title })) ?? [];
	}, [hotends.data]);
	const thermistorData = useMemo(() => {
		return thermistors.data?.map((h) => ({ id: h, name: h })) ?? [];
	}, [hotends.data]);
	const extruderData = useMemo(() => {
		return extruders.data?.map((h) => ({ id: h.id, name: h.title })) ?? [];
	}, [hotends.data]);
	const probeData = useMemo(() => {
		return probes.data?.map((e) => ({ id: e.id, name: e.title })) ?? [];
	}, [hotends.data]);

	return (
		<>
			<div className="p-8">
				{' '}
				<div className="mb-5 border-b border-gray-200 pb-5">
					<h3 className="text-lg font-medium leading-6 text-gray-900">Select your printer hardware</h3>
					<p className="mt-2 max-w-4xl text-sm text-gray-500">
						If your hardware isn't listed, pick the one closest to it and modify it in printer.cfg later
					</p>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<Dropdown label="Hotend" options={hotendData} />
					</div>
					<div>
						<Dropdown label="Hotend Thermistor" options={thermistorData} />
					</div>
					<div className="col-span-2">
						<Dropdown label="Extruder" options={extruderData} />
					</div>
					<div className="col-span-2">
						<Dropdown label="Probe" options={probeData} />
					</div>
					<div>
						<Dropdown label="X Endstop" options={xEndstops.data ?? []} />
					</div>
					<div>
						<Dropdown label="Y Endstop" options={yEndstops.data ?? []} />
					</div>
				</div>
			</div>
			<StepNavButtons left={{ onClick: props.previousScreen }} right={{ onClick: props.nextScreen }} />
		</>
	);
};
