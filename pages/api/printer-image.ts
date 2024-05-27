import { GenericErrorResponse } from '@/pages/api/types';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { fileTypeFromBuffer } from 'file-type';
import { getPrinters } from '@/server/routers/printer';

type PrinterImageSuccessResponseData = Buffer;

interface PrinterImageErrorResponseData extends GenericErrorResponse {}

export type PrinterImageResponseData = PrinterImageSuccessResponseData | PrinterImageErrorResponseData;

export default async function handler(req: NextApiRequest, res: NextApiResponse<PrinterImageResponseData>) {
	if (req.method === 'GET') {
		if (req.query.printerId == null) {
			return res.status(405).json({
				result: 'error',
				data: {
					message: 'printerId parameter missing',
				},
			});
		}
		const printers = await getPrinters();
		const printer = printers.find((b) => b.id === req.query.printerId);
		if (printer == null) {
			return res.status(405).json({
				result: 'error',
				data: {
					message: 'No supported printer exist with id ' + req.query.printerId,
				},
			});
		}
		const imgPath = path.join(printer.path, printer.image);
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
	return res.status(405).json({
		result: 'error',
		data: {
			message: 'Method not allowed',
		},
	});
}
