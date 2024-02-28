import React from 'react';

import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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

import classifications, {
	parseUndefinedCategory,
	transformCategory,
} from '../src/common/classfication';
import { ClassificationProps } from './classifications/[classification]';

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

const useSearch = () => {
	const numberOnly = (single: (typeof data)[number]) => {
		return single.number;
	};

	const [matches, setMatches] = React.useState(data.map(numberOnly));

	const [value, setValue] = React.useState(Optional.none<string>());

	React.useEffect(() => {
		setMatches(
			data
				.filter((element) => {
					return value
						.map((value) => {
							return value.toLowerCase();
						})
						.map((value) => {
							const nameMatch = element.name_en
								.toLowerCase()
								.includes(value);

							switch (nameMatch) {
								case true: {
									return true;
								}
								case false: {
									const symbolMatch = element.symbol
										.toLowerCase()
										.includes(value);

									switch (symbolMatch) {
										case true: {
											return true;
										}
										case false: {
											const massMatch =
												element.atomic_mass
													.toString()
													.includes(value);

											return massMatch;
										}
									}
								}
							}
						})
						.unwrapOrGet(false);
				})
				.map(numberOnly)
		);
	}, [value.unwrapOrGet('')]);

	return { matches, value, setValue };
};

const GenerateClassification = (props: ClassificationProps) => {
	const router = useRouter();

	const pathname = usePathname();

	const [classification, setClassification] = React.useState(
		Optional.from(props.classification)
	);

	React.useEffect(() => {
		classification.map((classification) => {
			return router.push(
				`/classifications/${transformCategory(classification.category)}`,
				undefined,
				{ shallow: true }
			);
		});
	}, [classification.unwrapOrGet(undefined)]);

	React.useEffect(() => {
		setClassification(
			Optional.from(parseUndefinedCategory(router.query.classification))
		);
	}, [pathname]);

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

const Index = (props: ClassificationProps) => {
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

	const Classification = GenerateClassification(props);

	const search = useSearch();

	return (
		<Box display="flex" justifyContent="center" alignItems="center" pb={8}>
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
							width: 450,
						}}
						value={search.value.unwrapOrGet('')}
						onChange={(event) => {
							const { value } = event.target;

							search.setValue(
								value ? Optional.some(value) : Optional.none()
							);
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

							const transformCategory = (category: string) => {
								return category
									.toLowerCase()
									.replace('-', '_')
									.split(' ')
									.join('_');
							};

							const color =
								Classification.classifications.find(
									(classification) => {
										return element.category_code.startsWith(
											transformCategory(
												classification.category
											)
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
									<Link
										href={`/elements/${element.name_en.toLowerCase()}`}
										style={{
											textDecoration: 'none',
										}}
									>
										<Tile
											color={color}
											index={position}
											name={element.name_en}
											symbol={element.symbol}
											mass={element.atomic_mass}
											isMatch={
												search.value.isNone()
													? undefined
													: search.matches.includes(
															element.number
														)
											}
											isHighlighted={Classification.state.classification
												.map((classification) => {
													return element.category_code.startsWith(
														transformCategory(
															classification.category
														)
													);
												})
												.unwrapOrGet(false)}
										/>
									</Link>
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
