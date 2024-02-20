export const getHost = () => {
	return process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME != null && process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME.trim() != ''
		? process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME
		: typeof window !== 'undefined'
			? window.location.hostname
			: null;
};
