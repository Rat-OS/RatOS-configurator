import { exec } from 'child_process';
import { promisify } from 'util';
import { getWirelessInterface } from './iw';

export const isConnectedToWifi = async () => {
	const wirelessInterface = await getWirelessInterface();
	try {
		const res = await promisify(exec)(`sudo wpa_cli -i "${wirelessInterface}" status | grep 'ip_address'`);
		if (res.stdout.indexOf('ip_address=192.168.50.1') > -1) {
			return false;
		} else {
			return true;
		}
	} catch (e) {
		return false;
	}
};
