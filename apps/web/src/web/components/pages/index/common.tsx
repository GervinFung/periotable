import type { ClassificationProps } from '../../../../../pages/classifications/[classification]';
import type { SubshellProps } from '../../../../../pages/subshells/[subshell]';
import type { DeepReadonly, Return } from '@poolofdeath20/util';

import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import IconButton from '@mui/joy/IconButton';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import data from '@periotable/data';
import { Optional, Defined, capitalize } from '@poolofdeath20/util';
import { useRouter } from 'next/router';
import React from 'react';
import { CgClose } from 'react-icons/cg';

import classifications, {
	transformCategory,
} from '../../../../common/classfication';
import { spaceToUnderscore } from '../../../../common/string';
import subshells from '../../../../common/subshell';
import SearchBar from '../../../components/common/input';
import InternalLink from '../../../components/link/internal';
import Seo from '../../../components/seo';
import { DemoTile, EmptyTile, Tile } from '../../../components/table/element';
import useBreakpoint from '../../../hooks/break-point';
import useSearchQuery from '../../../hooks/search';

type NullableString = string | undefined;

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

const GenerateMultiSelect = (
	props: DeepReadonly<{
		key: string;
		value: NullableString;
		kind: string;
		placeholder: string;
		options: Array<{
			id: string;
			label: string;
			color?: string;
		}>;
		onChange: (
			props: Readonly<{
				router: Return<typeof useRouter>;
				value: string | undefined;
			}>
		) => void;
	}>
) => {
	const router = useRouter();

	const query = router.query[props.key];

	if (Array.isArray(query)) {
		throw new Error(
			`Value for "${props.kind}" of "${query.join()}" is an array`
		);
	}

	const ids = {
		label: `select-field-${props.kind}-label`,
		button: `select-field-${props.kind}-button`,
	};

	const value = props.options
		.map(({ id }) => {
			return id;
		})
		.find((id) => {
			return id === query;
		});

	const Component = (
		<FormControl
			sx={{
				width: 280,
			}}
		>
			<FormLabel htmlFor={ids.button} id={ids.label}>
				{capitalize(props.kind)}
			</FormLabel>
			<Select
				endDecorator={
					!value ? undefined : (
						<IconButton
							color="neutral"
							onClick={() => {
								props.onChange({
									value: undefined,
									router,
								});
							}}
							onMouseDown={(event) => {
								event.stopPropagation();
							}}
							size="sm"
							variant="plain"
						>
							<CgClose />
						</IconButton>
					)
				}
				onChange={(_, value) => {
					props.onChange({
						router,
						value: value ?? undefined,
					});
				}}
				placeholder={props.placeholder}
				renderValue={(option) => {
					return !option ? null : (
						<Chip
							key={option.id}
							sx={{
								backgroundColor: 'background.level1',
							}}
							variant="soft"
						>
							<Typography
								level="body-sm"
								sx={{
									color: props.options.find(({ id }) => {
										return id === option.value;
									})?.color,
								}}
							>
								{option.label}
							</Typography>
						</Chip>
					);
				}}
				slotProps={{
					listbox: {
						placement: 'bottom-end',
						sx: {
							width: '100%',
							backgroundColor: 'background.level1',
						},
					},
					button: {
						id: ids.button,
						'aria-labelledby': `${ids.label} ${ids.button}`,
					},
				}}
				sx={{
					paddingBlock: 0,
				}}
				value={value ?? null}
			>
				{props.options.map((option) => {
					return (
						<Option key={option.id} value={option.id}>
							{!option.color ? null : (
								<Sheet
									sx={{
										backgroundColor: option.color,
										width: 10,
										height: 10,
									}}
								/>
							)}
							<Typography level="body-sm">
								{option.label}
							</Typography>
						</Option>
					);
				})}
			</Select>
		</FormControl>
	);

	return {
		Component,
		state: Optional.from(value),
	};
};

const GenerateClassificationSelect = (value: NullableString) => {
	return GenerateMultiSelect({
		value,
		key: 'classification',
		kind: 'category',
		placeholder: 'Select a category',
		options: classifications.map((classification) => {
			return {
				id: transformCategory(classification),
				label: classification.category,
				color: classification.color,
			};
		}),
		onChange: (props) => {
			const href = !props.value ? '/' : `/classifications/${props.value}`;

			void props.router.push(href, undefined, {
				shallow: true,
				scroll: false,
			});
		},
	});
};

const GenerateSpdfSelect = (value: NullableString) => {
	return GenerateMultiSelect({
		value,
		key: 'subshell',
		kind: 'subshell',
		placeholder: 'Select a subshell',
		options: subshells.map(({ subshell, color }) => {
			return {
				id: subshell,
				label: subshell.toUpperCase(),
				color,
			};
		}),
		onChange: (props) => {
			const href = !props.value ? '/' : `/subshells/${props.value}`;

			void props.router.push(href, undefined, {
				shallow: true,
				scroll: false,
			});
		},
	});
};

const Index = (props: ClassificationProps & SubshellProps & DeviceType) => {
	const ClassificationSelect = GenerateClassificationSelect(
		Optional.from(props.classification)
			.map(transformCategory)
			.unwrapOrGet(undefined)
	);

	const SpdfSelect = GenerateSpdfSelect(props.subshell?.subshell);

	const search = useSearch();

	return (
		<Box alignItems="center" display="flex" justifyContent="center" pb={8}>
			<Seo
				description="The home page of Pt, A modern take on Periodic Table of the Elements with interactive features"
				keywords={classifications.map((classification) => {
					return classification.category;
				})}
				title={Optional.from(props.classification).map(
					(classification) => {
						return classification.category;
					}
				)}
				url={
					props.classification
						? `/classifications/${transformCategory(props.classification)}`
						: props.subshell
							? `/subshells/${props.subshell.subshell}`
							: undefined
				}
			/>
			<Stack spacing={6} width="90%">
				<DemoTile />
				<SearchBar
					placeholder="Element name, atomic name, atomic mass"
					search={search}
				/>
				<Stack
					direction={{
						md: 'row',
						xs: 'column',
					}}
					spacing={6}
				>
					{ClassificationSelect.Component}
					{SpdfSelect.Component}
				</Stack>
				<Box alignItems="center" display="flex" justifyContent="center">
					<Position
						classification={ClassificationSelect.state}
						search={search}
						subshell={SpdfSelect.state}
						type={props.type}
					/>
				</Box>
			</Stack>
		</Box>
	);
};

export default Index;
