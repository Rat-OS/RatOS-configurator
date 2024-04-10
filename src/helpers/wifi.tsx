import { Signal, SignalHigh, SignalLow, SignalMedium, SignalZero } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export const parseSignal = (dBm: number) => {
	if (dBm >= -40) {
		return <span className="font-semibold text-green-700">Excellent</span>;
	}
	if (dBm >= -67) {
		return <span className="font-semibold text-lime-600">Very good</span>;
	}
	if (dBm >= -70) {
		return <span className="font-semibold text-yellow-600">Okay</span>;
	}
	if (dBm >= -80) {
		return <span className="font-semibold text-orange-500">Not good</span>;
	}
	if (dBm >= -100) {
		return <span className="font-semibold text-red-600">Unusable</span>;
	}
};

export const signalIcon = (dBm: number, className?: string) => {
	let icon = <></>;
	if (dBm >= -100) {
		icon = <SignalZero className="absolute inset-0 h-full w-full text-red-600" />;
	}
	if (dBm >= -80) {
		icon = <SignalLow className="absolute inset-0 h-full w-full text-orange-500" />;
	}
	if (dBm >= -70) {
		icon = <SignalMedium className="absolute inset-0 h-full w-full text-yellow-600" />;
	}
	if (dBm >= -67) {
		icon = <SignalHigh className="absolute inset-0 h-full w-full text-lime-600" />;
	}
	if (dBm >= -40) {
		icon = <Signal className="absolute inset-0 h-full w-full text-green-700" />;
	}
	return (
		<div className={twMerge('relative inline-block h-8 w-8', className)}>
			<Signal className="absolute inset-0 h-full w-full text-zinc-700" />
			{icon}
		</div>
	);
};
