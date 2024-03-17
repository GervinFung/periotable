import type { Argument } from '@poolofdeath20/util';

const spaceToDash = (value: string) => {
	return value.replace(/ /g, '-');
};

const parseQueryParam = (query: Argument<typeof parseNullableQueryParam>) => {
	if (typeof query === 'string') {
		return query;
	}

	throw new Error('Query parameter is not a string');
};

const parseNullableQueryParam = (
	query: string | ReadonlyArray<string> | undefined
) => {
	if (!Array.isArray(query)) {
		return query;
	}

	throw new Error('Query parameter is an array');
};

export { spaceToDash, parseQueryParam, parseNullableQueryParam };
