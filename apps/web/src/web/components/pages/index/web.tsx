import type { ClassificationProps } from '../../../../../pages/classifications/[classification]';
import type { SubshellProps } from '../../../../../pages/subshells/[subshell]';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Defined } from '@poolofdeath20/util';
import bowser from 'bowser';
import React from 'react';

import Index from './common';

const getServerSideProps = ((context) => {
	const { platform } = Defined.parse(context.req.headers['user-agent'])
		.map(bowser.parse)
		.orThrow('User agent is not defined');

	switch (platform.type) {
		case 'mobile':
		case 'tablet':
		case 'desktop': {
			return Promise.resolve({
				props: {
					type: platform.type,
				},
			});
		}
		default: {
			throw new Error(`Platform of "${platform.type}" is not supported`);
		}
	}
}) satisfies GetServerSideProps;

const WebIndex = (
	props: ClassificationProps &
		SubshellProps &
		InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	return <Index {...props} />;
};

export { getServerSideProps };

export default WebIndex;
