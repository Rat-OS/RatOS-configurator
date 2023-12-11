import { CpuChipIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { trpc } from '../../helpers/trpc';
import { ControlboardState, ToolboardState, usePrinterConfiguration } from '../../hooks/usePrinterConfiguration';
import { StepScreen, StepScreenProps, useSteps } from '../../hooks/useSteps';
import { Board, BoardWithDetectionStatus, Toolboard } from '../../zods/boards';
import { SelectableCard } from '../card-selector';
import { QueryStatus } from '../common/query-status';
import { MCUFlashing } from './mcu/flash';
import { MCUPicker } from './mcu/pick';
import { Printer } from '../../zods/printer';

export interface SelectableBoard extends SelectableCard {
	board: BoardWithDetectionStatus;
}

interface ExtraStepProps {
	selectedBoard: SelectableBoard | null;
	cards: SelectableBoard[];
	setSelectedBoard: (board: SelectableBoard | null) => void;
	selectedPrinter: Printer | null;
	toolboards?: boolean;
}

interface ExtraProps {
	toolboards?: boolean;
}

export type MCUStepScreenProps = StepScreenProps & ExtraStepProps;

const MCUSteps: StepScreen<ExtraStepProps>[] = [
	{
		id: '01',
		name: (screenProps) => (screenProps.toolboards ? 'Toolboard' : 'Control board'),
		description: (screenProps) =>
			`Pick your ${
				screenProps.toolboards
					? 'toolboard.'
					: 'control board. If you also use a toolboard, you can add that in a later step.'
			}`,
		href: '#',
		renderScreen: (screenProps) => <MCUPicker {...screenProps} key={screenProps.key} />,
	},
	{
		id: '02',
		name: (screenProps) => `${screenProps.toolboards ? 'Toolboard' : 'Control board'} flashing`,
		description: (screenProps) =>
			`Make sure your ${screenProps.toolboards ? 'toolboard' : 'control board'} is flashed and up to date`,
		href: '#',
		renderScreen: (screenProps) => <MCUFlashing {...screenProps} key={screenProps.key} />,
	},
];

export const MCUPreparation: React.FC<StepScreenProps & ExtraProps> = (props) => {
	const {
		selectedPrinter,
		selectedToolboard: _toolBoard,
		selectedBoard: _controlBoard,
		setSelectedBoard: _setControlboard,
		setSelectedToolboard: _setToolboard,
	} = usePrinterConfiguration();

	const boardsQuery = trpc.mcu.boards.useQuery({
        			boardFilters: {
        				toolboard: props.toolboards,
        				driverCountRequired: props.toolboards ? undefined : selectedPrinter?.driverCountRequired,
        			},
        		});

	const cards: SelectableBoard[] = useMemo(() => {
		if (boardsQuery.isError || boardsQuery.data == null) return [];
		return boardsQuery.data.map((b) => ({
			id: b.serialPath,
			board: b,
			name: `${b.manufacturer} ${b.name}`,
			details: (
				<span>
					<span className="font-semibold">Automatic flashing:</span>{' '}
					{b.flashScript && !b.disableAutoFlash ? 'Yes' : 'No'}
				</span>
			),
			right: <CpuChipIcon className="h-8 w-8 text-zinc-500" />,
		}));
	}, [boardsQuery.isError, boardsQuery.data]);

	const selectedBoard =
		cards.find((c) => c.board.serialPath == (props.toolboards ? _toolBoard?.serialPath : _controlBoard?.serialPath)) ??
		null;

	const setSelectedBoard = useCallback(
		(newBoard: SelectableBoard | null) => {
			if (props.toolboards) {
				_setToolboard(newBoard == null ? null : Toolboard.parse(newBoard.board));
			} else if (newBoard != null) {
				_setControlboard(Board.parse(newBoard.board));
			}
		},
		[_setControlboard, _setToolboard, props.toolboards],
	);

	const extraScreenProps: ExtraStepProps = {
		selectedBoard: selectedBoard ?? null,
		cards,
		setSelectedBoard,
		selectedPrinter,
		toolboards: props.toolboards,
	};
	const { currentStep, screenProps } = useSteps<ExtraStepProps>({
		steps: MCUSteps,
		parentScreenProps: props,
		extraScreenProps: extraScreenProps,
	});

	return currentStep.renderScreen({
		...screenProps,
		...extraScreenProps,
		children: <QueryStatus {...boardsQuery} />,
	});
};
