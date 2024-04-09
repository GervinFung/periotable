import fs from 'fs';

import { Octokit } from 'octokit';

import dotenv from 'dotenv';

import axios from 'axios';

const main = async () => {
	dotenv.config();

	const octokit = new Octokit({
		auth: process.env.TOKEN,
	});

	const result = await octokit.rest.repos.getContent({
		owner: process.env.OWNER,
		repo: process.env.REPO,
		path: process.env.DATA_PATH,
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
