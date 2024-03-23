import fs from 'fs';

import type { DeepReadonly } from '@poolofdeath20/util';

import { generatePaths } from '../../test/snapshot/data';

const code = (
	props: DeepReadonly<{
		index: number;
		paths: string[];
	}>
) => {
	return [
		`import { testSnapshot } from '.'`,
		`testSnapshot(${props.index}, [${props.paths
			.map((path) => `'${path}'`)
			.join(', ')}]);`,
	].join('\n');
};

const main = () => {
	// concat error page because `generatePaths` is used for seo schema
	// which should not include error page
	const paths = generatePaths().concat('/error');

	const numberOfParallelTests = 10;

	const numberOfTests = Math.ceil(paths.length / numberOfParallelTests);

	Array.from({ length: numberOfParallelTests }, (_, index) => {
		const start = index * numberOfTests;
		const end = (index + 1) * numberOfTests;

		return code({
			index: index + 1,
			paths: paths.slice(start, end),
		});
	}).forEach((code, index) => {
		fs.writeFileSync(
			`${process.cwd()}/test/snapshot/generated-${index + 1}.test.ts`,
			code
		);
	});
};

main();
