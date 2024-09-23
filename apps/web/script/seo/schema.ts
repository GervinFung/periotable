import fs from 'fs';

import { generatePaths } from '../../test/snapshot/data';

const main = () => {
	if (!fs.existsSync('src/web/generated')) {
		fs.mkdirSync('src/web/generated');
	}

	// create a dummy file to solve chicken and egg problem
	fs.writeFileSync(
		'src/web/generated/schema.ts',
		`const paths = [] as ReadonlyArray<string>\n; export default paths;`
	);

	const paths = generatePaths();

	fs.writeFileSync(
		'src/web/generated/schema.ts',
		`const paths = ${JSON.stringify(paths, undefined, 4)}\n; export default paths;`
	);

	process.exit(0);
};

main();
