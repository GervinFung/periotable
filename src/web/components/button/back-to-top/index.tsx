import React from 'react';

import IconButton from '@mui/joy/IconButton';

import { FaArrowUp } from 'react-icons/fa6';

import { useHeight } from '../../../hooks/dimension';

const BackToTop = () => {
	const height = useHeight();

	return height <= 500 ? null : (
		<IconButton
			size="lg"
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
			}}
			variant="soft"
			style={{
				position: 'fixed',
				bottom: 10,
				right: 15,
			}}
		>
			<FaArrowUp />
		</IconButton>
	);
};

export default BackToTop;
