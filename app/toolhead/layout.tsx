import { headers } from 'next/headers';

export default function ToolheadLayout({ children }: { children: React.ReactNode }) {
	// Stupid hack to make this a dynamic component. Too much Next.js magic.
	headers().get('x-configurator');
	return (
		<main className="py-10">
			<div className="mx-auto max-w-7xl pb-12">{children}</div>
		</main>
	);
}
