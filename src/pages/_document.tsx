import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html className="h-full dark">
				<Head></Head>
				<body className="h-full bg-zinc-100 dark:bg-zinc-900 scrollbar-track-transparent scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-600 scrollbar-thin scrollbar-thumb-rounded-md">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
