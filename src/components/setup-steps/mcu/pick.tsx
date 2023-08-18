import React, { Fragment, useMemo } from 'react';
import { CardSelector } from '../../card-selector';
import { StepNavButton, StepNavButtons } from '../../step-nav-buttons';
import { MCUStepScreenProps, SelectableBoard } from '../mcu-preparation';

interface MCUPickProps extends MCUStepScreenProps {
	toolboards?: boolean;
}

export const MCUPicker: React.FC<MCUPickProps> = (props) => {
	const cards = useMemo(() => {
		return props.cards.filter((card) => (props.toolboards === true ? card.board.isToolboard : !card.board.isToolboard));
	}, [props.toolboards, props.cards]);

	let content = (
		<CardSelector<SelectableBoard> cards={cards} value={props.selectedBoard} onSelect={props.setSelectedBoard} />
	);

	let rightButton: StepNavButton = {
		onClick: props.nextScreen,
		label: 'Next',
		disabled: true,
	};
	let leftButton: StepNavButton = {
		onClick: props.previousScreen,
	};
	let skipButton: StepNavButton | undefined =
		props.toolboards && props.skipSteps
			? {
					onClick: props.skipSteps,
					label: 'Skip',
			  }
			: undefined;

	if (props.selectedBoard != null) {
		rightButton = {
			onClick: props.nextScreen,
			label: 'Next',
		};
	}

	return (
		<Fragment>
			<div className="p-8">
				{' '}
				<div className="pb-5 mb-5 border-b border-zinc-200 dark:border-zinc-700">
					<h3 className="text-lg leading-6 font-medium text-zinc-900 dark:text-zinc-100">{props.name}</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">{props.description}</p>
				</div>
				{content}
			</div>
			<StepNavButtons right={rightButton} left={leftButton} skip={skipButton} />
		</Fragment>
	);
};
