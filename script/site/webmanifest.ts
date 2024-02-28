import fs from 'fs';
import pkg from '../../package.json';

const main = () => {
	const dimensions = [72, 96, 128, 152, 192, 384, 512] as const;

	const webmanifest = {
		name: pkg.author,
		short_name: pkg.author,
		icons: dimensions.map((dimension) => ({
			sizes: `${dimension}x${dimension}`,
			src: `/images/icons/icon-${dimension}x${dimension}.png`,
			type: 'image/png',
		})),
		theme_color: 'site_color_unknown',
		background_color: 'site_color_unknown',
		display: 'standalone',
	};

	fs.writeFileSync(
		'public/site.webmanifest',
		JSON.stringify(webmanifest, undefined, 4)
	);
};

main();
