import process from 'process';

// eslint-disable-next-line import/no-extraneous-dependencies
import { includeIgnoreFile } from '@eslint/compat';
// eslint-disable-next-line import/no-extraneous-dependencies
import eslint from '@eslint/js';
import { node, next } from '@poolofdeath20/eslint-config';
import tseslint from 'typescript-eslint';

const allowedFor = ['InternalLink', 'Image', 'Link'];

export default tseslint.config(
	includeIgnoreFile(`${process.cwd()}/.gitignore`),
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	node,
	{
		...next,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		rules: {
			...next.rules,
			'react/forbid-component-props': [
				'error',
				{
					forbid: [
						{
							propName: 'style',
							allowedFor,
							message: `Props "style" is forbidden for all components except ${allowedFor
								.map((component) => {
									return `"${component}"`;
								})
								.join(', ')}`,
						},
					],
				},
			],
		},
	}
);
