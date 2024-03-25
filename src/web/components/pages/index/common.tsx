import React from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';

import { Optional, type Return } from '@poolofdeath20/util';

import data from '../../../generated/data';
import Seo from '../../../components/seo';
import { DemoTile, EmptyTile, Tile } from '../../../components/table/element';
import SearchBar from '../../../components/common/input';
import BackToTop from '../../../components/button/back-to-top';
import useSearchQuery from '../../../hooks/search';
import useBreakpoint from '../../../hooks/break-point';

import classifications, {
	transformCategory,
} from '../../../../common/classfication';
import { type ClassificationProps } from '../../../../../pages/classifications/[classification]';

type DeviceType = Readonly<{
	type: 'desktop' | 'tablet' | 'mobile';
}>;

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
				spacing={{
					xs: 1,
					md: 0,
					lg: 1,
				}}
				direction={{
					xs: 'column',
					md: 'row',
				}}
				sx={{
					flexWrap: 'wrap',
				}}
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

const Position = (
	props: DeviceType &
		Readonly<{
			search: Return<typeof useSearch>;
			classification: Return<
				typeof GenerateClassification
			>['state']['classification'];
		}>
) => {
	const breakpoint = useBreakpoint() ?? props.type;

	const constant = {
		grid: {
			max: 12,
		},
		table: {
			column: 18,
			row: 9,
		},
	} as const;

	const transformCategory = (category: string) => {
		return category.toLowerCase().replace(/-/gm, '_').replace(/ /gm, '_');
	};

	switch (breakpoint) {
		case 'desktop':
		case 'md':
		case 'lg':
		case 'xl': {
			return (
				<Grid container spacing={0.5}>
					{Array.from(
						{
							length: constant.table.column * constant.table.row,
						},
						(_, index) => {
							const position = index + 1;

							const element = data.find((element) => {
								return (
									(element.ypos - 1) * constant.table.column +
										element.xpos ===
									position
								);
							});

							const size =
								constant.grid.max / constant.table.column;

							if (!element) {
								return (
									<Grid key={position} md={size}>
										<EmptyTile />
									</Grid>
								);
							}

							const color =
								classifications.find((classification) => {
									return element.category_code.startsWith(
										transformCategory(
											classification.category
										)
									);
								}) ?? classifications[9];

							return (
								<Grid key={position} md={size}>
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
												props.search.value.isNone()
													? undefined
													: props.search.matchingNumbers.includes(
															element.number
														)
											}
											isHighlighted={props.classification
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
						}
					)}
				</Grid>
			);
		}
		case 'tablet':
		case 'mobile':
		case 'xs':
		case 'sm': {
			return (
				<Stack spacing={6}>
					{Array.from(
						{
							// 18 groups + `No Group`
							length: 19,
						},
						(_, index) => {
							const group = index + 1;

							const newGroup = group === 19 ? 'N/A' : group;

							return {
								group: newGroup,
								elements: data.filter((element) => {
									return element.group === newGroup;
								}),
							};
						}
					).map((values) => {
						return (
							<Stack key={values.group} spacing={1}>
								<Typography level="h3">
									Group {values.group}
								</Typography>
								<Grid container spacing={0.5}>
									{values.elements.map((element) => {
										const color =
											classifications.find(
												(classification) => {
													return element.category_code.startsWith(
														transformCategory(
															classification.category
														)
													);
												}
											) ?? classifications[9];

										return (
											<Grid
												key={element.number}
												xs={6}
												sm={3}
											>
												<Link
													href={`/elements/${element.name_en.toLowerCase()}`}
													style={{
														textDecoration: 'none',
													}}
												>
													<Tile
														color={color}
														index={0}
														name={element.name_en}
														symbol={element.symbol}
														mass={
															element.atomic_mass
														}
														isMatch={
															props.search.value.isNone()
																? undefined
																: props.search.matchingNumbers.includes(
																		element.number
																	)
														}
														isHighlighted={props.classification
															.map(
																(
																	classification
																) => {
																	return element.category_code.startsWith(
																		transformCategory(
																			classification
																		)
																	);
																}
															)
															.unwrapOrGet(false)}
													/>
												</Link>
											</Grid>
										);
									})}
								</Grid>
							</Stack>
						);
					})}
				</Stack>
			);
		}
	}
};

const Index = (props: ClassificationProps & DeviceType) => {
	const Classification = GenerateClassification();

	const search = useSearch();
	return (
		<Box display="flex" justifyContent="center" alignItems="center" pb={8}>
			<BackToTop />
			<Seo
				url={
					props.classification
						? `/classifications/${transformCategory(props.classification)}`
						: undefined
				}
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
					<Position
						type={props.type}
						search={search}
						classification={Classification.state.classification}
					/>
				</Box>
			</Stack>
		</Box>
	);
};

export default Index;
