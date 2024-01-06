import { Board } from '../zods/boards';
import { ToolheadHelper } from './toolhead';

export const getBoardSerialPath = (board: Board, toolhead?: ToolheadHelper<any> | null): string => {
	if (board.isHost && 'serialPath' in board && board.serialPath != null) {
		return board.serialPath;
	}
	return '/dev/RatOS/' + getBoardChipId(board, toolhead);
};

export const getBoardChipId = (board: Board, toolhead?: ToolheadHelper<any> | null): string => {
	if (board.isHost) {
		throw new Error('Cannot get chip ID for a host board');
	}
	return board.id + (toolhead ? `-${toolhead.getSerialSuffix()}` : '');
};
