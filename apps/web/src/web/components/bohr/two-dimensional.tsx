import Image from 'next/image';
import React from 'react';

const BohrTwoDimensional = (
	props: Readonly<{
		src: string;
		name: string;
	}>
) => {
	const length = 200;

	return (
		<Image
			alt={`A 2D model of ${props.name}`}
			height={length}
			priority
			src={props.src}
			width={length}
		/>
	);
};

export default BohrTwoDimensional;
