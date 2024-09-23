import type {
	GenerateClassificationSelect,
	GenerateSpdfSelect,
} from './select';
import type { Return } from '@poolofdeath20/util';

import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import data from '@periotable/data';
import { Defined } from '@poolofdeath20/util';
import React from 'react';

import classifications from '../../../../common/classfication';
import { spaceToUnderscore } from '../../../../common/string';
import subshells from '../../../../common/subshell';
import InternalLink from '../../../components/link/internal';
import { EmptyTile, Tile } from '../../../components/table/element';
import useBreakpoint from '../../../hooks/break-point';
import useSearchQuery from '../../../hooks/search';

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value.unwrapOrGet('')]);

	return { matchingNumbers, value, setValue };
};

const Position = (
	props: DeviceType &
		Readonly<{
			search: Return<typeof useSearch>;
			classification: Return<
				typeof GenerateClassificationSelect
			>['state'];
			subshell: Return<typeof GenerateSpdfSelect>['state'];
		}>
) => {
	const oldBreakpoint = useBreakpoint();
	const breakpoint = oldBreakpoint ?? props.type;

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
		return spaceToUnderscore(category.toLowerCase().replace(/-/gm, '_'));
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

							const highlight = props.classification.match({
								some: (classification) => {
									switch (
										element.category_code.startsWith(
											transformCategory(classification)
										)
									) {
										case false: {
											return undefined;
										}
										case true: {
											return color;
										}
									}
								},
								none: () => {
									return props.subshell.match({
										none: () => {
											return undefined;
										},
										some: (subshell) => {
											switch (
												element.block === subshell
											) {
												case false: {
													return undefined;
												}
												case true: {
													return Defined.parse(
														subshells.find(
															(shell) => {
																return (
																	shell.subshell ===
																	subshell
																);
															}
														)
													).orThrow(
														`Subshell of "${subshell}" is not found`
													);
												}
											}
										},
									});
								},
							});

							return (
								<Grid key={position} md={size}>
									<InternalLink
										aria-label={`Go to ${element.name_en}`}
										href={`/elements/${element.name_en.toLowerCase()}`}
									>
										<Tile
											breakpoint={oldBreakpoint}
											color={{
												default: color,
												highlight,
											}}
											index={element.number}
											isMatch={props.search.value
												.map(() => {
													return props.search.matchingNumbers.includes(
														element.number
													);
												})
												.unwrapOrGet(undefined)}
											mass={element.atomic_mass}
											name={element.name_en}
											symbol={element.symbol}
										/>
									</InternalLink>
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

										const highlight =
											props.classification.match({
												some: (classification) => {
													switch (
														element.category_code.startsWith(
															transformCategory(
																classification
															)
														)
													) {
														case false: {
															return undefined;
														}
														case true: {
															return color;
														}
													}
												},
												none: () => {
													return props.subshell.match(
														{
															none: () => {
																return undefined;
															},
															some: (
																subshell
															) => {
																switch (
																	element.block ===
																	subshell
																) {
																	case false: {
																		return undefined;
																	}
																	case true: {
																		return Defined.parse(
																			subshells.find(
																				(
																					shell
																				) => {
																					return (
																						shell.subshell ===
																						subshell
																					);
																				}
																			)
																		).orThrow(
																			`Subshell of "${subshell}" is not found`
																		);
																	}
																}
															},
														}
													);
												},
											});

										return (
											<Grid
												key={element.number}
												sm={3}
												xs={6}
											>
												<InternalLink
													aria-label={`Go to ${element.name_en}`}
													href={`/elements/${element.name_en.toLowerCase()}`}
												>
													<Tile
														breakpoint={
															oldBreakpoint
														}
														color={{
															default: color,
															highlight,
														}}
														index={element.number}
														isMatch={
															props.search.value.isNone()
																? undefined
																: props.search.matchingNumbers.includes(
																		element.number
																	)
														}
														mass={
															element.atomic_mass
														}
														name={element.name_en}
														symbol={element.symbol}
													/>
												</InternalLink>
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

export { useSearch };
export default Position;
