import type { PropsWithChildren } from 'react';

import GlobalStyles from '@mui/joy/GlobalStyles';
import Stack from '@mui/joy/Stack';
import React from 'react';

import Footer from '../common/footer';
import Header from '../common/header';

const Layout = (props: Readonly<PropsWithChildren>) => {
	return (
		<React.Fragment>
			<GlobalStyles
				styles={(theme) => {
					return {
						body: {
							backgroundColor: theme.palette.background.surface,
						},
						'*::-webkit-scrollbar': {
							width: 8,
						},
						'*::-webkit-scrollbar-track': {
							backgroundColor: `${theme.palette.background.surface} !important`,
						},
						'*::-webkit-scrollbar-thumb': {
							border: '3px solid transparent',
							backgroundClip: 'padding-box',
							borderRadius: 9999,
							backgroundColor: 'grey',
						},
					};
				}}
			/>
			<Stack
				spacing={{
					xs: 4,
					lg: 6,
				}}
				sx={(theme) => {
					return {
						backgroundColor:
							theme.palette.mode === 'dark'
								? 'background.surface'
								: undefined,
					};
				}}
			>
				<Stack spacing={6}>
					<Header />
					{props.children}
				</Stack>
				<Footer />
			</Stack>
		</React.Fragment>
	);
};

export default Layout;
