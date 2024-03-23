import React from 'react';

import IconButton from '@mui/joy/IconButton';

import { FaArrowUp } from 'react-icons/fa6';

import { useHeight } from '../../../hooks/dimension';

const BackToTop = () => {
	const height = useHeight();

	return height <= 500 ? null : (
		<IconButton
			aria-label="back to top"
			size="md"
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
			}}
			variant="soft"
			sx={(theme) => {
				return {
					zIndex: 3,
					position: 'fixed',
					bottom: 10,
					right: 15,
					border: `1px solid ${theme.palette.background.level2}`,
				};
			}}
		>
			<FaArrowUp />
		</IconButton>
	);
};

export default BackToTop;
