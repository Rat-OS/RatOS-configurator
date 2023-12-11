'use client';
import React from 'react';
import Image from 'next/image';
import { StepNavButtons } from '../step-nav-buttons';
import { StepScreenProps } from '../../hooks/useSteps';
import {
	CardSelectorWithOptions,
	SelectableCardWithOptions,
	SelectableOption,
	SelectedCard,
} from '../card-selector-with-options';
import { trpc } from '../../helpers/trpc';
import { usePrinterConfiguration } from '../../hooks/usePrinterConfiguration';
import { ShowWhenReady } from '../common/show-when-ready';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const PrinterSelection: React.FC<StepScreenProps> = (props) => {
	const printerQuery = trpc.printer.printers.useQuery();
	const {
		setPrinterDefaults,
		setSelectedPrinter,
		setSelectedPrinterOption,
		selectedPrinter,
		selectedPrinterOption,
		isReady,
		queryErrors,
	} = usePrinterConfiguration();
	const cards = printerQuery.data
		? (printerQuery.data
				.slice()
				.sort((a, b) =>
					a.manufacturer === 'Rat Rig' && (b.manufacturer !== 'Rat Rig' || b.description.indexOf('Discontinued') > -1)
						? -1
						: a.name.localeCompare(b.name),
				)
				.map((p) => {
					const printerImgUri = 'printerId=' + encodeURIComponent(p.id);
					return {
						id: p.id,
						name: `${p.manufacturer} ${p.name}`,
						details: p.description,
						right: (
							<Image
								src={'/configure/api/printer-image?' + printerImgUri}
								width={50}
								className="rounded-lg bg-white p-1 shadow-md dark:shadow-zinc-900"
								height={50}
								alt={`${p.manufacturer} ${p.name}`}
							/>
						),
						options: p.sizes ? p.sizes.map((s) => ({ id: s, name: s + '' })) : undefined,
					};
				}) satisfies SelectableCardWithOptions[])
		: [];

	const selectedCard = cards.find((c) => c.id === selectedPrinter?.id);
	const selectedPrinterOptionFromCard = selectedCard?.options?.find((o) => o.id === selectedPrinterOption);

	const onSelectPrinter = (card: SelectedCard<Unpacked<typeof cards>>, option: SelectableOption | null) => {
		const printer = printerQuery.data?.find((p) => p.id === card.id);
		if (printer == null) {
			console.error('No printer found matching the criteria');
			return;
		}
		setSelectedPrinter(printer);
		if ((printer.sizes?.length ?? 0) > 0) {
			if (option == null || typeof option.id !== 'number') {
				throw new Error('An option must be selected for printers that come in different size configurations');
			}
			setSelectedPrinterOption(option.id);
		} else {
			setSelectedPrinterOption(null);
		}
		setPrinterDefaults(printer);
	};

	const [parent] = useAutoAnimate();

	const errors = printerQuery.error ? [printerQuery.error?.message].concat(queryErrors) : queryErrors;

	return (
		<>
			<div className="p-8" ref={parent}>
				{' '}
				<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">Select your printer</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">
						This will determine the template used for printer.cfg
					</p>
				</div>
				<ShowWhenReady isReady={isReady} queryErrors={errors}>
					<CardSelectorWithOptions
						cards={cards}
						onSelect={onSelectPrinter}
						value={selectedCard}
						optionValue={selectedPrinterOptionFromCard}
					/>
				</ShowWhenReady>
			</div>
			<StepNavButtons
				left={{ onClick: props.previousScreen }}
				right={{
					onClick: props.nextScreen,
					disabled: selectedPrinter == null,
					title: selectedPrinter == null ? 'You have to select a printer' : undefined,
				}}
			/>
		</>
	);
};
