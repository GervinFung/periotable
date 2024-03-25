import fs from 'fs';

import { generatePaths } from '../../test/snapshot/data';

const main = () => {
	const paths = generatePaths();

	fs.writeFileSync(
		'src/web/generated/schema.ts',
		`const paths = ${JSON.stringify(paths, undefined, 4)}; export default paths;`
	);
};

main();
