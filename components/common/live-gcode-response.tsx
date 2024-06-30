import { useMoonraker } from '@/moonraker/hooks';
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/common/card';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedContainer } from '@/components/common/animated-container';
import { cn } from '@/helpers/utils';
import { twJoin } from 'tailwind-merge';

interface LiveGcodeResponseProps {
	className?: string;
	lines?: number;
}

const spring = { type: 'spring', damping: 40, stiffness: 450 };

export const LiveGcodeResponse: React.FC<LiveGcodeResponseProps> = (props) => {
	const { lastMessage } = useMoonraker({
		passThroughUpdateMethods: ['notify_gcode_response'],
	});
	const [gcodeResponse, setGcodeResponse] = useState<string[]>([]);

	useEffect(() => {
		if (lastMessage && 'method' in lastMessage && lastMessage.method === 'notify_gcode_response') {
			setGcodeResponse((prev) => prev.concat(lastMessage.params as string[]).slice(-(props.lines ?? 1)));
		}
	}, [lastMessage, props.lines]);

	const totalLines = gcodeResponse.map((line) => line.split('\n').length).reduce((acc, val) => acc + val, 0);

	return (
		<AnimatePresence>
			{gcodeResponse.length !== 0 && (
				<motion.div
					className={cn('flex max-h-96 max-w-md', props.className)}
					initial={{ width: 0, opacity: 0 }}
					animate={{ opacity: 1, width: '100%' }}
					exit={{ width: 0, opacity: 0 }}
					transition={spring}
				>
					<Card key="container" className="flex flex-1 flex-col">
						<CardContent className="grid flex-1 gap-2 overflow-hidden p-0 @sm:p-0">
							<CardTitle className="px-4 pt-4">Console Output</CardTitle>
							<CardDescription
								className={twJoin(
									'scrollable max-h-max overflow-hidden px-4 pb-4 @sm:px-4',
									totalLines > (props.lines ?? 1) + 2 && 'overflow-y-scroll',
								)}
							>
								<AnimatedContainer transition={spring}>
									<AnimatePresence>
										{gcodeResponse.map((line, i) => {
											const formattedLine = line.replace(/^(\/\/ |echo: |!! )/gm, '');
											return (
												<motion.div
													transition={spring}
													className={twJoin(
														'whitespace-pre-wrap font-mono text-sm',
														line.trim().startsWith('!!') && 'text-rose-500',
													)}
													key={line}
													initial={{ opacity: 0, translateY: 50, height: 0 }}
													animate={{ opacity: 1, translateY: 0, height: 'auto' }}
													exit={{ opacity: 0, translateY: -50, height: 0 }}
													dangerouslySetInnerHTML={{ __html: formattedLine }}
												/>
											);
										})}
									</AnimatePresence>
								</AnimatedContainer>
							</CardDescription>
						</CardContent>
					</Card>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
