import { CpuChipIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { z } from 'zod';
import { trpc } from '../../helpers/trpc';
import { MoonrakerDBGetItemResponse, MoonrakerQueryState } from '../../hooks/useMoonraker';
import { ControlboardState, ToolboardState } from '../../hooks/usePrinterConfiguration';
import { StepScreen, StepScreenProps, useSteps } from '../../hooks/useSteps';
import { Board } from '../../zods/boards';
import { SelectableCard } from '../card-selector';
import { QueryStatus } from '../common/query-status';
import { MCUFlashing } from './mcu/flash';
import { MCUPicker } from './mcu/pick';

export interface SelectableBoard extends SelectableCard {
	board: Board;
}

interface ExtraStepProps {
	selectedBoard: SelectableBoard | null;
	cards: SelectableBoard[];
	setSelectedBoard: (board: SelectableBoard | null) => void;
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
			`Pick your ${screenProps.toolboards ? 'toolboard' : 'control board. If you also use a toolboard, you can add that later.'
			}`,
		href: '#',
		renderScreen: (screenProps) => <MCUPicker {...screenProps} />,
	},
	{
		id: '02',
		name: (screenProps) => `${screenProps.toolboards ? 'Toolboard' : 'Control board'} flashing`,
		description: (screenProps) =>
			`Make sure your ${screenProps.toolboards ? 'toolboard' : 'control board'} is flashed and up to date`,
		href: '#',
		renderScreen: (screenProps) => <MCUFlashing {...screenProps} />,
	},
];

export const MCUPreparation: React.FC<StepScreenProps & ExtraProps> = (props) => {
	const _setControlboard = useSetRecoilState(ControlboardState);
	const _setToolboard = useSetRecoilState(ToolboardState);
	const [selectedBoard, _setSelectedBoard] = useState<SelectableBoard | null>(null);

	const moonrakerQuery = useRecoilValue(MoonrakerQueryState);

	const boardsQuery = trpc.useQuery(['mcu.boards']);

	const setBoardMutation = useMutation<void, void, Board[]>(async (selectedBoards: Board[]) => {
		if (moonrakerQuery == null) {
			throw new Error('Moonraker not connected');
		}
		const response = await moonrakerQuery('server.database.post_item', {
			namespace: 'RatOS',
			key: props.toolboards ? 'toolboards' : 'boards',
			value: JSON.stringify(selectedBoards),
		});
		return response;
	});

	const selectedBoardQuery = useQuery<Board[], Error>('selectedBoard', async () => {
		if (moonrakerQuery == null) {
			throw new Error('Moonraker not connected');
		}
		const response = (await moonrakerQuery('server.database.get_item', {
			namespace: 'RatOS',
			key: props.toolboards ? 'toolboards' : 'boards',
		})) as MoonrakerDBGetItemResponse<string>;
		if (response == null || response.value == null) return [];
		return z.array(Board).parse(JSON.parse(response.value));
	});
	const setSelectedBoard = useCallback(
		(selectedBoard: SelectableBoard | null) => {
			_setSelectedBoard(selectedBoard);
			// Remove SelectableCard props
			const newBoard = selectedBoard == null ? null : Board.parse(selectedBoard.board);
			setBoardMutation.mutate(newBoard ? [newBoard] : []);
			if (props.toolboards) {
				_setToolboard(newBoard);
			} else {
				_setControlboard(newBoard);
			}
		},
		[setBoardMutation],
	);

	const cards: SelectableBoard[] = useMemo(() => {
		if (boardsQuery.isError || boardsQuery.data == null) return [];
		return boardsQuery.data.map((b) => ({
			board: b,
			name: `${b.manufacturer} ${b.name}`,
			details: (
				<span>
					<span className="font-semibold">Automatic flashing:</span> {b.flashScript ? 'Yes' : 'No'}
				</span>
			),
			right: <CpuChipIcon className="h-8 w-8 text-zinc-500" />,
		}));
	}, [boardsQuery.isError, boardsQuery.data]);

	useEffect(() => {
		// Only handle single board selection for now
		const board = cards.find((c) => c.board.serialPath === selectedBoardQuery.data?.[0].serialPath);
		_setSelectedBoard(board ?? null);
		if (props.toolboards) {
			_setToolboard(board?.board ?? null);
		} else {
			_setControlboard(board?.board ?? null);
		}
	}, [selectedBoardQuery.data, cards]);

	const extraScreenProps: ExtraStepProps = {
		selectedBoard: selectedBoard ?? null,
		cards,
		setSelectedBoard,
		toolboards: props.toolboards,
	};
	const { currentStep, screenProps } = useSteps<ExtraStepProps>({
		steps: MCUSteps,
		parentScreenProps: props,
		extraScreenProps: extraScreenProps,
	});

	return (
		<>
			{currentStep.renderScreen({
				...screenProps,
				...extraScreenProps,
			})}
			<QueryStatus {...boardsQuery} />
		</>
	);
};
