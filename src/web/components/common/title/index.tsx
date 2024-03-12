import React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

const Title = () => {
	return (
		<Box display="flex" justifyContent="center" alignItems="center" pt={4}>
			<Typography level="h1">
				{/* Pe can be like Typescript */}
				PERIODICTABLE
			</Typography>
		</Box>
	);
};

export default Title;
