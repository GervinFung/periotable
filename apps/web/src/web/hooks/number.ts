import { Optional } from '@poolofdeath20/util';
import { useRouter } from 'next/router';

import { parseQueryParam } from '../../common/string';

const useNumber = <Name extends string>(name: Name) => {
	const router = useRouter();

	const current = Optional.from(router.query[name])
		.map(parseQueryParam)
		.map(parseInt);

	return current;
};

export { useNumber };
