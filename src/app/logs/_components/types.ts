import React from 'react';
import { AlertCircle, AlertTriangle, Info, Bug, Zap } from 'lucide-react';

export interface LogEntry {
	level: number;
	time: string;
	msg: string;
	source?: string;
	context?: string;
	errorCode?: string;
	pid?: number;
	hostname?: string;
}

export interface LogSummary {
	totalEntries: number;
	errorCount: number;
	warnCount: number;
	infoCount: number;
	debugCount: number;
	traceCount: number;
	fatalCount: number;
	lastUpdate: string | null;
	duration: string | null;
	success: boolean;
	logFileSize: number;
	logFileExists: boolean;
}

export const LOG_LEVELS: Record<
	number,
	{
		name: string;
		color: string;
		bgColor: string;
		badgeColor: string;
		icon: React.ComponentType<{ className?: string }>;
	}
> = {
	10: {
		name: 'TRACE',
		color: 'text-zinc-600 dark:text-zinc-400',
		bgColor: 'bg-zinc-50 dark:bg-zinc-400/10',
		badgeColor: 'gray',
		icon: Bug,
	},
	20: {
		name: 'DEBUG',
		color: 'text-green-700 dark:text-green-400',
		bgColor: 'bg-green-50 dark:bg-green-400/10',
		badgeColor: 'green',
		icon: Bug,
	},
	30: {
		name: 'INFO',
		color: 'text-sky-700 dark:text-sky-400',
		bgColor: 'bg-sky-50 dark:bg-sky-400/10',
		badgeColor: 'sky',
		icon: Info,
	},
	40: {
		name: 'WARN',
		color: 'text-yellow-800 dark:text-yellow-500',
		bgColor: 'bg-yellow-50 dark:bg-yellow-400/10',
		badgeColor: 'yellow',
		icon: AlertTriangle,
	},
	50: {
		name: 'ERROR',
		color: 'text-red-700 dark:text-red-400',
		bgColor: 'bg-red-50 dark:bg-red-400/10',
		badgeColor: 'red',
		icon: AlertCircle,
	},
	60: {
		name: 'FATAL',
		color: 'text-purple-700 dark:text-purple-400',
		bgColor: 'bg-purple-50 dark:bg-purple-400/10',
		badgeColor: 'purple',
		icon: Zap,
	},
};
