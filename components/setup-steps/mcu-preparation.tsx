import React, { useCallback, useMemo } from 'react';
import { trpc } from '@/helpers/trpc';
import { usePrinterConfiguration } from '@/hooks/usePrinterConfiguration';
import { StepScreen, StepScreenProps, useSteps } from '@/hooks/useSteps';
import { Board, BoardWithDetectionStatus, Toolboard } from '@/zods/boards';
import { SelectableCard } from '@/components/card-selector';
import { QueryStatus } from '@/components/common/query-status';
import { MCUFlashing } from '@/components/setup-steps/mcu/flash';
import { MCUPicker } from '@/components/setup-steps/mcu/pick';
import { PrinterDefinitionWithResolvedToolheads } from '@/zods/printer';
import { ToolOrAxis } from '@/zods/toolhead';
import { ToolheadHelper } from '@/helpers/toolhead';
import { useToolheadConfiguration } from '@/hooks/useToolheadConfiguration';
import { Cpu } from 'lucide-react';

export interface SelectableBoard extends SelectableCard {
	board: BoardWithDetectionStatus;
}

interface ExtraStepProps {
	selectedControlboard: BoardWithDetectionStatus | null;
	selectedToolboard: BoardWithDetectionStatus | null;
	cards: SelectableBoard[];
	setSelectedBoard: (board: SelectableBoard | null) => void;
	selectedPrinter: PrinterDefinitionWithResolvedToolheads | null;
	toolhead: ToolheadHelper<any> | null;
}

interface ExtraProps {
	toolOrAxis?: ToolOrAxis;
}

export type MCUStepScreenProps = StepScreenProps & ExtraStepProps;

const MCUSteps: StepScreen<ExtraStepProps>[] = [
	{
		id: '01',
		name: (screenProps) =>
			`Pick ${screenProps.toolhead ? `${screenProps.toolhead.getToolCommand()} Toolboard` : 'Control board'}`,
		description: (screenProps) =>
			`Pick the ${
				screenProps.toolhead
					? `toolboard for ${screenProps.toolhead.getDescription()}.`
					: 'control board. Toolboard(s) can be added in a later step.'
			}`,
		href: '#',
		renderScreen: (screenProps) => <MCUPicker {...screenProps} key={screenProps.key} />,
	},
	{
		id: '02',
		name: (screenProps) =>
			`${screenProps.toolhead ? `${screenProps.toolhead.getToolCommand()} Toolboard` : 'Control board'} flashing`,
		description: (screenProps) =>
			`Make sure your ${
				screenProps.toolhead ? `toolboard for ${screenProps.toolhead.getDescription()}` : 'control board'
			} is flashed and up to date.`,
		href: '#',
		renderScreen: (screenProps) => <MCUFlashing {...screenProps} key={screenProps.key} />,
	},
];

export const MCUPreparation: React.FC<StepScreenProps & ExtraProps> = (props) => {
	const {
		selectedPrinter,
		selectedBoard: _controlBoard,
		setSelectedBoard: _setControlboard,
	} = usePrinterConfiguration();
	const { toolhead, setToolhead } = useToolheadConfiguration(props.toolOrAxis, false);

	const boardsQuery = trpc.mcu.boards.useQuery(
		{
			boardFilters: {
				driverCountRequired:
					toolhead != null
						? undefined
						: (selectedPrinter?.driverCountRequired ?? 0) - (selectedPrinter?.defaults.toolheads.length ?? 1),
			},
			toolhead: toolhead?.serialize(),
			controlboard: _controlBoard?.id,
		},
		{ keepPreviousData: true },
	);

	const cards: SelectableBoard[] = useMemo(() => {
		if (boardsQuery.isError || boardsQuery.data == null) return [];
		return boardsQuery.data
			.filter((b) => b.isToolboard == (toolhead != null ? true : null))
			.map((b) => ({
				id: b.id,
				board: b,
				name: `${b.manufacturer} ${b.name}`,
				details: (
					<span>
						<span className="font-semibold">Automatic flashing:</span>{' '}
						{b.flashScript && !b.disableAutoFlash ? 'Yes' : 'No'}
					</span>
				),
				right: <Cpu className="h-8 w-8 text-zinc-500" />,
			}));
	}, [boardsQuery.isError, boardsQuery.data, toolhead]);

	const selectedControlboard = boardsQuery.data?.find((c) => c.id == _controlBoard?.id) ?? null;
	const selectedToolboard = boardsQuery.data?.find((c) => c.id == toolhead?.getToolboard()?.id) ?? null;

	const setSelectedBoard = useCallback(
		(newBoard: SelectableBoard | null) => {
			if (toolhead) {
				setToolhead({
					...toolhead.getConfig(),
					toolboard: newBoard == null ? null : Toolboard.parse(newBoard.board),
				});
			} else if (newBoard != null) {
				_setControlboard(Board.parse(newBoard.board));
			}
		},
		[_setControlboard, setToolhead, toolhead],
	);

	const extraScreenProps: ExtraStepProps = {
		selectedControlboard,
		selectedToolboard,
		cards,
		setSelectedBoard,
		selectedPrinter,
		toolhead,
	};
	const { currentStep, screenProps } = useSteps<ExtraStepProps>({
		steps: MCUSteps,
		parentScreenProps: props,
		extraScreenProps: extraScreenProps,
	});

	return currentStep.renderScreen({
		...screenProps,
		...extraScreenProps,
		children: <QueryStatus {...boardsQuery} />,
	});
};
