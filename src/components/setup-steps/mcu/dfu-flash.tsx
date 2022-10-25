/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { trpc } from '../../../helpers/trpc';
import { Board } from '../../../server/router/mcu';
import { Button } from '../../button';
import { ErrorMessage } from '../../error-message';

interface DFUFlashProps {
	board: Board;
	onSuccess?: () => void;
}

export const DFUFlash: React.FC<DFUFlashProps> = (props) => {
	const { data: dfuDetected, error } = trpc.useQuery(['mcu.dfu-detect', { boardPath: props.board.path }], {
		refetchInterval: 1000,
	});
	const flashDfuMutation = trpc.useMutation('mcu.dfu-flash', { onSuccess: props.onSuccess });
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

	return (
		<div className="space-y-4">
			<h3 className="text-xl font-medium text-gray-900">Flashing {props.board.name} via DFU</h3>
			{dfuError}
			<p className="mt-4 text-gray-500">Status: {detectionText}</p>
			<Button color="brand" disabled={!dfuDetected || isFlashing} onClick={startFlash}>
				{flashButtonTitle}
			</Button>
			<h4 className="text-sm font-medium text-gray-900">DFU Boot Instructions</h4>
			<div className="mt-4 prose text-base text-gray-500">
				<ol className="list-decimal pl-4 mb-4">{instructions}</ol>
				<img src={'/configure/api/dfu-image?' + boardPathUri} alt="DFU boot buttons and or jumper visualization" />
			</div>
		</div>
	);
};
