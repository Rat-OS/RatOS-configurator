import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { SerializedPrinterConfiguration } from '@/zods/printer-configuration';
import { trpc } from '@/utils/trpc';
import { useQuery } from '@tanstack/react-query';
import type { FilesToWriteWithState, FileState } from '@/server/routers/printer';
import { DiffModal } from '@/components/setup-steps/diff-modal';
import { twJoin } from 'tailwind-merge';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { StateCircle } from '@/components/common/state-circle';
import { Badge } from '@/components/common/badge';
import { Button, Intents } from '@/components/common/button';
import { useChangeEffect } from '@/hooks/useChangeEffect';
import { CheckIcon } from '@heroicons/react/24/outline';
import { QueryStatus } from '@/components/common/query-status';

interface FileChangesProps {
	serializedConfig: SerializedPrinterConfiguration | null;
	onFilesToOverwriteChange: (files: string[]) => void;
	onFilesToIgnoreChange: (files: string[]) => void;
}

interface ChangedFileProps {
	file: Unpacked<FilesToWriteWithState>;
	isMarkedOverwritten: boolean;
	isMarkedIgnored: boolean;
	addFileToOverwrite: (fileName: string) => void;
	removeFileToOverwrite: (fileName: string) => void;
	addFileToIgnore: (fileName: string) => void;
	removeFileToIgnore: (fileName: string) => void;
}

const statuses: { [key in FileState]: string } = {
	created: 'text-green-700 bg-green-50 ring-green-600/20',
	unchanged: 'text-zinc-600 bg-zinc-50 ring-zinc-500/10',
	changed: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
	removed: 'text-rose-700 bg-rose-50 ring-rose-600/20',
};

type Action = {
	action: (fileName: string) => void;
	intent: Intents;
	title: string;
};

const ChangedFile: React.FC<ChangedFileProps> = (props) => {
	const {
		addFileToIgnore,
		addFileToOverwrite,
		file,
		removeFileToIgnore,
		removeFileToOverwrite,
		isMarkedIgnored,
		isMarkedOverwritten,
	} = props;

	const [isDiffModalOpen, setIsDiffModalOpen] = useState(false);
	const showDiffModal = useCallback((file: Unpacked<FilesToWriteWithState>) => {
		setIsDiffModalOpen(true);
	}, []);

	const wouldOtherwiseBeWritten =
		(file.state === 'changed' && (file.overwrite || isMarkedOverwritten)) ||
		file.state === 'created' ||
		file.state === 'removed';
	const isOverwritable = file.state === 'changed';
	const isIgnorable = file.state === 'created' || file.state === 'removed' || file.state === 'changed';
	const isIgnored = isMarkedIgnored;
	const isOverwritten = isMarkedOverwritten || (file.overwrite && file.exists);
	const needsExplicitAction =
		isIgnorable && !isIgnored && !isOverwritten && !wouldOtherwiseBeWritten && file.changedFromConfig === true;
	const isDeleted = file.state === 'removed' && !isIgnored;
	const isCreated = file.state === 'created' && !isIgnored;
	const isChanged = file.state === 'changed' && !isIgnored && isOverwritten;

	const actions = useMemo(() => {
		if (file.fileName === 'RatOS.cfg') {
			return [];
		}
		let skip: null | Action = null;
		let ignore: null | Action = null;
		let overwrite: null | Action = null;
		let write: null | Action = null;
		let remove: null | Action = null;
		if (isOverwritten && !isIgnored) {
			skip = {
				title: 'Skip',
				intent: 'indeterminate',
				action: isMarkedOverwritten ? removeFileToOverwrite : addFileToIgnore,
			};
		} else if (isOverwritable) {
			overwrite = {
				title: 'Overwrite',
				intent: 'warning',
				action: isMarkedIgnored ? removeFileToIgnore : addFileToOverwrite,
			};
		}
		if (isIgnorable && !isIgnored) {
			ignore = {
				title: 'Ignore',
				intent: needsExplicitAction ? 'danger' : 'indeterminate',
				action: addFileToIgnore,
			};
		} else if (isIgnored) {
			if (file.state === 'removed') {
				remove = {
					title: 'Delete',
					intent: 'danger',
					action: removeFileToIgnore,
				};
			} else if (isIgnorable) {
				write = {
					title: 'Write',
					intent: 'success',
					action: removeFileToIgnore,
				};
			}
		}
		return [skip, ignore, overwrite, write, remove].filter(Boolean);
	}, [
		addFileToIgnore,
		addFileToOverwrite,
		file.fileName,
		file.state,
		isIgnorable,
		isIgnored,
		isMarkedIgnored,
		isMarkedOverwritten,
		isOverwritable,
		isOverwritten,
		needsExplicitAction,
		removeFileToIgnore,
		removeFileToOverwrite,
	]);

	const fileState: Intents = useMemo(() => {
		if (needsExplicitAction) {
			return 'danger';
		}
		if (file.state === 'changed') {
			if ((isIgnored && file.overwrite) || (isOverwritten && !file.overwrite)) {
				return 'warning';
			} else if (isOverwritten) {
				return 'success';
			} else {
				return 'indeterminate';
			}
		}
		if (file.state === 'created') {
			if (isIgnored) {
				return 'danger';
			} else {
				return 'success';
			}
		}
		if (file.state === 'removed') {
			if (!isIgnored) {
				return 'warning';
			}
		}
		return 'indeterminate';
	}, [file.overwrite, file.state, isIgnored, isOverwritten, needsExplicitAction]);

	const [shouldPing] = useChangeEffect([fileState], 4000);

	return (
		<li key={file.fileName} className="flex items-center justify-between gap-x-6 py-5">
			{file?.diff != null && (
				<DiffModal
					diff={file.diff}
					title={`Changes to ${file.fileName}`}
					state={file.state}
					setIsOpen={setIsDiffModalOpen}
					buttons={actions.map((a) => {
						return (
							<Button
								onClick={() => {
									a.action(file.fileName);
									setIsDiffModalOpen(false);
								}}
								variant={a.intent}
								key={a.title}
							>
								{a.title}
							</Button>
						);
					})}
					isOpen={isDiffModalOpen}
				></DiffModal>
			)}
			<div className="min-w-0">
				<div className="flex items-center gap-x-3">
					<StateCircle state={fileState} ping={shouldPing} />
					<p className="text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100">{file.fileName}</p>
					<Badge
						size="sm"
						color={
							file.state === 'changed'
								? !file.changedFromConfig
									? 'sky'
									: 'yellow'
								: file.state === 'created'
									? 'green'
									: file.state === 'removed'
										? 'rose'
										: 'gray'
						}
					>
						{file.state === 'changed'
							? file.changedFromConfig
								? 'Pending changes'
								: 'Changed on disk'
							: file.state === 'created'
								? 'New file'
								: file.state === 'removed'
									? 'Deleted'
									: 'No updates'}
					</Badge>
					{file.changedOnDisk && (
						<Badge size="sm" color="sky">
							Changed on disk
						</Badge>
					)}
				</div>
				<div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
					<p className="">
						{file.state === 'changed' &&
							(isOverwritten && !isIgnored
								? 'File will be backed up and overwritten.' +
									(file.fileName != 'RatOS.cfg' ? ` Any changes you've made can be recovered from the backup.` : '')
								: !needsExplicitAction
									? 'File will be skipped.'
									: 'Please review the changes and make a decision.')}
						{file.state === 'created' && (isIgnored ? 'File will be skipped.' : 'File will be created.')}
						{file.state === 'removed' && (!isIgnored ? 'File will be deleted.' : 'File will remain untouched.')}
						{file.state === 'unchanged' &&
							(file.changedOnDisk ? 'File has user modifications.' : 'File remains untouched.')}
					</p>
				</div>
			</div>
			<div className="flex flex-none items-center gap-x-4">
				<div className="flex flex-none items-center">
					{needsExplicitAction ? (
						<Button variant="info" onClick={() => showDiffModal(file)}>
							Review changes
						</Button>
					) : (
						<CheckIcon className="h-5 w-5 text-green-500 dark:text-brand-500" aria-hidden="true" />
					)}
				</div>
				<Menu as="div" className="relative flex-none">
					<Menu.Button className="-m-2.5 block p-2.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
						<span className="sr-only">Open options</span>
						<EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
					</Menu.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-zinc-900/5 focus:outline-none dark:bg-zinc-900 dark:ring-zinc-100/5">
							{actions.map((action) => (
								<Menu.Item key={action.title}>
									{({ active, disabled }) => (
										<span
											onClick={() => action.action(file.fileName)}
											className={twJoin(
												active ? 'bg-zinc-50 dark:bg-zinc-800' : '',
												disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
												'block px-3 py-1 text-sm leading-6 text-zinc-800 dark:text-zinc-200',
											)}
										>
											{action.title}
										</span>
									)}
								</Menu.Item>
							))}
							<Menu.Item disabled={file.diff == null}>
								{({ active, disabled }) => (
									<span
										onClick={() => showDiffModal(file)}
										className={twJoin(
											active ? 'bg-zinc-50 dark:bg-zinc-800' : '',
											disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
											'block px-3 py-1 text-sm leading-6 text-zinc-800 dark:text-zinc-200',
										)}
									>
										View diff
									</span>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</li>
	);
};

export const FileChanges: React.FC<FileChangesProps> = (props) => {
	const { serializedConfig, onFilesToIgnoreChange, onFilesToOverwriteChange } = props;
	const [filesToOverwrite, setFilesToOverwrite] = useState<string[]>([]);

	const addFileToOverwrite = useCallback((fileName: string) => {
		setFilesToOverwrite((files) => (files.includes(fileName) ? files : [...files, fileName]));
	}, []);

	const removeFileToOverwrite = useCallback((fileName: string) => {
		setFilesToOverwrite((files) => (files.includes(fileName) ? files.filter((file) => file !== fileName) : files));
	}, []);

	const [filesToIgnore, setFilesToIgnore] = useState<string[]>([]);

	const addFileToIgnore = useCallback((fileName: string) => {
		setFilesToIgnore((files) => (files.includes(fileName) ? files : [...files, fileName]));
	}, []);

	const removeFileToIgnore = useCallback((fileName: string) => {
		setFilesToIgnore((files) => (files.includes(fileName) ? files.filter((file) => file !== fileName) : files));
	}, []);

	useEffect(() => {
		onFilesToOverwriteChange(filesToOverwrite);
	}, [filesToOverwrite, onFilesToOverwriteChange]);
	useEffect(() => {
		onFilesToIgnoreChange(filesToIgnore);
	}, [filesToIgnore, onFilesToIgnoreChange]);

	const client = trpc.useUtils().client;
	const filesToWrite = useQuery({
		queryKey: ['printer.filesToWrite', serializedConfig],
		queryFn: async () => {
			const res = await client.printer.getFilesToWrite.mutate({
				config: serializedConfig ?? ({} as any),
			});
			return res;
		},
		enabled: serializedConfig != null,
	});
	return (
		<>
			<ul role="list" className="divide-y divide-zinc-100 dark:divide-zinc-800">
				{filesToWrite.data?.map((fileToWrite) => {
					return (
						<ChangedFile
							key={fileToWrite.fileName}
							file={fileToWrite}
							isMarkedIgnored={filesToIgnore.includes(fileToWrite.fileName)}
							isMarkedOverwritten={filesToOverwrite.includes(fileToWrite.fileName)}
							addFileToIgnore={addFileToIgnore}
							addFileToOverwrite={addFileToOverwrite}
							removeFileToIgnore={removeFileToIgnore}
							removeFileToOverwrite={removeFileToOverwrite}
						/>
					);
				})}
			</ul>
			<QueryStatus {...filesToWrite} />
		</>
	);
};
