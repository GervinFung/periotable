import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import React from 'react';
import { SiMui, SiNextdotjs, SiTypescript } from 'react-icons/si';

import constants from '../../../constant';
import useBreakpoint from '../../../hooks/break-point';
import ExternalLink from '../../link/external';
import InternalLink from '../../link/internal';

const Footer = () => {
	const breakpoint = useBreakpoint();

	const isSmall = breakpoint?.includes('s');

	const size = isSmall ? 36 : 64;

	return (
		<Stack direction="row" justifyContent="center" spacing={2} width="100%">
			<Stack pb={2} spacing={4} width="90%">
				<Divider />
				{breakpoint === 'xs' ? null : (
					<Stack
						alignItems="start"
						direction="row"
						justifyContent="space-between"
					>
						<Stack spacing={4}>
							<InternalLink aria-label="Go to home page" href="/">
								<Image
									alt="logo"
									height={size}
									src="/images/icons/android/android-launchericon-144-144.png"
									width={size}
								/>
							</InternalLink>
						</Stack>
						<Stack alignItems="flex-start" spacing={1}>
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
										href={value.link}
										key={value.section}
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
					alignItems={{
						xs: 'center',
						sm: 'flex-start',
					}}
					direction={{
						xs: 'column-reverse',
						sm: 'row',
					}}
					justifyContent="space-between"
					spacing={{
						xs: 2,
						sm: 0,
					}}
				>
					<Stack
						alignItems={{
							xs: 'center',
							md: 'flex-start',
						}}
						direction={{
							xs: 'column',
							sm: 'row',
						}}
						spacing={{
							xs: 2,
							sm: 1,
						}}
						sx={{
							color: 'text.primary',
						}}
					>
						<ExternalLink
							aria-label="CC BY-NC-SA 4.0"
							href="https://creativecommons.org/licenses/by-nc-sa/4.0"
							rel="external nofollow noopener noreferrer"
							sx={{
								textDecoration: 'underline',
								color: 'inherit',
							}}
							target="_blank"
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
					<Stack alignItems="center" direction="row" spacing={2}>
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
									aria-label={label}
									href={`https://${props.link}`}
									key={props.link}
									rel="external nofollow noopener noreferrer"
									target="_blank"
								>
									<IconButton
										aria-label={`${label}-button`}
										size="sm"
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
