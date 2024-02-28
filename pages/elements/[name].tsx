import React from 'react';

import type {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
} from 'next';

import data from '../../src/web/generated/data';

type Element = (typeof data)[number];

type ElementProps = Readonly<{
	element: Element | undefined;
}>;

const getStaticPaths = (async () => {
	return {
		fallback: false,
		paths: data.map((classification) => {
			return {
				params: {
					name: classification.name_en.toLowerCase(),
				},
			};
		}),
	};
}) satisfies GetStaticPaths;

const getStaticProps = ((context) => {
	const name = context.params?.name;

	console.log({ name });

	if (typeof name !== 'string') {
		throw new Error('Name is not a string');
	}

	return {
		props: {
			element: data.find((element) => {
				return element.name_en.toLowerCase() === name;
			}),
		},
	};
}) satisfies GetStaticProps<ElementProps>;

const Element = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	return <div>{JSON.stringify(props.element, undefined, 4)}</div>;
};

export type { ElementProps };

export { getStaticProps, getStaticPaths };

export default Element;
