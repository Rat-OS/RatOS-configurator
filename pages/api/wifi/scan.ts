// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { scan, Network, getWirelessInterface } from '../../../helpers/iw';
import { exec } from 'child_process';
import { GenericErrorResponse } from '../types';

export interface ScanErrorResponse extends GenericErrorResponse {}

export type ScanSuccessResponse = {
	result: 'success';
	data: {
		accessPoints: Network[];
	};
};

export type ScanResponseData = ScanErrorResponse | ScanSuccessResponse;
const setWifi = () => {
	// Render and replace ratos-wpa-supplicant.txt on /boot/
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ScanResponseData>) {
	try {
		const wirelessInterface = await getWirelessInterface();
		const aps = await scan(wirelessInterface, { apForce: true });
		res.status(200).json({ result: 'success', data: { accessPoints: aps } });
	} catch (e: any) {
		res.status(200).json({ result: 'error', data: { message: 'Failed to scan wifi networks: ' + e.message } });
	}
}
