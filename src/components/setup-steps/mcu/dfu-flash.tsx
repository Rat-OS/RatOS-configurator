/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { trpc } from '../../../helpers/trpc';
import { Board } from '../../../server/routers/mcu';
import { Button } from '../../button';
import { ErrorMessage } from '../../error-message';
import { InfoMessage } from '../../info-message';

interface DFUFlashProps {
	board: Board;
	onSuccess?: () => void;
}

export const DFUFlash: React.FC<DFUFlashProps> = (props) => {
	const { data: dfuDetected, error } = trpc.mcu.dfuDetect.useQuery(
		{ boardPath: props.board.path },
		{
			refetchInterval: 1000,
		},
	);
	const flashDfuMutation = trpc.mcu.dfuFlash.useMutation({ onSuccess: props.onSuccess });
	const [isFlashing, setIsFlashing] = useState(false);

	const startFlash = useCallback(async () => {
		setIsFlashing(true);
		flashDfuMutation.mutate(
			{ boardPath: props.board.path },
			{
				onSettled: () => setIsFlashing(false),
			},
		);
	}, [flashDfuMutation, props.board.path]);

	const dfuError = error ? <ErrorMessage>{error.message}</ErrorMessage> : null;

	const flashButtonTitle = isFlashing ? 'Flashing...' : dfuDetected ? 'Flash' : 'Waiting for DFU...';

	const boardPathUri = 'boardPath=' + encodeURIComponent(props.board.path);

	const instructions = props.board.dfu?.instructions.map((step, index) => <li key={index}>{step}</li>);

	const detectionText = dfuDetected ? 'DFU device detected' : 'DFU not detected';
	const jumperReminder =
		dfuDetected && props.board.dfu?.hasBoot0Jumper ? (
			<InfoMessage title="Reminder">Make sure to remove the BOOT0 jumper from the board before flashing.</InfoMessage>
		) : null;

	return (
		<div className="space-y-4">
			<h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">Flashing {props.board.name} via DFU</h3>
			{dfuError}
			{}
			<p className="mt-4 text-zinc-500 dark:text-zinc-400">Status: {detectionText}</p>
			{jumperReminder}
			<Button color="brand" disabled={!dfuDetected || isFlashing} onClick={startFlash}>
				{flashButtonTitle}
			</Button>
			<h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">DFU Boot Instructions</h4>
			<div className="prose mt-4 text-base text-zinc-500 dark:text-zinc-400">
				<ol className="mb-4 list-decimal pl-4">{instructions}</ol>
				<img src={'/configure/api/dfu-image?' + boardPathUri} alt="DFU boot buttons and/or jumper visualization" />
			</div>
		</div>
	);
};
