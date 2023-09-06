import React, { useCallback, useState } from 'react';
import { StepNavButtons } from '../step-nav-buttons';
import { StepScreenProps } from '../../hooks/useSteps';
import { Dropdown } from '../forms/dropdown';
import { z } from 'zod';
import { usePrinterConfiguration } from '../../hooks/usePrinterConfiguration';
import { Hotend, Thermistor } from '../../zods/hardware';
import { ShowWhenReady } from '../common/show-when-ready';

const stringToTitleObject = <Item extends string>(data: Item): { id: Item; title: Item } => {
	return { id: data, title: data };
};

export const HardwareSelection: React.FC<StepScreenProps> = (props) => {
	const [hasManuallySelectedThermistor, setHasManuallySelectedThermistor] = useState(false);
	const {
		isReady,
		queryErrors,
		hotends,
		extruders,
		probes,
		xEndstops,
		yEndstops,
		thermistors,
		selectedHotend,
		setSelectedHotend,
		selectedExtruder,
		setSelectedExtruder,
		selectedProbe,
		setSelectedProbe,
		selectedXEndstop,
		setSelectedXEndstop,
		selectedYEndstop,
		setSelectedYEndstop,
		selectedThermistor,
		setSelectedThermistor,
		parsedPrinterConfiguration,
	} = usePrinterConfiguration();

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

	if (parsedPrinterConfiguration.success === false) {
		console.error(parsedPrinterConfiguration.error);
	}

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
				<ShowWhenReady isReady={isReady} queryErrors={queryErrors}>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Dropdown label="Hotend" options={hotends.data ?? []} onSelect={onSelectHotend} value={selectedHotend} />
						</div>
						<div>
							<Dropdown
								label="Hotend Thermistor"
								options={thermistors.data?.map(stringToTitleObject) ?? []}
								onSelect={onSelectThermistor}
								value={selectedThermistor ? stringToTitleObject(selectedThermistor) : null}
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
				</ShowWhenReady>
			</div>
			<StepNavButtons
				left={{ onClick: props.previousScreen }}
				right={{
					onClick: props.nextScreen,
					disabled: !parsedPrinterConfiguration.success,
					title: parsedPrinterConfiguration.success === false ? 'Invalid printer configuration selected' : undefined,
				}}
			/>
		</>
	);
};
