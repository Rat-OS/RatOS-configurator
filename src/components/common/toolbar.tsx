import { useAutoAnimate } from '@formkit/auto-animate/react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type Icon = React.ForwardRefExoticComponent<
	React.SVGProps<SVGSVGElement> & {
		title?: string | undefined;
		titleId?: string | undefined;
	}
>;

export type ToolbarButton = {
	id: string;
	icon?: Icon;
	name?: string;
	onClick: () => void;
	hidden?: boolean;
	isActive: boolean;
} & ({ name: string } | { icon: Icon });

type ToolbarProps = {
	className?: string;
	buttons: ToolbarButton[];
};

const animationOptions = { duration: 150 };

export default function Toolbar(props: ToolbarProps) {
	const [animateRef] = useAutoAnimate(animationOptions);
	return (
		<nav
			className={twMerge(
				'flex overflow-hidden rounded-md border border-zinc-200 bg-white shadow dark:border-zinc-800 dark:bg-zinc-900/70',
				props.className,
			)}
			aria-label="Breadcrumb"
		>
			<ol role="list" className="flex divide-x divide-zinc-200 dark:divide-zinc-800" ref={animateRef}>
				{props.buttons.map((button) => {
					return button.hidden ? null : (
						<li key={button.id} className="flex">
							<div className="flex items-center">
								<button
									onClick={button.onClick}
									type="button"
									className={twMerge(
										'flex items-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100',
										button.isActive ? 'text-brand-500' : '',
										button.hidden ? 'hidden' : '',
									)}
								>
									{button.icon && <button.icon className="inline h-5 w-5 flex-shrink-0" aria-hidden="true" />}
									{button.name && <span className="inline">{button.name}</span>}
								</button>
							</div>
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
