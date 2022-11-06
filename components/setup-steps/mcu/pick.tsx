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
		<CardSelector<SelectableBoard> cards={cards} value={props.selectedBoards[0]} onSelect={props.setSelectedBoard} />
	);

	let rightButton: StepNavButton = {
		onClick: props.nextScreen,
		label: 'Next',
		disabled: true,
	};
	let leftButton: StepNavButton = {
		onClick: props.previousScreen,
	};

	if (props.selectedBoards.length > 0) {
		rightButton = {
			onClick: props.nextScreen,
			label: 'Next',
		};
	}

	return (
		<Fragment>
			<div className="p-8">
				{' '}
				<div className="pb-5 mb-5 border-b border-gray-200">
					<h3 className="text-lg leading-6 font-medium text-gray-900">{props.name}</h3>
					<p className="mt-2 max-w-4xl text-sm text-gray-500">{props.description}</p>
				</div>
				{content}
			</div>
			<StepNavButtons right={rightButton} left={leftButton} />
		</Fragment>
	);
};
