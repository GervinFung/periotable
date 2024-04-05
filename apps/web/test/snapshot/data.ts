import { getStaticPaths as classificationsGetStaticPaths } from '../../pages/classifications/[classification]';
import { getStaticPaths as elementsGetStaticPaths } from '../../pages/elements/[name]';
import { getStaticPaths as subshellsGetStaticPaths } from '../../pages/subshells/[subshell]';

const generatePaths = () => {
	const classifications = classificationsGetStaticPaths().paths.map(
		(path) => {
			return `/classifications/${path.params.classification}`;
		}
	);

	const elements = elementsGetStaticPaths().paths.map((path) => {
		return `/elements/${path.params.name}`;
	});

	const subshells = subshellsGetStaticPaths().paths.map((path) => {
		return `/subshells/${path.params.subshell}`;
	});

	return ['/home', '/compounds'].concat(classifications, elements, subshells);
};

export { generatePaths };
