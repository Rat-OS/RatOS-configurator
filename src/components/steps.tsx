/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from "@heroicons/react/solid";
import React, { useCallback, useEffect, useRef } from "react";
import { classNames } from "../helpers/classNames";

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
		const currentEl = listRef.current.querySelectorAll(".step")[props.currentStepIndex];
		if (currentEl == null) return;
		listRef.current.scrollTo({
			left:
				currentEl.getBoundingClientRect().left -
				listRef.current.getBoundingClientRect().left +
				listRef.current.scrollLeft,
		});
	}, [props.currentStepIndex]);

	return (
		<div className="lg:border-t lg:border-b lg:border-gray-200">
			<nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
				<ol
					ref={listRef}
					role="list"
					className="relative scroll-smooth snap-x snap-mandatory rounded-md overflow-x-hidden lg:flex lg:border-l lg:border-r lg:border-gray-200 lg:rounded-none"
				>
					{props.steps.map((step, stepIdx) => (
						<li
							onClick={scrollTo}
							key={step.id}
							className="step snap-center snap-always relative overflow-hidden lg:flex-1 min-w-[30%]"
						>
							<div
								className={classNames(
									stepIdx === 0 ? "border-b-0 rounded-t-md" : "",
									stepIdx === props.steps.length - 1 ? "border-t-0 rounded-b-md" : "",
									"border border-gray-200 overflow-hidden lg:border-0"
								)}
							>
								{props.currentStepIndex > stepIdx ? (
									<a href={step.href} className="group">
										<span
											className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
											aria-hidden="true"
										/>
										<span
											className={classNames(
												stepIdx !== 0 ? "lg:pl-9" : "",
												"px-6 py-5 flex items-start text-sm font-medium"
											)}
										>
											<span className="flex-shrink-0">
												<span className="w-10 h-10 flex items-center justify-center bg-lime-500 rounded-full">
													<CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />
												</span>
											</span>
											<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
												<span className="text-xs font-semibold tracking-wide uppercase">
													{step.name}
												</span>
												<span className="text-sm font-medium text-gray-500">
													{step.description}
												</span>
											</span>
										</span>
									</a>
								) : props.currentStepIndex === stepIdx ? (
									<a href={step.href} aria-current="step">
										<span
											className="absolute top-0 left-0 w-1 h-full bg-lime-500 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
											aria-hidden="true"
										/>
										<span
											className={classNames(
												stepIdx !== 0 ? "lg:pl-9" : "",
												"px-6 py-5 flex items-start text-sm font-medium"
											)}
										>
											<span className="flex-shrink-0">
												<span className="w-10 h-10 flex items-center justify-center border-2 border-lime-500 rounded-full">
													<span className="text-lime-500">{step.id}</span>
												</span>
											</span>
											<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
												<span className="text-xs font-semibold text-lime-500 tracking-wide uppercase">
													{step.name}
												</span>
												<span className="text-sm font-medium text-gray-500">
													{step.description}
												</span>
											</span>
										</span>
									</a>
								) : (
									<a href={step.href} className="group">
										<span
											className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
											aria-hidden="true"
										/>
										<span
											className={classNames(
												stepIdx !== 0 ? "lg:pl-9" : "",
												"px-6 py-5 flex items-start text-sm font-medium"
											)}
										>
											<span className="flex-shrink-0">
												<span className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full">
													<span className="text-gray-500">{step.id}</span>
												</span>
											</span>
											<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
												<span className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
													{step.name}
												</span>
												<span className="text-sm font-medium text-gray-500">
													{step.description}
												</span>
											</span>
										</span>
									</a>
								)}

								{stepIdx !== 0 ? (
									<>
										{/* Separator */}
										<div
											className="hidden absolute top-0 left-0 w-3 inset-0 lg:block"
											aria-hidden="true"
										>
											<svg
												className="h-full w-full text-gray-300"
												viewBox="0 0 12 82"
												fill="none"
												preserveAspectRatio="none"
											>
												<path
													d="M0.5 0V31L10.5 41L0.5 51V82"
													stroke="currentcolor"
													vectorEffect="non-scaling-stroke"
												/>
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
