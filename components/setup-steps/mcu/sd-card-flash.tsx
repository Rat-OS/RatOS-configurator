/**
 * 1) Check if board is already flashed and connected, if yes proceed to ?.
 * 2) Compile firmware for board and start download (if flash via sd card)
 * 3) Tell the user to follow the flashing instructions at os.ratrig.com. Poll board serial path in the background. Show tips about flashing.
 * 4) Once board presence is confirmed, verify automatic flashing if supported. (allow skipping)
 * 5) Printer configuration!
 */

import { ArrowDownTrayIcon, PlayIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { trpc } from '../../../helpers/trpc';
import { Button } from '../../button';
import { Modal } from '../../modal';
import { Spinner } from '../../spinner';
import { useMoonraker } from '../../../hooks/useMoonraker';
import { Board } from '../../../zods/boards';

interface SDCardFlashingProps {
	board: Board;
	onSuccess?: () => void;
}

export const SDCardFlashing: React.FC<SDCardFlashingProps> = (props) => {
	const [shutdownModalVisible, setShutdownModalVisible] = useState(false);
	const { query: moonrakerQuery, isReady } = useMoonraker();
	const [isFirmwareReady, setIsFirmwareReady] = useState(false);
	const compile = trpc.mcu.compile.useMutation({
		onSuccess: () => setIsFirmwareReady(true),
		onError: () => setIsFirmwareReady(false),
	});
	const shutdownMutation = useMutation<void, string>(() => {
		if (isReady) {
			return moonrakerQuery('machine.shutdown');
		}
		return Promise.reject('Cannot reboot raspberry pi: No connection to moonraker');
	});

	const shutdown = () => {
		shutdownMutation.mutate();
	};
	const onShutdown = () => {
		setShutdownModalVisible(true);
	};

	const compileButton = compile.isLoading ? (
		<span>
			Compiling... <Spinner className="ml-1 inline" noMargin={true} />
		</span>
	) : (
		<span>
			Compile firmware <PlayIcon className="inline h-5 w-5" />
		</span>
	);

	return (
		<div className="space-y-4">
			<h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
				{props.board.manufacturer} {props.board.name} was not detected
			</h3>

			<Button
				color="brand"
				onClick={isFirmwareReady ? undefined : () => compile.mutate({ boardPath: props.board.path })}
				className="w-52 justify-center"
				disabled={compile.isLoading && !isFirmwareReady}
				href={isFirmwareReady ? '/api/download-firmware?boardPath=' + encodeURIComponent(props.board.path) : undefined}
			>
				{isFirmwareReady ? (
					<span>
						Download firmware <ArrowDownTrayIcon className="inline h-5 w-5" />
					</span>
				) : (
					compileButton
				)}
			</Button>

			<div className="prose mt-4 text-base text-zinc-500 dark:text-zinc-400">
				<ol className="mb-4 list-decimal pl-4">
					<li>Disconnect all wires except Power and USB, and make sure your jumpers are set correctly.</li>
					<li>
						Format the sd card for your board to FAT16 (sometimes just called FAT), or FAT32 with a clustersize of 8kb
						or 4kb.
					</li>
					<li>
						If you're reusing a card you've used for flashing before, be sure to delete ALL files on the card (or
						reformat it).
					</li>
					<li>Copy the firmware binary onto the sd card for your board</li>
					<li>
						Make sure the firmware file is called firmware.bin on the sd card (enable "display file extensions" in your
						file explorer). The file you downloaded will already have the correct name.
					</li>
					<li>Safely eject the SD card through your operating system.</li>
					<li>Physically take out the sd card and insert it into your control board.</li>
					<li>
						Click the reset button on the board, or turn it off and back on again. NOTE: if the Raspberry Pi running
						RatOS is currently powered by your control board or the same power source, please shut it down safely first
						by using the button below. When the green light stops blinking and is turned off, you can cut the power.
					</li>
					<li>Click "Check board status" below.</li>
				</ol>
				<div className="flex gap-x-4">
					<Button color="gray" onClick={onShutdown}>
						Shutdown RatOS
					</Button>
					<Button color="brand" onClick={props.onSuccess}>
						Check board status
					</Button>
				</div>
			</div>
			{shutdownModalVisible ? (
				<Modal
					title="Shutdown RatOS?"
					body={`You raspberry pi will shutdown and this page will become unresponsive until it's powered back on. Do not remove power before the green light on the Rasperry Pi has stopped blinking.`}
					buttonLabel="Shutdown"
					onClick={shutdown}
					onClose={() => setTimeout(() => setShutdownModalVisible(false), 500)}
				/>
			) : null}
		</div>
	);
};
