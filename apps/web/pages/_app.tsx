import type { AppProps } from 'next/app';

import {
	StyledEngineProvider,
	CssVarsProvider,
	extendTheme,
} from '@mui/joy/styles';
import Script from 'next/script';
import React from 'react';

import '@fontsource-variable/jetbrains-mono/wght-italic.css';
// eslint-disable-next-line import/no-unassigned-import
import '@fontsource-variable/jetbrains-mono';

import BackToTop from '../src/web/components/button/back-to-top';
import ErrorBoundary from '../src/web/components/error/boundary';
import Layout from '../src/web/components/layout';

const App = (props: AppProps) => {
	const font = 'JetBrains Mono Variable';

	const theme = extendTheme({
		fontFamily: {
			display: font,
			body: font,
		},
	});

	return (
		<StyledEngineProvider injectFirst>
			<CssVarsProvider defaultMode="dark" theme={theme}>
				<ErrorBoundary>
					<Layout>
						<BackToTop />
						<props.Component {...props.pageProps} />
						<Script
							src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
							type="module"
						/>
					</Layout>
				</ErrorBoundary>
			</CssVarsProvider>
		</StyledEngineProvider>
	);
};

export default App;
