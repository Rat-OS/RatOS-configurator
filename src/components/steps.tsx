'use client';
/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/24/solid';
import React, { useCallback, useEffect, useRef } from 'react';
import { classNames } from '../helpers/classNames';

export interface Step {
	id: string;
	name: string;
	description: string;
	href: string;
}

interface StepProps {
	steps: Step[];
	currentStepIndex: number;
}

export const Steps: React.FC<StepProps> = (props) => {
	const listRef = useRef<HTMLOListElement>(null);

	const scrollTo = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
		if (listRef.current == null) return;
		listRef.current.scrollTo({
			left:
				e.currentTarget.getBoundingClientRect().left -
				listRef.current.getBoundingClientRect().left +
				listRef.current.scrollLeft,
		});
	}, []);

	useEffect(() => {
		if (listRef.current == null) return;
		const currentEl = listRef.current.querySelectorAll('.step')[props.currentStepIndex];
		if (currentEl == null) return;
		listRef.current.scrollTo({
			left:
				currentEl.getBoundingClientRect().left -
				listRef.current.getBoundingClientRect().left +
				listRef.current.scrollLeft,
		});
	}, [props.currentStepIndex]);

	return (
		<div className="lg:border-b lg:border-t lg:border-zinc-200">
			<nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
				<ol
					ref={listRef}
					role="list"
					className="relative snap-x snap-mandatory overflow-x-hidden scroll-smooth rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-zinc-200"
				>
					{props.steps.map((step, stepIdx) => (
						<li
							onClick={scrollTo}
							key={step.id}
							className="step relative min-w-[30%] snap-center snap-always overflow-hidden lg:flex-1"
						>
							<div
								className={classNames(
									stepIdx === 0 ? 'rounded-t-md border-b-0' : '',
									stepIdx === props.steps.length - 1 ? 'rounded-b-md border-t-0' : '',
									'overflow-hidden border border-zinc-200 lg:border-0',
								)}
							>
								{props.currentStepIndex > stepIdx ? (
									<a href={step.href} className="group">
										<span
											className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-zinc-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
											aria-hidden="true"
										/>
										<span
											className={classNames(
												stepIdx !== 0 ? 'lg:pl-9' : '',
												'flex items-start px-6 py-5 text-sm font-medium',
											)}
										>
											<span className="flex-shrink-0">
												<span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-500">
													<CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
												</span>
											</span>
											<span className="ml-4 mt-0.5 flex min-w-0 flex-col">
												<span className="text-xs font-semibold uppercase tracking-wide">{step.name}</span>
												<span className="text-sm font-medium text-zinc-500">{step.description}</span>
											</span>
										</span>
									</a>
								) : props.currentStepIndex === stepIdx ? (
									<a href={step.href} aria-current="step">
										<span
											className="absolute left-0 top-0 h-full w-1 bg-lime-500 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
											aria-hidden="true"
										/>
										<span
											className={classNames(
												stepIdx !== 0 ? 'lg:pl-9' : '',
												'flex items-start px-6 py-5 text-sm font-medium',
											)}
										>
											<span className="flex-shrink-0">
												<span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-lime-500">
													<span className="text-lime-500">{step.id}</span>
												</span>
											</span>
											<span className="ml-4 mt-0.5 flex min-w-0 flex-col">
												<span className="text-xs font-semibold uppercase tracking-wide text-lime-500">{step.name}</span>
												<span className="text-sm font-medium text-zinc-500">{step.description}</span>
											</span>
										</span>
									</a>
								) : (
									<a href={step.href} className="group">
										<span
											className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-zinc-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
											aria-hidden="true"
										/>
										<span
											className={classNames(
												stepIdx !== 0 ? 'lg:pl-9' : '',
												'flex items-start px-6 py-5 text-sm font-medium',
											)}
										>
											<span className="flex-shrink-0">
												<span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-300">
													<span className="text-zinc-500">{step.id}</span>
												</span>
											</span>
											<span className="ml-4 mt-0.5 flex min-w-0 flex-col">
												<span className="text-xs font-semibold uppercase tracking-wide text-zinc-700">{step.name}</span>
												<span className="text-sm font-medium text-zinc-500">{step.description}</span>
											</span>
										</span>
									</a>
								)}

								{stepIdx !== 0 ? (
									<>
										{/* Separator */}
										<div className="absolute inset-0 left-0 top-0 hidden w-3 lg:block" aria-hidden="true">
											<svg
												className="h-full w-full text-zinc-300"
												viewBox="0 0 12 82"
												fill="none"
												preserveAspectRatio="none"
											>
												<path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
											</svg>
										</div>
									</>
								) : null}
							</div>
						</li>
					))}
				</ol>
			</nav>
		</div>
	);
};
