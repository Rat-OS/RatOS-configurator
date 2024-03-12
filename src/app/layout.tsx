import { hasLastPrinterSettings } from '../server/helpers/printer-settings';
import { Redirecter } from './_hooks/navigation';
import { twJoin } from 'tailwind-merge';
import { inter } from './fonts';
import './../styles/globals.css';
import { headers } from 'next/headers';
import { scrollClasses } from '../components/common/scroll-container';
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
		<html className={twJoin('dark h-full', scrollClasses, inter.variable, inter.className)} suppressHydrationWarning>
			<body className="h-full bg-zinc-100 antialiased dark:bg-[rgb(18,18,20)]">
				<Redirecter hasLastPrinterSettings={hasLastPrinterSettings()}>{children}</Redirecter>
			</body>
		</html>
	);
}
