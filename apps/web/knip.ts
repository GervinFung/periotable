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
	ignoreBinaries: ['make'],
	ignoreDependencies: [
		'vite-node',
		'next-sitemap',
		'eslint',
		'@periotable/data',
		'@ducanh2912/next-pwa',
		'@types/jest-image-snapshot',
		'jest-image-snapshot',
		'puppeteer',
	],
};

export default config;
