import React from 'react';

const useWidth = () => {
	const [width, setWidth] = React.useState(0);

	React.useEffect(() => {
		const onResize = () => {
			setWidth(window.innerWidth);
		};

		onResize();

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return width;
};

const useHeight = () => {
	const [height, setHeight] = React.useState(0);

	React.useEffect(() => {
		const onScroll = () => {
			setHeight(window.scrollY);
		};

		onScroll();

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	return height;
};

export { useWidth, useHeight };
