import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';

import { type DeepReadonly, Optional, Defined } from '@poolofdeath20/util';

import SearchBar from '../common/input';
import {
	useCurrentPage,
	usePagination,
	useRowsPerPage,
} from '../../hooks/pagination';

import { spaceToDash } from '../../../common/string';

type Query<T> = () => T;

type Compounds = DeepReadonly<
	{
		molecularformula: string;
		allnames: string[];
		articles: string[];
	}[]
>;

const DirectionPaginationButton = <T extends {}>(
	props: Readonly<{
		direction: 'left' | 'right';
		path: string;
		isLimit: boolean;
		query: Query<T>;
	}>
) => {
	const Direction =
		props.direction === 'left'
			? MdOutlineChevronLeft
			: MdOutlineChevronRight;

	const Button = (
		props: Readonly<{
			isDisabled?: true;
		}>
	) => {
		return (
			<IconButton
				color="neutral"
				variant="plain"
				size="sm"
				disabled={props.isDisabled}
			>
				<Direction />
			</IconButton>
		);
	};

	if (props.isLimit) {
		return <Button isDisabled />;
	} else {
		return (
			<Link
				href={{
					pathname: props.path,
					query: props.query(),
				}}
				style={{
					textDecoration: 'none',
				}}
			>
				<Button />
			</Link>
		);
	}
};

const PaginationButton = <T extends {}>(
	props: Readonly<{
		value: string | number;
		path: string;
		isCurrent: boolean;
		query: Query<T>;
	}>
) => {
	if (typeof props.value === 'string') {
		return <Typography>{props.value}</Typography>;
	}

	return (
		<Link
			href={{
				pathname: props.path,
				query: props.query(),
			}}
			style={{
				textDecoration: 'none',
			}}
		>
			<Button
				color="neutral"
				variant="plain"
				size="sm"
				sx={{
					backgroundColor: props.isCurrent
						? 'neutral.700'
						: undefined,
				}}
			>
				<Typography>{props.value}</Typography>
			</Button>
		</Link>
	);
};

const RowsSelect = <T extends {}>(
	props: Readonly<{
		path: string;
		query: Query<T>;
		rows: number;
	}>
) => {
	const router = useRouter();

	return (
		<FormControl orientation="horizontal" size="sm">
			<FormLabel>Rows per page:</FormLabel>
			<Select
				onChange={(_, rows) => {
					router.push(
						{
							pathname: props.path,
							query: {
								...props.query(),
								rows: Defined.parse(rows).orThrow(
									'RowsSelect: rows is null'
								),
							},
						},
						undefined,
						{
							shallow: true,
						}
					);
				}}
				value={props.rows}
			>
				{[5, 10, 25].map((value) => {
					return (
						<Option key={value} value={value}>
							{value}
						</Option>
					);
				})}
			</Select>
		</FormControl>
	);
};

const ListOfCompounds = (
	props: DeepReadonly<{
		compounds: Compounds;
		path: string;
		search: {
			value: Optional<string>;
			setValue: (value: Optional<string>) => void;
		};
	}>
) => {
	const { compounds } = props;

	const current = useCurrentPage('page').unwrapOrGet(1);

	const rows = useRowsPerPage('rows').unwrapOrGet(10);

	const total = Math.ceil(compounds.length / rows);

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

	return (
		<Stack spacing={4}>
			{!compounds.length ? (
				<Typography textAlign="justify">
					There are no compounds known as &quot;
					{props.search.value.unwrapOrGet('')}&quot;
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
			<Stack direction="row" justifyContent="space-between">
				<SearchBar
					placeholder="Compound name, molecular formula, IUPAC name"
					search={props.search}
				/>
				<RowsSelect
					path={props.path}
					rows={rows}
					query={() => {
						return {
							rows,
							page: 1,
						};
					}}
				/>
			</Stack>
			<Table aria-label="basic table">
				<thead>
					<tr>
						<th>Molecular Formula</th>
						<th>Names</th>
					</tr>
				</thead>
				<tbody>
					{compounds
						.slice(range.start, range.end)
						.map((match, index) => {
							return (
								<tr key={index}>
									<td>{match.molecularformula}</td>
									<td>
										{match.allnames.map((name) => {
											const article = match.articles.find(
												(article) => {
													return (
														article.toLowerCase() ===
														name
													);
												}
											);

											if (!article) {
												return (
													<Typography key={name}>
														{name}
													</Typography>
												);
											}

											return (
												<Link
													key={name}
													href={`https://en.wikipedia.org/wiki/${spaceToDash(article)}`}
													style={{
														color: 'inherit',
													}}
												>
													<Typography>
														{name}
													</Typography>
												</Link>
											);
										})}
									</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
			<Box
				display="flex"
				justifyContent="center"
				gap={2}
				sx={{
					pt: 4,
				}}
			>
				<DirectionPaginationButton
					direction="left"
					path={props.path}
					isLimit={isLimit(1)}
					query={() => {
						return {
							rows,
							page: current - 1,
						};
					}}
				/>
				{pagination.map((page, index) => {
					return (
						<PaginationButton
							key={index}
							value={page}
							path={props.path}
							isCurrent={page === current}
							query={() => {
								return {
									rows,
									page,
								};
							}}
						/>
					);
				})}
				<DirectionPaginationButton
					direction="right"
					path={props.path}
					isLimit={isLimit(total)}
					query={() => {
						return {
							rows,
							page: current + 1,
						};
					}}
				/>
			</Box>
		</Stack>
	);
};

export type { Compounds };

export default ListOfCompounds;
