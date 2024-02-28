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
				backgroundColor: props.isHighlighted
					? props.color.color
					: 'background.level1',
				'&:hover': {
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

export { Tile, EmptyTile };
