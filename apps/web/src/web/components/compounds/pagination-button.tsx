import type { Argument } from '@poolofdeath20/util';

import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import React from 'react';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';

import InternalLink from '../link/internal';

type Query = () => Readonly<Record<string, number | string>>;

const PaginationIconButton = (
	props: Readonly<{
		direction: 'left' | 'right';
		isDisabled?: true;
	}>
) => {
	const Direction =
		props.direction === 'left'
			? MdOutlineChevronLeft
			: MdOutlineChevronRight;

	return (
		<IconButton
			aria-label={`Go to ${props.direction} page`}
			color="neutral"
			disabled={props.isDisabled ?? false}
			size="sm"
			variant="plain"
		>
			<Direction />
		</IconButton>
	);
};

const DirectionPaginationButton = (
	props: Readonly<{
		direction: Argument<typeof PaginationIconButton>['direction'];
		path: string;
		isLimit: boolean;
		query: Query;
	}>
) => {
	if (props.isLimit) {
		return (
			<PaginationIconButton
				aria-label="Disabled button placeholder"
				direction={props.direction}
				isDisabled
			/>
		);
	} else {
		return (
			<InternalLink
				aria-label={`Go to ${props.direction} page`}
				href={{
					pathname: props.path,
					query: props.query(),
				}}
			>
				<PaginationIconButton
					aria-label="Button placeholder"
					direction={props.direction}
				/>
			</InternalLink>
		);
	}
};

const PaginationButton = (
	props: Readonly<{
		value: string | number;
		path: string;
		isCurrent: boolean;
		query: Query;
	}>
) => {
	if (typeof props.value === 'string') {
		return <Typography>{props.value}</Typography>;
	}

	return (
		<InternalLink
			aria-label={`Go to page ${props.value}`}
			href={{
				pathname: props.path,
				query: props.query(),
			}}
		>
			<Button
				aria-label={`Go to page ${props.value}`}
				color="neutral"
				size="sm"
				sx={{
					backgroundColor: props.isCurrent
						? 'neutral.700'
						: undefined,
				}}
				variant="plain"
			>
				<Typography>{props.value}</Typography>
			</Button>
		</InternalLink>
	);
};

export type { Query };

export { DirectionPaginationButton, PaginationButton };
