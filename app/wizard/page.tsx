import { use } from 'react';
import { isConnectedToWifi } from '../../server/helpers/wpa-cli';
import { getWirelessInterface } from '../../server/helpers/iw';
import { Wizard } from './wizard';
import { headers } from 'next/headers';

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
	// Stupid hack to make this a dynamic component. Too much Next.js magic.
	headers().get('x-configurator');
	const connected = use(isConnectedToWifi());
	const wifiInterface = use(getWirelessInterface());
	return (
		<Wizard isConnectedToWifi={connected} hasWifiInterface={wifiInterface != null && wifiInterface.trim() != ''} />
	);
}
