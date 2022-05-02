import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { promisify } from 'util';
import { GenericErrorResponse } from '../types';

export interface Board {
	name: string;
	manufacturer: string;
	serialPath: string;
	firmwareBinaryName?: string;
	compileScript: string;
	flashScript?: string;
	flashInstructions?: string;
	path: string;
}

interface BoardsSuccessResponseData {
	result: 'success';
	data: {
		boards: Board[];
	};
}

interface BoardsErrorResponseData extends GenericErrorResponse {}

export type BoardsResponseData = BoardsSuccessResponseData | BoardsErrorResponseData;

export const getBoards = async (): Promise<Board[]> => {
	const defs = await promisify(exec)(`ls ${process.env.RATOS_CONFIGURATION_PATH}/boards/*/board-definition.json`);
	return defs.stdout
		.split('\n')
		.map((f) =>
			f.trim() === ''
				? null
				: { ...JSON.parse(readFileSync(f).toString()), dir: f.replace('board-definition.json', '') },
		)
		.filter((f) => f != null);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<BoardsResponseData>) {
	if (req.method === 'GET') {
		try {
			res.status(200).json({
				result: 'success',
				data: {
					boards: await getBoards(),
				},
			});
		} catch (e) {
			res.status(200).json({
				result: 'error',
				data: {
					message: `No boards found in ${process.env.RATOS_CONFIGURATION_PATH}/boards`,
				},
			});
		}
	}
	return res.status(405);
}
