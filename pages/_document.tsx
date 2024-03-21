import React from 'react';

import Document, {
	type DocumentContext,
	Head,
	Main,
	NextScript,
	Html,
} from 'next/document';

import { getInitColorSchemeScript } from '@mui/joy/styles';

export default class Doc extends Document {
	static getInitialProps = async (context: DocumentContext) => {
		const { renderPage: originalRenderPage } = context;

		// Run the React rendering logic synchronously
		context.renderPage = () => {
			return originalRenderPage({
				// Useful for wrapping the whole react tree
				enhanceApp: (App) => {
					return App;
				},
				// Useful for wrapping in a per-page basis
				enhanceComponent: (Component) => {
					return Component;
				},
			});
		};

		// Run the parent `getInitialProps`, it now includes the custom `renderPage`
		return await Document.getInitialProps(context);
	};

	render = () => {
		return (
			<Html lang="en" data-color-scheme="light">
				<Head>
					<link rel="manifest" href="/manifest.json" />
				</Head>
				<body
					style={{
						padding: 0,
						margin: 0,
						overflowX: 'hidden',
					}}
				>
					{getInitColorSchemeScript({ defaultMode: 'dark' })}
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	};
}
