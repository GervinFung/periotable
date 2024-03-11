import React from 'react';

import type {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
} from 'next';

import { Optional } from '@poolofdeath20/util';

import data from '../../../src/web/generated/data';
import Element, { listOfPropertiesTitle, titleToId } from './';

import { getStaticPaths as getStaticPathsIndex } from './';

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

const getStaticProps = ((context) => {
	const { name, section } = context.params || {};

	if (typeof name !== 'string') {
		throw new Error('Name is not a string');
	}

	if (typeof section !== 'string') {
		throw new Error('Section is not a string');
	}

	return {
		props: Optional.from(
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
			.unwrapOrThrow(`Element not found: ${name}`),
	};
}) satisfies GetStaticProps<
	Readonly<{
		section: string;
		element: (typeof data)[number] | undefined;
	}>
>;

const ElementWithSection = (
	props: InferGetStaticPropsType<typeof getStaticProps>
) => {
	return <Element {...props} />;
};

export { getStaticPaths, getStaticProps };

export default ElementWithSection;
