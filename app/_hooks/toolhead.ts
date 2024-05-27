import { useCallback } from 'react';
import { useMoonrakerMutation } from '@/moonraker/hooks';

export const useGcodeCommand = () => {
	const executeGcode = useMoonrakerMutation('printer.gcode.script');

	return useCallback(async (command: TemplateStringsArray, ...args: (number | string)[]) => {
		const result = [command[0]];
		args.forEach((arg, i) => {
			result.push(arg.toString(), command[i + 1]);
		});
		const gcode = result.join('') as GCode;
		// eslint-disable-next-line no-console
		console.log(gcode);
		const gcodeRes = await executeGcode.mutateAsync({ script: gcode });
		// eslint-disable-next-line no-console
		console.log(gcodeRes);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
