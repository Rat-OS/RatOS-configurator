import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { isConnectedToWifi } from '../server/helpers/wpa-cli';
import { Wizard } from '../app/wizard';
import { getWirelessInterface } from '../server/helpers/iw';

export async function getServerSideProps() {
	return {
		props: {
			isConnectedToWifi: await isConnectedToWifi(),
			wifiInterface: await getWirelessInterface(),
		}, // will be passed to the page component as props
	};
}

const Home: NextPage<Awaited<ReturnType<typeof getServerSideProps>>['props']> = (props) => {
	return (
		<>
			<Head>
				<title>RatOS Configurator</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Wizard
				isConnectedToWifi={props.isConnectedToWifi}
				hasWifiInterface={props.wifiInterface != null && props.wifiInterface.trim() != ''}
			/>
		</>
	);
};

export default Home;
