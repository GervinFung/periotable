import React from 'react';

import { DefaultSeo } from 'next-seo';

import { type DeepReadonly, type Optional, Defined } from '@poolofdeath20/util';

import Schema from './schema';

import icons from '../../images/icons';

const Seo = (
	props: DeepReadonly<{
		title: Optional<string>;
		description: string;
		keywords: Array<string | number>;
	}>
) => {
	const url = process.env.NEXT_PUBLIC_ORIGIN;

	const iconPath = '/images/icons';

	const name = 'Pt';

	const title = props.title
		.map((title) => {
			return `${name} | ${title}`;
		})
		.unwrapOrGet(name);

	const { description } = props;

	const content = '#FFF';

	return (
		<React.Fragment>
			<Schema />
			<DefaultSeo
				title={title}
				canonical={url}
				defaultTitle={title}
				titleTemplate={title}
				description={description}
				twitter={{
					handle: `@${name}`,
					site: `@${name}`,
					cardType: 'summary_large_image',
				}}
				openGraph={{
					url,
					title,
					description,
					images: icons().map((icon) => {
						const size = Defined.parse(icon.sizes.split('x').at(0))
							.map(parseInt)
							.orThrow('icon size not found');

						return {
							alt: `website icon as dimension of ${icon.sizes}`,
							width: size,
							height: size,
							url: `${iconPath}/icon-${icon.sizes}.png`,
						};
					}),
				}}
				additionalMetaTags={[
					{
						name: 'keyword',
						content: `Periodic Table, Pt, ${name}, Science, Education, Modern Periodic Table, ${props.keywords.join(
							','
						)}`,
					},
					{
						name: 'author',
						content: 'Gervin Fung Da Xuen | PoolOfDeath20',
					},
					{
						name: 'viewport',
						content: 'width=device-width, initial-scale=1',
					},
					{
						name: 'mobile-web-app-capable',
						content: 'yes',
					},
					{
						name: 'apple-mobile-web-app-capable',
						content: 'yes',
					},
					{
						name: 'application-name',
						content: name,
					},
					{
						name: 'application-mobile-web-app-title',
						content: name,
					},
					{
						name: 'theme-color',
						content,
					},
					{
						name: 'msapplication-navbutton-color',
						content,
					},
					{
						name: 'apple-mobile-web-app-status-bar-style',
						content,
					},
					{
						name: 'msapplication-starturl',
						content: 'index.html',
					},
				]}
				additionalLinkTags={[
					{
						rel: 'icon',
						type: 'image/x-icon',
						href: `${iconPath}/favicon.ico`,
					},
					{
						rel: 'apple-touch-icon',
						type: 'image/x-icon',
						href: `${iconPath}/favicon.ico`,
					},
					...icons().flatMap(({ sizes, src: href }) => {
						return [
							{
								href,
								sizes,
								rel: 'icon',
							},
							{
								href,
								sizes,
								rel: 'apple-touch-icon',
							},
						];
					}),
				]}
			/>
		</React.Fragment>
	);
};

export default Seo;
