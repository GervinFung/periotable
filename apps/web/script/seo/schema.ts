import fs from 'fs';

import { generatePaths } from '../../test/snapshot/data';

const main = () => {
	const paths = generatePaths();

	if (!fs.existsSync('src/web/generated')) {
		fs.mkdirSync('src/web/generated');
	}

	fs.writeFileSync(
		'src/web/generated/schema.ts',
		`const paths = ${JSON.stringify(paths, undefined, 4)}; export default paths;`
	);
};

main();
