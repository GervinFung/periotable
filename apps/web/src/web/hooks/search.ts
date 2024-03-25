import React from 'react';

import { Optional } from '@poolofdeath20/util';

const useSearchQuery = () => {
	const [value, setValue] = React.useState(Optional.none<string>());

	return [value, setValue] as const;
};

export default useSearchQuery;
