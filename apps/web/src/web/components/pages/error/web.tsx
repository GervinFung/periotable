import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import React from 'react';

import Error from './common';

const getServerSideProps = ((context) => {
	return Promise.resolve({
		props: {
			statusCode: context.res.statusCode,
		},
	});
}) satisfies GetServerSideProps;

const WebError = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	return <Error {...props} />;
};

export { getServerSideProps };

export default WebError;
