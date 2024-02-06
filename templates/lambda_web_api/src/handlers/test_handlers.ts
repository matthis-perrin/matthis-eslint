import {Test} from '@shared/api/api';
import {NotFoundError} from '@shared/api/core/api_errors';
import {ApiHandler} from '@shared/api/core/api_types';

import {session} from '@src/session';

export const testHandler: ApiHandler<'__PROJECT_NAME__', 'GET /test'> = async (req, context) => {
  await session.enforceSession(context);
  const {val} = req;
  if (val === 'throw') {
    throw new NotFoundError();
  }
  await Promise.resolve();
  const res: Test = {val1: 'foo', val2: val};
  return res;
};
