import React from 'react';

const BohrThreeDimensional = (
	props: Readonly<{
		src: string;
		alt: string;
	}>
) => {
	return (
		// @ts-expect-error: model-viewer is injected by Google
		<model-viewer
			ar
			interaction-prompt="auto"
			interaction-prompt-style="wiggle"
			interaction-prompt-threshold="0"
			alt={`A 3D model of ${props.alt}`}
			src={props.src}
			auto-rotate
			shadow-intensity="1"
			camera-controls
			touch-action="pan-y"
			style={{
				width: 400,
				height: 400,
			}}
		/>
	);
};

export default BohrThreeDimensional;
