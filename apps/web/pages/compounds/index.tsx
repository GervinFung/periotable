import React from 'react';

import Box from '@mui/joy/Box';

import { Optional } from '@poolofdeath20/util';

import data from '@periotable/data';

import Seo from '../../src/web/components/seo';
import ListOfCompounds, {
	type Compounds,
} from '../../src/web/components/compounds';

const Compounds = () => {
	const compounds = data.flatMap((value) => {
		return value.compounds;
	}) as Compounds;

	return (
		<Box display="flex" justifyContent="center" alignItems="center" pb={8}>
			<Seo
				url="/compounds"
				title={Optional.some('Compounds')}
				description={`All ${compounds.length} compounds available with their molecular formula and names. Some compounds have articles on Wikipedia`}
				keywords={[
					'compounds',
					'molecular formula',
					'names',
					'articles',
				]}
			/>
			<Box width="90%">
				<ListOfCompounds
					useNativeRouter={false}
					compounds={compounds}
					path="/compounds"
				/>
			</Box>
		</Box>
	);
};

export default Compounds;
