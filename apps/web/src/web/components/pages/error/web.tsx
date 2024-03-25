import React from 'react';

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import Error from './common';

const getServerSideProps = (async (context) => {
	return {
		props: {
			statusCode: context.res.statusCode,
		},
	};
}) satisfies GetServerSideProps;

const WebError = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	return <Error {...props} />;
};

export { getServerSideProps };

export default WebError;
