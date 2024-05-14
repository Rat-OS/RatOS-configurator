'use client';
import React from 'react';
import Image from 'next/image';
import { StepNavButtons } from '@/components/step-nav-buttons';
import { StepScreenProps } from '@/hooks/useSteps';
import {
	CardSelectorWithOptions,
	SelectableCardWithOptions,
	SelectableOption,
	SelectedCard,
} from '@/components/card-selector-with-options';
import { trpc } from '@/helpers/trpc';
import { ShowWhenReady } from '@/components/common/show-when-ready';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import {
	PrinterSizeState,
	PrinterState,
	LoadablePrinterState,
	PrinterRailsState,
	ControlboardState,
} from '@/recoil/printer';
import { PrinterDefinitionWithResolvedToolheads } from '@/zods/printer';
import { PrinterToolheadState, PrinterToolheadsState } from '@/recoil/toolhead';
import { ToolheadHelper } from '@/helpers/toolhead';
import {
	ControllerFanState,
	PerformanceModeState,
	StandstillStealthState,
	StealthchopState,
} from '@/hooks/usePrinterConfiguration';
import { AnimatedContainer } from '@/components/common/animated-container';

interface SelectablePrinter<Option extends SelectableOption = SelectableOption>
	extends SelectableCardWithOptions<Option> {
	printer: PrinterDefinitionWithResolvedToolheads;
}

export const PrinterSelection: React.FC<StepScreenProps> = (props) => {
	const printerQuery = trpc.printer.printers.useQuery();
	const boardQuery = trpc.mcu.boards.useQuery({});
	const selectedPrinter = useRecoilValue(LoadablePrinterState);
	const selectedPrinterOption = useRecoilValue(PrinterSizeState);

	const cards = printerQuery.data
		? (printerQuery.data
				.slice()
				.filter((p) => p.manufacturer === 'Rat Rig')
				.sort((a, b) => a.releaseDate?.localeCompare(b.name) ?? a.name.localeCompare(b.name))
				.map((p) => {
					const printerImgUri = 'printerId=' + encodeURIComponent(p.id);
					return {
						id: p.id,
						name: `${p.manufacturer} ${p.name}`,
						details: p.description,
						printer: p,
						right: (
							<div className="relative">
								<Image
									src={'/configure/api/printer-image?' + printerImgUri}
									className="aspect-auto rounded-lg object-contain object-right"
									width={100}
									height={100}
									alt={`${p.manufacturer} ${p.name}`}
								/>
							</div>
						),
						options:
							Object.values(p.sizes).length > 1
								? Object.entries(p.sizes).map(([key, volume]) => ({ id: key, name: key + '', volume }))
								: undefined,
					};
				}) satisfies SelectablePrinter[])
		: [];

	const unofficialPrinters = printerQuery.data
		? (printerQuery.data
				.slice()
				.filter((p) => p.manufacturer !== 'Rat Rig')
				.sort((a, b) => (a.manufacturer + a.name).localeCompare(b.manufacturer + b.name))
				.map((p) => {
					const printerImgUri = 'printerId=' + encodeURIComponent(p.id);
					return {
						id: p.id,
						name: `${p.manufacturer} ${p.name}`,
						details: p.description,
						printer: p,
						right: (
							<div className="relative">
								<Image
									src={'/configure/api/printer-image?' + printerImgUri}
									className="aspect-auto rounded-lg object-contain object-right"
									width={100}
									height={100}
									alt={`${p.manufacturer} ${p.name}`}
								/>
							</div>
						),
						options:
							Object.values(p.sizes).length > 1
								? Object.entries(p.sizes).map(([key, volume]) => ({ id: key, name: key + '', volume }))
								: undefined,
					};
				}) satisfies SelectablePrinter[])
		: [];

	const selectedCard =
		cards.find((c) => c.id === selectedPrinter?.id) ?? unofficialPrinters.find((c) => c.id === selectedPrinter?.id);
	const selectedPrinterOptionFromCard = selectedCard?.options?.find((o) => {
		if (typeof selectedPrinterOption !== 'string' && typeof selectedPrinterOption !== 'number') {
			return (
				selectedPrinterOption?.x === o.volume.x &&
				selectedPrinterOption?.y === o.volume.y &&
				selectedPrinterOption?.z === o.volume.z
			);
		}
		return o.id === selectedPrinterOption;
	});

	const onSelectPrinter = useRecoilCallback(
		({ set, reset, snapshot }) =>
			async (card: SelectedCard<Unpacked<typeof cards>>, option: SelectableOption | null) => {
				const printer = card.printer;
				if (printer == null) {
					console.error('No printer found matching the criteria');
					return;
				}
				const oldToolheads = await snapshot.getPromise(PrinterToolheadsState);
				const oldControllerBoard = await snapshot.getPromise(ControlboardState);
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
				const defaultBoard = boardQuery.data?.find((b) => b.id === printer.defaults.board);
				if (oldControllerBoard == null && defaultBoard != null) {
					set(ControlboardState, defaultBoard);
				}
				if (printer.defaults.controllerFan) {
					set(ControllerFanState, { id: printer.defaults.controllerFan, title: printer.defaults.controllerFan });
				} else {
					reset(ControllerFanState);
				}
			},
		[printerQuery.data],
	);

	const errors = printerQuery.error ? [printerQuery.error?.message] : [];

	return (
		<>
			<div className="p-8">
				<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">Select your printer</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">
						This will determine the template used for printer.cfg
					</p>
				</div>
				<ShowWhenReady isReady={printerQuery.isFetched} queryErrors={errors}>
					<h3 className="font-display font-bold tracking-tight text-zinc-300">Official Support</h3>
					<p className="mb-4 max-w-4xl text-sm font-medium text-zinc-500 dark:text-zinc-500">
						These printers are officially supported by Rat Rig and the RatOS team.
					</p>
					<CardSelectorWithOptions
						cards={cards}
						onSelect={onSelectPrinter}
						value={selectedCard}
						optionValue={selectedPrinterOptionFromCard}
					/>
					<h3 className="font-display mt-8 font-bold tracking-tight text-zinc-300">Community Support</h3>
					<p className="mb-4 max-w-4xl text-sm font-medium text-zinc-500 dark:text-zinc-500">
						These printers are supported through community contributions and may not be as well tested.
					</p>
					<CardSelectorWithOptions
						cards={unofficialPrinters}
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
