import fs from 'fs';

import { Octokit } from 'octokit';

import dotenv from 'dotenv';

import axios from 'axios';

const asString = <Str extends string>(string: Str | undefined | null) => {
	if (string) {
		return string;
	}

	throw new Error(`Expected a string, but got "${string}"`);
};

const main = async () => {
	dotenv.config();

	const octokit = new Octokit({
		auth: process.env['TOKEN'],
	});

	const result = await octokit.rest.repos.getContent({
		owner: asString(process.env['OWNER']),
		repo: asString(process.env['REPO']),
		path: asString(process.env['DATA_PATH']),
	});

	const { data } = result;

	if (Array.isArray(data)) {
		throw new Error('Data is an array');
	}

	const content = await axios
		.get(asString(data.download_url))
		.then((response) => {
			if (typeof response.data !== 'string') {
				throw new Error('Data is not a string');
			}

			return response.data;
		});

	fs.writeFileSync('index.ts', content);
};

main();
