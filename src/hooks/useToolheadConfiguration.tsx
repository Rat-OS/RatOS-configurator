import { ToolheadHelper } from '../helpers/toolhead';
import { deserializeStepper } from '../utils/serialization';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { useMemo, useRef, useState } from 'react';
import { PrinterRailState } from '../recoil/printer';
import { PrinterAxis } from '../zods/motion';
import { LoadablePrinterToolheadsState, PrinterToolheadState, PrinterToolheadsState } from '../recoil/toolhead';
import { BaseToolheadConfiguration, ToolheadConfiguration, ToolNumber, ToolOrAxis } from '../zods/toolhead';
import { defaultXEndstop } from '../data/endstops';

export const useToolhead = (toolOrAxis: ToolOrAxis | PrinterAxis | undefined) => {
	const toolheadConfigs = useRecoilValue(PrinterToolheadsState);
	const toolhead = useMemo(() => {
		if (toolOrAxis == null) {
			return null;
		}
		const toolheads = toolheadConfigs?.filter(Boolean).map((th) => new ToolheadHelper(th));
		const th = toolheads?.find(
			(th) => th.getTool() === toolOrAxis || th.getMotionAxis() === toolOrAxis || th.getExtruderAxis() === toolOrAxis,
		);
		return th;
	}, [toolOrAxis, toolheadConfigs]);
	return toolhead;
};

type MaybeToolhead<T extends boolean> = T extends true ? ToolheadHelper<any> : ToolheadHelper<any> | null;

export const useToolheadConfiguration = <T extends boolean = true>(
	toolOrAxis: ToolOrAxis | PrinterAxis | undefined,
	errorIfNotExist: T = true as T,
): { toolhead: MaybeToolhead<T>; setToolhead: (th: ToolheadConfiguration<any>) => void } => {
	const toolheadConfigs = useRecoilValue(LoadablePrinterToolheadsState);
	const toolheadConfigsRef = useRef(toolheadConfigs);
	if (toolheadConfigsRef.current !== toolheadConfigs && toolheadConfigs.length > 0) {
		toolheadConfigsRef.current = toolheadConfigs.slice();
	}
	const toolhead = useMemo(() => {
		const toolheads = toolheadConfigsRef.current?.filter(Boolean).map((th) => new ToolheadHelper(th));
		const th = toolheads?.find(
			(th) => th.getTool() === toolOrAxis || th.getMotionAxis() === toolOrAxis || th.getExtruderAxis() === toolOrAxis,
		);
		if (th == null && errorIfNotExist) {
			throw new Error(`Toolhead with number or axis ${toolOrAxis} not found`);
		}
		return th ?? null;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errorIfNotExist, toolOrAxis, toolheadConfigsRef.current]);
	const [hasManuallySelectedThermistor, setHasManuallySelectedThermistor] = useState(false);

	const setToolhead = useRecoilCallback(
		({ set, snapshot }) =>
			async (th: ToolheadConfiguration<any>) => {
				const helper = new ToolheadHelper(th);
				const currentConfig = await snapshot.getPromise(PrinterToolheadState(helper.getTool()));
				if (currentConfig == null) {
					throw new Error(`Toolhead ${helper.getToolCommand()} not found`);
				}
				const current = new ToolheadHelper(currentConfig);
				if (th.extruder.id != current.getExtruder().id) {
					if (th.extruder.stepper != null) {
						const stepper = deserializeStepper(th.extruder.stepper);
						if (stepper != null) {
							set(PrinterRailState(helper.getExtruderAxis()), (rail) => {
								return rail == null
									? null
									: {
											...rail,
											stepper: stepper.id,
											current: th.extruder.current ?? stepper.maxPeakCurrent * 0.71,
									  };
							});
						}
					}
				}
				if (th.toolboard?.id != current.getToolboard()?.id) {
					if (th.toolboard == null && th.xEndstop.id === 'endstop-toolboard') {
						th.xEndstop = defaultXEndstop;
					}
				}
				if (th.thermistor != current.getThermistor()) {
					setHasManuallySelectedThermistor(true);
				} else if (th.hotend.id != current.getHotend().id && !hasManuallySelectedThermistor) {
					th.thermistor = th.hotend.thermistor;
				}
				const val = BaseToolheadConfiguration.extend({ toolNumber: ToolNumber })
					.nullable()
					.parse({ ...th, toolNumber: current.getTool() });
				set(PrinterToolheadState(current.getTool()), val);
				return;
			},
		[hasManuallySelectedThermistor],
	);
	return {
		toolhead: toolhead as MaybeToolhead<T>,
		setToolhead,
	};
};
