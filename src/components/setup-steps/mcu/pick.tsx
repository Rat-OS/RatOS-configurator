import React, { Fragment, useCallback, useMemo } from 'react';
import { CardSelector } from '../../card-selector';
import { StepNavButton, StepNavButtons } from '../../step-nav-buttons';
import { MCUStepScreenProps, SelectableBoard } from '../mcu-preparation';
import { Button } from '../../button';
import { Badge } from '../../common/badge';

interface MCUPickProps extends MCUStepScreenProps {
	toolboards?: boolean;
}

export const MCUPicker: React.FC<MCUPickProps> = (props) => {
	const { toolboards, skipSteps, setSelectedBoard } = props;

	const cards = useMemo(() => {
		return props.cards.filter((card) => (toolboards === true ? card.board.isToolboard : !card.board.isToolboard));
	}, [toolboards, props.cards]);

	let content = (
		<CardSelector<SelectableBoard>
			cards={cards}
			value={props.selectedBoard}
			onSelect={setSelectedBoard}
			title={(card) => (
				<>
					<span>{card.name}</span>
					{card.board.detected && (
						<Badge color="green" size="sm">
							Detected
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
		if (toolboards && skipSteps) {
			setSelectedBoard(null);
			skipSteps?.();
		}
	}, [toolboards, skipSteps, setSelectedBoard]);

	let skipButton: StepNavButton | undefined =
		toolboards && props.skipSteps
			? {
					onClick: skip,
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
				<div className="pb-5 mb-5 border-b border-zinc-200 dark:border-zinc-700 flex">
					<div className="flex-1">
						<h3 className="text-lg leading-6 font-medium text-zinc-900 dark:text-zinc-100">{props.name}</h3>
						<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">{props.description}</p>
					</div>
					{toolboards && props.selectedBoard != null && (
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
