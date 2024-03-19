import React from 'react';

import { useTheme } from '@mui/joy/styles';

import { Defined, equalTo } from '@poolofdeath20/util';

const useWidth = () => {
	const [width, setWidth] = React.useState(0);

	React.useEffect(() => {
		const onResize = () => {
			setWidth(window.innerWidth);
		};

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return width;
};

const useBreakpoint = () => {
	const theme = useTheme();

	const width = useWidth();

	const breakpoints = Object.entries(theme.breakpoints.values)
		.filter(([_, value]) => {
			return value <= width;
		})
		.map(([key]) => {
			return Defined.parse(
				theme.breakpoints.keys.find(equalTo(key))
			).orThrow(`Breakpoint key not found: "${key}"`);
		});

	return breakpoints.at(-1);
};

export default useBreakpoint;
