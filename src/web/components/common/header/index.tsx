import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import ExternalLink from '@mui/joy/Link';

import { SiGithub } from 'react-icons/si';

import constants from '../../../constant';

const Header = () => {
	const size = 32;

	return (
		<Box display="flex" justifyContent="center" width="100%">
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				pt={2}
				width="90%"
			>
				<Box>
					<Image
						alt="logo"
						src="/images/icons/android/android-launchericon-144-144.png"
						width={size}
						height={size}
					/>
				</Box>
				<Stack spacing={6} direction="row" alignItems="center">
					<Link
						href="/"
						style={{
							textDecoration: 'none',
						}}
					>
						<Typography>Home</Typography>
					</Link>
					<Link
						href="/compounds"
						style={{
							textDecoration: 'none',
						}}
					>
						<Typography>Compounds</Typography>
					</Link>
					<ExternalLink
						href={constants.repo}
						target="_blank"
						rel="external nofollow noopener noreferrer"
					>
						<IconButton size="sm">
							<SiGithub fontSize="1.65em" textDecoration="none" />
						</IconButton>
					</ExternalLink>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Header;
