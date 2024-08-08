'use client';
/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, ReactElement, useCallback, useState } from 'react';

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
import { Check, Cross } from 'lucide-react';
import { twJoin, twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import { ButtonProps, ButtonVariantProps } from '@/components/common/button';
import { AnimatedContainer } from '@/components/common/animated-container';

export interface ModalProps extends React.PropsWithChildren {
	title: string;
	titleActions?: React.ReactNode;
	body: string;
	wide?: boolean | 'screen';
	isLoading?: boolean;
	content?: React.ReactNode;
	success?: boolean;
	buttonLabel?: string;
	buttonVariant?: ButtonVariantProps['variant'];
	noClose?: boolean;
	secondButtonLabel?: string;
	dismissText?: string;
	dismissVariant?: ButtonVariantProps['variant'];
	secondButtonVariant?: ButtonVariantProps['variant'];
	onClick?: () => any | Promise<any>;
	onClickSecondButton?: () => any | Promise<any>;
	onClose?: () => void;
	onClosed?: () => void;
	buttons?: ReactElement<ButtonProps<string>>[];
}

export interface ModalButtonProps<T extends string> {
	button: ReactElement<ButtonProps<T>>;
	hide: () => void;
}

export const ModalButton = <T extends string>(props: ModalButtonProps<T>) => {
	const [isCompletingClick, setIsCompletingClick] = useState<1 | 2 | false>(false);
	const { hide } = props;
	const { onClick, children } = props.button.props;
	const onButtonClick = useCallback(async () => {
		const clickRes = onClick?.() as any | Promise<any>;
		if (clickRes instanceof Promise) {
			setIsCompletingClick(1);
			try {
				await clickRes;
				hide();
			} catch (e) {
				if (e instanceof Error) {
					toast.error(e.message);
				}
				throw e;
			} finally {
				setIsCompletingClick(false);
			}
		} else {
			hide();
		}
	}, [onClick, hide]);
	return React.cloneElement(props.button, {
		onClick: onButtonClick,
		style: { direction: 'ltr' },
		children: (
			<>
				{children}
				{isCompletingClick === 1 && <Spinner className="inline-block" noMargin={true} />}
			</>
		),
	});
};

export function Modal(props: ModalProps) {
	const { onClick, onClose: _onClose, onClosed, onClickSecondButton } = props;
	const [open, setOpen] = useState(props.children == null);
	const hide = useCallback(() => {
		_onClose?.();
		setOpen(false);
		if (onClosed) {
			setTimeout(() => {
				onClosed();
			}, 250);
		}
	}, [onClosed, _onClose]);

	const show = useCallback(() => {
		setOpen(true);
	}, []);

	const success = props.isLoading ? (
		<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
			<Spinner className="h-6 w-6" noMargin={true} aria-hidden="true" />
		</div>
	) : props.success === true ? (
		<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-700">
			<Check className="h-6 w-6 text-lime-600 dark:text-lime-100" aria-hidden="true" />
		</div>
	) : props.success === false ? (
		<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-700">
			<Cross className="h-6 w-6 text-rose-600 dark:text-rose-100" aria-hidden="true" />
		</div>
	) : null;
	const isDesktop = useMediaQuery('(min-width: 768px)');

	const buttons = props.buttons ?? [];
	if (props.buttonLabel && onClick) {
		buttons.push(
			<Button variant={props.buttonVariant ?? 'info'} onClick={onClick}>
				{props.buttonLabel}
			</Button>,
		);
	}
	if (props.secondButtonLabel && onClickSecondButton) {
		buttons.push(
			<Button variant={props.secondButtonVariant ?? 'indeterminate'} onClick={onClickSecondButton}>
				{props.secondButtonLabel}
			</Button>,
		);
	}

	if (isDesktop) {
		return (
			<Dialog
				open={open}
				onOpenChange={(val) => {
					if (!val) {
						hide();
					} else {
						show();
					}
				}}
			>
				{props.children && <DialogTrigger asChild>{props.children}</DialogTrigger>}
				<DialogContent
					className={twJoin(
						props.wide === 'screen' ? 'max-w-screen-2xl' : props.wide ? 'max-w-6xl' : 'max-w-[600px]',
						'flex max-h-[90vh] flex-col',
					)}
					noClose={props.noClose}
				>
					<div className="flex flex-grow-0 items-center gap-4">
						{success}
						<DialogHeader className="flex-1">
							<DialogTitle className="flex items-center">
								<div className="flex-1">{props.title}</div>
								{props.titleActions && <div className="shrink-0">{props.titleActions}</div>}
							</DialogTitle>
							<DialogDescription>{props.body}</DialogDescription>
						</DialogHeader>
					</div>
					<AnimatedContainer
						containerClassName="flex-1 flex"
						className="scrollable -mr-4 grid flex-1 gap-2 overflow-hidden overflow-y-scroll pr-1.5"
					>
						{props.content}
					</AnimatedContainer>
					<div
						style={{ direction: 'rtl' }}
						className={twJoin(
							'grid flex-grow-0 grid-flow-col justify-end gap-2',
							buttons.length > 1 || props.wide === 'screen'
								? 'grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
								: buttons.length === 1
									? 'grid-cols-2'
									: 'grid-cols-1',
						)}
					>
						<Button variant={props.dismissVariant ?? 'outline'} onClick={hide} style={{ direction: 'revert' }}>
							{props.dismissText ?? 'Cancel'}
						</Button>
						{buttons.map((button, i) => (
							<ModalButton button={button} key={i} hide={hide} />
						))}
					</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer
			open={open}
			onOpenChange={(val) => {
				if (!val) {
					hide();
				} else {
					show();
				}
			}}
		>
			{props.children && <DrawerTrigger asChild>{props.children}</DrawerTrigger>}
			<DrawerContent className="flex max-h-[90vh] flex-col">
				<DrawerHeader className="flex flex-grow-0 items-center gap-4 text-left">
					{success}
					<div>
						<DrawerTitle>{props.title}</DrawerTitle>
						<DrawerDescription>{props.body}</DrawerDescription>
					</div>
				</DrawerHeader>
				{props.content && (
					<div className="scrollable col-span-2 -mr-4 grid flex-1 gap-2 overflow-hidden overflow-y-scroll px-4 pb-2">
						{props.content}
					</div>
				)}
				<DrawerFooter className="flex-grow-0 pt-2">
					{buttons.map((button, i) => (
						<ModalButton button={button} key={i} hide={hide} />
					))}
					<DrawerClose asChild>
						<Button variant={props.dismissVariant ?? 'outline'} onClick={hide}>
							{props.dismissText ?? 'Cancel'}
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
