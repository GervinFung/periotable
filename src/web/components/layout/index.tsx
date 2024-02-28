import React, { PropsWithChildren } from 'react';

import Box from '@mui/joy/Box';

const Layout = (props: Readonly<PropsWithChildren>) => {
	return (
		<Box
			sx={(theme) => {
				return {
					backgroundColor:
						theme.palette.mode === 'dark'
							? 'background.surface'
							: undefined,
				};
			}}
		>
			{props.children}
		</Box>
	);
};

export default Layout;
