import { getStaticPaths as classificationsGetStaticPaths } from '../../pages/classifications/[classification]';
import { getStaticPaths as elementsGetStaticPaths } from '../../pages/elements/[name]';

const generatePaths = () => {
	const classifications = classificationsGetStaticPaths().paths.map(
		(path) => {
			return `/classifications/${path.params.classification}`;
		}
	);

	const elements = elementsGetStaticPaths().paths.map((path) => {
		return `/elements/${path.params.name}`;
	});

	return classifications.concat(elements);
};

export { generatePaths };
