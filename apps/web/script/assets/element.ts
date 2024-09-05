import fs from 'fs';

import axios from 'axios';

import { isNotUndefined } from '@poolofdeath20/util';

import data from '@periotable/data';

import { parse, string } from 'valibot';

import constants from '../../src/web/constant';
import { obtainNameFromUrl } from '../../src/web/util/asset';

const element = () => {
	const paths = [
		`public${constants.images.generated.bohr.interactive}`,
		`public${constants.images.generated.bohr.static}`,
		`public${constants.images.generated.spectrum}`,
	].map((path) => {
		return `${process.cwd()}/${path}`;
	});

	paths.forEach((path) => {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, {
				recursive: true,
			});
		}
	});

	data.flatMap((element) => {
		const {
			spectrum,
			bohrModel: { interactive, static: nonInteractive },
		} = element;

		const newSpectrum = spectrum?.replace('360', '240');

		return [
			!interactive
				? undefined
				: {
						name: `${paths[0]}/${obtainNameFromUrl(interactive)}`,
						url: interactive,
					},
			!nonInteractive
				? undefined
				: {
						name: `${paths[1]}/${obtainNameFromUrl(nonInteractive)}`,
						url: nonInteractive,
					},
			!newSpectrum
				? undefined
				: {
						name: `${paths[2]}/${obtainNameFromUrl(newSpectrum)}`,
						url: newSpectrum,
					},
		].filter(isNotUndefined);
	}).forEach((props) => {
		void axios
			.get(props.url, {
				responseType: 'arraybuffer',
			})
			.then(({ data }) => {
				fs.writeFile(props.name, parse(string(), data), (error) => {
					if (error) {
						throw error;
					}
				});
			});
	});
};

export default element;
