import { Inter } from 'next/font/google';
import './../styles/globals.css';
import { hasLastPrinterSettings } from '../server/helpers/printer-settings';
import { Redirecter } from './_hooks/navigation';

const inter = Inter({
	variable: '--inter-font',
	subsets: ['latin'],
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className={'dark h-full scroll-smooth ' + inter.variable}>
			<body className="h-full bg-zinc-100 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:bg-[rgb(18,18,20)] dark:scrollbar-thumb-zinc-600">
				<Redirecter hasLastPrinterSettings={hasLastPrinterSettings()}>{children}</Redirecter>
			</body>
		</html>
	);
}
