import { useKlippyStateHandler } from '../hooks/useKlippyStateHandler';
import { useMoonraker } from '../hooks/useMoonraker';

export const Moonraker = ({ hostname }: { hostname?: string }) => {
	useMoonraker(hostname);
	useKlippyStateHandler();

	return null;
};
