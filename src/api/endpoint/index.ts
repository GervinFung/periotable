import type { NextApiRequest, NextApiResponse } from 'next';
import type { DeepReadonly } from '../../common/type';

type Response<T> = string | DeepReadonly<T>;

type EndPointFunc<T> = (
	req: NextApiRequest,
	res: NextApiResponse<Response<T>>
) => Promise<void>;

export type { EndPointFunc, Response };
