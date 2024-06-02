import { CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Fragment, useCallback, useState } from 'react';
import { trpc } from '@/helpers/trpc';
import { Button } from '@/components/common/button';
import { MutationStatus } from '@/components/common/mutation-status';
import { InfoMessage } from '@/components/common/info-message';
import { Spinner } from '@/components/common/spinner';
import { StepNavButton, StepNavButtons } from '@/components/step-nav-buttons';
import { WarningMessage } from '@/components/warning-message';
import { MCUStepScreenProps } from '@/components/setup-steps/mcu-preparation';
import { DFUFlash } from '@/components/setup-steps/mcu/dfu-flash';
import { SDCardFlashing } from '@/components/setup-steps/mcu/sd-card-flash';
import { Card } from '@/components/common/card';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, FileQuestion, MemoryStick, RefreshCcw, ToyBrick, Zap } from 'lucide-react';
import { Badge } from '@/components/common/badge';

export const MCUFlashing = (props: MCUStepScreenProps) => {
	const [forceReflash, setForceReflash] = useState(false);
	const [flashStrategy, setFlashStrategy] = useState<null | 'dfu' | 'sdcard' | 'path'>(null);
	const [flashPath, setFlashPath] = useState<string | null>(null);
	const { selectedControlboard, selectedToolboard, toolhead } = props;
	const selectedBoardToFlash = toolhead ? selectedToolboard : selectedControlboard;
	const selectedBoard = selectedBoardToFlash;
	const boardDetected = trpc.mcu.detect.useQuery(
		{ boardPath: selectedBoardToFlash?.path ?? '', toolhead: toolhead?.serialize() },
		{
			refetchInterval: (data) => {
				if (data === true) {
					return false;
				}
				return 1000;
			},
			enabled: selectedBoardToFlash !== null,
		},
	);
	const unidentifiedBoards = trpc.mcu.unidentifiedDevices.useQuery({ toolhead: toolhead?.serialize() });
	const boardVersion = trpc.mcu.boardVersion.useQuery(
		{ boardPath: selectedBoardToFlash?.path ?? '', toolhead: toolhead?.serialize() },
		{
			enabled: selectedBoardToFlash !== null && !!boardDetected.data && forceReflash === false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
		},
	);
	const { data: klipperVersion } = trpc.klipperVersion.useQuery(undefined, {
		refetchInterval: 60000,
	});
	const flashViaPath = trpc.mcu.flashViaPath.useMutation({ onSuccess: () => setForceReflash(false) });

	const reflash = useCallback(() => {
		setFlashStrategy(null);
		setForceReflash(true);
		setFlashPath(null);
		boardDetected.remove();
		boardVersion.remove();
	}, [boardVersion, boardDetected]);

	const recheck = useCallback(() => {
		boardVersion.refetch();
	}, [boardVersion]);

	let rightButton: StepNavButton = {
		onClick: props.nextScreen,
		label: 'Next',
		disabled: !boardDetected.data || forceReflash,
	};
	let leftButton: StepNavButton = {
		onClick: props.previousScreen,
	};

	const onFlashViaPath = useCallback(() => {
		if (selectedBoard == null) return;
		setFlashStrategy('path');
		flashViaPath.mutate({ boardPath: selectedBoard.path, toolhead: toolhead?.serialize() });
	}, [flashViaPath, selectedBoard, toolhead]);

	let content = null;
	if (boardVersion.error && !forceReflash) {
		content = (
			<Fragment>
				<h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
					{selectedBoard?.name} detected but is unresponsive.
				</h3>
				<p>
					Klipper doesn't seem to be running on your board, which may indicate faulty firmware or a faulty board. Try
					hitting the reset button on your board, and click "Check Again" below.
				</p>
				<p>If it keeps failing, please check your board and try flashing it again.</p>
				<p className="flex justify-start gap-4">
					<Button variant="indeterminate" onClick={recheck}>
						<RefreshCcw className="h-5 w-5" />
						<span>Check again</span>
					</Button>
					<Button variant="indeterminate" onClick={reflash}>
						<Zap className="h-5 w-5" />
						<span>Flash again</span>
					</Button>
				</p>
			</Fragment>
		);
	} else if (boardVersion.isFetching) {
		content = (
			<Fragment>
				<h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
					<Spinner className="relative -top-0.5 mr-2 inline" noMargin={true} /> {selectedBoard?.name} detected, checking
					version...
				</h3>
				<p>Please wait while RatOS queries your board..</p>
			</Fragment>
		);
	} else if (boardVersion.data || (boardDetected.data && !forceReflash)) {
		const dfuReminder =
			flashStrategy === 'dfu' && selectedBoard?.dfu?.reminder ? (
				<InfoMessage title="Reminder">{selectedBoard?.dfu?.reminder}</InfoMessage>
			) : null;
		const versionMismatch =
			boardVersion.data != null && klipperVersion != null && boardVersion.data !== klipperVersion ? (
				<WarningMessage title="Version mismatch">
					The board is running version {boardVersion.data} but you your pi is on version {klipperVersion}. If you want
					to update your board click 'flash again' below.
				</WarningMessage>
			) : null;
		content = (
			<Fragment>
				<h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
					<CheckCircleIcon className="relative -top-0.5 inline h-7 w-7 text-brand-700 dark:text-brand-500" />{' '}
					{selectedBoard?.name} detected
				</h3>
				{dfuReminder}
				{versionMismatch}
				<p>
					Proceed to the next step or{' '}
					<Button variant="indeterminate" onClick={reflash}>
						<span>Flash again</span> <ArrowPathIcon className="inline h-5 w-5" />
					</Button>
				</p>
			</Fragment>
		);
	} else if (flashStrategy == null) {
		const dfuStrategyEnabled = selectedBoard?.dfu != null;
		const sdCardStrategyEnabled = !selectedBoard?.isToolboard;
		const pathStrategyEnabled = boardDetected.data && selectedBoard?.flashScript != null;
		const unidentifiedPathStrategyEnabled = unidentifiedBoards.data?.length;
		const dfu = (
			<Card className="flex flex-col justify-between">
				<CardHeader>
					<CardTitle className="flex items-center justify-between gap-2">
						Manual flashing using DFU
						{!dfuStrategyEnabled ? (
							<Badge color="yellow">Unavailable</Badge>
						) : !pathStrategyEnabled && dfuStrategyEnabled ? (
							<Badge color="lime">Recommended</Badge>
						) : null}
					</CardTitle>
					<CardDescription>
						Flash the board by manually placing a boot jumper or clicking boot and reset buttons on your board.
						Instructions will be provided on the next page.
					</CardDescription>
				</CardHeader>
				<CardContent className="text-right xl:text-left">
					<Button
						variant="indeterminate"
						onClick={() => setFlashStrategy('dfu')}
						disabled={!dfuStrategyEnabled}
						className="justify-endt"
						title={dfuStrategyEnabled ? undefined : 'This board does not support DFU flashing.'}
					>
						<ToyBrick className="size-4" />
						Flash manually via DFU
					</Button>
				</CardContent>
			</Card>
		);
		const sdCard = (
			<Card className="flex flex-col justify-between">
				<CardHeader>
					<CardTitle>Manual flashing using an SD-card</CardTitle>
					<CardDescription>
						Flash the board by placing the firmware on an SD-card and inserting it into the board. Instructions will be
						provided on the next page.
					</CardDescription>
					<CardDescription className="text-sky-300/50">
						This method is generally not recommended unless other methods aren't available.
					</CardDescription>
				</CardHeader>
				<CardContent className="text-right xl:text-left">
					<Button
						variant="indeterminate"
						onClick={() => setFlashStrategy('sdcard')}
						disabled={!sdCardStrategyEnabled}
						className="justify-center"
						title={sdCardStrategyEnabled ? undefined : 'This board does not support SD card flashing.'}
					>
						<MemoryStick className="size-4" />
						Flash manually via SD card
					</Button>
				</CardContent>
			</Card>
		);
		const path = (
			<Card className="flex flex-col justify-between">
				<CardHeader>
					<CardTitle className="flex items-center justify-between gap-2">
						Automated flashing
						{!pathStrategyEnabled ? <Badge color="yellow">Unavailable</Badge> : <Badge color="lime">Recommended</Badge>}
					</CardTitle>
					<CardDescription>
						If RatOS has already detected your board, it can be flashed automatically. This is the fastest and easiest
						method.
					</CardDescription>
				</CardHeader>
				<CardContent className="text-right xl:text-left">
					<Button
						variant="indeterminate"
						onClick={onFlashViaPath}
						disabled={!pathStrategyEnabled}
						className="justify-center"
						title={pathStrategyEnabled ? undefined : 'Board was not detected.'}
					>
						<Zap className="size-4" />
						Flash automatically
					</Button>
				</CardContent>
			</Card>
		);
		const unidentifiedPath = (
			<Card className="flex flex-col justify-between">
				<CardHeader>
					<CardTitle className="flex items-center justify-between gap-2">
						Flash unidentified board
						{!unidentifiedPathStrategyEnabled && (
							<Badge color="yellow" className="mr-1">
								Unavailable
							</Badge>
						)}
					</CardTitle>
					<CardDescription>
						If RatOS detects any boards that are already running klipper but not managed by RatOS, their device path
						will be listed here. These will flash automatically, but make sure you pick the right one. If you're unsure
						what to pick, choose one of the other methods.
					</CardDescription>
				</CardHeader>
				<CardContent className="text-right xl:text-left">
					<Button
						variant="indeterminate"
						className="justify-center"
						disabled={!unidentifiedPathStrategyEnabled}
						title={unidentifiedPathStrategyEnabled ? undefined : 'No unidentified boards detected.'}
						dropdownItems={unidentifiedBoards.data?.map((ub) => ({
							onClick: () => {
								if (selectedBoard == null) return;
								setFlashStrategy('path');
								setFlashPath(ub);
								flashViaPath.mutate({ boardPath: selectedBoard.path, flashPath: ub, toolhead: toolhead?.serialize() });
							},
							title: ub,
						}))}
					>
						<FileQuestion className="size-4" />
						Flash unidentified board
					</Button>
				</CardContent>
			</Card>
		);
		content = (
			<Fragment>
				<h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
					How do you want to flash your {selectedBoard?.name}?
				</h3>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 xl:grid-cols-2">
					{path}
					{dfu}
					{sdCard}
					{unidentifiedPath}
				</div>
			</Fragment>
		);
	} else {
		if (selectedBoard == null) {
			content = (
				<div>
					<div className="prose mt-4 text-base text-red-700">
						You have to select a board before navigating to this screen.
					</div>
				</div>
			);
		} else {
			switch (flashStrategy) {
				case 'dfu':
					content = <DFUFlash board={selectedBoard} onSuccess={() => setForceReflash(false)} toolhead={toolhead} />;
					break;
				case 'sdcard':
					content = (
						<SDCardFlashing board={selectedBoard} onSuccess={() => setForceReflash(false)} toolhead={toolhead} />
					);
					break;
				case 'path':
					content = (
						<div>
							<h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
								Flashing {selectedBoard.name}
								{flashPath ? ` at ${flashPath}` : ''}...
							</h3>
							<div className="prose mt-4 text-base text-zinc-500">Please wait while RatOS flashes your board.</div>
							<MutationStatus {...flashViaPath} />
						</div>
					);
			}
		}
	}
	return (
		<Fragment>
			<div className="p-8">
				{' '}
				<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">{props.name}</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">{props.description}</p>
				</div>
				<div className="space-y-4 text-zinc-700 dark:text-zinc-300">
					{props.children}
					{content}
				</div>
			</div>
			<StepNavButtons right={rightButton} left={leftButton} />
		</Fragment>
	);
};
