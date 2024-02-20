import { headers } from 'next/headers';

export default function WizardLayout({ children }: { children: React.ReactNode }) {
	// Stupid hack to make this a dynamic component. Too much Next.js magic.
	headers().get('x-configurator');
	return (
		<main className="">
			<div className="mx-auto max-w-full">{children}</div>
		</main>
	);
}
