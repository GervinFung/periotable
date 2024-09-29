import { Optional } from '@poolofdeath20/util';
import { useRouter } from 'next/router';

import { parseQueryParam } from '../../common/string';

const useNumber = (name: string) => {
	const router = useRouter();

	const current = Optional.from(router.query[name])
		.map(parseQueryParam)
		.map(parseInt);

	return current;
};

export { useNumber };
