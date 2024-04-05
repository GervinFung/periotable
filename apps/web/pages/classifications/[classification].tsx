import type { GetStaticPaths, GetStaticProps } from 'next';

import type { Argument } from '@poolofdeath20/util';

import Index from '../';
import classifications, {
	type Classification,
	transformCategory,
} from '../../src/common/classfication';
import { parseQueryParam } from '../../src/common/string';

type ClassificationProps = Readonly<{
	classification: Classification | undefined;
}>;

const parseCategory = (category: Argument<typeof parseQueryParam>) => {
	const parsed = parseQueryParam(category);

	return classifications.find((classification) => {
		return parsed === transformCategory(classification);
	});
};

const getStaticPaths = (() => {
	return {
		fallback: false,
		paths: classifications.map((classification) => {
			return {
				params: {
					classification: transformCategory(classification),
				},
			};
		}),
	};
}) satisfies GetStaticPaths;

const getStaticProps = ((context) => {
	return {
		props: {
			classification: parseCategory(context.params?.classification),
		},
	};
}) satisfies GetStaticProps;

const Classification = Index;

export type { ClassificationProps };

export { getStaticProps, getStaticPaths };

export default Classification;
