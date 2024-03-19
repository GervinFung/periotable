import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import ExternalLink from '@mui/joy/Link';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import { CiMenuBurger } from 'react-icons/ci';
import { SiGithub } from 'react-icons/si';

import constants from '../../../constant';

import useBreakpoint from '../../../hooks/break-point';

const Header = () => {
	const size = 32;

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
		<Box display="flex" justifyContent="center" width="100%">
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				pt={2}
				width="90%"
			>
				<Link
					href="/"
					style={{
						textDecoration: 'none',
					}}
				>
					<Box>
						<Image
							alt="logo"
							src="/images/icons/android/android-launchericon-144-144.png"
							width={size}
							height={size}
						/>
					</Box>
				</Link>
				{breakpoint === 'xs' ? (
					<Dropdown>
						<MenuButton variant="plain">
							<IconButton size="sm" variant="plain">
								<CiMenuBurger
									fontSize="1.65em"
									textDecoration="none"
								/>
							</IconButton>
						</MenuButton>
						<Menu variant="soft" size="sm">
							{links.map((link) => {
								switch (link.isExternal) {
									case false: {
										return (
											<MenuItem>
												<Link
													href={link.href}
													style={{
														textDecoration: 'none',
													}}
												>
													<Typography level="body-lg">
														{link.name}
													</Typography>
												</Link>
											</MenuItem>
										);
									}
									case true: {
										return (
											<MenuItem>
												<ExternalLink
													href={link.href}
													target="_blank"
													rel="external nofollow noopener noreferrer"
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
					<Stack spacing={6} direction="row" alignItems="center">
						{links.map((link) => {
							switch (link.isExternal) {
								case false: {
									return (
										<Link
											href={link.href}
											style={{
												textDecoration: 'none',
											}}
										>
											<Typography>{link.name}</Typography>
										</Link>
									);
								}
								case true: {
									return (
										<ExternalLink
											href={link.href}
											target="_blank"
											rel="external nofollow noopener noreferrer"
										>
											<IconButton size="sm">
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

export default Header;
