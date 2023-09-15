import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { isConnectedToWifi } from '../helpers/wpa-cli';
import { Wizard } from '../app/wizard';

export async function getServerSideProps() {
	return {
		props: {
			isConnectedToWifi: await isConnectedToWifi(),
		}, // will be passed to the page component as props
	};
}

interface IndexProps {
	isConnectedToWifi: boolean;
}

const Home: NextPage<IndexProps> = (props) => {
	return (
		<>
			<Head>
				<title>RatOS Configurator</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Wizard />
		</>
	);
};

export default Home;
