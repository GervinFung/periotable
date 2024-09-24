import type { Query } from './pagination-button';
import type { Return } from '@poolofdeath20/util';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import { Defined } from '@poolofdeath20/util';
import { useRouter } from 'next/router';
import React from 'react';

type QueryValue = (
	props: Readonly<{
		old: number;
		new: number;
	}>
) => Return<Query>;

const RowsSelect = (
	props: Readonly<{
		path: string;
		query: QueryValue;
		rows: number;
	}>
) => {
	const router = useRouter();

	return (
		<FormControl orientation="horizontal" size="sm">
			<FormLabel>Rows per page:</FormLabel>
			<Select
				onChange={(_, row) => {
					const rows = Defined.parse(row).orThrow('Rows is null');

					void router.push(
						{
							pathname: props.path,
							query: {
								...props.query({
									old: props.rows,
									new: rows,
								}),
								rows,
							},
						},
						undefined,
						{
							shallow: true,
							scroll: false,
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

export default RowsSelect;
