import React from 'react';
import { Badge } from '@/components/common/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogSummary, LOG_LEVELS } from '@/app/logs/_components/types';

interface EnhancedLogLevelSelectorProps {
	logLevel: string;
	setLogLevel: (level: string) => void;
	summary?: LogSummary;
}

export const EnhancedLogLevelSelector: React.FC<EnhancedLogLevelSelectorProps> = ({
	logLevel,
	setLogLevel,
	summary,
}) => {
	const logLevelOptions = [
		{ value: 'trace', label: 'Trace', level: 10 },
		{ value: 'debug', label: 'Debug', level: 20 },
		{ value: 'info', label: 'Info', level: 30 },
		{ value: 'warn', label: 'Warn', level: 40 },
		{ value: 'error', label: 'Error', level: 50 },
		{ value: 'fatal', label: 'Fatal', level: 60 },
	];

	const getCountForLevel = (level: number): number => {
		if (!summary) return 0;
		switch (level) {
			case 10:
				return summary.traceCount;
			case 20:
				return summary.debugCount;
			case 30:
				return summary.infoCount;
			case 40:
				return summary.warnCount;
			case 50:
				return summary.errorCount;
			case 60:
				return summary.fatalCount;
			default:
				return 0;
		}
	};

	const selectedValue = logLevelOptions.find((option) => option.value === logLevel);
	const levelConfig = LOG_LEVELS[selectedValue?.level ?? 3];
	const count = getCountForLevel(selectedValue?.level ?? 3);
	const IconComponent = levelConfig.icon;

	return (
		<Select value={logLevel} onValueChange={setLogLevel}>
			<SelectTrigger>
				<div className="flex flex-1 items-center justify-between gap-2">
					<div className="flex flex-1 items-center gap-2">
						<IconComponent className={`h-4 w-4 ${levelConfig.color}`} />
						<span>{selectedValue?.label}</span>
					</div>
					{count > 0 && (
						<Badge color={levelConfig.badgeColor as any} size="sm">
							{count}
						</Badge>
					)}
				</div>
			</SelectTrigger>
			<SelectContent>
				{logLevelOptions.map((option) => {
					const levelConfig = LOG_LEVELS[option.level];
					const count = getCountForLevel(option.level);
					const IconComponent = levelConfig.icon;

					return (
						<SelectItem
							key={option.value}
							value={option.value}
							fullElement
							className="flex flex-1 items-center justify-between gap-2"
						>
							<div className="flex items-center justify-between gap-2">
								<div className="flex flex-1 items-center gap-2">
									<IconComponent className={`h-4 w-4 ${levelConfig.color}`} />
									<span>{option.label}</span>
								</div>
								{count > 0 && (
									<Badge color={levelConfig.badgeColor as any} size="sm">
										{count}
									</Badge>
								)}
							</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};
