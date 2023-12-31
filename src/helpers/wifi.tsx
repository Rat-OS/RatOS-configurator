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
