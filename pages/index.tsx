import React from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import Divider from '@mui/joy/Divider';

import { Optional } from '@poolofdeath20/util';

import data from '../src/web/generated/data';
import Seo from '../src/web/components/seo';
import { DemoTile, EmptyTile, Tile } from '../src/web/components/table/element';
import SearchBar from '../src/web/components/common/input';
import useSearchQuery from '../src/web/hooks/search';

import classifications, {
	transformCategory,
} from '../src/common/classfication';
import { type ClassificationProps } from './classifications/[classification]';

const useElementNumber = () => {
	const [get, set] = React.useState(Optional.from<number>(undefined));

	return {
		get,
		set: (id: number) => {
			return () => {
				set(Optional.some(id));
			};
		},
	};
};

const useSearch = () => {
	const numberOnly = (single: (typeof data)[number]) => {
		return single.number;
	};

	const [matchingNumbers, setMatchingNumbers] = React.useState(
		data.map(numberOnly)
	);

	const [value, setValue] = useSearchQuery();

	React.useEffect(() => {
		setMatchingNumbers(
			value
				.map((value) => {
					return value.toLowerCase();
				})
				.map((value) => {
					return data
						.filter((element) => {
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
						.map(numberOnly);
				})
				.unwrapOrGet([])
		);
	}, [value.unwrapOrGet('')]);

	return { matchingNumbers, value, setValue };
};

const GenerateClassification = () => {
	const router = useRouter();

	const { classification } = router.query;

	if (Array.isArray(classification)) {
		throw new Error(`Classification of "${classification}" is an array`);
	}

	const optionalClassification = Optional.from(classification);

	const Component = () => {
		return (
			<Stack
				spacing={1}
				direction="row"
				divider={<Divider orientation="vertical" />}
			>
				{classifications.map((classing) => {
					const category = transformCategory(classing);

					const href =
						category === optionalClassification.unwrapOrGet('')
							? '/'
							: `/classifications/${category}`;

					return (
						<Box
							key={classing.category}
							display="flex"
							flexDirection="row"
							alignItems="center"
							gap={1}
							sx={(theme) => {
								const bottom = optionalClassification.match({
									none: () => {
										return 'transparent';
									},
									some: (classification) => {
										return classification === category
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
								router.push(href, undefined, { shallow: true });
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
		state: {
			classification: optionalClassification,
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

	const elementNumber = useElementNumber();

	const Classification = GenerateClassification();

	const search = useSearch();

	return (
		<Box display="flex" justifyContent="center" alignItems="center" pb={8}>
			<Seo
				title={Optional.from(props.classification).map(
					(classification) => {
						return classification.category;
					}
				)}
				description="The home page of Pt, A modern take on Periodic Table of the Elements with interactive features"
				keywords={classifications.map((classification) => {
					return classification.category;
				})}
			/>
			<Stack spacing={6} width="90%">
				<DemoTile />
				<SearchBar
					placeholder="Element name, atomic name, atomic mass"
					search={search}
				/>
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
									.replace(/-/gm, '_')
									.split(' ')
									.join('_');
							};

							const color =
								classifications.find((classification) => {
									return element.category_code.startsWith(
										transformCategory(
											classification.category
										)
									);
								}) ?? classifications[9];

							return (
								<Grid
									key={position}
									xs={xs}
									sx={{
										cursor: 'pointer',
									}}
									onClick={elementNumber.set(element.number)}
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
													: search.matchingNumbers.includes(
															element.number
														)
											}
											isHighlighted={Classification.state.classification
												.map((classification) => {
													return element.category_code.startsWith(
														transformCategory(
															classification
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
