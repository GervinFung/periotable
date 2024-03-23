import React from 'react';

import Script from 'next/script';

import names from '../../generated/schema';

const Schema = () => {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: names
			.map((name) => {
				return name.replace('/', '');
			})
			.map((name) => {
				return {
					'@type': 'ListItem',
					position: name.split('/').length,
					item: {
						name: name === 'home' ? '/' : name,
						'@id': `${process.env.NEXT_PUBLIC_ORIGIN}/${name}`,
					},
				};
			}),
	};

	return (
		<Script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData, undefined, 4),
			}}
		/>
	);
};

export default Schema;
