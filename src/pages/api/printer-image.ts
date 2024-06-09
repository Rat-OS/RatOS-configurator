import { GenericErrorResponse } from '@/pages/api/types';
import { createReadStream } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { getPrinters } from '@/server/routers/printer';

type PrinterImageSuccessResponseData = ReturnType<typeof createReadStream>;

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
