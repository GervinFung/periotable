const config = () => {
	const url = process.env.NEXT_PUBLIC_ORIGIN;

	/** @type {import('next-sitemap').IConfig} */
	const config = {
		siteUrl: url,
		generateRobotsTxt: true, // (optional)
		exclude: ['/server-sitemap.xml'],
		robotsTxtOptions: {
			additionalSitemaps: [`${url}/server-sitemap.xml`],
		},
	};

	return config;
};

module.exports = config();
