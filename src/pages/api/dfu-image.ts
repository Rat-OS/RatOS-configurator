import { GenericErrorResponse } from './types';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { getBoards } from '../../server/router/mcu';
import { fileTypeFromBuffer } from 'file-type';

type DfuImageSuccessResponseData = Buffer;

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
		const imgPath = path.join(
			board.path,
			board.dfu.dfuBootImage,
		);
		try {
			const buf = await promisify(fs.readFile)(imgPath);
			const fileType = await fileTypeFromBuffer(buf);
			if (fileType == null) {
				return res.status(500).json({
					result: 'error',
					data: {
						message: 'File is not a valid image.',
					},
				});
			}
			res.setHeader('Content-Type', fileType.mime);
			return res.status(200).send(buf);
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
