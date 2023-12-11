import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html className="dark h-full scroll-smooth">
				<Head></Head>
				<body className="h-full bg-zinc-100 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:bg-zinc-900 dark:scrollbar-thumb-zinc-600">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
