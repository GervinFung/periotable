import React from 'react';

import Index from './common';

import type { ClassificationProps } from '../../../../../pages/classifications/[classification]';
import type { SubshellProps } from '../../../../../pages/subshells/[subshell]';

const DesktopIndex = (props: ClassificationProps & SubshellProps) => {
	return <Index {...props} type="desktop" />;
};

export default DesktopIndex;
