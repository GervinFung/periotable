import React from 'react';

import { useRouter } from 'next/router';

import { Optional } from '@poolofdeath20/util';

const useSearchQuery = () => {
	const router = useRouter();

	const search = router.query['search'];

	const [value, setValue] = React.useState(Optional.none<string>());

	React.useEffect(() => {
		setValue(
			Optional.from(search)
				.flatMap((value) => {
					if (typeof value === 'string') {
						return Optional.some(value);
					}

					throw new Error(`Invalid search query: ${value}`);
				})
				.map(decodeURI)
		);
	}, [search]);

	return [value, setValue, search] as const;
};

export default useSearchQuery;
