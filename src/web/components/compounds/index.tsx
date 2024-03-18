import React from 'react';

import Link from 'next/link';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';

import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';

import { type DeepReadonly, Optional } from '@poolofdeath20/util';

import SearchBar from '../common/input';
import { useCurrentPage, usePagination } from '../../hooks/pagination';

import { spaceToDash } from '../../../common/string';

type Compounds = DeepReadonly<
	{
		molecularformula: string;
		allnames: string[];
		articles: string[];
	}[]
>;

const DirectionPaginationButton = (
	props: Readonly<{
		direction: 'left' | 'right';
		path: string;
		current: number;
		total: number;
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

	switch (props.direction) {
		case 'left': {
			if (props.current === 1) {
				return <Button isDisabled />;
			} else {
				return (
					<Link
						href={`${props.path}?page=${props.current - 1}`}
						style={{
							textDecoration: 'none',
						}}
					>
						<Button />
					</Link>
				);
			}
		}
		case 'right': {
			if (props.current === props.total) {
				return <Button isDisabled />;
			} else {
				return (
					<Link
						href={`${props.path}?page=${props.current + 1}`}
						style={{
							textDecoration: 'none',
						}}
					>
						<Button />
					</Link>
				);
			}
		}
	}
};

const PaginationButton = (
	props: Readonly<{
		value: string | number;
		path: string;
		isCurrent: boolean;
	}>
) => {
	if (typeof props.value === 'string') {
		return <Typography>{props.value}</Typography>;
	}

	return (
		<Link
			href={`${props.path}?page=${props.value}`}
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

	const step = 10;

	const total = Math.ceil(compounds.length / step);

	const pagination = usePagination({
		current,
		total,
		siblingCount: 1,
	});

	const range = {
		start: (current - 1) * step,
		end: current * step,
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
					There are total of {compounds.length} compound
					{compounds.length === 1 ? null : 's'} available
				</Typography>
			)}
			<SearchBar
				placeholder="Compound name, molecular formula, IUPAC name"
				search={props.search}
			/>
			<Table aria-label="basic table">
				<thead>
					<tr>
						<th>Number</th>
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
									<td>{range.start + index + 1}</td>
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
					current={current}
					total={total}
				/>
				{pagination.map((page, index) => {
					return (
						<PaginationButton
							key={index}
							value={page}
							path={props.path}
							isCurrent={page === current}
						/>
					);
				})}
				<DirectionPaginationButton
					direction="right"
					path={props.path}
					current={current}
					total={total}
				/>
			</Box>
		</Stack>
	);
};

export type { Compounds };

export default ListOfCompounds;
