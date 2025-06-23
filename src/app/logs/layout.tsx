import { headers } from 'next/headers';

export default function UpdateLogsLayout({ children }: { children: React.ReactNode }) {
	// Stupid hack to make this a dynamic component. Too much Next.js magic.
	headers().get('x-configurator');
	return <main className="py-10">{children}</main>;
}
