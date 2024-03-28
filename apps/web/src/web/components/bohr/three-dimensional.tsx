import React from 'react';

import useBreakpoint from '../../hooks/break-point';

const BohrThreeDimensional = (
	props: Readonly<{
		src: string;
		alt: string;
	}>
) => {
	const breakpoint = useBreakpoint();

	const isExtraSmall = breakpoint === 'xs';

	const length = isExtraSmall ? 300 : 400;

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
				width: length,
				height: length,
			}}
		/>
	);
};

export default BohrThreeDimensional;
