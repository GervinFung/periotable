import fs from 'fs';

import pkg from '../../package.json';
import icons from '../../src/web/images/icons';

const main = () => {
	const webmanifest = {
		name: 'Periodic Table',
		short_name: 'Pt',
		start_url: '/',
		display: 'standalone',
		description: pkg.description,
		categories: ['chemistry', 'periodic table', 'elements', 'science'],
		theme_color: '#FFF',
		background_color: '#FFF',
		icons: icons(),
	};

	const stringifiedWebmanifest = JSON.stringify(webmanifest, undefined, 4);

	fs.writeFileSync('public/site.webmanifest', stringifiedWebmanifest);

	fs.writeFileSync('public/manifest.json', stringifiedWebmanifest);
};

main();
