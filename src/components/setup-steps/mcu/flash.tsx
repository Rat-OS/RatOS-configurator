import { CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Fragment, useCallback, useState } from 'react';
import { trpc } from '../../../helpers/trpc';
import { Button } from '../../button';
import { MutationStatus } from '../../common/mutation-status';
import { InfoMessage } from '../../info-message';
import { Spinner } from '../../spinner';
import { StepNavButton, StepNavButtons } from '../../step-nav-buttons';
import { WarningMessage } from '../../warning-message';
import { MCUStepScreenProps } from '../mcu-preparation';
import { DFUFlash } from './dfu-flash';
import { SDCardFlashing } from './sd-card-flash';

export const MCUFlashing = (props: MCUStepScreenProps) => {
	const [forceReflash, setForceReflash] = useState(false);
	const [flashStrategy, setFlashStrategy] = useState<null | 'dfu' | 'sdcard' | 'path'>(null);
	const { data: isBoardDetected, ...mcuDetect } = trpc.useQuery(
		['mcu.detect', { boardPath: props.selectedBoard?.board.path ?? '' }],
		{
			refetchInterval: 1000,
			enabled: props.selectedBoard !== null,
		},
	);
	const {
		data: boardVersion,
		isLoading: isBoardVersionLoading,
		...mcuBoardVersion
	} = trpc.useQuery(['mcu.board-version', { boardPath: props.selectedBoard?.board.path ?? '' }], {
		enabled: props.selectedBoard !== null && !!isBoardDetected && forceReflash === false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});
	const { data: klipperVersion } = trpc.useQuery(['klipper-version'], {
		refetchInterval: 60000,
	});
	const flashViaPath = trpc.useMutation('mcu.flash-via-path', { onSuccess: () => setForceReflash(false) });

	const reflash = useCallback(() => {
		setFlashStrategy(null);
		setForceReflash(true);
		mcuDetect.remove();
		mcuBoardVersion.remove();
	}, [mcuBoardVersion, mcuDetect]);

	let rightButton: StepNavButton = {
		onClick: props.nextScreen,
		label: 'Next',
		disabled: !isBoardDetected || !!mcuBoardVersion.error || forceReflash,
	};
	let leftButton: StepNavButton = {
		onClick: props.previousScreen,
	};

	const firstBoard = props.selectedBoard?.board;

	const onFlashViaPath = useCallback(() => {
		if (firstBoard == null) return;
		setFlashStrategy('path');
		flashViaPath.mutate({ boardPath: firstBoard.path });
	}, [flashViaPath, firstBoard?.path]);

	let content = null;
	if (mcuBoardVersion.error && !forceReflash) {
		content = (
			<Fragment>
				<h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
					{firstBoard?.name} detected but is unresponsive.
				</h3>
				<p>
					Klipper doesn't seem to be running on your board, which may indicate faulty firmware or a faulty board. Please
					check your board and try flashing it again.
				</p>
				<p>
					<button color="gray" className="text-brand-700 hover:text-brand-600" onClick={reflash}>
						flash again <ArrowPathIcon className="h-5 w-5 inline" />
					</button>
				</p>
			</Fragment>
		);
	} else if (isBoardVersionLoading && !mcuBoardVersion.isIdle) {
		content = (
			<Fragment>
				<h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
					<Spinner className="inline relative -top-0.5 mr-2" noMargin={true} /> {firstBoard?.name} detected, checking
					version...
				</h3>
				<p>Please wait while RatOS queries your board..</p>
			</Fragment>
		);
	} else if (boardVersion || (isBoardDetected && !forceReflash)) {
		const jumperReminder =
			flashStrategy === 'dfu' && firstBoard?.dfu?.reminder ? (
				<InfoMessage title="Reminder">{firstBoard?.dfu?.reminder}</InfoMessage>
			) : null;
		const versionMismatch =
			boardVersion != null && klipperVersion != null && boardVersion !== klipperVersion ? (
				<WarningMessage title="Version mismatch">
					The board is running version {boardVersion} but you your pi is on version {klipperVersion}. If you want to
					update your board click 'flash again' below.
				</WarningMessage>
			) : null;
		content = (
			<Fragment>
				<h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
					<CheckCircleIcon className="text-brand-700 h-7 w-7 inline relative -top-0.5" /> {firstBoard?.name} detected
				</h3>
				{jumperReminder}
				{versionMismatch}
				<p>
					Proceed to the next step or{' '}
					<button color="gray" className="text-brand-700 hover:text-brand-600" onClick={reflash}>
						flash again <ArrowPathIcon className="h-5 w-5 inline" />
					</button>
				</p>
			</Fragment>
		);
	} else if (flashStrategy == null) {
		let dfu = null;
		let sdCard = null;
		let path = null;
		if (firstBoard?.dfu != null) {
			dfu = (
				<Button color="gray" onClick={() => setFlashStrategy('dfu')} className="justify-center">
					Flash manually via DFU
				</Button>
			);
		}
		if (!firstBoard?.isToolboard) {
			sdCard = (
				<Button color="gray" onClick={() => setFlashStrategy('sdcard')} className="justify-center">
					Flash manually via SD card
				</Button>
			);
		}
		if (isBoardDetected && firstBoard?.flashScript != null) {
			path = (
				<Button color="gray" onClick={onFlashViaPath} className="justify-center">
					Flash automatically
				</Button>
			);
		}
		content = (
			<Fragment>
				<h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
					How do you want to flash your {firstBoard?.name}?
				</h3>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
					{path}
					{dfu}
					{sdCard}
				</div>
			</Fragment>
		);
	} else {
		if (firstBoard == null) {
			content = (
				<div>
					<div className="mt-4 prose text-base text-red-700">You have to select a board before navigating to this screen.</div>
				</div>
			);
		} else {
			switch (flashStrategy) {
				case 'dfu':
					content = <DFUFlash board={firstBoard} onSuccess={() => setForceReflash(false)} />;
					break;
				case 'sdcard':
					content = <SDCardFlashing board={firstBoard} onSuccess={() => setForceReflash(false)} />;
					break;
				case 'path':
					content = (
						<div>
							<h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">Flashing {firstBoard.name}...</h3>
							<div className="mt-4 prose text-base text-zinc-500">Please wait while RatOS flashes your board.</div>
							<MutationStatus {...flashViaPath} />
						</div>
					);
			}
		};
	}
	return (
		<Fragment>
			<div className="p-8">
				{' '}
				<div className="pb-5 mb-5 border-b border-zinc-200 dark:border-zinc-700">
					<h3 className="text-lg leading-6 font-medium text-zinc-900 dark:text-zinc-100">{props.name}</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">{props.description}</p>
				</div>
				<div className="space-y-4">{content}</div>
			</div>
			<StepNavButtons right={rightButton} left={leftButton} />
		</Fragment>
	);
};
