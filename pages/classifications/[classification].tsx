import type { GetStaticPaths, GetStaticProps } from 'next';

import Index from '../';
import classifications, {
	Classification,
	transformCategory,
	parseCategory,
} from '../../src/common/classfication';

type ClassificationProps = Readonly<{
	classification: Classification | undefined;
}>;

const getStaticPaths = (() => {
	return {
		fallback: false,
		paths: classifications.map((classification) => {
			return {
				params: {
					classification: transformCategory(classification.category),
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
}) satisfies GetStaticProps<ClassificationProps>;

const Classification = Index;

export type { ClassificationProps };

export { getStaticProps, getStaticPaths };

export default Classification;
