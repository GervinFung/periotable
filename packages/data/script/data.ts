import fs from 'fs';

import { Octokit } from 'octokit';

import dotenv from 'dotenv';

import axios from 'axios';

const asString = <Str extends string>(string: Str | undefined) => {
	if (string) {
		return string;
	}

	throw new Error('');
};

const main = async () => {
	dotenv.config();

	const octokit = new Octokit({
		auth: process.env.TOKEN,
	});

	const result = await octokit.rest.repos.getContent({
		owner: asString(process.env.OWNER),
		repo: asString(process.env.REPO),
		path: asString(process.env.DATA_PATH),
	});

	// @ts-expect-error: Download URL exists because data is of type "file" but it doesn't have type
	const url = result.data.download_url as string;

	const content = await axios.get(url).then((response) => {
		if (typeof response.data !== 'string') {
			throw new Error('Data is not a string');
		}

		return response.data;
	});

	fs.writeFileSync('index.ts', content);
};

main();
