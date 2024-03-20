import { useTheme } from '@mui/joy/styles';

import { Defined, equalTo } from '@poolofdeath20/util';

import { useWidth } from './dimension';

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
