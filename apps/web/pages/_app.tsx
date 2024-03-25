import React from 'react';

import type { AppProps } from 'next/app';

import {
	StyledEngineProvider,
	CssVarsProvider,
	extendTheme,
} from '@mui/joy/styles';

import '@fontsource-variable/jetbrains-mono/wght-italic.css';
import '@fontsource-variable/jetbrains-mono';

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
			<CssVarsProvider theme={theme} defaultMode="dark">
				<ErrorBoundary>
					<Layout>
						<props.Component {...props.pageProps} />
						<script
							type="module"
							src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
						></script>
					</Layout>
				</ErrorBoundary>
			</CssVarsProvider>
		</StyledEngineProvider>
	);
};

export default App;
