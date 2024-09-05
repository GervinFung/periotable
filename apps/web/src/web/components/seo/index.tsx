import type {DeepReadonly, Optional} from '@poolofdeath20/util';

import {   Defined } from '@poolofdeath20/util';
import { DefaultSeo } from 'next-seo';
import React from 'react';



import icons from '../../images/icons';

import Schema from './schema';


const Seo = (
	props: DeepReadonly<{
		title: Optional<string>;
		description: string;
		keywords: Array<string | number>;
		url: undefined | string;
	}>
) => {
	const origin = process.env.NEXT_PUBLIC_ORIGIN;

	const url = props.url ? `${origin}/${props.url}` : origin;

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
				additionalMetaTags={[
					{
						name: 'keyword',
						content: `Periotable, Pt, ${name}, Science, Education, Modern Periodic Table, ${props.keywords.join(
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
				canonical={url}
				defaultTitle={title}
				description={description}
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
				title={title}
				titleTemplate={title}
				twitter={{
					handle: `@${name}`,
					site: `@${name}`,
					cardType: 'summary_large_image',
				}}
			/>
		</React.Fragment>
	);
};

export default Seo;
