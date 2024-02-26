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
import { ShowWhenReady } from '../common/show-when-ready';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { PrinterSizeState, PrinterState, LoadablePrinterState, PrinterRailsState } from '../../recoil/printer';
import { PrinterDefinitionWithResolvedToolheads } from '../../zods/printer';
import { PrinterToolheadState, PrinterToolheadsState } from '../../recoil/toolhead';
import { ToolheadHelper } from '../../helpers/toolhead';
import {
	ControllerFanState,
	PerformanceModeState,
	StandstillStealthState,
	StealthchopState,
} from '../../hooks/usePrinterConfiguration';

interface SelectablePrinter<Option extends SelectableOption = SelectableOption>
	extends SelectableCardWithOptions<Option> {
	printer: PrinterDefinitionWithResolvedToolheads;
}

export const PrinterSelection: React.FC<StepScreenProps> = (props) => {
	const printerQuery = trpc.printer.printers.useQuery();
	const selectedPrinter = useRecoilValue(LoadablePrinterState);
	const selectedPrinterOption = useRecoilValue(PrinterSizeState);

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
						printer: p,
						right: (
							<Image
								src={'/configure/api/printer-image?' + printerImgUri}
								width={50}
								className="rounded-lg bg-white p-1 shadow-md dark:shadow-zinc-900"
								height={50}
								alt={`${p.manufacturer} ${p.name}`}
							/>
						),
						options:
							Object.values(p.sizes).length > 1
								? Object.entries(p.sizes).map(([key, volume]) => ({ id: key, name: key + '' }))
								: undefined,
					};
				}) satisfies SelectablePrinter[])
		: [];

	const selectedCard = cards.find((c) => c.id === selectedPrinter?.id);
	const selectedPrinterOptionFromCard = selectedCard?.options?.find((o) => o.id === selectedPrinterOption);

	const onSelectPrinter = useRecoilCallback(
		({ set, reset, snapshot }) =>
			async (card: SelectedCard<Unpacked<typeof cards>>, option: SelectableOption | null) => {
				const printer = card.printer;
				if (printer == null) {
					console.error('No printer found matching the criteria');
					return;
				}
				const oldToolheads = await snapshot.getPromise(PrinterToolheadsState);
				oldToolheads.forEach((th) => {
					reset(PrinterToolheadState(th.toolNumber));
				});
				set(PrinterState, printer);
				if (Object.values(printer.sizes).length > 1) {
					if (option == null || typeof option.id !== 'string') {
						throw new Error('An option must be selected for printers that come in different size configurations');
					}
					set(PrinterSizeState, printer.sizes[option.id]);
				} else {
					set(PrinterSizeState, printer.sizes[Object.keys(printer.sizes)[0]]);
				}
				set(
					PrinterToolheadsState,
					printer.defaults.toolheads.map((th) => ({ ...th, toolNumber: new ToolheadHelper(th).getTool() })),
				);
				reset(PerformanceModeState);
				reset(StealthchopState);
				reset(StandstillStealthState);
				reset(ControllerFanState);
				reset(PrinterRailsState);
				if (printer.defaults.controllerFan) {
					set(ControllerFanState, { id: printer.defaults.controllerFan, title: printer.defaults.controllerFan });
				} else {
					reset(ControllerFanState);
				}
			},
		[printerQuery.data],
	);

	const [parent] = useAutoAnimate();

	const errors = printerQuery.error ? [printerQuery.error?.message] : [];

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
				<ShowWhenReady isReady={printerQuery.isFetched} queryErrors={errors}>
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
