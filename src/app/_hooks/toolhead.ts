import { useCallback } from 'react';
import { useMoonrakerMutation } from '../../moonraker/hooks';

export const useGcodeCommand = () => {
	const executeGcode = useMoonrakerMutation('printer.gcode.script');

	return useCallback(
		async (command: TemplateStringsArray, ...args: (number | string)[]) => {
			const result = [command[0]];
			args.forEach((arg, i) => {
				result.push(arg.toString(), command[i + 1]);
			});
			const gcode = result.join('') as GCode;
			await executeGcode.mutateAsync({ script: gcode });
			console.log(gcode);
		},
		[executeGcode],
	);
};
