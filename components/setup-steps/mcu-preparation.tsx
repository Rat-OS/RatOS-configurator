import { CpuChipIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { trpc } from '../../helpers/trpc';
import { MoonrakerDBGetItemResponse, MoonrakerQueryState } from '../../hooks/useMoonraker';
import { StepScreen, StepScreenProps, useSteps } from '../../hooks/useSteps';
import { Board } from '../../server/router/mcu';
import { SelectableCard } from '../card-selector';
import { QueryStatus } from '../common/query-status';
import { MCUFlashing } from './mcu/flash';
import { MCUPicker } from './mcu/pick';

export interface SelectableBoard extends SelectableCard {
	board: Board;
}

interface ExtraStepProps {
	selectedBoards: SelectableBoard[];
	cards: SelectableBoard[];
	setSelectedBoard: (boards: SelectableBoard) => void;
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
				screenProps.toolboards ? 'toolboard' : 'control board. If you also use a toolboard, you can add that later.'
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
	const [selectedBoards, _setSelectedBoards] = useState<SelectableBoard[]>([]);
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
		return JSON.parse(response.value);
	});
	const setSelectedBoard = useCallback(
		(selectedBoard: SelectableBoard) => {
			setBoardMutation.mutate([selectedBoard.board]);
			_setSelectedBoards([selectedBoard]);
		},
		[setBoardMutation],
	);

	const cards: SelectableBoard[] = useMemo(() => {
		if (boardsQuery.isError || boardsQuery.data == null) return [];
		return boardsQuery.data.map((b) => ({
			board: b,
			name: b.manufacturer + ' ' + b.name,
			details: (
				<span>
					<span className="font-semibold">Automatic flashing:</span> {b.flashScript ? 'Yes' : 'No'}
				</span>
			),
			right: <CpuChipIcon className="h-8 w-8 text-slate-500" />,
		}));
	}, [boardsQuery.isError, boardsQuery.data]);

	useEffect(() => {
		// Only handle single board selection for now
		const board = cards.find((c) => c.board.serialPath === selectedBoardQuery.data?.[0].serialPath);
		_setSelectedBoards(board ? [board] : []);
	}, [selectedBoardQuery.data, cards]);

	const extraScreenProps: ExtraStepProps = { selectedBoards, cards, setSelectedBoard, toolboards: props.toolboards };
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
