import React from 'react';

import Box from '@mui/joy/Box';

import { Optional } from '@poolofdeath20/util';

import data from '../../src/web/generated/data';
import useSearchQuery from '../../src/web/hooks/search';
import Seo from '../../src/web/components/seo';
import ListOfCompounds, {
	type Compounds,
} from '../../src/web/components/compounds';

const Compounds = () => {
	const allCompounds = data.flatMap((value) => {
		return value.compounds;
	}) as Compounds;

	const [value, setValue] = useSearchQuery();

	const [compounds, setCompounds] = React.useState(allCompounds);

	React.useEffect(() => {
		setCompounds(
			value
				.map((value) => {
					return value.toLowerCase();
				})
				.map((value) => {
					return allCompounds.filter((match) => {
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
					return allCompounds;
				})
		);
	}, [value.unwrapOrGet('')]);

	return (
		<Box display="flex" justifyContent="center" alignItems="center" pb={8}>
			<Seo
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
					compounds={compounds}
					path="/compounds"
					search={{
						value,
						setValue,
					}}
				/>
			</Box>
		</Box>
	);
};

export default Compounds;
