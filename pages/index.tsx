import React from 'react';

import type { NextPage } from 'next';

import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';

import { Optional } from '@poolofdeath20/util';

import data from '../src/web/generated/data';
import { EmptyTile, Tile } from '../src/web/components/table/element';

// <model-viewer
// 	alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
// 	src="shared-assets/models/NeilArmstrong.glb"
// 	ar
// 	environment-image="shared-assets/environments/moon_1k.hdr"
// 	poster="shared-assets/models/NeilArmstrong.webp"
// 	shadow-intensity="1"
// 	camera-controls
// 	touch-action="pan-y"
// ></model-viewer>

const GenerateElement = () => {
	const [element, setElement] = React.useState(
		Optional.from<number>(undefined)
	);

	const Component = React.useMemo(() => {
		return element
			.map((element) => {
				return <div>{element}</div>;
			})
			.unwrapOrGet(null);
	}, [element.isSome()]);

	return {
		Component,
		state: {
			element,
			setElement: (id: number) => {
				return () => {
					setElement(Optional.some(id));
				};
			},
			removeElement: () => {
				return setElement(Optional.none());
			},
		},
	};
};

const GenerateClassification = () => {
	const [classification, setClassification] = React.useState(
		Optional.none<(typeof classifications)[number]>()
	);

	const classifications = [
		{
			category: 'Alkaline Metal',
			color: '#FFAF80',
			hover: '#EF9851',
		},
		{
			category: 'Alkaline Earth Metal',
			color: '#80FF8E',
			hover: '#44E053',
		},
		{
			category: 'Lanthanide',
			color: '#C3FF80',
			hover: '#ADFE52',
		},
		{
			category: 'Actinide',
			color: '#80FFFC',
			hover: '#52C5FE',
		},
		{
			category: 'Transition Metal',
			color: '#FFEF80',
			hover: '#C1B45F',
		},
		{
			category: 'Post_Transition Metal',
			color: '#80D5FF',
			hover: '#52C5FE',
		},
		{
			category: 'Metalloid',
			color: '#8095FF',
			hover: '#526EFE',
		},
		{
			category: 'Reactive Nonmetal',
			color: '#FF80D4',
			hover: '#FE52C4',
		},
		{
			category: 'Noble Gas',
			color: '#AA80FF',
			hover: '#8B52FE',
		},
		{
			category: 'Unknown',
			color: '#FFF',
			hover: '#E0E0E0',
		},
	] as const;

	const Component = () => {
		return (
			<Stack
				spacing={1}
				direction="row"
				divider={<Divider orientation="vertical" />}
			>
				{classifications.map((classing) => {
					return (
						<Box
							key={classing.category}
							display="flex"
							flexDirection="row"
							alignItems="center"
							gap={1}
							sx={(theme) => {
								const bottom = classification.match({
									none: () => {
										return 'transparent';
									},
									some: (classification) => {
										return classification.category ===
											classing.category
											? theme.palette.primary[50]
											: 'transparent';
									},
								});

								return {
									cursor: 'pointer',
									borderRadius: theme.radius.sm,
									border: `0.5px solid ${bottom}`,
									py: 0.2,
									px: 0.8,
									'&:hover': {
										backgroundColor: 'background.level2',
									},
								};
							}}
							onClick={() => {
								setClassification(
									classification.match({
										none: () => {
											return Optional.some(classing);
										},
										some: (classification) => {
											return classification.category ===
												classing.category
												? Optional.none()
												: Optional.some(classing);
										},
									})
								);
							}}
						>
							<Sheet
								key={classing.category}
								sx={{
									backgroundColor: classing.color,
									width: 10,
									height: 10,
								}}
							/>
							<Typography level="body-xs">
								{classing.category}
							</Typography>
						</Box>
					);
				})}
			</Stack>
		);
	};

	return {
		Component,
		classifications,
		state: {
			classification,
		},
	};
};

const Index: NextPage = () => {
	const constant = {
		grid: { max: 12 },
		table: {
			column: 18,
			row: 9,
		},
	} as const;

	const positions = Array.from(
		{ length: constant.table.column * constant.table.row },
		(_, index) => {
			return index + 1;
		}
	);

	const Element = GenerateElement();

	const Classification = GenerateClassification();

	return (
		<Box display="flex" justifyContent="center" alignItems="center">
			<Stack spacing={8} width="90%">
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					pb={8}
				>
					<Typography level="h1" color="neutral" variant="plain">
						{/* Pe can be like Typescript */}
						The Periodic Table
					</Typography>
				</Box>
				<Box>
					<Input
						size="md"
						variant="outlined"
						placeholder="Element name, atomic name, atomic mass..."
						sx={{
							width: 550,
						}}
					/>
				</Box>
				<Box display="flex" alignItems="center">
					<Classification.Component />
				</Box>
				<Box display="flex" justifyContent="center" alignItems="center">
					<Grid container spacing={0.5}>
						{positions.map((position) => {
							const element = data.find((element) => {
								return (
									(element.ypos - 1) * constant.table.column +
										element.xpos ===
									position
								);
							});

							const xs =
								constant.grid.max / constant.table.column;

							if (!element) {
								return (
									<Grid key={position} xs={xs}>
										<EmptyTile />
									</Grid>
								);
							}

							const color =
								Classification.classifications.find(
									(classification) => {
										return element.category_code.startsWith(
											classification.category
												.toLowerCase()
												.split(' ')
												.join('_')
										);
									}
								) ?? Classification.classifications[9];

							return (
								<Grid
									key={position}
									xs={xs}
									sx={{
										cursor: 'pointer',
									}}
									onClick={Element.state.setElement(
										element.number
									)}
								>
									<Tile
										color={color}
										index={position}
										name={element.name_en}
										symbol={element.symbol}
										mass={element.atomic_mass}
										isHighlighted={Classification.state.classification
											.map((classification) => {
												return element.category_code.startsWith(
													classification.category
														.toLowerCase()
														.split(' ')
														.join('_')
												);
											})
											.unwrapOrGet(false)}
									/>
								</Grid>
							);
						})}
					</Grid>
				</Box>
			</Stack>
		</Box>
	);
};

export default Index;
