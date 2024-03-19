import React from 'react';

import Error from './_error';

const RequestNotFound = () => {
	return <Error statusCode={404} />;
};

export default RequestNotFound;
