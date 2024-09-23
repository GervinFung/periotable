import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import React from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { SiGithub } from 'react-icons/si';

import constants from '../../../constant';
import useBreakpoint from '../../../hooks/break-point';
import ExternalLink from '../../link/external';
import InternalLink from '../../link/internal';

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

const DropdownMenu = () => {
	return (
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
	);
};

const StackMenu = () => {
	return (
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
	);
};

const HeaderMenu = () => {
	const breakpoint = useBreakpoint();

	return breakpoint === 'xs' ? <DropdownMenu /> : <StackMenu />;
};

export default HeaderMenu;
