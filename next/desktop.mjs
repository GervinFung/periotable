/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	swcMinify: true,
	output: 'export',
	distDir: 'desktop',
	images: {
		unoptimized: true,
	},
};

export default config;
