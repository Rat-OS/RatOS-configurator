import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Badge, badgeBackgroundMutedColorStyle, badgeBorderColorStyle } from '@/components/common/badge';
import { LogEntry, LOG_LEVELS } from '@/app/logs/_components/types';

interface LogEntryComponentProps {
	entry: LogEntry;
	showDetails: boolean;
}

export const LogEntryComponent: React.FC<LogEntryComponentProps> = ({ entry, showDetails }) => {
	const level = LOG_LEVELS[entry.level] || {
		name: 'UNKNOWN',
		color: 'text-zinc-600 dark:text-zinc-400',
		bgColor: 'bg-zinc-50 dark:bg-zinc-400/10',
		badgeColor: 'gray',
	};
	const timestamp = new Date(entry.time).toLocaleString();
	const borderStyle = badgeBorderColorStyle({ color: level.badgeColor as any });
	const bgStyle = badgeBackgroundMutedColorStyle({ color: level.badgeColor as any });

	return (
		<div className={twMerge('min-h-[60px] rounded-lg border p-3', borderStyle, bgStyle)}>
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0 flex-1">
					<div className="mb-1 flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<Badge color={level.badgeColor as any} size="sm">
								{level.name}
							</Badge>
							<span className="text-xs text-muted-foreground">{timestamp}</span>
						</div>
						<div className="flex items-center gap-2">
							{entry.context && showDetails && (
								<Badge color="gray" size="sm">
									{entry.context}
								</Badge>
							)}
							{entry.source && (
								<Badge color="lime" size="sm">
									{entry.source}
								</Badge>
							)}
						</div>
					</div>
					<p className={`text-sm ${level.color} break-words`}>{entry.msg}</p>
					{showDetails && (
						<div className="mt-2 space-y-1 text-xs text-muted-foreground">
							{entry.errorCode && (
								<div>
									Error Code: <code className="rounded bg-muted px-1 text-muted-foreground">{entry.errorCode}</code>
								</div>
							)}
							{entry.pid && <div>PID: {entry.pid}</div>}
							{entry.hostname && <div>Host: {entry.hostname}</div>}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
