import React from 'react';

import Image from 'next/image';

import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';

import { SiMui, SiNextdotjs, SiTypescript } from 'react-icons/si';

import useBreakpoint from '../../../hooks/break-point';

import constants from '../../../constant';

import InternalLink from '../../link/internal';
import ExternalLink from '../../link/external';

const Footer = () => {
	const breakpoint = useBreakpoint();

	const isSmall = breakpoint?.includes('s');

	const size = isSmall ? 36 : 64;

	return (
		<Stack direction="row" spacing={2} justifyContent="center" width="100%">
			<Stack width="90%" pb={2} spacing={4}>
				<Divider />
				{breakpoint === 'xs' ? null : (
					<Stack
						direction="row"
						alignItems="start"
						justifyContent="space-between"
					>
						<Stack spacing={4}>
							<InternalLink href="/" aria-label="Go to home page">
								<Image
									alt="logo"
									src="/images/icons/android/android-launchericon-144-144.png"
									width={size}
									height={size}
								/>
							</InternalLink>
						</Stack>
						<Stack spacing={1} alignItems="flex-start">
							{[
								{
									section: 'Report a bug',
									link: `${constants.repo}/issues`,
								},
								{
									section: 'How to contribute',
									link: `${constants.repo}#contribution`,
								},
								{
									section: 'Open source project',
									link: constants.repo,
								},
							].map((value) => {
								return (
									<ExternalLink
										aria-label={value.section}
										key={value.section}
										href={value.link}
										sx={{
											color: 'neutral.100',
											'&:hover': {
												textDecoration: 'underline',
											},
										}}
									>
										<Typography
											sx={{
												color: 'neutral.100',
											}}
										>
											{value.section}
										</Typography>
									</ExternalLink>
								);
							})}
						</Stack>
					</Stack>
				)}
				<Stack
					direction={{
						xs: 'column-reverse',
						sm: 'row',
					}}
					alignItems={{
						xs: 'center',
						sm: 'flex-start',
					}}
					spacing={{
						xs: 2,
						sm: 0,
					}}
					justifyContent="space-between"
				>
					<Stack
						spacing={{
							xs: 2,
							sm: 1,
						}}
						direction={{
							xs: 'column',
							sm: 'row',
						}}
						alignItems={{
							xs: 'center',
							md: 'flex-start',
						}}
						sx={{
							color: 'text.primary',
						}}
					>
						<ExternalLink
							aria-label="CC BY-NC-SA 4.0"
							href="https://creativecommons.org/licenses/by-nc-sa/4.0"
							target="_blank"
							rel="external nofollow noopener noreferrer"
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
					<Stack spacing={2} direction="row" alignItems="center">
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
								link: 'mui.com/joy-ui/getting-started',
								Component: SiMui,
							},
						].map((props) => {
							const label = props.link
								.replace('www', '')
								.replace('.com', '')
								.replace('.', '');

							return (
								<ExternalLink
									key={props.link}
									href={`https://${props.link}`}
									target="_blank"
									rel="external nofollow noopener noreferrer"
									aria-label={label}
								>
									<IconButton
										size="sm"
										aria-label={`${label}-button`}
									>
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
		</Stack>
	);
};

export default Footer;
