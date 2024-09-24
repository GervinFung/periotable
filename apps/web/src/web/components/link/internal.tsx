import type { Argument } from '@poolofdeath20/util';

import Link from 'next/link';
import React from 'react';

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
