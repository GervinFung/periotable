import React from 'react';

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

import { DeepReadonly } from '@poolofdeath20/util';

const EmptyTile = () => {
	return <div />;
};

const Tile = (
	props: DeepReadonly<{
		index: number;
		name: string;
		symbol: string;
		mass: number;
		isHighlighted: boolean;
		isMatch: undefined | boolean;
		color: {
			color: string;
			hover: string;
		};
	}>
) => {
	const fontSize = '0.50rem';

	const sx = {
		color: props.isHighlighted ? 'background.level1' : props.color.color,
	};

	return (
		<Card
			variant="soft"
			size="sm"
			sx={{
				opacity: props.isMatch === false ? 0.5 : undefined,
				backgroundColor: props.isHighlighted
					? props.color.color
					: 'background.level1',
				'&:hover':
					props.isMatch === false
						? undefined
						: {
								backgroundColor: props.isHighlighted
									? props.color.hover
									: 'background.level2',
							},
			}}
		>
			<CardContent>
				<Typography fontSize={fontSize} sx={sx}>
					{props.index}
				</Typography>
				<Typography level="body-lg" sx={sx}>
					{props.symbol}
				</Typography>
				<Typography fontSize={fontSize} sx={sx}>
					{props.name}
				</Typography>
				<Typography fontSize={fontSize} sx={sx}>
					{props.mass}
				</Typography>
			</CardContent>
		</Card>
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
	};

	return (
		<Card
			variant="soft"
			size="sm"
			sx={{
				backgroundColor: props.color,
				width: 'fit-content',
			}}
		>
			<CardContent>
				<Typography level="body-lg" sx={sx}>
					{props.index}
				</Typography>
				<Typography level="body-lg" sx={sx}>
					{props.symbol}
				</Typography>
				<Typography level="h3" sx={sx}>
					{props.name}
				</Typography>
				<Typography level="body-lg" sx={sx}>
					{props.mass}
				</Typography>
			</CardContent>
		</Card>
	);
};

export { Tile, EmptyTile, BigTile };
