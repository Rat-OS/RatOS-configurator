'use client';
import { useCallback, useState } from 'react';
import { trpc } from '@/helpers/trpc';
import { MenubarItem } from '@/components/ui/menubar';
import { Code, Link2, Zap } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { LoadablePrinterConfigurationState } from '@/hooks/usePrinterConfiguration';
import { Modal, ModalProps } from '@/components/common/modal';
import { ErrorMessage } from '@/components/common/error-message';
import { InfoMessage } from '@/components/common/info-message';
import { Banner } from '@/components/common/banner';

export const useHelpActions = () => {
	const [isSymlinkModalOpen, setIsSymlinkModalOpen] = useState(false);
	const [isFlashModalOpen, setIsFlashModalOpen] = useState(false);
	const [isBeaconModalOpen, setIsBeaconModalOpen] = useState(false);
	const [flashModalContent, setFlashModalContent] = useState<ModalProps>({
		title: '',
		body: '',
		content: null,
		dismissText: 'OK',
		dismissVariant: 'primary',
	});
	const [symlinkModalContent, setSymlinkModalContent] = useState<ModalProps>({
		title: '',
		body: '',
		content: null,
		dismissText: 'OK',
		dismissVariant: 'primary',
	});
	const [beaconModalContent, setBeaconModalContent] = useState<ModalProps>({
		title: '',
		body: '',
		content: null,
		dismissText: 'OK',
		dismissVariant: 'primary',
	});

	const printerConfigState = useRecoilValue(LoadablePrinterConfigurationState);

	const symlinkExtensions = trpc['klippy-extensions'].symlink.useMutation();
	const flashFirmware = trpc.mcu.flashAllConnected.useMutation();
	const flashBeacon = trpc.printer.flashBeacon.useMutation();

	const symlinkModal = isSymlinkModalOpen ? (
		<Modal
			{...symlinkModalContent}
			onClose={() => setTimeout(() => setIsSymlinkModalOpen(false), 250)}
			success={!symlinkExtensions.isError}
			isLoading={symlinkExtensions.isLoading}
		/>
	) : null;
	const flashModal = isFlashModalOpen ? (
		<Modal
			{...flashModalContent}
			onClose={() => setTimeout(() => setIsFlashModalOpen(false), 250)}
			success={!flashFirmware.isError}
			isLoading={flashFirmware.isLoading}
		/>
	) : null;
	const beaconModal = isBeaconModalOpen ? (
		<Modal
			{...beaconModalContent}
			onClose={() => setTimeout(() => setIsBeaconModalOpen(false), 250)}
			success={!flashBeacon.isError}
			isLoading={flashBeacon.isLoading}
		/>
	) : null;

	const onClickFlash = useCallback(() => {
		setFlashModalContent({
			title: 'Flash Firmware',
			body: 'Please wait while RatOS is flashing your connected boards...',
			dismissText: 'Close',
			dismissVariant: 'primary',
		});
		setIsFlashModalOpen(true);
		flashFirmware.mutateAsync().then(
			(value) => {
				setIsFlashModalOpen(true);
				setFlashModalContent({
					title: 'Flashing Complete',
					body: 'The connected boards have been flashed successfully.',
					content: (
						<Banner title="Script output" color="gray" className="whitespace-pre-wrap" Icon={Code}>
							{value.report}
						</Banner>
					),
					dismissText: 'OK',
					dismissVariant: 'primary',
				});
			},
			(e) => {
				setIsFlashModalOpen(true);
				setFlashModalContent({
					title: 'Flashing Failed',
					body: "Something wen't wrong while flashing the connected boards, please try again.",
					content: <ErrorMessage>{e != null && 'message' in e ? e.message : 'Unknown error'}</ErrorMessage>,
					dismissText: 'OK',
					dismissVariant: 'primary',
				});
			},
		);
	}, [flashFirmware]);

	const onClickSymlink = useCallback(() => {
		setSymlinkModalContent({
			title: 'Symlink Extensions',
			body: 'Please wait while RatOS is symlinking klippy extensions...',
			dismissText: 'Close',
			dismissVariant: 'primary',
		});
		setIsSymlinkModalOpen(true);
		symlinkExtensions.mutateAsync({}).then(
			(value) => {
				setIsSymlinkModalOpen(true);
				setSymlinkModalContent({
					title: 'Symlink Complete',
					body: 'The klippy extensions have been symlinked successfully.',
					content: (
						<Banner title="Script output" color="gray" className="whitespace-pre-wrap" Icon={Code}>
							{value.report}
						</Banner>
					),
					dismissText: 'OK',
					dismissVariant: 'primary',
				});
			},
			(e) => {
				setIsSymlinkModalOpen(true);
				setSymlinkModalContent({
					title: 'Symlink Failed',
					body: "Something wen't wrong while symlinking the klippy extensions, please try again.",
					content: <ErrorMessage>{e != null && 'message' in e ? e.message : 'Unknown error'}</ErrorMessage>,
					dismissText: 'OK',
					dismissVariant: 'primary',
				});
			},
		);
	}, [symlinkExtensions]);

	const onClickBeaconFlash = useCallback(
		(e: React.MouseEvent) => {
			setBeaconModalContent({
				title: 'Flashing Beacon Firmware',
				body: 'Please wait while RatOS runs the beacon update script...',
				dismissText: 'Close',
			});
			setIsBeaconModalOpen(true);
			flashBeacon.mutateAsync().then(
				(value) => {
					setIsBeaconModalOpen(true);
					setBeaconModalContent({
						title: 'Flashing Complete',
						body: 'The beacon firmware script completed succesfully.',
						content: (
							<Banner title="Script output" color="gray" className="whitespace-pre-wrap" Icon={Code}>
								<div className="whitespace-pre-wrap font-mono">{value}</div>
							</Banner>
						),
						dismissText: 'OK',
						dismissVariant: 'primary',
					});
				},
				(e) => {
					setIsBeaconModalOpen(true);
					setBeaconModalContent({
						title: 'Flashing Failed',
						body: "Something wen't wrong while flashing the beacon firmware, please try again.",
						content: (
							<ErrorMessage>
								<div className="font-mono">{e != null && 'message' in e ? e.message : 'Unknown error'}</div>
							</ErrorMessage>
						),
						dismissText: 'OK',
						dismissVariant: 'primary',
					});
				},
			);
		},
		[flashBeacon],
	);

	return {
		menuItems: (
			<>
				<MenubarItem onClick={onClickSymlink} className="gap-2">
					<Link2 className="h-4 w-4 text-zinc-400" /> Symlink Extensions
				</MenubarItem>
				<MenubarItem onClick={onClickFlash} className="gap-2">
					<Zap className="h-4 w-4 text-zinc-400" /> Flash Connected Boards
				</MenubarItem>
				{printerConfigState?.toolheads?.some((toolhead) => toolhead?.probe?.id === 'beacon') && (
					<MenubarItem onClick={onClickBeaconFlash} className="gap-2">
						<Zap className="h-4 w-4 text-zinc-400" /> Flash Beacon Firmware
					</MenubarItem>
				)}
			</>
		),
		modals: (
			<>
				{symlinkModal}
				{flashModal}
				{beaconModal}
			</>
		),
	};
};
