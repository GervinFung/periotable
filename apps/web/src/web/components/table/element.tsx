import React from 'react';

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography, { type TypographyProps } from '@mui/joy/Typography';
import type { SxProps } from '@mui/joy/styles/types';

import { type DeepReadonly, type Return } from '@poolofdeath20/util';

import useBreakpoint, { type Breakpoint } from '../../hooks/break-point';

type Color = Readonly<{
	color: string;
	hover: string;
}>;

const EmptyTile = () => {
	return <div />;
};

const TileDescription = (
	props: Readonly<{
		value: string | number;
		breakpoint: Breakpoint;
		sx: SxProps;
	}>
) => {
	const fontSize = {
		xs: undefined,
		md: '0.40rem',
		lg: '0.50rem',
	} as const satisfies TypographyProps['fontSize'];

	return (
		<Typography
			fontSize={fontSize}
			level={props.breakpoint?.includes('s') ? 'body-lg' : 'body-md'}
			sx={props.sx}
		>
			{props.value}
		</Typography>
	);
};

const Tile = (
	props: DeepReadonly<{
		breakpoint: Return<typeof useBreakpoint>;
		index: number;
		name: string;
		symbol: string;
		mass: number;
		isMatch: undefined | boolean;
		color: {
			highlight: undefined | Color;
			default: Color;
		};
	}>
) => {
	const sx = {
		color: props.color.highlight
			? 'background.level1'
			: props.color.default.color,
	};

	return (
		<Card
			variant="soft"
			size="sm"
			sx={{
				opacity: props.isMatch === false ? 0.5 : undefined,
				backgroundColor: props.color.highlight
					? props.color.highlight.color
					: 'background.level1',
				'&:hover':
					props.isMatch === false
						? undefined
						: {
								backgroundColor: props.color.highlight
									? props.color.highlight.hover
									: 'background.level2',
							},
			}}
		>
			<CardContent>
				<TileDescription
					value={props.index}
					sx={sx}
					breakpoint={props.breakpoint}
				/>
				<Typography
					level={
						props.breakpoint?.includes('l')
							? 'body-lg'
							: props.breakpoint?.includes('s')
								? 'h1'
								: 'body-md'
					}
					sx={sx}
				>
					{props.symbol}
				</Typography>
				<TileDescription
					value={props.name}
					sx={sx}
					breakpoint={props.breakpoint}
				/>
				<TileDescription
					value={props.mass}
					sx={sx}
					breakpoint={props.breakpoint}
				/>
			</CardContent>
		</Card>
	);
};

const DemoTileDescription = (
	props: Readonly<{
		value: string;
	}>
) => {
	return (
		<Typography color="neutral" fontSize="0.65rem" fontWeight="normal">
			{' '}
			({props.value})
		</Typography>
	);
};

const DemoTile = () => {
	return (
		<Card
			variant="soft"
			size="md"
			sx={{
				width: 'fit-content',
			}}
		>
			<CardContent>
				<Typography level="body-md">
					10 <DemoTileDescription value="index" />
				</Typography>
				<Typography level="h2">
					Ne
					<DemoTileDescription value="symbol" />
				</Typography>
				<Typography level="body-md">
					Neon <DemoTileDescription value="name" />
				</Typography>
				<Typography level="body-md">
					20.17976 <DemoTileDescription value="mass" />
				</Typography>
			</CardContent>
		</Card>
	);
};

const BigTileDescription = (
	props: Readonly<{
		value: string | number;
		sx: SxProps;
	}>
) => {
	return (
		<Typography level="body-lg" sx={props.sx}>
			{props.value}
		</Typography>
	);
};

const BigTile = (
	props: DeepReadonly<{
		index: number;
		name: string;
		symbol: string;
		mass: number;
		color: string;
	}>
) => {
	const sx = {
		color: 'background.level1',
	} as const satisfies TypographyProps['sx'];

	return (
		<Card
			variant="soft"
			size="md"
			sx={{
				backgroundColor: props.color,
				height: 130,
				width: 130,
			}}
		>
			<CardContent>
				<BigTileDescription value={props.index} sx={sx} />
				<Typography level="h2" sx={sx}>
					{props.symbol}
				</Typography>
				<BigTileDescription value={props.name} sx={sx} />
				<BigTileDescription value={props.mass} sx={sx} />
			</CardContent>
		</Card>
	);
};

const ErrorTileDescription = (
	props: Readonly<{
		value: string | number;
	}>
) => {
	return (
		<Typography level="h4" color="neutral">
			{props.value}
		</Typography>
	);
};

const ErrorTile = (
	props: DeepReadonly<{
		index: number;
		name: string;
		symbol: string;
		mass: number;
	}>
) => {
	return (
		<Card
			variant="soft"
			size="lg"
			sx={{
				width: 150,
			}}
		>
			<CardContent>
				<ErrorTileDescription value={props.index} />
				<Typography level="h1" fontSize="2.5em">
					{props.symbol}
				</Typography>
				<ErrorTileDescription value={props.name} />
				<ErrorTileDescription value={props.mass} />
			</CardContent>
		</Card>
	);
};

export { Tile, EmptyTile, BigTile, DemoTile, ErrorTile };
