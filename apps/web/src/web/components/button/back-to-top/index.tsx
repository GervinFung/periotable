import IconButton from '@mui/joy/IconButton';
import React from 'react';
import { FaArrowUp } from 'react-icons/fa6';

import { useHeight } from '../../../hooks/dimension';

const BackToTop = () => {
	const height = useHeight();

	return height <= 500 ? null : (
		<IconButton
			aria-label="back to top"
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
			}}
			size="lg"
			sx={(theme) => {
				return {
					zIndex: 3,
					position: 'fixed',
					bottom: 10,
					right: 15,
					border: `1px solid ${theme.palette.background.level2}`,
				};
			}}
			variant="soft"
		>
			<FaArrowUp />
		</IconButton>
	);
};

export default BackToTop;
