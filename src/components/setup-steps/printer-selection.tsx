import React from 'react';
import Image from 'next/image';
import { CardSelector, SelectableCard } from '../card-selector';
import { StepScreenProps } from '../../pages';
import { StepNavButtons } from '../step-nav-buttons';
import getConfig from 'next/config';

const basePath = getConfig().publicRuntimeConfig.basePath;

const printers: SelectableCard[] = [
	{
		name: 'RatRig V-Core 3 300mm',
		details: 'Build Volume: 300mm x 300mm x 300mm',
		right: <Image src={basePath + '/img/rat-rig-v-core-3.png'} width={50} height={50} alt='Rat Rig V-Core 3' />,
	},
	{
		name: 'RatRig V-Core 3 400mm',
		details: 'Build Volume: 400mm x 400mm x 400mm',
		right: <Image src={basePath + '/img/rat-rig-v-core-3.png'} width={50} height={50} alt='Rat Rig V-Core 3' />,
	},
	{
		name: 'RatRig V-Core 3 500mm',
		details: 'Build Volume: 500mm x 500mm x 500mm',
		right: <Image src={basePath + '/img/rat-rig-v-core-3.png'} width={50} height={50} alt='Rat Rig V-Core 3' />,
	},
	{
		name: 'RatRig V-Core Pro 1.3 300mm',
		details: 'Build Volume: 500mm x 500mm x 500mm',
		right: (
			<Image src={basePath + '/img/rat-rig-v-core-pro-13.jpg'} width={50} height={50} alt='Rat Rig V-Core Pro 1.3' />
		),
	},
	{
		name: 'RatRig V-Core Pro 1.3 400mm',
		details: 'Build Volume: 500mm x 500mm x 500mm',
		right: (
			<Image src={basePath + '/img/rat-rig-v-core-pro-13.jpg'} width={50} height={50} alt='Rat Rig V-Core Pro 1.3' />
		),
	},
	{
		name: 'RatRig V-Core Pro 1.3 500mm',
		details: 'Build Volume: 500mm x 500mm x 500mm',
		right: (
			<Image src={basePath + '/img/rat-rig-v-core-pro-13.jpg'} width={50} height={50} alt='Rat Rig V-Core Pro 1.3' />
		),
	},
	{
		name: 'RatRig V-Minion',
		details: 'Build Volume: 180mm x 180mm x 180mm',
		right: <Image src={basePath + '/img/rat-rig-v-minion.jpeg'} width={50} height={50} alt='Rat Rig V-Minion' />,
	},
];

export const PrinterSelection: React.FC<StepScreenProps> = (props) => {
	return (
		<div className='p-8'>
			{' '}
			<div className='pb-5 mb-5 border-b border-gray-200'>
				<h3 className='text-lg leading-6 font-medium text-gray-900'>Select your printer</h3>
				<p className='mt-2 max-w-4xl text-sm text-gray-500'>
					Not seeing your particular configuration in the list? Don't worry, you'll be able to customize your config
					later!
				</p>
			</div>
			<CardSelector cards={printers} />
			<StepNavButtons left={{ onClick: props.previousScreen }} right={{ onClick: props.nextScreen }} />
		</div>
	);
};
