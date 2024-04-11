import fs from 'fs';

import { Defined } from '@poolofdeath20/util';

import pkg from '../../package.json';

const main = () => {
	const changelogs = fs.readFileSync('CHANGELOG.md', {
		encoding: 'utf-8',
	});

	const changelog = Defined.parse(
		changelogs.split('#').find((version) => {
			return version.includes(pkg.version);
		})
	)
		.map((changelog) => {
			return `#${changelog}`;
		})
		.orThrow(`Changelog for version ${pkg.version} not found.`);

	console.log({ changelog });
};

main();
