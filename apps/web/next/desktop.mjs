/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	output: 'export',
	distDir: '../desktop/build',
	images: {
		unoptimized: true,
	},
	env: {
		DEVICE: 'desktop',
	},
};

export default config;
