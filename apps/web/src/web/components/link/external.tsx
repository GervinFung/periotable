import type {LinkProps} from '@mui/joy/Link';

import Link from '@mui/joy/Link';
import React from 'react';


const ExternalLink = (props: LinkProps) => {
	return (
		<Link
			{...props}
			rel="external nofollow noopener noreferrer"
			target="_blank"
		/>
	);
};

export default ExternalLink;
