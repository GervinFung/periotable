import type { Compounds } from '../../src/web/components/compounds';

import Box from '@mui/joy/Box';
import data from '@periotable/data';
import { Optional } from '@poolofdeath20/util';
import React from 'react';

import ListOfCompounds from '../../src/web/components/compounds';
import Seo from '../../src/web/components/seo';

const Compounds = () => {
	const compounds = data.flatMap((value) => {
		return value.compounds;
	}) as Compounds;

	return (
		<Box alignItems="center" display="flex" justifyContent="center" pb={8}>
			<Seo
				description={`All ${compounds.length} compounds available with their molecular formula and names. Some compounds have articles on Wikipedia`}
				keywords={[
					'compounds',
					'molecular formula',
					'names',
					'articles',
				]}
				title={Optional.some('Compounds')}
				url="/compounds"
			/>
			<Box width="90%">
				<ListOfCompounds
					compounds={compounds}
					path="/compounds"
					useNativeRouter={false}
				/>
			</Box>
		</Box>
	);
};

export default Compounds;
