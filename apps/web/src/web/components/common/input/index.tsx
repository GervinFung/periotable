import type { DeepReadonly } from '@poolofdeath20/util';

import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import { Optional } from '@poolofdeath20/util';
import React from 'react';

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
				onChange={(event) => {
					const { value } = event.target;

					props.search.setValue(Optional.some(value));
				}}
				placeholder={props.placeholder}
				sx={{
					width: {
						xs: undefined,
						sm: 450,
					},
				}}
				value={props.search.value.unwrapOrGet('')}
				variant="outlined"
			/>
		</Box>
	);
};

export default SearchBar;
