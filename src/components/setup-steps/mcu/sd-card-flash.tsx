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
import { useRecoilValue } from 'recoil';
import { trpc } from '../../../helpers/trpc';
import { MoonrakerQueryState } from '../../../hooks/useMoonraker';
import { Board } from '../../../server/router/mcu';
import { Button } from '../../button';
import { Modal } from '../../modal';
import { Spinner } from '../../spinner';

interface SDCardFlashingProps {
	board: Board;
	onSuccess?: () => void;
}

export const SDCardFlashing: React.FC<SDCardFlashingProps> = (props) => {
	const [shutdownModalVisible, setShutdownModalVisible] = useState(false);
	const moonrakerQuery = useRecoilValue(MoonrakerQueryState);
	const [isFirmwareReady, setIsFirmwareReady] = useState(false);
	const compile = trpc.useMutation('mcu.compile', {
		onSuccess: () => setIsFirmwareReady(true),
		onError: () => setIsFirmwareReady(false),
	});
	const shutdownMutation = useMutation<void, string>(() => {
		if (moonrakerQuery) {
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
			Compiling... <Spinner className="inline ml-1" noMargin={true} />
		</span>
	) : (
		<span>
			Compile firmware <PlayIcon className="h-5 w-5 inline" />
		</span>
	);

	return (
		<div className="space-y-4">
			<h3 className="text-xl font-medium text-gray-900">
				{props.board.manufacturer} {props.board.name} was not detected
			</h3>

			<Button
				color="brand"
				onClick={isFirmwareReady ? props.onSuccess : () => compile.mutate({ boardPath: props.board.path })}
				className="w-52 justify-center"
				disabled={compile.isLoading && !isFirmwareReady}
				href={isFirmwareReady ? '/api/download-firmware?boardPath=' + encodeURIComponent(props.board.path) : undefined}
			>
				{isFirmwareReady ? (
					<span>
						Download firmware <ArrowDownTrayIcon className="h-5 w-5 inline" />
					</span>
				) : (
					compileButton
				)}
			</Button>

			<div className="mt-4 prose text-base text-gray-500">
				<ol className="list-decimal pl-4 mb-4">
					<li>Disconnect all wires except Power and USB, and make sure your jumpers are set correctly.</li>
					<li>
						Format the sd card for your board to FAT16 (sometimes just called FAT), or FAT32 with a clustersize of 8kb
						or 4kb.
					</li>
					<li>Put it onto the sd card for your board</li>
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
				</ol>
				<Button color="gray" onClick={onShutdown}>
					Shutdown RatOS
				</Button>
			</div>
			{shutdownModalVisible ? (
				<Modal
					title="Shutdown RatOS?"
					body={`You raspberry pi will shutdown and this page will become unresponsive until it's powered back on. Do not remove power before the green light on the Rasperry Pi has stopped blinking.`}
					buttonLabel="Shutdown"
					onClick={shutdown}
				/>
			) : null}
		</div>
	);
};
