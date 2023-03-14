import React from 'react';
import { StepNavButtons } from '../step-nav-buttons';
import { StepScreenProps } from '../../hooks/useSteps';
import { CardSelectorWithOptions, SelectableCard } from '../card-selector-with-options';
import { Dropdown } from '../forms/dropdown';

const hotends = [
	{ name: 'E3D V6', id: 'v6.cfg' },
	{ name: 'E3D Revo', id: 'revo.cfg' },
	{ name: 'Phaetus Dragonfly', id: 'dragonfly.cfg' },
	{ name: 'Phaetus Dragon SF', id: 'dragon-standard-flow.cfg' },
	{ name: 'Phaetus Dragon HF', id: 'dragon-high-flow.cfg' },
	{ name: 'Phaetus Rapido', id: 'rapido.cfg' },
	{ name: 'Slice Engineering Mosquito', id: 'mosquito.cfg' },
	{ name: 'Slice Engineering Mosquito Magnum', id: 'mosquito-magnum.cfg' },
	{ name: 'Slice Engineering Copperhead', id: 'copperhead.cfg' },
];

export const PrinterSelection: React.FC<StepScreenProps> = (props) => {
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
				<div>
					<Dropdown label="Hotend" options={hotends} />
					<Dropdown label="Extruder" options={[]} />
					<Dropdown label="Thermistor" options={[]} />
					<Dropdown label="Probe" options={[]} />
					<Dropdown label="X Endstop" options={[]} />
					<Dropdown label="Y Endstop" options={[]} />
				</div>
			</div>
			<StepNavButtons left={{ onClick: props.previousScreen }} right={{ onClick: props.nextScreen }} />
		</>
	);
};
