import React from 'react';
import Image from 'next/image';
import { StepNavButtons } from '../step-nav-buttons';
import getConfig from 'next/config';
import { StepScreenProps } from '../../hooks/useSteps';
import { CardSelectorWithOptions, SelectableCard } from '../card-selector-with-options';

const basePath = getConfig().publicRuntimeConfig.basePath;

const printers: SelectableCard[] = [
	{
		id: 'rat-rig-v-core-3',
		name: 'RatRig V-Core 3',
		details: "Rat Rig's current flagship CoreXY printer which comes in 4 sizes",
		right: (
			<Image
				src={basePath + '/img/rat-rig-v-core-3.png'}
				width={50}
				className="bg-white rounded-lg shadow-md dark:shadow-zinc-900 p-1"
				height={50}
				alt="Rat Rig V-Core 3"
			/>
		),
		options: [
			{ name: '200mm', id: '200' },
			{ name: '300mm', id: '300' },
			{ name: '400mm', id: '400' },
			{ name: '500mm', id: '500' },
		],
	},
	{
		id: 'rat-rig-v-minion',
		name: 'RatRig V-Minion',
		details: `A small 180x180x180mm bed slinger from Rat Rig`,
		right: (
			<Image
				src={basePath + '/img/rat-rig-v-minion.jpeg'}
				width={50}
				className="bg-white rounded-lg shadow-md dark:shadow-zinc-900 p-1"
				height={50}
				alt="Rat Rig V-Minion"
			/>
		),
	},
	{
		id: 'rat-rig-v-core-pro',
		name: 'RatRig V-Core Pro 1.3',
		details: 'Discontinued CoreXY printer from Rat Rig which comes in 4 sizes',
		right: (
			<Image
				src={basePath + '/img/rat-rig-v-core-pro-13.jpg'}
				width={50}
				className="bg-white rounded-lg shadow-md dark:shadow-zinc-900 p-1"
				height={50}
				alt="Rat Rig V-Core Pro 1.3"
			/>
		),
		options: [
			{ name: '300mm', id: '300' },
			{ name: '400mm', id: '400' },
			{ name: '500mm', id: '500' },
		],
	},
	{
		id: 'voron-v24',
		name: 'Voron V2.4',
		details: 'CoreXY printer with floating gantry from Voron Design, which comes in 3 sizes',
		right: (
			<Image
				src={basePath + '/img/voron-v24.png'}
				width={50}
				height={50}
				className="bg-white rounded-lg shadow-md dark:shadow-zinc-900 p-1"
				alt="Rat Rig V-Minion"
			/>
		),
		options: [
			{ name: '250mm', id: '250' },
			{ name: '300mm', id: '300' },
			{ name: '350mm', id: '350' },
		],
	},
	{
		id: 'voron-v01',
		name: 'Voron V0.1',
		details: 'Mini CoreXY printer from Voron Design',
		right: (
			<Image
				src={basePath + '/img/voron-v0.png'}
				className="bg-white rounded-lg shadow-md dark:shadow-zinc-900 p-1"
				width={50}
				height={50}
				alt="Rat Rig V-Minion"
			/>
		),
	},
	{
		id: 'prusa-mk3s',
		name: 'Prusa MK3s',
		details: 'The classic Prusa i3 MK3s from Prusa Research',
		right: (
			<Image
				src={basePath + '/img/prusa-mk3s.webp'}
				width={50}
				className="bg-white rounded-lg shadow-md dark:shadow-zinc-900 p-1"
				height={50}
				alt="Rat Rig V-Minion"
			/>
		),
	},
	{
		id: 'prusa-mini',
		name: 'Prusa Mini',
		details: 'Mini bed slinger from Prusa Research',
		right: (
			<Image
				src={basePath + '/img/prusa-mini.webp'}
				width={50}
				className="bg-white rounded-lg shadow-md dark:shadow-zinc-900 p-1"
				height={50}
				alt="Rat Rig V-Minion"
			/>
		),
	},
];

export const PrinterSelection: React.FC<StepScreenProps> = (props) => {
	return (
		<>
			<div className="p-8">
				{' '}
				<div className="mb-5 border-b border-zinc-200 dark:border-zinc-700 pb-5">
					<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">Select your printer</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">
						This will determine the template used for printer.cfg
					</p>
				</div>
				<CardSelectorWithOptions cards={printers} />
			</div>
			<StepNavButtons left={{ onClick: props.previousScreen }} right={{ onClick: props.nextScreen }} />
		</>
	);
};
