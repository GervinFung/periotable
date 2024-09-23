import fs from 'fs';

import data from '@periotable/data';
import axios from 'axios';

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
	}).forEach((country) => {
		void axios
			.get(country.link, {
				responseType: 'arraybuffer',
			})
			.then(({ data }) => {
				if (!Buffer.isBuffer(data)) {
					throw new Error('Data is not a buffer');
				}

				fs.writeFile(`${path}/${country.svg}`, data, (error) => {
					if (error) {
						throw error;
					}
				});
			});
	});
};

export default element;
