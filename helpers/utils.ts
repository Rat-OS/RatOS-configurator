import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function setDisplayName(Component: React.ComponentType<any>, name: string | undefined) {
	(Component as any).displayName = name;
}
