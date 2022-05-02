import { ChipIcon } from '@heroicons/react/outline';
import getConfig from 'next/config';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, UseQueryResult } from 'react-query';
import { useRecoilValue } from 'recoil';
import { MoonrakerDBGetItemResponse, MoonrakerQueryState } from '../../hooks/useMoonraker';
import { StepScreenProps } from '../../pages';
import { Board, BoardsResponseData, getBoards } from '../../pages/api/mcu/boards';
import { CardSelector, SelectableCard } from '../card-selector';
import { ErrorMessage } from '../error-message';
import { Spinner } from '../spinner';
import { StepNavButton, StepNavButtons } from '../step-nav-buttons';

interface SelectableBoard extends SelectableCard {
	board: Board;
}

export const MCUPreparation: React.FC<StepScreenProps> = (props) => {
	const [selectedBoard, _setSelectedBoard] = useState<SelectableBoard | null>(null);
	const moonrakerQuery = useRecoilValue(MoonrakerQueryState);

	const boardsQuery = useQuery<Board[], Error>('boards', async () => {
		const response = await fetch(getConfig().publicRuntimeConfig.basePath + '/api/mcu/boards');
		if (!response.ok) {
			throw new Error('Error while retrieving board definitions');
		}
		const data: BoardsResponseData = await response.json();
		if (data?.result === 'error') {
			throw new Error(data.data.message);
		}
		return data.data.boards;
	});

	const setBoardMutation = useMutation<void, void, Board>(async (selectedBoard: Board) => {
		if (moonrakerQuery == null) {
			throw new Error('Moonraker not connected');
		}
		const response = await moonrakerQuery('server.database.post_item', {
			namespace: 'RatOS',
			key: 'selectedBoard',
			value: selectedBoard,
		});
		return response;
	});

	const selectedBoardQuery = useQuery<MoonrakerDBGetItemResponse<Board>, Error>('selectedBoard', async () => {
		if (moonrakerQuery == null) {
			throw new Error('Moonraker not connected');
		}
		const response = await moonrakerQuery('server.database.get_item', { namespace: 'RatOS', key: 'selectedBoard' });
		return response;
	});
	const setSelectedBoard = useCallback(
		(selectedBoard: SelectableBoard) => {
			setBoardMutation.mutate(selectedBoard.board);
			_setSelectedBoard(selectedBoard);
		},
		[setBoardMutation],
	);

	let rightButton: StepNavButton = {
		onClick: props.nextScreen,
		label: 'Next',
		disabled: true,
	};
	let leftButton: StepNavButton = {
		onClick: props.previousScreen,
	};
	if (selectedBoard) {
		rightButton = {
			onClick: props.nextScreen,
			label: 'Next',
		};
	}

	const cards: SelectableBoard[] = useMemo(() => {
		if (boardsQuery.isError || boardsQuery.data == null) return [];
		return boardsQuery.data.map((b) => ({
			board: b,
			name: b.manufacturer + ' ' + b.name,
			details: (
				<span>
					<span className='font-semibold'>Automatic flashing:</span> {b.flashScript ? 'Yes' : 'No'}
				</span>
			),
			right: <ChipIcon className='h-8 w-8 text-slate-500' />,
		}));
	}, [boardsQuery.isError, boardsQuery.data]);

	useEffect(() => {
		const board = cards.find((c) => c.board.serialPath === selectedBoardQuery.data?.value.serialPath);
		_setSelectedBoard(board ?? null);
	}, [selectedBoardQuery.data, cards]);

	let content =
		renderStatus(boardsQuery) ?? selectedBoard ? null : (
			<CardSelector<SelectableBoard> cards={cards} value={selectedBoard} onSelect={setSelectedBoard} />
		);

	return (
		<Fragment>
			<div className='p-8'>
				{' '}
				<div className='pb-5 mb-5 border-b border-gray-200'>
					<h3 className='text-lg leading-6 font-medium text-gray-900'>Control board preparation</h3>
					<p className='mt-2 max-w-4xl text-sm text-gray-500'>Pick your control board</p>
				</div>
				{content}
			</div>
			<StepNavButtons right={rightButton} left={leftButton} />
		</Fragment>
	);
};

const renderStatus = (query: UseQueryResult<any, Error>) => {
	if (query.isError) {
		return (
			<div className='mb-4 h-48'>
				<ErrorMessage>{query.error?.message}</ErrorMessage>
			</div>
		);
	}
	if (query.isFetching) {
		return (
			<div className='flex justify-center items-center mb-4 h-48'>
				<Spinner />
			</div>
		);
	}
	return null;
};
