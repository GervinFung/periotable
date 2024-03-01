// @ts-nocheck

const BohrThreeDimensional = (
	props: Readonly<{
		src: string;
		alt: string;
	}>
) => {
	return (
		<model-viewer
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
		></model-viewer>
	);
};

export default BohrThreeDimensional;
