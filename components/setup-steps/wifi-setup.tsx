'use client';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { CardSelector, SelectableCard } from '@/components/card-selector';
import { Spinner } from '@/components/common/spinner';
import { ErrorMessage } from '@/components/common/error-message';
import { WifiIcon } from '@heroicons/react/24/solid';
import { TextInput } from '@/components/forms/text-input';
import { StepNavButton, StepNavButtons } from '@/components/step-nav-buttons';
import type { Network } from '@/server/helpers/iw';
import { Modal } from '@/components/common/modal';
import { parseSignal, signalIcon } from '@/helpers/wifi';
import { StepScreenProps } from '@/hooks/useSteps';
import { trpc } from '@/helpers/trpc';
import { hostnameInput, joinInput } from '@/helpers/validators/wifi';
import { Button } from '@/components/common/button';
import { Eye, EyeOff } from 'lucide-react';
import { InfoMessage } from '@/components/common/info-message';
import { MutationStatus } from '@/components/common/mutation-status';

interface APList {
	[id: string]: Network;
}

interface SelectableNetwork extends SelectableCard {
	id: string;
}

export const WifiSetup: React.FC<StepScreenProps> = (props) => {
	const timeoutRef = React.useRef<number | null>(null);
	const [isScanning, setIsScanning] = useState(true);
	const [apList, setApList] = useState<APList>({});
	const [selectedNetwork, setSelectedNetwork] = useState<null | Network>(null);
	const [password, setPassword] = useState('');
	const [hostname, setHostname] = useState('RatOS');
	const [hostnameCompleted, setHostnameCompleted] = useState(false);
	const [showHidden, setShowHidden] = useState(false);
	const [overrideSSID, setOverrideSSID] = useState<string | null>(null);

	const { isError, error, data } = trpc.wifi.scan.useQuery(
		{ showHidden },
		{
			refetchInterval: (data, query) => {
				if (query.state.error) {
					return false;
				}
				return 1000;
			},
			retry: false,
			enabled: isScanning && selectedNetwork == null,
		},
	);
	const hostnameMutation = trpc.wifi.hostname.useMutation();
	const wifiMutation = trpc.wifi.join.useMutation();

	useEffect(() => {
		// Cleanup
		return () => {
			if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
		};
	}, []);

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

	// Find all frequencies for SSID that are near the selected one.
	const frequencies = useMemo(
		() =>
			Object.values(apList)
				.filter(
					(ap) =>
						selectedNetwork != null &&
						ap.ssid === selectedNetwork.ssid &&
						Math.abs(ap.frequency - selectedNetwork?.frequency) < 1000,
				)
				.map((ap) => ap.frequency)
				.join(' '),
		[apList, selectedNetwork],
	);
	const hostnameValidation = hostnameInput.safeParse({ hostname });
	const passwordValidation = joinInput.safeParse({
		passphrase: password,
		ssid: selectedNetwork?.ssid ?? overrideSSID,
		country: selectedNetwork?.country,
		frequencies,
		hidden: selectedNetwork?.ssid == null,
	});

	const cards: SelectableNetwork[] = useMemo(() => {
		if (isError) return [];
		return Object.keys(apList)
			.filter((ap) => apList[ap].ssid != null || showHidden)
			.map((ap) => ({
				name: apList[ap].ssid?.trim() == '' ? 'Hidden SSID' : apList[ap].ssid ?? 'Hidden SSID',
				id: ap,
				details: (
					<div className="gap-4 md:grid md:grid-cols-2">
						<div className="md:col-span-1 2xl:flex 2xl:flex-col">
							<span className="font-semibold">Signal Strength:</span>{' '}
							<span className="whitespace-nowrap font-medium">{parseSignal(apList[ap].signal)}</span>
						</div>
						<div className="md:col-span-1 2xl:flex 2xl:flex-col">
							<span className="font-semibold">Frequency:</span>{' '}
							<span className="whitespace-nowrap font-medium text-zinc-300">
								{Math.round(apList[ap].frequency / 100) / 10}GHz
							</span>
						</div>
					</div>
				),
				right: signalIcon(apList[ap].signal),
			}))
			.sort((a, b) => {
				if (apList[a.id].signal > apList[b.id].signal) return -1;
				if (apList[a.id].signal < apList[b.id].signal) return 1;
				return 0;
			});
	}, [isError, apList, showHidden]);

	const onSelectCard = useCallback(
		(card: SelectableNetwork) => {
			setSelectedNetwork(apList[card.id]);
		},
		[apList],
	);

	const connectToWifi = useCallback(() => {
		if (selectedNetwork == null) {
			throw new Error('Cannot join wifi without selecting a network');
		}

		if (passwordValidation.success) {
			wifiMutation.mutate(passwordValidation.data);
		}
	}, [passwordValidation, selectedNetwork, wifiMutation]);

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
				<div className="mb-4 flex items-center justify-center font-bold text-zinc-900 dark:text-zinc-100">
					Rebooting...
				</div>
				<div className="mb-4 flex items-center justify-center  text-zinc-600 dark:text-zinc-400">
					<div>
						Please reconnect to {selectedNetwork?.ssid ?? 'your local network'} and visit{' '}
						<a href={`http://${hostname}.local/configure?step=1`} className="text-brand-600 dark:text-brand-400">
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
				value={hostname}
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
			<div className="grid gap-4">
				{selectedNetwork.ssid == null ? (
					<div className="mb-4">
						<InfoMessage title="Hidden SSID">
							You have selected a hidden SSID. Please enter the SSID and password manually.
						</InfoMessage>
					</div>
				) : (
					<div>
						<div className="mb-4 inline-flex gap-4 rounded-md border-2 border-brand-400/45 bg-brand-400/5 p-4">
							<div className="">{signalIcon(selectedNetwork.signal, 'h-12 w-12')}</div>
							<div className="flex flex-col gap-2 text-sm text-zinc-500 dark:text-zinc-400">
								<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">
									{selectedNetwork.ssid}
								</h3>
								{selectedNetwork.country} - {Math.round(selectedNetwork.frequency / 100) / 10}GHz
							</div>
						</div>
					</div>
				)}
				{selectedNetwork.ssid == null ||
					(selectedNetwork.ssid.trim() === '' && (
						<TextInput
							label="SSID"
							type="text"
							key="ssid"
							value={overrideSSID ?? ''}
							error={
								wifiMutation.isError
									? wifiMutation.error.message
									: passwordValidation.success
										? undefined
										: passwordValidation.error.formErrors.fieldErrors.ssid?.join('\n')
							}
							onChange={setOverrideSSID}
						/>
					))}
				<TextInput
					label={selectedNetwork.security.toLocaleUpperCase() + ' Password'}
					type="password"
					key="password"
					value={password}
					error={
						wifiMutation.isError
							? wifiMutation.error.message
							: passwordValidation.success
								? undefined
								: passwordValidation.error.formErrors.fieldErrors.passphrase?.join('\n')
					}
					onChange={(val) => setPassword(val + '')}
				/>
			</div>
		) : isError ? (
			<div className="mb-4 h-48">
				<ErrorMessage title="Unable to scan for wifi access points">{error?.message}</ErrorMessage>
			</div>
		) : Object.keys(apList).length === 0 || !isScanning ? (
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
			label: 'Submit',
			disabled: !passwordValidation.success || wifiMutation.isLoading,
			isLoading: wifiMutation.isLoading,
			title: !passwordValidation.success
				? passwordValidation.error.errors
						.map((e) => (['ssid', 'password'].includes(e.path.pop() + '') ? null : `${e.path}: ${e.message}`))
						.filter(Boolean)
						.join('\n')
				: undefined,
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
				<div className="mb-5 flex border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<div className="flex-1">
						<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">Configure Wifi Setup</h3>
						<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">{subtext}</p>
					</div>
					{selectedNetwork == null && (
						<div>
							<Button
								variant="indeterminate"
								onClick={() => {
									// Disable fetching
									setIsScanning(false);
									setShowHidden((org) => !org);
									// wait for current scans to complete
									if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
									timeoutRef.current = window.setTimeout(() => {
										setApList({});
										setIsScanning(true);
										timeoutRef.current = null;
									}, 4000);
								}}
							>
								{showHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}{' '}
								{showHidden ? 'Hide Hidden SSIDs' : 'Show Hidden SSIDs'}
							</Button>
						</div>
					)}
				</div>
				<MutationStatus {...wifiMutation} />
				<MutationStatus {...hostnameMutation} />
				{content}
			</div>
			<StepNavButtons right={rightButton} left={leftButton} />
		</Fragment>
	);
};
