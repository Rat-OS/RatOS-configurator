'use client';
import React, { useCallback, useRef, useState } from 'react';
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
import { getLogger } from '@/app/_helpers/logger';
import { Modal } from '@/components/common/modal';
import { Banner } from '@/components/common/banner';
import { ShieldCheck } from 'lucide-react';
import { deserializePrinterRail } from '@/utils/serialization';

interface SelectablePrinter<Option extends SelectableOption = SelectableOption>
	extends SelectableCardWithOptions<Option> {
	printer: PrinterDefinitionWithResolvedToolheads;
}

export const PrinterSelection: React.FC<StepScreenProps> = (props) => {
	const printerQuery = trpc.printer.printers.useQuery();
	const boardQuery = trpc.mcu.boards.useQuery({});
	const lastSavedSettingsQuery = trpc.printer.getSavedConfig.useQuery();
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
			async (card: SelectedCard<Unpacked<typeof cards>>, option: SelectableOption | null, merge: boolean) => {
				const printer = card.printer;
				if (printer == null) {
					getLogger().error(card, 'No printer found matching the criteria');
					return;
				}
				const oldPrinter = await snapshot.getPromise(PrinterState);
				if (oldPrinter?.id !== printer.id) {
					set(PrinterState, printer);
				}
				if (Object.values(printer.sizes).length > 1) {
					if (option == null || typeof option.id !== 'string') {
						throw new Error('An option must be selected for printers that come in different size configurations');
					}
					set(PrinterSizeState, printer.sizes[option.id]);
				} else {
					set(PrinterSizeState, printer.sizes[Object.keys(printer.sizes)[0]]);
				}
				if (oldPrinter?.id === printer.id) {
					// Don't reset if the printer is the same
					return;
				}
				const oldToolheads = await snapshot.getPromise(PrinterToolheadsState);
				const oldRails = await snapshot.getPromise(PrinterRailsState);
				if (!merge) {
					oldToolheads.forEach((th) => {
						reset(PrinterToolheadState(th.toolNumber));
					});
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
					if (defaultBoard != null) {
						set(ControlboardState, defaultBoard);
					}
					if (printer.defaults.controllerFan) {
						set(ControllerFanState, { id: printer.defaults.controllerFan, title: printer.defaults.controllerFan });
					} else {
						reset(ControllerFanState);
					}
				} else {
					if (oldToolheads.length > printer.defaults.toolheads.length) {
						oldToolheads.slice(printer.defaults.toolheads.length).forEach((th) => {
							reset(PrinterToolheadState(th.toolNumber));
						});
					}
					if (oldToolheads.length < printer.defaults.toolheads.length) {
						printer.defaults.toolheads.slice(oldToolheads.length).forEach((th) => {
							const toolNumber = new ToolheadHelper(th).getTool();
							set(PrinterToolheadState(toolNumber), { ...oldToolheads[0], toolNumber });
						});
					}
					set(
						PrinterRailsState,
						oldRails.map((r) => {
							const serializedNewRail = printer.defaults.rails.find((rail) => rail.axis === r.axis);
							if (serializedNewRail != null) {
								const newRail = deserializePrinterRail(serializedNewRail);
								return {
									...newRail,
									driver: r.driver,
									current: r.current,
									motorSlot: r.motorSlot,
									voltage: r.voltage,
									microstepping: r.microstepping,
									invertStepperDirection: r.invertStepperDirection,
									stepper: r.stepper,
									axisMaximum: r.axisMaximum,
									axisMinimum: r.axisMinimum,
									axisEndstop: r.axisEndstop,
								};
							}
							return r;
						}),
					);
				}
			},
		[printerQuery.data],
	);

	const pendingSelection = useRef<{
		card: SelectedCard<Unpacked<typeof cards>>;
		option: SelectableOption | null;
	} | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const beforeSelectPrinter = useCallback(
		(card: SelectedCard<Unpacked<typeof cards>>, option: SelectableOption | null) => {
			if (selectedPrinter == null) {
				onSelectPrinter(card, option, false);
				setIsModalVisible(false);
				return;
			}
			const printer = card.printer;
			if (printer == null) {
				getLogger().error(card, 'No printer found matching the criteria');
				setIsModalVisible(false);
				return;
			}
			if (selectedPrinter.id === printer.id) {
				if (selectedPrinterOption === option) {
					return;
				}
				onSelectPrinter(card, option, true);
				return;
			}
			pendingSelection.current = { card, option };
			setIsModalVisible(true);
		},
		[onSelectPrinter, selectedPrinter, selectedPrinterOption],
	);

	const errors = printerQuery.error ? [printerQuery.error?.message] : [];

	return (
		<>
			<div className="p-4 @sm:p-8">
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
						onSelect={beforeSelectPrinter}
						value={selectedCard}
						optionValue={selectedPrinterOptionFromCard}
					/>
					<h3 className="font-display mt-8 font-bold tracking-tight text-zinc-300">Community Support</h3>
					<p className="mb-4 max-w-4xl text-sm font-medium text-zinc-500 dark:text-zinc-500">
						These printers are supported through community contributions and may not be as well tested.
					</p>
					<CardSelectorWithOptions
						cards={unofficialPrinters}
						onSelect={beforeSelectPrinter}
						value={selectedCard}
						optionValue={selectedPrinterOptionFromCard}
					/>
				</ShowWhenReady>
			</div>
			{isModalVisible && (
				<Modal
					title="How do you want to proceed?"
					buttonLabel={`Reuse configuration`}
					secondButtonLabel="Start fresh"
					onClickSecondButton={() =>
						onSelectPrinter(pendingSelection.current!.card, pendingSelection.current!.option, false)
					}
					onClick={() => onSelectPrinter(pendingSelection.current!.card, pendingSelection.current!.option, true)}
					body={`You already configured a printer, do you want to reuse your existing hardware configuration or start fresh from the ${pendingSelection.current?.card.printer.name} defaults?`}
					content={
						<AnimatedContainer>
							{lastSavedSettingsQuery.data && (
								<Banner color="sky" Icon={ShieldCheck} title="Your klipper configuration is safe!">
									Your existing klipper configuration will be safe until you explicitly save a new hardware
									configuration at the end of the wizard.
								</Banner>
							)}
						</AnimatedContainer>
					}
					onClose={() =>
						setTimeout(() => {
							setIsModalVisible(false);
							pendingSelection.current = null;
						}, 500)
					}
				/>
			)}
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
