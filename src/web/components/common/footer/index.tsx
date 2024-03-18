import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import ExternalLink from '@mui/joy/Link';
import Divider from '@mui/joy/Divider';

import { SiMui, SiNextdotjs, SiTypescript } from 'react-icons/si';

const Footer = () => {
	const size = 64;

	return (
		<Box display="flex" justifyContent="center" width="100%">
			<Stack width="90%" pb={2} spacing={4}>
				<Divider />
				<Stack
					direction="row"
					alignItems="start"
					justifyContent="space-between"
				>
					<Stack spacing={4}>
						<Image
							alt="logo"
							src="/images/icons/android/android-launchericon-144-144.png"
							width={size}
							height={size}
						/>
					</Stack>
					<Stack spacing={1} alignItems="flex-start">
						{[
							'Report a bug',
							'How to contribute',
							'Open source project',
						].map((text) => {
							return (
								<Link
									key={text}
									href="/"
									style={{
										textDecoration: 'none',
									}}
								>
									<Typography>{text}</Typography>
								</Link>
							);
						})}
					</Stack>
				</Stack>
				<Stack
					direction="row"
					alignItems="start"
					justifyContent="space-between"
				>
					<Stack
						spacing={1}
						alignItems="flex-start"
						direction="row"
						sx={{
							color: 'text.primary',
						}}
					>
						<ExternalLink
							href="https://creativecommons.org/licenses/by-nc-sa/4.0"
							sx={{
								textDecoration: 'underline',
								color: 'inherit',
							}}
						>
							CC BY-NC-SA 4.0
						</ExternalLink>
						<Typography
							sx={{
								color: 'inherit',
							}}
						>
							2024 © Gervin Fung
						</Typography>
					</Stack>
					<Stack spacing={1} direction="row" alignItems="center">
						{[
							{
								link: 'nextjs.org',
								Component: SiNextdotjs,
							},
							{
								link: 'www.typescriptlang.org',
								Component: SiTypescript,
							},
							{
								link: 'mui.com/joy-ui',
								Component: SiMui,
							},
						].map((props) => {
							return (
								<ExternalLink
									key={props.link}
									href={`https://${props.link}`}
								>
									<IconButton size="sm">
										<props.Component
											fontSize="1.65em"
											textDecoration="none"
										/>
									</IconButton>
								</ExternalLink>
							);
						})}
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Footer;
