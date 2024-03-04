import { ToolheadHelper } from '../helpers/toolhead';
import { deserializeStepper } from '../utils/serialization';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { useMemo, useRef, useState } from 'react';
import { PrinterRailState } from '../recoil/printer';
import { PrinterAxis } from '../zods/motion';
import { LoadablePrinterToolheadsState, PrinterToolheadState, PrinterToolheadsState } from '../recoil/toolhead';
import { BaseToolheadConfiguration, ToolheadConfiguration, ToolNumber, ToolOrAxis } from '../zods/toolhead';
import { defaultXEndstop } from '../data/endstops';
import { hotendFanOptions, partFanOptions } from '../data/fans';

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

export const useToolheads = () => {
	const toolheadConfigs = useRecoilValue(PrinterToolheadsState);
	const toolheads = useMemo(() => {
		return toolheadConfigs?.filter(Boolean).map((th) => new ToolheadHelper(th));
	}, [toolheadConfigs]);
	return toolheads;
};

type MaybeToolhead<T extends boolean> = T extends true ? ToolheadHelper<any> : ToolheadHelper<any> | null;

export const useToolheadConfiguration = <T extends boolean = true>(
	toolOrAxis: ToolOrAxis | PrinterAxis | undefined,
	errorIfNotExist: T = true as T,
) => {
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
				if (th.toolboard?.id !== current.getToolboard()?.id) {
					// Reset toolboard dependent options
					if (th.toolboard == null && th.xEndstop.id === 'endstop-toolboard') {
						th.xEndstop = defaultXEndstop;
					}
					if (th.partFan?.id.endsWith('-toolboard')) {
						const newFan = partFanOptions(null, th).shift();
						if (newFan == null) {
							throw new Error(`No part fan options available for current T${th.toolNumber} configuration`);
						}
						th.partFan = newFan;
					}
					if (th.hotendFan?.id.endsWith('-toolboard')) {
						const newFan = hotendFanOptions(null, th).shift();
						if (newFan == null) {
							throw new Error(`No hotend fan options available for current T${th.toolNumber} configuration`);
						}
						th.hotendFan = newFan;
					}
				}
				if (th.thermistor !== current.getThermistor() && th.thermistor !== th.hotend.thermistor) {
					setHasManuallySelectedThermistor(true);
				} else if (th.hotend.id != current.getHotend().id && !hasManuallySelectedThermistor) {
					th.thermistor = th.hotend.thermistor;
				}
				const val = BaseToolheadConfiguration.extend({ toolNumber: ToolNumber })
					.nullable()
					.safeParse({ ...th, toolNumber: current.getTool() });
				if (val.success) {
					set(PrinterToolheadState(current.getTool()), val.data);
				}
				return val;
			},
		[hasManuallySelectedThermistor],
	);
	return {
		toolhead: toolhead as MaybeToolhead<T>,
		setToolhead,
	};
};
