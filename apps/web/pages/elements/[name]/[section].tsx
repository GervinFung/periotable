import type { GetStaticPaths, GetStaticProps } from 'next';

import { Defined } from '@poolofdeath20/util';

import data from '@periotable/data';

import Element, {
	listOfPropertiesTitle,
	titleToId,
	getStaticPaths as getStaticPathsIndex,
} from './';

import { parseQueryParam } from '../../../src/common/string';

const getStaticPaths = (() => {
	const result = getStaticPathsIndex();

	return {
		...result,
		paths: listOfPropertiesTitle()
			.map(titleToId)
			.flatMap((section) => {
				return result.paths.map((path) => {
					return {
						params: {
							section,
							name: path.params.name,
						},
					};
				});
			}),
	};
}) satisfies GetStaticPaths;

const getStaticProps = (async (context) => {
	const name = parseQueryParam(context.params?.name);

	const section = parseQueryParam(context.params?.section);

	return {
		props: Defined.parse(
			data.find((element) => {
				return element.name_en.toLowerCase() === name;
			})
		)
			.map((element) => {
				return {
					section,
					element: {
						...element,
						path: `/elements/${element.name_en.toLowerCase()}`,
					},
				};
			})
			.orThrow(`Element not found: ${name}`),
	};
}) satisfies GetStaticProps;

const ElementWithSection = Element;

export { getStaticPaths, getStaticProps };

export default ElementWithSection;
