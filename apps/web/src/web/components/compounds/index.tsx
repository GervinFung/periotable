import type { DeepReadonly, Optional } from '@poolofdeath20/util';

import Stack from '@mui/joy/Stack';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import { formQueryParamStringFromRecord } from '@poolofdeath20/util';
import { useRouter } from 'next/router';
import React from 'react';
import { useDebounce } from 'use-debounce';

import { spaceToUnderscore } from '../../../common/string';
import useBreakpoint from '../../hooks/break-point';
import {
	useCurrentPage,
	usePagination,
	useRowsPerPage,
} from '../../hooks/pagination';
import useSearchQuery from '../../hooks/search';
import SearchBar from '../common/input';
import ExternalLink from '../link/external';

import {
	DirectionPaginationButton,
	PaginationButton,
} from './pagination-button';
import RowsSelect from './row-select';

type Compounds = DeepReadonly<
	Array<{
		molecularformula: string;
		allnames: Array<string>;
		articles: Array<string>;
	}>
>;

const getMaxFrom = (compounds: Compounds) => {
	return (rows: number) => {
		return Math.ceil(compounds.length / rows);
	};
};

const useCompounds = (
	props: Readonly<{
		compounds: Compounds;
		search: Optional<string>;
	}>
) => {
	const [compounds, setCompounds] = React.useState(props.compounds);

	React.useEffect(() => {
		setCompounds(
			props.search
				.map((value) => {
					return value.toLowerCase();
				})
				.map((value) => {
					return props.compounds.filter((match) => {
						const molecularFormulaMatch = match.molecularformula
							.toLowerCase()
							.includes(value);

						switch (molecularFormulaMatch) {
							case true: {
								return true;
							}
							case false: {
								const nameMatches = match.allnames.filter(
									(name) => {
										return name
											.toLowerCase()
											.includes(value);
									}
								);

								return nameMatches.length;
							}
						}
					});
				})
				.unwrapOrElse(() => {
					return props.compounds;
				})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.search]);

	return compounds;
};

const CompoundName = (
	props: Readonly<{
		name: string;
	}>
) => {
	return <Typography>{props.name}</Typography>;
};

const ListOfCompounds = (
	props: DeepReadonly<{
		compounds: Compounds;
		path: string;
		useNativeRouter: boolean;
	}>
) => {
	const router = useRouter();

	const breakpoint = useBreakpoint();

	const isXs = breakpoint === 'xs';

	const [search, setSearch, oldSearch] = useSearchQuery();

	const [debounceSearch] = useDebounce(search, 400);

	const compounds = useCompounds({
		search,
		compounds: props.compounds,
	});

	const fromRow = getMaxFrom(compounds);

	const current = useCurrentPage('page').unwrapOrGet(1);

	const rows = useRowsPerPage('rows').unwrapOrGet(10);

	const total = fromRow(rows);

	const pagination = usePagination({
		current,
		total,
		siblingCount: 1,
	});

	const range = {
		start: (current - 1) * rows,
		end: current * rows,
	};

	const isLimit = (limit: number) => {
		return limit === current;
	};

	const sliced = compounds.slice(range.start, range.end);

	React.useEffect(() => {
		debounceSearch.ifSome((search) => {
			if (oldSearch !== search) {
				switch (props.useNativeRouter) {
					case false: {
						void router.push(
							{
								pathname: props.path,
								query: {
									search,
									rows,
									page: 1,
								},
							},
							undefined,
							{
								shallow: true,
								scroll: false,
							}
						);
						break;
					}
					case true: {
						const query = formQueryParamStringFromRecord({
							search,
							rows,
							page: 1,
						});

						const url = `${props.path}?${query}`;

						window.history.pushState(
							{
								...window.history.state,
								as: url,
								url,
							},
							document.title,
							url
						);
					}
				}
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounceSearch]);

	return (
		<Stack spacing={4}>
			{!compounds.length ? (
				<Typography textAlign="justify">
					There are no compounds known as &quot;
					{search.unwrapOrGet('')}&quot;
				</Typography>
			) : (
				<Typography textAlign="justify">
					{range.start + 1}-
					{range.end > compounds.length
						? compounds.length
						: range.end}{' '}
					of {compounds.length} compound
					{compounds.length === 1 ? null : 's'}
				</Typography>
			)}
			<Stack
				direction={{
					md: 'row',
					xs: 'column',
				}}
				justifyContent="space-between"
				spacing={{
					md: 0,
					xs: 4,
				}}
			>
				<SearchBar
					placeholder="Compound name, molecular formula, IUPAC name"
					search={{
						value: search,
						setValue: setSearch,
					}}
				/>
				<RowsSelect
					path={props.path}
					query={(result) => {
						// ref: https://ux.stackexchange.com/a/87617
						const first = (current - 1) * result.old;

						const pages = Array.from(
							{ length: fromRow(result.new) },
							(_, index) => {
								return index + 1;
							}
						);

						const page =
							pages.find((page) => {
								return page * result.new > first;
							}) ?? 1;

						return {
							page,
							search: search.unwrapOrGet(''),
							rows: result.new,
						};
					}}
					rows={rows}
				/>
			</Stack>
			{!compounds.length ? null : (
				<React.Fragment>
					<Table aria-label="basic table">
						<thead>
							<tr>
								<th
									style={!isXs ? undefined : { width: '35%' }}
								>
									Formula
								</th>
								<th
									style={!isXs ? undefined : { width: '65%' }}
								>
									Names
								</th>
							</tr>
						</thead>
						<tbody>
							{sliced.map((match) => {
								return (
									<tr key={match.molecularformula}>
										<td>{match.molecularformula}</td>
										<td>
											{match.allnames.map((name) => {
												const article =
													match.articles.find(
														(article) => {
															return (
																article.toLowerCase() ===
																name
															);
														}
													);

												if (!article) {
													return (
														<CompoundName
															key={name}
															name={name}
														/>
													);
												}

												return (
													<ExternalLink
														aria-label={`Go to ${name}`}
														href={`https://en.wikipedia.org/wiki/${spaceToUnderscore(article)}`}
														key={name}
														sx={{
															color: 'inherit',
															textDecoration:
																'underline',
														}}
													>
														<CompoundName
															name={name}
														/>
													</ExternalLink>
												);
											})}
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					<Stack
						direction="row"
						justifyContent="center"
						spacing={{
							md: 2,
							xs: 1,
						}}
						sx={{
							pt: 4,
						}}
					>
						<DirectionPaginationButton
							direction="left"
							isLimit={isLimit(1)}
							path={props.path}
							query={() => {
								return {
									rows,
									search: search.unwrapOrGet(''),
									page: current - 1,
								};
							}}
						/>
						{pagination.map((page) => {
							return (
								<PaginationButton
									isCurrent={page === current}
									key={page}
									path={props.path}
									query={() => {
										return {
											rows,
											page,
											search: search.unwrapOrGet(''),
										};
									}}
									value={page}
								/>
							);
						})}
						<DirectionPaginationButton
							direction="right"
							isLimit={isLimit(total)}
							path={props.path}
							query={() => {
								return {
									rows,
									search: search.unwrapOrGet(''),
									page: current + 1,
								};
							}}
						/>
					</Stack>
				</React.Fragment>
			)}
		</Stack>
	);
};

export type { Compounds };

export default ListOfCompounds;
