import { sleepInSeconds } from '@poolofdeath20/util';
import type { Browser } from 'puppeteer';

const getWebSnapshot = async (
	param: Readonly<{
		link: string;
		port: number;
		browser: Browser;
		platform: 'pc' | 'tablet' | 'mobile';
	}>
) => {
	const page = await param.browser.newPage();

	await page.setViewport(
		param.platform === 'pc'
			? { width: 1920, height: 1080 }
			: param.platform === 'tablet'
				? {
						width: 820,
						height: 1180,
					}
				: {
						width: 375,
						height: 667,
					}
	);

	await page.goto(
		`http://0.0.0.0:${param.port}${
			param.link === '/home' ? '' : param.link
		}`
	);

	await sleepInSeconds({
		seconds: 2,
	});

	const image = await page.screenshot({ fullPage: true });

	await page.close();

	return image;
};

export { getWebSnapshot };
