import { useCallback } from 'react';

export const useGcodeCommand = () => {
	return useCallback((command: TemplateStringsArray, ...args: (number | string)[]) => {
		const result = [command[0]];
		args.forEach((arg, i) => {
			result.push(arg.toString(), command[i + 1]);
		});
		console.log(result.join(''));
	}, []);
};
