// `app/page.tsx` is the UI for the `/` URL
'use client';

import { twMerge } from 'tailwind-merge';
import { Badge } from '../components/common/badge';
import { useMainsailQuery } from '../hooks/useMainsail';
import { trpc } from '../utils/trpc';

const secondaryNavigation = [
	{ name: 'History', href: '#', current: true },
	{ name: 'Console', href: '#', current: false },
];
const stats = [
	{
		name: 'Total Print Time',
		value: [
			{ val: 12, unit: 'hrs' },
			{ val: 17, unit: 'mins' },
		],
	},
	{
		name: 'Longest Print',
		value: [
			{ val: 2, unit: 'hrs' },
			{ val: 33, unit: 'mins' },
		],
	},
	{
		name: 'Avg. Print',
		value: [
			{ val: 1, unit: 'hrs' },
			{ val: 5, unit: 'mins' },
		],
	},
	{ name: 'Total Filament Used', value: 93.9, unit: 'meters' },
];
const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10' };
const activityItems = [
	{
		file: {
			name: 'Shape-Cylinder_0.3mm_ASA_19m.gcode',
			imageUrl:
				'//ratos-minion.local/server/files/gcodes/.thumbs/Shape-Cylinder_0.3mm_ASA_19m-64x64.png?timestamp=1704989358.0760849',
		},
		startedAt: '15. jan. 2024 08.41',
		slicer: 'PrusaSlicer',
		status: 'Completed' as const,
		duration: '19m 24s',
		filamentUsed: '2.20 meters',
		dateTime: '2023-01-23T11:00',
	},
	{
		file: {
			name: 'ICAS-heatset_0.2mm_ASA_1h52m.gcode',
			imageUrl:
				'//ratos-minion.local/server/files/gcodes/.thumbs/ICAS-heatset_0.2mm_ASA_1h52m-32x32.png?timestamp=1703390603.8532264',
		},
		startedAt: '24. dec. 2023 05.12',
		slicer: 'PrusaSlicer',
		status: 'Completed' as const,
		duration: '1h 49m 50s',
		filamentUsed: '12.34 meters',
		dateTime: '2023-01-23T11:00',
	},
];

export default function Page() {
	const printerName = useMainsailQuery('general.printername', { initialData: 'Loading...' });
	const savedPrinterName = trpc.printer.getSavedPrinterName.useQuery(undefined, { initialData: 'Loading...' });
	return (
		<main className="@container">
			<header>
				{/* Secondary navigation */}
				<div className="border-b border-white/10">
					<nav className="mx-auto flex max-w-7xl overflow-x-auto py-4">
						<ul
							role="list"
							className="@screen-sm:px-6 @screen-lg:px-8 flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-zinc-400"
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
				<div className="bg-zinc-700/10">
					<div className="@screen-sm:flex-row @screen-sm:items-center @screen-sm:px-6 @screen-lg:px-8 mx-auto flex max-w-7xl flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4">
						<div>
							<div className="flex items-center gap-x-3">
								<div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
									<div className="h-2 w-2 rounded-full bg-current" />
								</div>
								<h1 className="flex gap-x-3 text-base leading-7">
									<span className="font-semibold text-white">{printerName.data}</span>
									<span className="text-zinc-600">/</span>
									<span className="font-semibold text-white">{savedPrinterName.data}</span>
								</h1>
							</div>
						</div>
						<Badge className="@screen-sm:order-none order-first" color="yellow">
							Printing
						</Badge>
					</div>
				</div>

				{/* Stats */}
				<div className="border-t border-white/5 bg-zinc-700/10">
					<div className="@screen-sm:grid-cols-2 @screen-lg:grid-cols-4 mx-auto grid max-w-7xl grid-cols-1">
						{stats.map((stat, statIdx) => (
							<div
								key={stat.name}
								className={twMerge(
									statIdx % 2 === 1 ? '@screen-sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
									'@screen-sm:px-6 @screen-lg:px-8 border-white/5 px-4 py-6',
								)}
							>
								<p className="text-sm font-medium leading-6 text-zinc-400">{stat.name}</p>
								<p className="mt-2 flex items-baseline gap-x-2">
									{!Array.isArray(stat.value) ? (
										<>
											<span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
											{stat.unit ? <span className="text-sm text-zinc-400">{stat.unit}</span> : null}
										</>
									) : (
										stat.value.map(({ val, unit }, idx) => (
											<span key={idx} className="flex items-baseline gap-x-2">
												<span key={idx} className="text-4xl font-semibold tracking-tight text-white">
													{val}
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
					<h2 className="@screen-sm:px-6 @screen-lg:px-8 px-4 text-base font-semibold leading-7 text-white">
						Latest jobs
					</h2>
					<table className="mt-6 w-full whitespace-nowrap text-left">
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
					</table>
				</div>
			</div>
		</main>
	);
}
