import { hasLastPrinterSettings } from '@/server/helpers/printer-settings';
import { Redirecter } from '@/app/_hooks/navigation';
import { twJoin } from 'tailwind-merge';
import { inter } from '@/app/fonts';
import '@/styles/globals.css';
import { headers } from 'next/headers';
import { type Metadata } from 'next';

export const metadata: Metadata = {
	title: {
		template: '%s - RatOS Configurator',
		default: 'RatOS Configurator',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	// Stupid hack to make this a dynamic component. Too much Next.js magic.
	headers().get('x-configurator');
	return (
		<html
			className={twJoin('scrollable dark h-full overflow-y-scroll', inter.variable, inter.className)}
			suppressHydrationWarning
		>
			<body className="h-full bg-zinc-100 antialiased dark:bg-background" style={{ marginRight: '0 !important' }}>
				<Redirecter hasLastPrinterSettings={hasLastPrinterSettings()}>{children}</Redirecter>
			</body>
		</html>
	);
}
