import React, { PropsWithChildren } from 'react';

import Stack from '@mui/joy/Stack';
import GlobalStyles from '@mui/joy/GlobalStyles';

import Header from '../common/header';
import Footer from '../common/footer';

const Layout = (props: Readonly<PropsWithChildren>) => {
	return (
		<React.Fragment>
			<GlobalStyles
				styles={(theme) => {
					return {
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
				spacing={6}
				sx={(theme) => {
					return {
						backgroundColor:
							theme.palette.mode === 'dark'
								? 'background.surface'
								: undefined,
					};
				}}
			>
				<Header />
				{props.children}
				<Footer />
			</Stack>
		</React.Fragment>
	);
};

export default Layout;
