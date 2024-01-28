import { use } from 'react';
import { isConnectedToWifi } from '../../server/helpers/wpa-cli';
import { getWirelessInterface } from '../../server/helpers/iw';
import { Wizard } from './wizard';

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
	const connected = use(isConnectedToWifi());
	const wifiInterface = use(getWirelessInterface());
	return (
		<Wizard isConnectedToWifi={connected} hasWifiInterface={wifiInterface != null && wifiInterface.trim() != ''} />
	);
}
