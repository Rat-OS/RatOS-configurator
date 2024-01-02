import React, { Fragment, useCallback } from 'react';
import { CardSelector } from '../../card-selector';
import { StepNavButton, StepNavButtons } from '../../step-nav-buttons';
import { MCUStepScreenProps, SelectableBoard } from '../mcu-preparation';
import { Button } from '../../common/button';
import { Badge } from '../../common/badge';

export const MCUPicker: React.FC<MCUStepScreenProps> = (props) => {
	const { toolhead, skipSteps, setSelectedBoard, selectedControlboard, selectedToolboard, selectedPrinter, cards } =
		props;

	// TODO: This should be determined on the basis of defined board drivers / heaters (check pins), whether it has an extruderless config and how many drivers and which axes the printer requires.
	const isToolboardRequired = useCallback(
		(controlboard: SelectableBoard | null = selectedControlboard) => {
			return selectedPrinter != null && (controlboard?.board.driverCount ?? 0) < selectedPrinter.driverCountRequired;
		},
		[selectedControlboard, selectedPrinter],
	);

	let content = (
		<CardSelector<SelectableBoard>
			cards={cards}
			value={toolhead ? selectedToolboard : selectedControlboard}
			onSelect={setSelectedBoard}
			title={(card) => (
				<>
					<span>{card.name}</span>
					{card.board.detected && (
						<Badge color="green" size="sm">
							Detected
						</Badge>
					)}
					{!toolhead && isToolboardRequired(card) && (
						<Badge color="yellow" size="sm">
							Toolboard required
						</Badge>
					)}
				</>
			)}
		/>
	);

	let rightButton: StepNavButton = {
		onClick: props.nextScreen,
		label: 'Next',
		disabled: true,
	};
	let leftButton: StepNavButton = {
		onClick: props.previousScreen,
	};

	const skip = useCallback(() => {
		if (toolhead && skipSteps) {
			setSelectedBoard(null);
			skipSteps?.();
		}
	}, [toolhead, skipSteps, setSelectedBoard]);

	let skipButton: StepNavButton | undefined =
		toolhead && !isToolboardRequired() && props.skipSteps
			? {
					onClick: skip,
					label: 'Skip',
			  }
			: undefined;

	if ((toolhead && selectedToolboard != null) || (!toolhead && selectedControlboard != null)) {
		rightButton = {
			onClick: props.nextScreen,
			label: 'Next',
		};
	}

	return (
		<Fragment>
			<div className="p-8">
				{' '}
				<div className="mb-5 flex border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<div className="flex-1">
						<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">{props.name}</h3>
						<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">{props.description}</p>
					</div>
					{toolhead && selectedToolboard != null && (
						<div>
							<Button onClick={() => setSelectedBoard(null)} color="danger">
								Clear selection
							</Button>
						</div>
					)}
				</div>
				{props.children}
				{content}
			</div>
			<StepNavButtons right={rightButton} left={leftButton} skip={skipButton} />
		</Fragment>
	);
};
