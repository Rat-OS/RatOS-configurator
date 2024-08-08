'use client';

import { Button } from '@/components/common/button';
import { Card } from '@/components/common/card';
import { ErrorMessage } from '@/components/common/error-message';
import { Suspense, useEffect } from 'react';
import { getLogger } from '@/app/_helpers/logger';
import Link from 'next/link';
import { AnimatedContainer } from '@/components/common/animated-container';
import { Modal } from '@/components/common/modal';
import { Spinner } from '@/components/common/spinner';
import { trpc } from '@/utils/trpc';
import { FileClock, FileCode, FileJson } from 'lucide-react';
import { formatBytes } from '@/helpers/util';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		getLogger().error(error);
	}, [error]);

	return (
		<div className="mx-auto flex h-full items-center justify-center">
			<Card className="min-w-96 max-w-7xl p-4">
				<h2 className="mb-4 font-semibold">Uh oh, something went wrong!</h2>
				<ErrorMessage title="An unexpected error occured">
					If this keeps happening, click "Download Debug Info" below and post it on{' '}
					<Link className="font-medium underline" href="https://discord.gg/ratrig" target="_blank">
						the RatOS support channel on discord
					</Link>
					.
				</ErrorMessage>
				<div className="mt-4 flex justify-end gap-2">
					<Button
						variant="info"
						onClick={
							// Attempt to recover by trying to re-render the segment
							() => reset()
						}
					>
						Try again
					</Button>
					<Modal
						onClick={() => (window.location.href = '/configure/api/debug-zip')}
						title="This archive may contain sensitive information"
						wide={true}
						body="Please inspect the contents of the zip before posting it publically. Make sure you use Moonraker Secrets if configuring moonraker for third party services."
						content={
							<AnimatedContainer>
								<h3 className="mb-1 font-medium tracking-tight">The following files will be zipped</h3>
								<ul className="grid gap-2 pb-2 text-muted-foreground ">
									<Suspense fallback={<Spinner />}>
										{trpc.debugFileList.useSuspenseQuery()[0].map((file) => {
											return (
												<li key={file.path} className="flex items-center gap-2 text-sm">
													{(file.name.endsWith('.log') || file.name.split('.').slice(-2)[0] === 'log') && (
														<FileClock className="h-4 w-4 flex-shrink-0 text-zinc-100/40" aria-hidden="true" />
													)}
													{file.name.endsWith('.cfg') && (
														<FileCode className="h-4 w-4 flex-shrink-0 text-zinc-100/40" aria-hidden="true" />
													)}
													{file.name.endsWith('.json') && (
														<FileJson className="h-4 w-4 flex-shrink-0 text-zinc-100/40" aria-hidden="true" />
													)}
													<span>
														{file.orgPath.replace('/home/pi', '~')} ({formatBytes(file.size)})
													</span>
												</li>
											);
										})}
									</Suspense>
								</ul>
							</AnimatedContainer>
						}
						buttonLabel="I understand"
					>
						<Button variant="indeterminate">Download Debug Info</Button>
					</Modal>
				</div>
			</Card>
		</div>
	);
}
