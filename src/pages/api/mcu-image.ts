import { GenericErrorResponse } from '@/pages/api/types';
import { createReadStream } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { getBoards } from '@/server/routers/mcu';

type PrinterImageSuccessResponseData = ReturnType<typeof createReadStream>;

interface PrinterImageErrorResponseData extends GenericErrorResponse {}

export type PrinterImageResponseData = PrinterImageSuccessResponseData | PrinterImageErrorResponseData;

export default async function handler(req: NextApiRequest, res: NextApiResponse<PrinterImageResponseData>) {
	if (req.method === 'GET') {
		if (req.query.boardId == null) {
			return res.status(405).json({
				result: 'error',
				data: {
					message: 'boardId parameter missing',
				},
			});
		}
		const boards = await getBoards();
		const board = boards.find((b) => b.id === req.query.boardId);
		if (board == null) {
			return res.status(405).json({
				result: 'error',
				data: {
					message: 'No supported board exist with id ' + req.query.boardId,
				},
			});
		}
		if (board.boardImageFileName == null) {
			return res.status(405).json({
				result: 'error',
				data: {
					message: 'No image file found for board ' + req.query.boardId,
				},
			});
		}

		const imgPath = path.join(board.path, board.boardImageFileName);
		try {
			return res.status(200).send(createReadStream(imgPath));
		} catch (e) {
			return res.status(200).json({
				result: 'error',
				data: {
					message: 'Image file does not exist.',
				},
			});
		}
	}
	return res.status(405).json({
		result: 'error',
		data: {
			message: 'Method not allowed',
		},
	});
}
