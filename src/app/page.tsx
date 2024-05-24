// `app/page.tsx` is the UI for the `/` URL
'use client';

import { twMerge } from 'tailwind-merge';
import { Badge } from '@/components/common/badge';
import { useMainsailQuery } from '@/hooks/useMainsail';
import { trpc } from '@/utils/trpc';
import { HistoryTable } from '@/app/historyTable';
import { useMoonrakerQuery, usePrinterObjectQuery } from '@/moonraker/hooks';
import { useMemo } from 'react';
import { Duration, DurationLikeObject } from 'luxon';
import CountUp from 'react-countup';

const secondaryNavigation = [
	{ name: 'History', href: '#', current: true },
	// { name: 'Console', href: '#', current: false },
];

export default function Page() {
	const printerName = useMainsailQuery('general.printername', { initialData: 'Loading...' });
	const savedPrinterName = trpc.printer.getSavedPrinterName.useQuery(undefined, { initialData: 'Loading...' });
	const jobTotals = useMoonrakerQuery('server.history.totals');
	const klippyState = useMoonrakerQuery('server.info');
	const printerStateQuery = usePrinterObjectQuery('print_stats');
	const printerState = printerStateQuery.data?.print_stats.state;
	const stats = useMemo(() => {
		if (jobTotals.data == null) {
			return [
				{
					name: 'Total Print Time',
					value: 0,
				},
				{
					name: 'Longest Print',
					value: 0,
				},
				{
					name: 'Avg. Print',
					value: 0,
				},
				{
					name: 'Total Filament Used',
					value: 0,
					unit: 'meters',
				},
			];
		}
		const totalPrintTime = Duration.fromObject(
			{
				hours:
					jobTotals.data.job_totals.total_print_time === 0 ? 0 : jobTotals.data.job_totals.total_print_time / 60 / 60,
			},
			{ locale: 'en-GB' },
		)
			.shiftTo(...(['seconds', 'minutes', 'hours', 'days'].filter(Boolean) as (keyof DurationLikeObject)[]))
			.normalize()
			.toObject();
		const longestPrint = Duration.fromObject(
			{ hours: jobTotals.data.job_totals.longest_print === 0 ? 0 : jobTotals.data.job_totals.longest_print / 60 / 60 },
			{ locale: 'en-GB' },
		)
			.shiftTo(...(['seconds', 'minutes', 'hours'].filter(Boolean) as (keyof DurationLikeObject)[]))
			.normalize()
			.toObject();
		const avg = jobTotals.data.job_totals.total_print_time / jobTotals.data.job_totals.total_jobs;
		const avgPrint = Duration.fromObject({ hours: isNaN(avg) ? 0 : avg / 60 / 60 }, { locale: 'en-GB' })
			.shiftTo(...(['seconds', 'minutes', 'hours'].filter(Boolean) as (keyof DurationLikeObject)[]))
			.normalize()
			.toObject();
		return [
			{
				name: 'Total Print Time',
				value: [
					totalPrintTime.days && { val: totalPrintTime.days, unit: 'days' },
					totalPrintTime.hours && { val: totalPrintTime.hours, unit: 'hrs' },
					!totalPrintTime.days && { val: totalPrintTime.minutes, unit: 'mins' },
				].filter(Boolean),
			},
			{
				name: 'Longest Print',
				value: [
					longestPrint.hours && { val: longestPrint.hours, unit: 'hrs' },
					{ val: longestPrint.minutes, unit: 'mins' },
				].filter(Boolean),
			},
			{
				name: 'Avg. Print',
				value: [avgPrint.hours && { val: avgPrint.hours, unit: 'hrs' }, { val: avgPrint.minutes, unit: 'mins' }].filter(
					Boolean,
				),
			},
			{
				name: 'Total Filament Used',
				value: jobTotals.data.job_totals.total_filament_used / 1000,
				unit: 'meters',
			},
		];
	}, [jobTotals.data]);
	return (
		<main className="@container">
			<header>
				{/* Secondary navigation */}
				<div className="border-b border-white/10">
					<nav className="mx-auto flex max-w-7xl overflow-x-auto py-4">
						<ul
							role="list"
							className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-zinc-400 @screen-sm:px-6 @screen-lg:px-8"
						>
							{secondaryNavigation.map((item) => (
								<li key={item.name}>
									<a href={item.href} className={item.current ? 'text-brand-400' : ''}>
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>

				{/* Heading */}
				<div className="bg-zinc-700/15 backdrop-blur-sm">
					<div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 @screen-sm:flex-row @screen-sm:items-center @screen-sm:px-6 @screen-lg:px-8">
						<div>
							<div className="flex items-center gap-x-3">
								<div
									className={twMerge(
										'flex-none rounded-full bg-green-400/10 p-1 text-zinc-400',
										klippyState.data?.klippy_state === 'error' && 'bg-red-400/10 text-red-400',
										klippyState.data?.klippy_state === 'startup' && 'bg-amber-400/10 text-amber-400',
										klippyState.data?.klippy_state === 'ready' && 'bg-green-400/10 text-green-400',
										klippyState.data?.klippy_state === 'shutdown' && 'bg-red-400/10 text-red-400',
									)}
								>
									<div className="h-2 w-2 rounded-full bg-current" />
								</div>
								<h1 className="flex gap-x-3 text-base leading-7">
									<span className="font-semibold text-white">{printerName.data}</span>
									<span className="text-zinc-600">/</span>
									<span className="font-semibold text-white">{savedPrinterName.data}</span>
								</h1>
							</div>
						</div>
						<Badge
							className="order-first capitalize @screen-sm:order-none"
							color={
								printerState === undefined
									? 'gray'
									: printerState == 'canceled'
										? 'pink'
										: printerState == 'complete'
											? 'green'
											: printerState == 'error'
												? 'red'
												: printerState === 'paused'
													? 'sky'
													: printerState === 'printing'
														? 'yellow'
														: printerState === 'standby'
															? 'brand'
															: 'gray'
							}
						>
							{printerState === undefined ? 'Offline' : printerState ?? 'Loading...'}
						</Badge>
					</div>
				</div>

				{/* Stats */}
				<div className="border-t border-white/5 bg-zinc-700/10 backdrop-blur-sm">
					<div className="mx-auto grid max-w-7xl grid-cols-1 @screen-sm:grid-cols-2 @screen-lg:grid-cols-4">
						{stats.map((stat, statIdx) => (
							<div
								key={stat.name}
								className={twMerge(
									statIdx % 2 === 1 ? '@screen-sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
									'border-white/5 px-4 py-6 @screen-sm:px-6 @screen-lg:px-8',
								)}
							>
								<p className="text-sm font-medium leading-6 text-zinc-400">{stat.name}</p>
								<p className="mt-2 flex items-baseline gap-x-2">
									{!Array.isArray(stat.value) ? (
										<>
											<span className="text-4xl font-semibold tracking-tight text-white">
												<CountUp start={0} end={stat.value} decimals={2} preserveValue={true} />
											</span>
											{stat.unit ? <span className="text-sm text-zinc-400">{stat.unit}</span> : null}
										</>
									) : (
										stat.value.map(({ val, unit }, idx) => (
											<span key={idx} className="flex items-baseline gap-x-2">
												<span key={idx} className="text-4xl font-semibold tracking-tight text-white">
													<CountUp start={0} end={val ?? 0} decimals={0} preserveValue={true}></CountUp>
												</span>
												{unit ? <span className="truncate text-sm text-zinc-400">{unit}</span> : null}
											</span>
										))
									)}
								</p>
							</div>
						))}
					</div>
				</div>
			</header>

			{/* Activity list */}
			<div className="border-t border-white/10 pt-11">
				<div className="mx-auto max-w-7xl">
					<h2 className="px-4 text-base font-semibold leading-7 text-white @screen-sm:px-6 @screen-lg:px-8">
						Latest jobs
					</h2>
					{/* <table className="mt-6 w-full whitespace-nowrap text-left">
						<colgroup>
							<col className="@screen-sm:w-4/12 w-full" />
							<col className="@screen-lg:w-2/12" />
							<col className="@screen-lg:w-2/12" />
							<col className="@screen-lg:w-3/12" />
							<col className="@screen-lg:w-1/12" />
						</colgroup>
						<thead className="border-b border-white/10 text-sm leading-6 text-white">
							<tr>
								<th scope="col" className="@screen-sm:pl-6 @screen-lg:pl-8 py-2 pl-4 pr-8 font-semibold">
									Filename
								</th>
								<th scope="col" className="@screen-sm:table-cell hidden py-2 pl-0 pr-8 font-semibold">
									Started at
								</th>
								<th scope="col" className="@screen-sm:text-left py-2 pl-0 pr-4 text-right font-semibold">
									Status
								</th>
								<th scope="col" className="@screen-md:table-cell hidden py-2 pl-0 pr-8 font-semibold">
									Duration
								</th>
								<th
									scope="col"
									className="@screen-sm:table-cell @screen-sm:pr-6 @screen-lg:pr-8 hidden py-2 pl-0 pr-4 text-right font-semibold"
								>
									Filament used
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-white/5">
							{activityItems.map((item) => (
								<tr key={item.startedAt}>
									<td className="@screen-sm:pl-6 @screen-lg:pl-8 py-4 pl-4 pr-8">
										<div className="flex items-center gap-x-4">
											<img src={item.file.imageUrl} alt="" className="h-8 w-8 rounded-full bg-zinc-800" />
											<div className="truncate text-sm font-medium leading-6 text-white">{item.file.name}</div>
										</div>
									</td>
									<td className="@screen-sm:table-cell hidden py-4 pl-0 pr-4">
										<div className="flex gap-x-3">
											<div className="text-sm leading-6 text-zinc-400">{item.startedAt}</div>
										</div>
									</td>
									<td className="py-4 pl-0 pr-4 text-sm leading-6">
										<div className="@screen-sm:justify-start flex items-center justify-end gap-x-2">
											<time className="@screen-sm:hidden text-zinc-400" dateTime={item.dateTime}>
												{item.filamentUsed}
											</time>
											<div className={twMerge(statuses[item.status], 'flex-none rounded-full p-1')}>
												<div className="h-1.5 w-1.5 rounded-full bg-current" />
											</div>
											<div className="@screen-sm:block hidden text-white">{item.status}</div>
										</div>
									</td>
									<td className="@screen-md:table-cell hidden py-4 pl-0 pr-4 text-sm">
										<div className="flex gap-x-3">
											<div className="text-sm leading-6 text-zinc-400">{item.duration}</div>
											<span className="inline-flex items-center rounded-md bg-zinc-400/10 px-2 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-400/20">
												{item.slicer}
											</span>
										</div>
									</td>
									<td className="@screen-sm:table-cell @screen-sm:pr-6 @screen-lg:pr-8 hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-zinc-400">
										<time dateTime={item.dateTime}>{item.filamentUsed}</time>
									</td>
								</tr>
							))}
						</tbody>
					</table> */}
					<HistoryTable />
				</div>
			</div>
		</main>
	);
}
