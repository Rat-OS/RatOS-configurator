'use client';
import { useCallback, useState } from 'react';
import { trpc } from '@/helpers/trpc';
import { MutationModal } from '@/components/common/mutation-modal';
import { MenubarItem } from '@/components/ui/menubar';
import { Link2, Zap } from 'lucide-react';

export const HelpActions = ({ className }: { className?: string }) => {
	const [isSymlinkModalOpen, setIsSymlinkModalOpen] = useState(false);
	const [isFlashModalOpen, setIsFlashModalOpen] = useState(false);
	const [flashModalContent, setFlashModalContent] = useState({
		title: '',
		children: null as React.ReactNode,
		dismissText: 'OK',
	});
	const [symlinkModalContent, setSymlinkModalContent] = useState({
		title: '',
		children: null as React.ReactNode,
		dismissText: 'OK',
	});

	const symlinkExtensions = trpc['klippy-extensions'].symlink.useMutation();
	const flashFirmware = trpc.mcu.flashAllConnected.useMutation();

	const symlinkModal = isSymlinkModalOpen ? (
		<MutationModal
			{...symlinkModalContent}
			setOpen={setIsSymlinkModalOpen}
			open={isSymlinkModalOpen}
			isFailed={symlinkExtensions.isError}
			isLoading={symlinkExtensions.isLoading}
		/>
	) : null;
	const flashModal = isFlashModalOpen ? (
		<MutationModal
			{...flashModalContent}
			setOpen={setIsFlashModalOpen}
			open={isFlashModalOpen}
			isFailed={flashFirmware.isError}
			isLoading={flashFirmware.isLoading}
		/>
	) : null;

	const onClickFlash = useCallback(() => {
		setFlashModalContent({
			title: 'Flash Firmware',
			children: <p>Please wait while RatOS is flashing your connected boards...</p>,
			dismissText: 'Please wait...',
		});
		setIsFlashModalOpen(true);
		flashFirmware.mutateAsync().then(
			(value) => {
				setFlashModalContent({
					title: 'Flashing Complete',
					children: <p dangerouslySetInnerHTML={{ __html: value.report.replace(/\n/g, '<br />') }} />,
					dismissText: 'OK',
				});
			},
			(value) => {
				setFlashModalContent({
					title: 'Flashing Failed',
					children:
						typeof value === 'string' || value instanceof String ? (
							<p dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br />') }} />
						) : (
							<p>Something wen't wrong while flashing the connected boards, please try again.</p>
						),
					dismissText: 'OK',
				});
			},
		);
	}, [flashFirmware]);

	const onClickSymlink = useCallback(() => {
		setSymlinkModalContent({
			title: 'Symlink Extensions',
			children: <p>Please wait while RatOS is symlinking klippy extensions...</p>,
			dismissText: 'Please wait...',
		});
		setIsSymlinkModalOpen(true);
		symlinkExtensions.mutateAsync({}).then(
			(value) => {
				setSymlinkModalContent({
					title: 'Symlink Complete',
					children: <p dangerouslySetInnerHTML={{ __html: value.report.replace(/\n/g, '<br />') }} />,
					dismissText: 'OK',
				});
			},
			(value) => {
				setSymlinkModalContent({
					title: 'Symlink Failed',
					children:
						typeof value === 'string' || value instanceof String ? (
							<p dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br />') }} />
						) : (
							<p>Something wen't wrong while symlinking the extensions, please try again.</p>
						),
					dismissText: 'OK',
				});
			},
		);
	}, [symlinkExtensions]);

	return (
		<>
			<MenubarItem onClick={onClickSymlink} className="gap-2">
				<Link2 className="h-4 w-4 text-zinc-400" /> Symlink Extensions
			</MenubarItem>
			<MenubarItem onClick={onClickFlash} className="gap-2">
				<Zap className="h-4 w-4 text-zinc-400" /> Flash Connected Boards
			</MenubarItem>
			{symlinkModal}
			{flashModal}
		</>
	);
};
