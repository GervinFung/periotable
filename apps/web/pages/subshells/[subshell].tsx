import type { Subshell } from '../../src/common/subshell';
import type { Argument } from '@poolofdeath20/util';
import type { GetStaticPaths, GetStaticProps } from 'next';

import Index from '..';
import { parseQueryParam } from '../../src/common/string';
import subshells from '../../src/common/subshell';

type SubshellProps = Readonly<{
	subshell: Subshell | undefined;
}>;

const parseSubshell = (subshell: Argument<typeof parseQueryParam>) => {
	const parsed = parseQueryParam(subshell);

	return subshells.find(({ subshell }) => {
		return subshell === parsed;
	});
};

const getStaticPaths = (() => {
	return {
		fallback: false,
		paths: subshells.map(({ subshell }) => {
			return {
				params: {
					subshell,
				},
			};
		}),
	};
}) satisfies GetStaticPaths;

const getStaticProps = ((context) => {
	return {
		props: {
			subshell: parseSubshell(context.params?.['subshell']),
		},
	};
}) satisfies GetStaticProps;

const Subshell = Index;

export type { SubshellProps };

export { getStaticProps, getStaticPaths };

export default Subshell;
