import React from 'react';

const BohrTwoDimensional = (
	props: Readonly<{
		src: string;
		alt: string;
	}>
) => {
	return <img alt={`A 3D model of ${props.alt}`} src={props.src}></img>;
};

export default BohrTwoDimensional;
