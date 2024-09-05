

import Box from '@mui/joy/Box';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Defined } from '@poolofdeath20/util';
import Image from 'next/image';
import React from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { SiGithub } from 'react-icons/si';

import constants from '../../../constant';
import useBreakpoint from '../../../hooks/break-point';
import { useHeight } from '../../../hooks/dimension';
import ExternalLink from '../../link/external';
import InternalLink from '../../link/internal';

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

	const breakpoint = useBreakpoint();

	const links = [
		{
			name: 'Home',
			href: '/',
			isExternal: false,
		},
		{
			name: 'Compounds',
			href: '/compounds',
			isExternal: false,
		},
		{
			href: constants.repo,
			isExternal: true,
		},
	];

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
				{breakpoint === 'xs' ? (
					<Dropdown>
						<MenuButton
							aria-label="menu"
							slotProps={{
								root: {
									size: 'lg',
								},
							}}
							slots={{
								root: IconButton,
							}}
							variant="plain"
						>
							<CiMenuBurger fontSize="1.25em" />
						</MenuButton>
						<Menu placement="bottom-end" size="lg" variant="soft">
							{links.map((link) => {
								switch (link.isExternal) {
									case false: {
										return (
											<MenuItem key={link.href}>
												<InternalLink
													aria-label={`Go to ${link.name} page`}
													href={link.href}
												>
													<Typography level="body-lg">
														{link.name}
													</Typography>
												</InternalLink>
											</MenuItem>
										);
									}
									case true: {
										return (
											<MenuItem key={link.href}>
												<ExternalLink
													aria-label="Github"
													href={link.href}
												>
													<Typography level="body-lg">
														Github
													</Typography>
												</ExternalLink>
											</MenuItem>
										);
									}
								}
							})}
						</Menu>
					</Dropdown>
				) : (
					<Stack alignItems="center" direction="row" spacing={6}>
						{links.map((link) => {
							switch (link.isExternal) {
								case false: {
									return (
										<InternalLink
											aria-label={`Go to ${link.name} page`}
											href={link.href}
											key={link.href}
										>
											<Typography>{link.name}</Typography>
										</InternalLink>
									);
								}
								case true: {
									return (
										<ExternalLink
											aria-label="Github link"
											href={link.href}
											key={link.href}
										>
											<IconButton
												aria-label="Github icon button"
												size="sm"
											>
												<SiGithub
													fontSize="1.65em"
													textDecoration="none"
												/>
											</IconButton>
										</ExternalLink>
									);
								}
							}
						})}
					</Stack>
				)}
			</Stack>
		</Box>
	);
};

export { useHeaderHeight };

export default Header;
