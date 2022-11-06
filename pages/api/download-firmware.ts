import { GenericErrorResponse } from './types';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { getBoards } from '../../server/router/mcu';
import { fileTypeFromFile } from 'file-type';

type DownloadFirmwareSuccessResponseData = Buffer;

interface DownloadFirmwareErrorResponseData extends GenericErrorResponse {}

export type DownloadFirmwareResponseData = DownloadFirmwareSuccessResponseData | DownloadFirmwareErrorResponseData;

export default async function handler(req: NextApiRequest, res: NextApiResponse<DownloadFirmwareResponseData>) {
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
		if (board == null) {
			return res.status(405).json({
				result: 'error',
				data: {
					message: 'No board exists for given boardPath',
				},
			});
		}
		if (process.env.RATOS_CONFIGURATION_PATH == null) {
			return res.status(500).json({
				result: 'error',
				data: {
					message: 'RATOS_CONFIGURATION_PATH environment variable not set',
				},
			});
		}
		const firmwarePath = path.join(
			process.env.RATOS_CONFIGURATION_PATH,
			'..',
			'firmware_binaries',
			board.firmwareBinaryName,
		);
		try {
			const buf = await promisify(fs.readFile)(firmwarePath);
			res.setHeader('Content-Type', (await fileTypeFromFile(firmwarePath))?.mime ?? 'application/octet-stream');
			res.setHeader('Content-Disposition', `attachment; filename=firmware.bin`);
			return res.status(200).send(buf);
		} catch (e) {
			return res.status(200).json({
				result: 'error',
				data: {
					message: `Firmware binary for ${board.name} does not exist.`,
				},
			});
		}
	}
}
