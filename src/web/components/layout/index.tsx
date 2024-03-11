import React, { PropsWithChildren } from 'react';

import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';

const Layout = (props: Readonly<PropsWithChildren>) => {
	return (
		<React.Fragment>
			<GlobalStyles
				styles={(theme) => {
					return `
                        *::-webkit-scrollbar {
                            width: 8px;
                        }
                        *::-webkit-scrollbar-track {
                            background-color: ${theme.palette.background.surface} !important;
                        }
                        *::-webkit-scrollbar-thumb {
                            border: 3px solid transparent;
                            background-clip: padding-box;
                            border-radius: 9999px;
                            background-color: grey;
                        }
                  `;
				}}
			/>
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
		</React.Fragment>
	);
};

export default Layout;
