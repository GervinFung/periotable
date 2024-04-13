import fs from 'fs';

const main = () => {
	const error = `
import NativeError from '../src/web/components/pages/error/native';

export default NativeError;
`;

	const index = `
import NativeIndex from '../src/web/components/pages/index/native';

export default NativeIndex;
`;

	fs.writeFileSync(`${process.cwd()}/pages/_error.tsx`, error);
	fs.writeFileSync(`${process.cwd()}/pages/index.tsx`, index);
};

main();
