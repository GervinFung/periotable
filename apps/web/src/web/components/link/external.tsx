import React from 'react';

import Link, { type LinkProps } from '@mui/joy/Link';

const ExternalLink = (props: LinkProps) => {
	return (
		<Link
			{...props}
			target="_blank"
			rel="external nofollow noopener noreferrer"
		/>
	);
};

export default ExternalLink;
