import fs from 'fs';

import { setOutput } from '@actions/core';

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
			return changelog
				.replace(/ \d+\.\d+\.\d+/gm, '')
				.split('\n')
				.map((line, index) => {
					return index
						? line
						: line.replace('(', '').replace(')', '');
				})
				.join('\n')
				.trim();
		})
		.orThrow(`Changelog for version ${pkg.version} not found.`);

	setOutput('release_body', changelog);
};

main();
