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
import Image from 'next/image';
import { Cpu, FileQuestion, MemoryStick, Usb, Zap, ZapOff } from 'lucide-react';
import { Badge } from '@/components/common/badge';
import { deserializeDriver } from '@/utils/serialization';
import { useRecoilCallback } from 'recoil';
import { ControlboardState, PrinterRailsState } from '@/recoil/printer';

export interface SelectableBoard extends SelectableCard {
	board: BoardWithDetectionStatus;
}

interface ExtraStepProps {
	selectedControlboard: BoardWithDetectionStatus | null;
	selectedToolboard: BoardWithDetectionStatus | null;
	cards: SelectableBoard[];
	setSelectedBoard: (board: SelectableBoard | null) => Promise<void>;
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
					? `toolboard for ${screenProps.toolhead.getDescription()}. If you don't use a toolboard you can skip this step.`
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

	const selectedControlboard = boardsQuery.data?.find((c) => c.id == _controlBoard?.id) ?? null;
	const selectedToolboard = boardsQuery.data?.find((c) => c.id == toolhead?.getToolboard()?.id) ?? null;

	const isToolboardRequired = useCallback(
		(controlboard: BoardWithDetectionStatus | null = selectedControlboard) => {
			return selectedPrinter != null && (controlboard?.driverCount ?? 0) < selectedPrinter.driverCountRequired;
		},
		[selectedControlboard, selectedPrinter],
	);

	const cards: SelectableBoard[] = useMemo(() => {
		if (boardsQuery.isError || boardsQuery.data == null) return [];
		return boardsQuery.data
			.filter((b) => b.isToolboard == (toolhead != null ? true : null))
			.map((b) => {
				let boardDescription = ``;
				if (b.integratedDrivers && Object.keys(b.integratedDrivers).length) {
					const integratedDrivers = Object.entries(b.integratedDrivers).reduce(
						(acc, [key, val]) => {
							const driver = deserializeDriver(val)?.title;
							if (!driver) {
								return acc;
							}
							if (acc[driver] == null) {
								acc[driver] = 0;
							}
							acc[driver] += 1;
							return acc;
						},
						{} as { [key: string]: number },
					);
					const countedDrivers = Object.entries(integratedDrivers).map(
						([key, val]) => `${val == 1 ? 'an' : val} integrated ${key} driver${val > 1 ? 's' : ''}`,
					);
					boardDescription = `A ${b.isToolboard ? 'tool board' : 'control board'} with ${
						countedDrivers.length > 1
							? countedDrivers.slice(0, -1).join(', ') + ' and ' + countedDrivers[countedDrivers.length - 1]
							: countedDrivers.join('')
					} ${b.driverCount > Object.keys(b.integratedDrivers).length ? `(${b.driverCount} total driver${b.driverCount > 1 ? 's' : ''})` : ``} and`;
				} else {
					boardDescription = `${b.driverCount}-driver ${b.isToolboard ? 'tool board' : 'control board'} with`;
				}
				boardDescription += ` ${b.flashScript && !b.disableAutoFlash ? 'support for automatic flashing' : 'manual flashing'}.`;
				const voltages =
					b.driverVoltages.length > 1
						? `${b.driverVoltages.slice(0, -1).join('V, ')}V and ${b.driverVoltages[b.driverVoltages.length - 1]}V`
						: `${b.driverVoltages[0]}V`;
				if (b.driverVoltages.length > 1 || b.driverVoltages[0] != 24) {
					// TODO: This is definitely not true in all cases..
					boardDescription += ` Supports running steppers at ${voltages}${b.driverVoltages.length > 1 ? ' via a dedicated motor power input port' : ''}.`;
				}

				const boardImgUri = b.boardImageFileName
					? '/configure/api/mcu-image?boardId=' + encodeURIComponent(b.id)
					: '/configure/img/missing-board-img.webp';
				return {
					id: b.id,
					board: b,
					name: (
						<h3 className="flex gap-2">
							{b.name}
							{!toolhead && isToolboardRequired(b) && (
								<Badge color="yellow" size="sm">
									Toolboard required
								</Badge>
							)}
						</h3>
					),
					details: (
						<div className="flex-col justify-between">
							<p className="mt-1 flex-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">{boardDescription}</p>
							<div className="mt-4 flex gap-2">
								<Badge color={b.detected ? 'lime' : 'gray'} size="sm">
									<Usb className="h-4 w-4" />
								</Badge>
								<Badge
									size="md"
									color={b.flashScript && !b.disableAutoFlash ? 'lime' : 'rose'}
									title="Automatic flashing"
								>
									{b.flashScript && !b.disableAutoFlash ? <Zap className="h-4 w-4" /> : <ZapOff className="h-4 w-4" />}
								</Badge>
								<Badge color="gray" size="sm" className="text-base/5">
									<MemoryStick className="h-4 w-4" />
									{b.driverCount}
								</Badge>
							</div>
						</div>
					),
					right: (
						<div className="relative">
							<Image
								src={boardImgUri}
								className="aspect-auto rounded-lg object-contain object-right"
								width={100}
								height={100}
								alt={`${b.manufacturer} ${b.name}`}
							/>
						</div>
					),
				};
			});
	}, [boardsQuery.isError, boardsQuery.data, toolhead, isToolboardRequired]);

	const setSelectedBoard = useRecoilCallback(
		({ reset, snapshot }) =>
			async (newBoard: SelectableBoard | null) => {
				if (toolhead) {
					setToolhead({
						...toolhead.getConfig(),
						toolboard: newBoard == null ? null : Toolboard.parse(newBoard.board),
					});
				} else if (newBoard != null) {
					_setControlboard(Board.parse(newBoard.board));
					// reset rail slot assignment if we switch control boards
					const oldBoard = await snapshot.getPromise(ControlboardState);
					if (oldBoard != null && oldBoard.id != newBoard.board.id) {
						reset(PrinterRailsState);
					}
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
