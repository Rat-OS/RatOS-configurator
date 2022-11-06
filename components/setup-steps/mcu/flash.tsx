import { CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Fragment, useCallback, useState } from 'react';
import { trpc } from '../../../helpers/trpc';
import { Button } from '../../button';
import { MutationStatus } from '../../common/mutation-status';
import { InfoMessage } from '../../info-message';
import { StepNavButton, StepNavButtons } from '../../step-nav-buttons';
import { MCUStepScreenProps } from '../mcu-preparation';
import { DFUFlash } from './dfu-flash';
import { SDCardFlashing } from './sd-card-flash';

export const MCUFlashing = (props: MCUStepScreenProps) => {
	const { data: isBoardDetected } = trpc.useQuery(['mcu.detect', { boardPath: props.selectedBoards[0].board.path }], {
		refetchInterval: 1000,
	});
	const [forceReflash, setForceReflash] = useState(false);
	const [flashStrategy, setFlashStrategy] = useState<null | 'dfu' | 'sdcard' | 'path'>(null);
	const flashViaPath = trpc.useMutation('mcu.flash-via-path', { onSuccess: () => setForceReflash(false) });

	const reflash = useCallback(() => {
		console.log('reflash!');
		setFlashStrategy(null);
		setForceReflash(true);
	}, []);

	let rightButton: StepNavButton = {
		onClick: props.nextScreen,
		label: 'Next',
		disabled: !isBoardDetected || forceReflash,
	};
	let leftButton: StepNavButton = {
		onClick: props.previousScreen,
	};

	const firstBoard = props.selectedBoards[0].board;

	const onFlashViaPath = useCallback(() => {
		setFlashStrategy('path');
		flashViaPath.mutate({ boardPath: firstBoard.path });
	}, [flashViaPath, firstBoard.path]);

	let content = null;

	if (isBoardDetected && !forceReflash) {
		const jumperReminder =
			flashStrategy === 'dfu' && firstBoard.dfu?.reminder ? (
				<InfoMessage title="Reminder">{firstBoard.dfu?.reminder}</InfoMessage>
			) : null;
		content = (
			<Fragment>
				<h3 className="text-xl font-medium text-gray-900">
					<CheckCircleIcon className="text-brand-700 h-7 w-7 inline" /> {firstBoard.name} detected
				</h3>
				{jumperReminder}
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
		if (firstBoard.dfu != null) {
			dfu = (
				<Button color="gray" onClick={() => setFlashStrategy('dfu')} className="justify-center">
					Flash manually via DFU
				</Button>
			);
		}
		if (!firstBoard.isToolboard) {
			sdCard = (
				<Button color="gray" onClick={() => setFlashStrategy('sdcard')} className="justify-center">
					Flash manually via SD card
				</Button>
			);
		}
		if (isBoardDetected && firstBoard.flashScript != null) {
			path = (
				<Button color="gray" onClick={onFlashViaPath} className="justify-center">
					Flash automatically
				</Button>
			);
		}
		content = (
			<Fragment>
				<h3 className="text-xl font-medium text-gray-900">How do you want to flash your {firstBoard.name}?</h3>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
					{path}
					{dfu}
					{sdCard}
				</div>
			</Fragment>
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
						<h3 className="text-xl font-medium text-gray-900">Flashing {firstBoard.name}...</h3>
						<div className="mt-4 prose text-base text-gray-500">Please wait while RatOS flashes your board.</div>
						<MutationStatus {...flashViaPath} />
					</div>
				);
		}
	}
	return (
		<Fragment>
			<div className="p-8">
				{' '}
				<div className="pb-5 mb-5 border-b border-gray-200">
					<h3 className="text-lg leading-6 font-medium text-gray-900">{props.name}</h3>
					<p className="mt-2 max-w-4xl text-sm text-gray-500">{props.description}</p>
				</div>
				<div className="space-y-4">{content}</div>
			</div>
			<StepNavButtons right={rightButton} left={leftButton} />
		</Fragment>
	);
};
