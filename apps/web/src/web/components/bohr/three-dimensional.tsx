const BohrThreeDimensional = (
	props: Readonly<{
		src: string;
		name: string;
	}>
) => {
	const length = 300;

	return (
		// @ts-expect-error: model-viewer is injected by Google
		<model-viewer
			ar
			ar-modes="webxr scene-viewer quick-look"
			autoplay
			loading="lazy"
			alt={`A 3D model of ${props.name}`}
			src={props.src}
			shadow-intensity="1"
			camera-controls
			tone-mapping="neutral"
			touch-action="pan-y"
			min-camera-orbit="auto auto 100%"
			max-camera-orbit="auto auto 60%"
			min-field-of-view="0deg"
			max-field-of-view="110deg"
			style={{
				width: length,
				height: length,
			}}
		/>
	);
};

export default BohrThreeDimensional;
