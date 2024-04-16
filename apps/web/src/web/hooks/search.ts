import React from 'react';

import { useRouter } from 'next/router';

import { Optional } from '@poolofdeath20/util';

const useSearchQuery = () => {
	const router = useRouter();

	const [value, setValue] = React.useState(Optional.none<string>());

	React.useEffect(() => {
		setValue(
			Optional.from(router.query.search)
				.flatMap((value) => {
					if (typeof value === 'string') {
						return Optional.some(value);
					}

					throw new Error(`Invalid search query: ${value}`);
				})
				.map(decodeURI)
		);
	}, [router.query.search]);

	return [value, setValue, router.query.search] as const;
};

export default useSearchQuery;
