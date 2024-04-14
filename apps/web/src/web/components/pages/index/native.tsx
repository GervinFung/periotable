import React from 'react';

import Index from './common';

import type { ClassificationProps } from '../../../../../pages/classifications/[classification]';
import type { SubshellProps } from '../../../../../pages/subshells/[subshell]';

const NativeIndex = (props: ClassificationProps & SubshellProps) => {
	const device = process.env.DEVICE;

	if (device === 'mobile') {
		return <Index {...props} type="mobile" />;
	} else if (device === 'desktop') {
		return <Index {...props} type="desktop" />;
	}

	throw new Error(`Unknown device: ${device}`);
};

export default NativeIndex;
