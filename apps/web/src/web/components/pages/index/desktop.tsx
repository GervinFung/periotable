import React from 'react';

import Index from './common';

import { type ClassificationProps } from '../../../../../pages/classifications/[classification]';

const DesktopIndex = (props: ClassificationProps) => {
	return <Index {...props} type="desktop" />;
};

export default DesktopIndex;
