import React from 'react';

import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';

import { type DeepReadonly, Optional } from '@poolofdeath20/util';

const SearchBar = (
	props: DeepReadonly<{
		placeholder: string;
		search: {
			value: Optional<string>;
			setValue: (value: Optional<string>) => void;
		};
	}>
) => {
	return (
		<Box>
			<Input
				size="md"
				variant="outlined"
				placeholder={props.placeholder}
				sx={{
					width: {
						xs: 350,
						sm: 450,
					},
				}}
				value={props.search.value.unwrapOrGet('')}
				onChange={(event) => {
					const { value } = event.target;

					props.search.setValue(
						value ? Optional.some(value) : Optional.none()
					);
				}}
			/>
		</Box>
	);
};

export default SearchBar;
