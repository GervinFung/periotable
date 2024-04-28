import React from 'react';

import Image from 'next/image';

const BohrTwoDimensional = (
	props: Readonly<{
		src: string;
		name: string;
	}>
) => {
	const length = 200;

	return (
		<Image
			priority
			alt={`A 2D model of ${props.name}`}
			src={props.src}
			width={length}
			height={length}
		/>
	);
};

export default BohrTwoDimensional;
