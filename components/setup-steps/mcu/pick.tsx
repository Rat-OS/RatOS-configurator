import React, { Fragment, useCallback } from 'react';
import { CardSelector } from '@/components/card-selector';
import { StepNavButton, StepNavButtons } from '@/components/step-nav-buttons';
import { MCUStepScreenProps, SelectableBoard } from '@/components/setup-steps/mcu-preparation';
import { Button } from '@/components/common/button';
import { Input } from '@/components/ui/input';
import { BoardWithDetectionStatus } from '@/zods/boards';
import { PrinterAxis } from '@/zods/motion';
import { AnimatedContainer } from '@/components/common/animated-container';
import { categorizeList } from '@/app/_helpers/lists';
import { Search, SearchX } from 'lucide-react';

export const MCUPicker: React.FC<MCUStepScreenProps> = (props) => {
	const { toolhead, skipSteps, setSelectedBoard, selectedControlboard, selectedToolboard, selectedPrinter, cards } =
		props;

	const [globalFilter, setGlobalFilter] = React.useState<string | null>(null);

	const isToolboardRequired = useCallback(
		(controlboard: BoardWithDetectionStatus | null = selectedControlboard) => {
			return selectedPrinter != null && (controlboard?.driverCount ?? 0) < selectedPrinter.driverCountRequired;
		},
		[selectedControlboard, selectedPrinter],
	);

	const isBoardDetected = toolhead ? selectedToolboard?.detected : selectedControlboard?.detected;

	const categorizedCards = categorizeList(
		cards.filter((c) => {
			if (globalFilter == null || globalFilter?.trim() === '') {
				return true;
			}
			const filterVal = globalFilter.toLowerCase();
			const boardSearchStrings = [
				c.board.name.toLowerCase(),
				c.board.manufacturer.toLowerCase(),
				...c.board.driverVoltages.map((v) => v.toString()),
				...(c.board.integratedDrivers
					? Object.values(c.board.integratedDrivers).map((v) => v.toString().toLowerCase())
					: []),
				c.board.flashScript && !c.board.disableAutoFlash ? 'automatic flashing' : 'manual flashing',
				c.board.integratedDrivers ? 'integrated drivers' : 'step sticks',
			];
			return filterVal.split(' ').every((fv) => boardSearchStrings.some((s) => s.includes(fv) || fv.includes(s)));
		}),
		(card) => card.board.manufacturer,
	);

	let content = Object.keys(categorizedCards)
		.sort((a, b) => categorizedCards[b].length - categorizedCards[a].length)
		.map((category) => (
			<div key={category} className="mb-8">
				<h3 className="font-display font-bold tracking-tight text-zinc-300">{category}</h3>
				<p className="mb-4 max-w-4xl text-sm font-medium text-zinc-500 dark:text-zinc-500">
					Supported boards from {category}
				</p>
				<CardSelector<SelectableBoard>
					cards={categorizedCards[category]}
					value={cards.find((c) => c.id === (toolhead ? selectedToolboard : selectedControlboard)?.id)}
					onSelect={setSelectedBoard}
				/>
			</div>
		));

	let rightButton: StepNavButton = {
		onClick: props.nextScreen,
		label: 'Next',
		disabled: true,
	};
	let leftButton: StepNavButton = {
		onClick: props.previousScreen,
	};

	const skip = useCallback(() => {
		skipSteps?.();
	}, [skipSteps]);

	let skipButton: StepNavButton | undefined =
		((toolhead && !isToolboardRequired()) || isBoardDetected) && skipSteps && skip
			? {
					onClick: skip,
					label: 'Skip',
				}
			: undefined;

	if (
		(toolhead && (!isToolboardRequired() || selectedToolboard != null)) ||
		(!toolhead && selectedControlboard != null)
	) {
		rightButton = {
			onClick: props.nextScreen,
			label: 'Next',
		};
	}

	return (
		<Fragment>
			<div className="p-8">
				{' '}
				<div className="mb-5 flex border-b border-zinc-200 pb-2 dark:border-zinc-700">
					<div className="flex-1">
						<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">{props.name}</h3>
						<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">{props.description}</p>
					</div>
					<div className="flex items-center gap-4">
						<div>
							{toolhead && toolhead.getMotionAxis() === PrinterAxis.x && selectedToolboard != null && (
								<Button onClick={() => setSelectedBoard(null)} variant="danger">
									Clear selection
								</Button>
							)}
						</div>
						<StepNavButtons right={rightButton} skip={skipButton} inTitle={true} />
					</div>
				</div>
				<div className="mb-6 border-b border-zinc-200 pb-2 dark:border-zinc-800">
					<h3 className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-300">Search boards</h3>
					<div className="relative">
						<Input
							placeholder="Filter boards..."
							value={globalFilter ?? ''}
							onChange={(event) => setGlobalFilter(event.target.value)}
							className="mb-4 h-8 w-full pr-8"
						/>
						{globalFilter != null && globalFilter?.trim() != '' ? (
							<SearchX
								onClick={() => {
									setGlobalFilter(null);
								}}
								className="absolute right-2 top-1.5 h-5 w-5 cursor-pointer text-zinc-400 hover:text-rose-400"
							/>
						) : (
							<Search className="absolute right-2 top-1.5 h-5 w-5 text-zinc-400" />
						)}
					</div>
				</div>
				<AnimatedContainer containerClassName="overflow-hidden">
					{props.children}
					{content}
				</AnimatedContainer>
			</div>
			<StepNavButtons right={rightButton} left={leftButton} skip={skipButton} />
		</Fragment>
	);
};
