import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	entry: [
		'pages/api/**/*.ts',
		'pages/**/*.tsx',
		'src/**/*.tsx',
		'src/**/*.ts',
		'script/**/*.ts',
	],
	ignore: ['next-sitemap.config.js', 'next/**.mjs', 'test/**/**.ts'],
	ignoreDependencies: [
		'@ducanh2912/next-pwa',
		'@periotable/data',
		'@types/jest-image-snapshot',
		'eslint',
		'jest-image-snapshot',
		'next-sitemap',
		'puppeteer',
		'vite-node',
	],
	ignoreBinaries: ['make'],
};

export default config;
