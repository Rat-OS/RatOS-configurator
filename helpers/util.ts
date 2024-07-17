'use client';
export const getHost = () => {
	return process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME != null && process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME.trim() != ''
		? process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME
		: typeof window !== 'undefined' && window.location?.hostname != null
			? window.location.hostname
			: null;
};
export function formatBytes(bytes: number, decimals: number = 2) {
	if (bytes == 0) return '0 bytes';
	var k = 1024,
		sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'],
		i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}
