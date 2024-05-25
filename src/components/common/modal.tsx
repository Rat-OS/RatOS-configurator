'use client';
/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useCallback, useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Spinner } from '@/components/common/spinner';

interface ModalProps extends React.PropsWithChildren {
	title: string;
	body: string;
	content?: React.ReactNode;
	success?: boolean;
	buttonLabel: string;
	onClick?: () => any | Promise<any>;
	onClose?: () => void;
}

export function Modal(props: ModalProps) {
	const { onClick, onClose } = props;
	const [open, setOpen] = useState(true);
	const [isCompletingClick, setIsCompletingClick] = useState(false);
	const onButtonClick = useCallback(async () => {
		const clickRes = onClick?.();
		if (clickRes instanceof Promise) {
			setIsCompletingClick(true);
			await clickRes;
			setIsCompletingClick(false);
		}
		onClose?.();
		setOpen(false);
	}, [onClick, onClose]);

	const onDialogClose = useCallback(() => {
		onClose?.();
		setOpen(false);
	}, [onClose]);

	const success = props.success ? (
		<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full  bg-green-100 dark:bg-green-700">
			<CheckIcon className="h-6 w-6 text-green-600 dark:text-green-100" aria-hidden="true" />
		</div>
	) : null;
	const isDesktop = useMediaQuery('(min-width: 768px)');

	if (isDesktop) {
		return (
			<Dialog
				open={open}
				onOpenChange={(val) => {
					if (!val) {
						onDialogClose();
					} else {
						setOpen(val);
					}
				}}
			>
				{props.children && <DialogTrigger asChild>{props.children}</DialogTrigger>}
				<DialogContent className="grid-cols-1 sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{props.title}</DialogTitle>
						<DialogDescription>{props.body}</DialogDescription>
					</DialogHeader>
					{props.content && <div className="col-span-2 grid gap-2">{props.content}</div>}
					<div className="col-span-2 grid gap-2">
						<Button variant="primary" onClick={onButtonClick}>
							{props.buttonLabel} {isCompletingClick && <Spinner noMargin={true} />}
						</Button>
						<Button variant="outline" onClick={onDialogClose}>
							Cancel
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			{props.children && <DrawerTrigger asChild>{props.children}</DrawerTrigger>}
			<DrawerContent>
				{success}
				<DrawerHeader className="text-left">
					<DrawerTitle>{props.title}</DrawerTitle>
					<DrawerDescription>{props.body}</DrawerDescription>
				</DrawerHeader>
				{props.content}

				<DrawerFooter className="pt-2">
					<Button variant="outline" onClick={onButtonClick}>
						{props.buttonLabel} {isCompletingClick && <Spinner noMargin={true} />}
					</Button>
					<DrawerClose asChild>
						<Button variant="outline" onClick={onDialogClose}>
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
