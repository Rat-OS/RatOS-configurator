import { GenericErrorResponse } from '@/pages/api/types';
import { createReadStream } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { getBoards } from '@/server/routers/mcu';

type DfuImageSuccessResponseData = ReturnType<typeof createReadStream>;

interface DfuImageErrorResponseData extends GenericErrorResponse {}

export type DfuImageResponseData = DfuImageSuccessResponseData | DfuImageErrorResponseData;

export default async function handler(req: NextApiRequest, res: NextApiResponse<DfuImageResponseData>) {
	if (req.method === 'GET') {
		if (req.query.boardPath == null) {
			return res.status(405).json({
				result: 'error',
				data: {
					message: 'boardPath parameter missing',
				},
			});
		}
		const boards = await getBoards();
		const board = boards.find((b) => b.path === req.query.boardPath);
		if (board?.dfu == null) {
			return res.status(405).json({
				result: 'error',
				data: {
					message: 'No DFU capable board exists for given boardPath',
				},
			});
		}
		const imgPath = path.join(board.path, board.dfu.dfuBootImage);
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
}
