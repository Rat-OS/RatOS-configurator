import { useCallback, useEffect, useRef, useState } from 'react';
import { useToolheadConfiguration } from '@/hooks/useToolheadConfiguration';
import { stringToTitleObject } from '@/utils/serialization';
import { ToolOrAxis, ToolheadConfiguration } from '@/zods/toolhead';
import { Dropdown, DropdownWithPrinterQuery } from '@/components/forms/dropdown';
import { Spinner } from '@/components/common/spinner';
import { twMerge } from 'tailwind-merge';
import { badgeBackgroundColorStyle, badgeBorderColorStyle, badgeTextColorStyle } from '@/components/common/badge';
import { WarningMessage } from '@/components/warning-message';
import { Nozzle } from '@/zods/hardware';
import { TextInput } from '@/components/forms/text-input';
import { z } from 'zod';
import { Strong } from '@/components/ui/typography';
import { fanHelp } from '@/data/fans';
import { Card } from '@/components/common/card';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ToolheadSettingsProps {
	toolOrAxis: ToolOrAxis;
}

type ToolheadSettingsErrors = z.typeToFlattenedError<ToolheadConfiguration<any>>;

export const ToolheadSettings: React.FC<ToolheadSettingsProps> = (props) => {
	const { toolhead, setToolhead } = useToolheadConfiguration(props.toolOrAxis);
	const [errors, setErrors] = useState<ToolheadSettingsErrors | null>(null);

	const setToolheadField = useCallback(
		<F extends keyof ToolheadConfiguration<any>, V extends ToolheadConfiguration<any>[F]>(field: F, value: V): void => {
			const updated = toolhead.getChangeSet({ [field]: value });
			if (updated?.success && updated.data && Object.keys(updated.data).length > 0) {
				const ret = setToolhead({ ...toolhead.getConfig(), ...updated.data });
				ret.then((res) => {
					if (!res.success) {
						setErrors(res.error.formErrors);
					} else if (res.data != null) {
						setErrors(null);
					}
				});
			} else if (!updated?.success) {
				setErrors(updated?.error.formErrors ?? null);
			} else {
				setErrors(null);
			}
		},
		[toolhead, setToolhead],
	);

	if (toolhead == null) {
		return (
			<Card className={twMerge('col-span-1')}>
				<CardHeader className="border-b border-border">
					<CardTitle>Toolhead...</CardTitle>
					<CardDescription>Configure the hardware installed on your toolhead...</CardDescription>
				</CardHeader>
				<CardContent className="grid grid-cols-1 gap-4 border-b border-border @xs:grid-cols-2">
					<div className="flex h-96 items-center justify-center">
						<Spinner />
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className={twMerge('col-span-1')}>
			<CardHeader className="border-b border-border">
				<CardTitle>Toolhead {toolhead.getToolCommand()} Hardware</CardTitle>
				<CardDescription>
					Configure the hardware installed on {toolhead.getDescription().toLocaleLowerCase()}
				</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-1 gap-4 border-b border-border @xs:grid-cols-2">
				<div className="cols w-full">
					<DropdownWithPrinterQuery
						query="hotends"
						value={toolhead.getHotend()}
						error={errors?.fieldErrors.hotend?.join('\n')}
						label="Hotend"
						onSelect={(value) => setToolheadField('hotend', value)}
					/>
				</div>
				<div>
					<DropdownWithPrinterQuery
						label="Hotend Thermistor"
						query="thermistors"
						error={errors?.fieldErrors.thermistor?.join('\n')}
						onSelect={(thermistor) => setToolheadField('thermistor', thermistor.id)}
						value={stringToTitleObject(toolhead.getThermistor())}
					/>
				</div>
				<div>
					<Dropdown
						label="Nozzle Type"
						onSelect={(value) => setToolheadField('nozzle', { ...toolhead.getNozzle(), type: value.id })}
						error={errors?.fieldErrors.nozzle?.join('\n')}
						options={Object.values(Nozzle.shape.type.Values).map(stringToTitleObject)}
						value={stringToTitleObject(toolhead.getNozzle().type)}
					/>
				</div>
				<div>
					<TextInput
						type="number"
						label="Nozzle Diameter"
						error={errors?.fieldErrors.nozzle?.join('\n')}
						defaultValue={toolhead.getNozzle().diameter}
						onBlur={(e) =>
							setToolheadField('nozzle', { ...toolhead.getNozzle(), diameter: parseFloat(e.target.value) })
						}
						inputMode="decimal"
						step={0.1}
						min={0.2}
						max={1.8}
					/>
				</div>
				{toolhead.getToolboard()?.alternativePT1000Resistor && toolhead.getThermistor() === 'PT1000' && (
					<div className="col-span-full">
						<WarningMessage title="RatOS uses your toolboards alternate pullup resistor setting">
							Your toolboard has an option to use a separate pullup resistor for PT1000 sensors. This is usually done by
							inserting a jumper. Make sure you read the documentation for your board on how to enable the alternative
							resistor or you'll get ADC temperature errors in klipper.
						</WarningMessage>
					</div>
				)}
				<div>
					<DropdownWithPrinterQuery
						label="Extruder"
						query="extruders"
						error={errors?.fieldErrors.extruder?.join('\n')}
						onSelect={(value) => setToolheadField('extruder', value)}
						value={toolhead.getExtruder()}
					/>
				</div>
				<div>
					<DropdownWithPrinterQuery
						label="Probe"
						query="probes"
						canClear={toolhead.getTool() === 1}
						error={errors?.fieldErrors.probe?.join('\n')}
						onSelect={(value) => setToolheadField('probe', value ?? undefined)}
						value={toolhead.getProbe()}
					/>
				</div>
			</CardContent>
			<CardContent className="grid grid-cols-1 gap-4 border-b border-border @sm:grid-cols-2">
				<div>
					<DropdownWithPrinterQuery
						vars={{ toolOrAxis: toolhead.getTool(), config: {} }}
						serializedPrinterConfiguration="config"
						label="X Endstop"
						error={errors?.fieldErrors.xEndstop?.join('\n')}
						query="xEndstops"
						onSelect={(value) => setToolheadField('xEndstop', value)}
						value={toolhead.getXEndstop()}
					/>
				</div>
				<div>
					<DropdownWithPrinterQuery
						vars={{ toolOrAxis: toolhead.getTool(), config: {} }}
						serializedPrinterConfiguration="config"
						label="Y Endstop"
						error={errors?.fieldErrors.yEndstop?.join('\n')}
						query="yEndstops"
						onSelect={(value) => setToolheadField('yEndstop', value)}
						value={toolhead.getYEndstop()}
					/>
				</div>
			</CardContent>
			<CardContent className="grid grid-cols-1 gap-4 border-b border-border @sm:grid-cols-2">
				<div>
					<DropdownWithPrinterQuery
						vars={{ toolOrAxis: toolhead.getTool(), config: {} }}
						serializedPrinterConfiguration="config"
						error={errors?.fieldErrors.partFan?.join('\n')}
						label="Part cooling fan"
						query="partFanOptions"
						help={fanHelp}
						onSelect={(value) => setToolheadField('partFan', value)}
						value={toolhead.getPartFan()}
					/>
				</div>
				<div>
					<DropdownWithPrinterQuery
						vars={{ toolOrAxis: toolhead.getTool(), config: {} }}
						serializedPrinterConfiguration="config"
						error={errors?.fieldErrors.hotendFan?.join('\n')}
						label="Hotend fan"
						query="hotendFanOptions"
						help={fanHelp}
						onSelect={(value) => setToolheadField('hotendFan', value)}
						value={toolhead.getHotendFan()}
					/>
				</div>
			</CardContent>
			<CardContent className="border-b border-border">
				<CardTitle className="text-base font-medium">Accelerometers</CardTitle>
				<CardDescription className="text-sm text-zinc-500 dark:text-zinc-400">
					You can use the same accelerometer for both axes. If you don't plan on using an accelerometer, you can skip
					this and come back later if you change your mind.
				</CardDescription>
			</CardContent>
			<CardContent className="grid grid-cols-1 gap-4 @sm:grid-cols-2">
				<div>
					<DropdownWithPrinterQuery
						vars={{ toolOrAxis: toolhead.getTool(), config: {} }}
						serializedPrinterConfiguration="config"
						label="X axis accelerometer"
						error={errors?.fieldErrors.xAccelerometer?.join('\n')}
						query="xAccelerometerOptions"
						onSelect={(value) => setToolheadField('xAccelerometer', value)}
						value={toolhead.getXAccelerometer()}
						sort={false}
					/>
				</div>
				<div>
					<DropdownWithPrinterQuery
						vars={{ toolOrAxis: toolhead.getTool(), config: {} }}
						serializedPrinterConfiguration="config"
						label="Y axis accelerometer"
						error={errors?.fieldErrors.yAccelerometer?.join('\n')}
						query="yAccelerometerOptions"
						onSelect={(value) => setToolheadField('yAccelerometer', value)}
						value={toolhead.getYAccelerometer()}
						sort={false}
					/>
				</div>
			</CardContent>
		</Card>
	);
};
