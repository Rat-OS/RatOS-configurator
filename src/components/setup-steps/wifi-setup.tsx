import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { CardSelector, SelectableCard } from '../card-selector';
import { useMutation } from 'react-query';
import { Spinner } from '../spinner';
import { ErrorMessage } from '../error-message';
import { WifiIcon } from '@heroicons/react/24/solid';
import { TextInput } from '../forms/text-input';
import { StepNavButton, StepNavButtons } from '../step-nav-buttons';
import { Network } from '../../helpers/iw';
import { Modal } from '../modal';
import { parseSignal } from '../../helpers/wifi';
import { MoonrakerQueryState } from '../../hooks/useMoonraker';
import { useRecoilValue } from 'recoil';
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
	const moonrakerQuery = useRecoilValue(MoonrakerQueryState);
	const [hostname, setHostname] = useState('ratos');
	const [hostnameCompleted, setHostnameCompleted] = useState(false);

	const { isLoading, isError, error, data } = trpc.useQuery(['wifi.scan'], {
		refetchInterval: (data, query) => {
			if (query.state.error) {
				return false;
			}
			return 1000;
		},
	});
	const hostnameMutation = trpc.useMutation(['wifi.hostname']);
	const wifiMutation = trpc.useMutation(['wifi.join']);

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
	const passwordValidation = joinInput.safeParse({ password, ssid: selectedNetwork?.ssid });

	const cards: SelectableNetwork[] = useMemo(() => {
		if (isError) return [];
		return Object.keys(apList).map((ap) => ({
			name: apList[ap].ssid ?? 'Unknown Network',
			id: ap,
			details: (
				<>
					<span className="mr-4">
						<span className="font-semibold">Signal Strength:</span> {parseSignal(apList[ap].signal)}
					</span>
					<span>
						<span className="font-semibold">Frequency:</span> {Math.round(apList[ap].frequency / 100) / 10}GHz
					</span>
				</>
			),
			right: <WifiIcon className="h-8 w-8 text-slate-500" />,
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

	const rebootMutation = useMutation<void, string>(() => {
		if (moonrakerQuery) {
			return moonrakerQuery('machine.reboot');
		}
		return Promise.reject('Cannot reboot raspberry pi: No connection to moonraker');
	});

	const rebootAndClose = useCallback(async () => {
		await rebootMutation.mutateAsync();
		window.close();
	}, [rebootMutation]);

	const confirmHostname = useCallback(async () => {
		await hostnameMutation.mutateAsync({ hostname });
		setHostnameCompleted(true);
	}, [hostnameMutation, hostname]);

	const content =
		selectedNetwork && wifiMutation.isSuccess && hostnameCompleted ? (
			<Modal
				title="Settings saved!"
				body={`RatOS is now setup to connect to ${selectedNetwork.ssid}! Your raspberry pi will now reboot, and join your local wifi network. Click the button below to reboot the pi and close this window. You can then reconnect to your local network where http://${hostname}.local/ should be available in a few minutes. If RatOS fails to join ${selectedNetwork.ssid}, it will recreate the "ratos" hotspot and you'll have to try again.`}
				buttonLabel="Got it!"
				onClick={rebootAndClose}
			/>
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
						: hostnameValidation.error.message
				}
				onChange={setHostname}
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
						: passwordValidation.error.message
				}
				onChange={setPassword}
			/>
		) : isError ? (
			<div className="mb-4 h-48">
				<ErrorMessage>{error?.message}</ErrorMessage>
			</div>
		) : rebootMutation.isError ? (
			<div className="mb-4 h-48">
				<ErrorMessage>{rebootMutation.error}</ErrorMessage>
			</div>
		) : rebootMutation.isLoading || rebootMutation.isSuccess ? (
			<div className="mb-4 h-48">
				<div className="flex justify-center items-center mb-4 h-8">Rebooting...</div>
				<div className="flex justify-center items-center mb-4 h-48">
					<Spinner />
				</div>
			</div>
		) : Object.keys(apList).length === 0 ? (
			<div className="flex justify-center items-center mb-4 h-48">
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
				<div className="pb-5 mb-5 border-b border-gray-200">
					<h3 className="text-lg leading-6 font-medium text-gray-900">Configure Wifi Setup</h3>
					<p className="mt-2 max-w-4xl text-sm text-gray-500">{subtext}</p>
				</div>
				{content}
			</div>
			<StepNavButtons right={rightButton} left={leftButton} />
		</Fragment>
	);
};
