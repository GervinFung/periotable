import React from 'react';

import Link from 'next/link';

import type { Argument } from '@poolofdeath20/util';

const InternalLink = (props: Argument<typeof Link>) => {
	return (
		<Link
			{...props}
			style={{
				...props.style,
				textDecoration: 'none',
			}}
		>
			{props.children}
		</Link>
	);
};

export default InternalLink;
