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
			alt={`A 3D model of ${props.name}`}
			ar
			ar-modes="webxr scene-viewer quick-look"
			autoplay
			camera-controls
			loading="lazy"
			max-camera-orbit="auto auto 60%"
			max-field-of-view="110deg"
			min-camera-orbit="auto auto 100%"
			min-field-of-view="0deg"
			shadow-intensity="1"
			src={props.src}
			style={{
				width: length,
				height: length,
			}}
			tone-mapping="neutral"
			touch-action="pan-y"
		/>
	);
};

export default BohrThreeDimensional;
