import { exec } from 'child_process';
import { promisify } from 'util';

export const parseSignal = (dBm: number) => {
	if (dBm >= -40) {
		return <span className='text-green-700 font-semibold'>Excellent</span>;
	}
	if (dBm >= -67) {
		return <span className='text-lime-600 font-semibold'>Very good</span>;
	}
	if (dBm >= -70) {
		return <span className='text-yellow-600 font-semibold'>Okay</span>;
	}
	if (dBm >= -80) {
		return <span className='text-orange-500 font-semibold'>Not good</span>;
	}
	if (dBm >= -100) {
		return <span className='text-red-600 font-semibold'>Unusable</span>;
	}
};
