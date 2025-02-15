// @matthis/skip-file:HAS_API:not:true
import {ALL} from '@shared/api/api';
import {parseSchema} from '@shared/api/core/api_parser';
import {AllApiSchema} from '@shared/api/core/api_schema';
import {ApiContext, ApiName, ApiRes, FlatApi} from '@shared/api/core/api_types';

export function createRouter<Name extends ApiName>(
  apiName: Name,
  handlers: {
    [Endpoint in keyof FlatApi<Name>]: (
      req: FlatApi<Name>[Endpoint]['req'],
      context: ApiContext
    ) => ApiRes<Name, Endpoint> | Promise<ApiRes<Name, Endpoint>>;
  }
): (
  path: string,
  method: string,
  body: Record<string, unknown>,
  context: ApiContext
) => Promise<unknown> {
  const apiSchemas = (ALL as AllApiSchema)[apiName as string];
  const apiHandlers = handlers as Record<string, (req: unknown, context: ApiContext) => unknown>;
  return async (
    path: string,
    method: string,
    body: Record<string, unknown>,
    context: ApiContext
  ): Promise<unknown> => {
    const schema = apiSchemas?.[path]?.[method];
    const handler = apiHandlers[`${method} ${path}`];
    if (!schema || !handler) {
      throw new Error('NOT_FOUND');
    }
    const req = parseSchema(body, schema.req);
    return await Promise.resolve(handler(req, context));
  };
}
