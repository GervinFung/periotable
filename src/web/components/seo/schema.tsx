import React from 'react';
import Script from 'next/script';

const Schema = () => {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: (['home'] as const).map((name) => {
			return {
				name,
				'@type': 'ListItem',
				position: 1,
				item: `${process.env.DOMAIN}/${name === 'home' ? '' : name}`,
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
