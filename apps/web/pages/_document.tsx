import type { DocumentContext } from 'next/document';

import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import React from 'react';

export default class Doc extends Document {
	static override getInitialProps = async (context: DocumentContext) => {
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

	override render() {
		return (
			<Html data-color-scheme="light" lang="en">
				<Head>
					<link href="/manifest.json" rel="manifest" />
				</Head>
				<body
					style={{
						padding: 0,
						margin: 0,
						overflowX: 'hidden',
					}}
				>
					<InitColorSchemeScript defaultMode="dark" />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
