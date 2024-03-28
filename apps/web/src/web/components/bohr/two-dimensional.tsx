import React from 'react';

const BohrTwoDimensional = (
	props: Readonly<{
		src: string;
		alt: string;
	}>
) => {
	const length = 200;

	return (
		<img
			alt={`A 3D model of ${props.alt}`}
			src={props.src}
			width={length}
			height={length}
		/>
	);
};

export default BohrTwoDimensional;
