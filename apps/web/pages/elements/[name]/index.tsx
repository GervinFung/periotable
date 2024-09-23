import type {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
} from 'next';

import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import data from '@periotable/data';
import { Optional, Defined } from '@poolofdeath20/util';
import React from 'react';

import classifications, {
	transformCategory,
} from '../../../src/common/classfication';
import { parseQueryParam } from '../../../src/common/string';
import { useHeaderHeight } from '../../../src/web/components/common/header';
import Properties, {
	filterProperties,
	titleToId,
} from '../../../src/web/components/elements/properties';
import listOfProperties from '../../../src/web/components/elements/properties-list';
import InternalLink from '../../../src/web/components/link/internal';
import Seo from '../../../src/web/components/seo';
import { BigTile } from '../../../src/web/components/table/element';
import useBreakpoint from '../../../src/web/hooks/break-point';

type GetStaticPropsType = InferGetStaticPropsType<typeof getStaticProps>;

const info = {
	section: 'none',
};

const getStaticPaths = (() => {
	return {
		fallback: false,
		paths: data.map((classification) => {
			return {
				params: {
					name: classification.name_en.toLowerCase(),
				},
			};
		}),
	};
}) satisfies GetStaticPaths;

const getStaticProps = ((context) => {
	const name = parseQueryParam(context.params?.['name']);

	return {
		props: Defined.parse(
			data.find((element) => {
				return element.name_en.toLowerCase() === name;
			})
		)
			.map((element) => {
				return {
					section: info.section,
					element: {
						...element,
						path: `/elements/${element.name_en.toLowerCase()}`,
					},
				};
			})
			.orThrow(`Element not found: ${name}`),
	};
}) satisfies GetStaticProps;

const Element = (props: GetStaticPropsType) => {
	const { element, section } = props;

	const breakpoint = useBreakpoint();

	const isSmall = breakpoint?.includes('s');

	const sectionValid = section !== info.section;

	const properties = listOfProperties(props);

	const color =
		classifications.find((classification) => {
			return element.category_code
				.replace(/_/g, '-')
				.startsWith(transformCategory(classification));
		}) ?? classifications[9];

	const height = useHeaderHeight();

	const initialHeight = 24;

	const style = {
		table: {
			top: initialHeight + height,
		},
	} as const;

	React.useEffect(() => {
		if (sectionValid && style.table.top !== initialHeight) {
			document
				.getElementById(section)
				?.style.setProperty(
					'scroll-margin-top',
					`${style.table.top}px`
				);

			document.getElementById(section)?.scrollIntoView();

			document
				.getElementById(section)
				?.style.setProperty('scroll-margin-top', '');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [height, element]);

	const url = `/elements/${element.name_en.toLowerCase()}`;

	return (
		<Box alignItems="center" display="flex" justifyContent="center" pb={8}>
			<Seo
				description={[
					element.description,
					element.sources,
					element.uses,
				].join(', ')}
				keywords={[
					element.name_en,
					element.symbol,
					element.number,
					element.category_code,
					element.group,
					element.period,
					element.atomic_mass,
				]}
				title={Optional.some(element.name_en)}
				url={sectionValid ? url : `${url}/${section}`}
			/>
			<Stack width="90%">
				<Grid
					container
					spacing={6}
					sx={{
						position: {
							sm: undefined,
							md: 'relative',
						},
					}}
				>
					<Grid
						lg={2}
						md={3}
						sm={12}
						sx={
							isSmall
								? null
								: {
										overflowY: 'auto',
										position: 'sticky',
										top: style.table.top,
										height: `calc(100vh - ${style.table.top * 2}px)`,
									}
						}
					>
						<Stack spacing={4}>
							<BigTile
								color={color.color}
								index={element.number}
								mass={element.atomic_mass}
								name={element.name_en}
								symbol={element.symbol}
							/>
							<Stack spacing={2}>
								{properties
									.filter((props) => {
										return filterProperties(
											props.properties
										).length;
									})
									.map((props) => {
										const id = titleToId(props.title);

										return (
											<InternalLink
												aria-label={`Link to ${props.title}`}
												href={`${element.path}/${encodeURIComponent(id)}`}
												key={id}
												style={{
													display: 'flex',
													gap: 5,
													alignItems: 'center',
												}}
											>
												<Typography
													sx={(theme) => {
														const borderColour =
															section === id
																? theme
																		.colorSchemes
																		.dark
																		.palette
																		.neutral[300]
																: 'transparent';

														return {
															width: 'fit-content',
															borderBottom: `1px solid ${borderColour}`,
															'&:hover': {
																color: theme
																	.colorSchemes
																	.dark
																	.palette
																	.neutral[100],
															},
														};
													}}
												>
													{props.title}
												</Typography>
											</InternalLink>
										);
									})}
							</Stack>
						</Stack>
					</Grid>
					<Grid
						lg={10}
						md={9}
						sm={12}
						sx={(theme) => {
							return {
								borderTop: isSmall
									? `1px solid ${theme.palette.background.level2}`
									: undefined,
							};
						}}
					>
						<Stack spacing={6}>
							{properties.map((props) => {
								return (
									<Properties
										{...props}
										key={props.title}
										top={style.table.top}
									/>
								);
							})}
						</Stack>
					</Grid>
				</Grid>
			</Stack>
		</Box>
	);
};

export { getStaticProps, getStaticPaths };

export type { GetStaticPropsType };

export default Element;
