/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	output: 'export',
	distDir: '../mobile/build',
	images: {
		unoptimized: true,
	},
	env: {
		DEVICE: 'mobile',
	},
};

export default config;
