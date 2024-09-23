// eslint-disable-next-line no-undef
const url = process.env.NEXT_PUBLIC_ORIGIN;

/** @type {import('next-sitemap').IConfig} */
// eslint-disable-next-line no-undef, import/no-commonjs
module.exports = {
	siteUrl: url,
	generateRobotsTxt: true, // (optional)
	exclude: ['/server-sitemap.xml'],
	robotsTxtOptions: {
		additionalSitemaps: [`${url}/server-sitemap.xml`],
	},
};
