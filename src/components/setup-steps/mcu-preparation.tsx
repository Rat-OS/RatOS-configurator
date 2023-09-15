import { CpuChipIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { z } from 'zod';
import { trpc } from '../../helpers/trpc';
import { ControlboardState, ToolboardState } from '../../hooks/usePrinterConfiguration';
import { StepScreen, StepScreenProps, useSteps } from '../../hooks/useSteps';
import { Board, Toolboard } from '../../zods/boards';
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
	const boardsQuery = trpc.useQuery(['mcu.boards']);

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

	const [_controlBoard, _setControlboard] = useRecoilState(ControlboardState);
	const [_toolBoard, _setToolboard] = useRecoilState(ToolboardState);
	const selectedBoard =
		cards.find((c) => c.board.serialPath == (props.toolboards ? _toolBoard?.serialPath : _controlBoard?.serialPath)) ??
		null;

	const setSelectedBoard = useCallback(
		(newBoard: SelectableBoard | null) => {
			if (newBoard == null) {
				return;
			}
			if (props.toolboards) {
				_setToolboard(Toolboard.parse(newBoard.board));
			} else {
				_setControlboard(Board.parse(newBoard.board));
			}
		},
		[_setControlboard, _setToolboard, props.toolboards],
	);

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
