import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import { Defined } from '@poolofdeath20/util';
import Image from 'next/image';
import React from 'react';

import constants from '../../../constant';
import { useHeight } from '../../../hooks/dimension';
import InternalLink from '../../link/internal';

import HeaderMenu from './menu';

const useHeaderHeight = () => {
	const [height, setHeight] = React.useState(0);

	React.useEffect(() => {
		setHeight(
			Defined.parse(document.getElementById(constants.header.id)).orThrow(
				'Header is not defined'
			).clientHeight
		);
	}, []);

	return height;
};

const Header = () => {
	const size = 32;

	const height = useHeight();

	return (
		<Box
			display="flex"
			id={constants.header.id}
			justifyContent="center"
			sx={(theme) => {
				return {
					position: {
						xs: 'sticky',
						sm: undefined,
					},
					top: {
						xs: 0,
						sm: undefined,
					},
					backgroundColor: 'background.surface',
					zIndex: 2,
					borderBottom: height
						? `1px solid ${theme.palette.background.level2}`
						: undefined,
				};
			}}
			width="100%"
		>
			<Stack
				alignItems="center"
				direction="row"
				justifyContent="space-between"
				pb={1}
				pt={1}
				width="90%"
			>
				<Box
					sx={{
						pt: {
							xs: 1,
							sm: undefined,
						},
						pr: {
							xs: 2,
							sm: undefined,
						},
					}}
				>
					<InternalLink aria-label="Go to home page" href="/">
						<Box>
							<Image
								alt="logo"
								height={size}
								priority
								src="/images/icons/android/android-launchericon-144-144.png"
								width={size}
							/>
						</Box>
					</InternalLink>
				</Box>
				<HeaderMenu />
			</Stack>
		</Box>
	);
};

export { useHeaderHeight };

export default Header;
