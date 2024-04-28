import fs from 'fs';

import axios from 'axios';

import data from '@periotable/data';

import constants from '../../src/web/constant';

const element = () => {
	const path = `${process.cwd()}/public${constants.images.generated.country}`;

	if (!fs.existsSync(path)) {
		fs.mkdirSync(path, {
			recursive: true,
		});
	}

	data.flatMap((data) => {
		return data.countries;
	}).forEach(async (country) => {
		const response = await axios.get(country.link, {
			responseType: 'arraybuffer',
		});

		fs.writeFile(`${path}/${country.svg}`, response.data, (error) => {
			if (error) {
				throw error;
			}
		});
	});
};

export default element;
