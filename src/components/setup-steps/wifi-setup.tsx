'use client';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { CardSelector, SelectableCard } from '../card-selector';
import { Spinner } from '../spinner';
import { ErrorMessage } from '../error-message';
import { WifiIcon } from '@heroicons/react/24/solid';
import { TextInput } from '../forms/text-input';
import { StepNavButton, StepNavButtons } from '../step-nav-buttons';
import { Network } from '../../helpers/iw';
import { Modal } from '../modal';
import { parseSignal } from '../../helpers/wifi';
import { StepScreenProps } from '../../hooks/useSteps';
import { trpc } from '../../helpers/trpc';
import { hostnameInput, joinInput } from '../../helpers/validators/wifi';

interface APList {
	[id: string]: Network;
}

interface SelectableNetwork extends SelectableCard {
	id: string;
}

export const WifiSetup: React.FC<StepScreenProps> = (props) => {
	const [apList, setApList] = useState<APList>({});
	const [selectedNetwork, setSelectedNetwork] = useState<null | Network>(null);
	const [password, setPassword] = useState('');
	const [hostname, setHostname] = useState('ratos');
	const [hostnameCompleted, setHostnameCompleted] = useState(false);

	const { isError, error, data } = trpc.wifi.scan.useQuery(undefined, {
		refetchInterval: (data, query) => {
			if (query.state.error) {
				return false;
			}
			return 1000;
		},
		retry: false,
	});
	const hostnameMutation = trpc.wifi.hostname.useMutation();
	const wifiMutation = trpc.wifi.join.useMutation();

	useEffect(() => {
		setApList((apList) => {
			const newList = {
				...apList,
			};
			data?.forEach((ap) => {
				newList[ap.address] = ap;
			});
			return newList;
		});
	}, [data]);

	const hostnameValidation = hostnameInput.safeParse({ hostname });
	const passwordValidation = joinInput.safeParse({ passphrase: password, ssid: selectedNetwork?.ssid });

	const cards: SelectableNetwork[] = useMemo(() => {
		if (isError) return [];
		return Object.keys(apList).map((ap) => ({
			name: apList[ap].ssid ?? 'Unknown Network',
			id: ap,
			details: (
				<div className="gap-4 md:grid md:grid-cols-2">
					<div className="md:col-span-1">
						<span className="font-semibold">Signal Strength:</span> {parseSignal(apList[ap].signal)}
					</div>
					<div className="md:col-span-1">
						<span className="font-semibold">Frequency:</span> {Math.round(apList[ap].frequency / 100) / 10}GHz
					</div>
				</div>
			),
			right: <WifiIcon className="h-8 w-8 text-zinc-500 dark:text-zinc-400" />,
		}));
	}, [isError, apList]);

	const onSelectCard = useCallback(
		(card: SelectableNetwork) => {
			setSelectedNetwork(apList[card.id]);
		},
		[apList],
	);

	const connectToWifi = useCallback(() => {
		if (selectedNetwork == null || selectedNetwork.ssid == null) {
			throw new Error('Cannot join wifi without selecting a network');
		}
		wifiMutation.mutate({ passphrase: password, ssid: selectedNetwork.ssid, country: selectedNetwork.country });
	}, [password, selectedNetwork, wifiMutation]);

	const rebootMutation = trpc.reboot.useMutation();

	const rebootAndClose = useCallback(async () => {
		await rebootMutation.mutateAsync();
		window.close();
	}, [rebootMutation]);

	const confirmHostname = useCallback(async () => {
		await hostnameMutation.mutateAsync({ hostname });
		setHostnameCompleted(true);
	}, [hostnameMutation, hostname]);

	const content =
		selectedNetwork &&
		wifiMutation.isSuccess &&
		hostnameCompleted &&
		!rebootMutation.isSuccess &&
		!rebootMutation.isError ? (
			<Modal
				title="Settings saved!"
				body={`RatOS is now setup to connect to ${selectedNetwork.ssid}! Your raspberry pi will now reboot, and join your local wifi network. Click the button below to reboot the pi and close this window. You can then reconnect to your local network where http://${hostname}.local/ should be available in a few minutes. If RatOS fails to join ${selectedNetwork.ssid}, it will recreate the "ratos" hotspot and you'll have to try again.`}
				buttonLabel="Got it!"
				onClick={rebootAndClose}
			/>
		) : rebootMutation.isError ? (
			<div className="mb-4 h-48">
				<ErrorMessage>{rebootMutation.error.message}</ErrorMessage>
			</div>
		) : rebootMutation.isLoading || rebootMutation.isSuccess ? (
			<div className="mb-4 h-48">
				<div className="mb-4 flex items-center justify-center font-bold">Rebooting...</div>
				<div className="mb-4 flex items-center justify-center">
					<div>
						Please reconnect to {selectedNetwork?.ssid ?? 'your local network'} and visit{' '}
						<a href={`http://${hostname}.local/configure?step=1`} className="text-brand-600">
							http://{hostname}.local/configure?step=1
						</a>{' '}
						in a few minutes.
					</div>
				</div>
			</div>
		) : selectedNetwork && wifiMutation.isSuccess ? (
			<TextInput
				label="Printer hostname"
				type="text"
				key="hostname"
				defaultValue="RatOS"
				error={
					hostnameMutation.isError
						? hostnameMutation.error.message
						: hostnameValidation.success
						? undefined
						: hostnameValidation.error.issues[0].message
				}
				onChange={(val) => setHostname(val as string)}
				help='Only use characters from a-Z and dashes. For example, entering "RatOS" will make your printer available at http://RatOS.local/'
			/>
		) : selectedNetwork ? (
			<TextInput
				label={selectedNetwork.security.toLocaleUpperCase() + ' Password'}
				type="password"
				key="password"
				error={
					wifiMutation.isError
						? wifiMutation.error.message
						: passwordValidation.success
						? undefined
						: passwordValidation.error.issues[0].message
				}
				onChange={(val) => setPassword(val + '')}
			/>
		) : isError ? (
			<div className="mb-4 h-48">
				<ErrorMessage title="Unable to scan for wifi access points">{error?.message}</ErrorMessage>
			</div>
		) : Object.keys(apList).length === 0 ? (
			<div className="mb-4 flex h-48 items-center justify-center">
				<Spinner />
			</div>
		) : (
			<CardSelector<SelectableNetwork> cards={cards} onSelect={onSelectCard} />
		);

	let rightButton: StepNavButton = {
		onClick: props.nextScreen,
		label: 'Skip',
	};
	let leftButton: StepNavButton = {
		onClick: props.previousScreen,
	};

	let subtext = 'Pick an access point to join';

	if (selectedNetwork) {
		rightButton = {
			label: 'Save Wifi Credentials',
			disabled: !passwordValidation.success || wifiMutation.isLoading,
			isLoading: wifiMutation.isLoading,
			onClick: connectToWifi,
		};
		leftButton = {
			onClick: () => setSelectedNetwork(null),
			label: 'Back',
			disabled: wifiMutation.isLoading,
		};
		subtext = 'Enter password for ' + selectedNetwork.ssid;
		if (wifiMutation.isSuccess) {
			rightButton = {
				label: 'Save and Connect',
				disabled: !hostnameValidation.success || hostnameMutation.isLoading,
				onClick: confirmHostname,
			};
			leftButton = {
				onClick: () => wifiMutation.reset(),
				label: 'Back',
				disabled: wifiMutation.isLoading,
			};
			subtext = 'Enter the hostname you want to use for the printer';
			if (hostnameCompleted) {
				rightButton = {
					onClick: props.nextScreen,
				};
				leftButton = {};
				subtext = 'Proceed to next step';
			}
		}
	}

	return (
		<Fragment>
			<div className="p-8">
				{' '}
				<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">Configure Wifi Setup</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">{subtext}</p>
				</div>
				{content}
			</div>
			<StepNavButtons right={rightButton} left={leftButton} />
		</Fragment>
	);
};
