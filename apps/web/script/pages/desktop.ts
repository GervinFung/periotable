import fs from 'fs';

const main = () => {
	const error = `
import DesktopError from '../src/web/components/pages/error/desktop';

export default DesktopError;
`;

	const index = `
import DesktopIndex from '../src/web/components/pages/index/desktop';

export default DesktopIndex;
`;

	fs.writeFileSync(`${process.cwd()}/pages/_error.tsx`, error);
	fs.writeFileSync(`${process.cwd()}/pages/index.tsx`, index);
};

main();
