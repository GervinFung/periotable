import { Defined } from '@poolofdeath20/util';

const obtainNameFromUrl = (url: string) => {
	return Defined.parse(url.split('/').at(-1)).orThrow(
		`URL does not have last part: ${url}`
	);
};

export { obtainNameFromUrl };
