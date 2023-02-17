import { type FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';
import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { type PromiseWithKnownReason } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { type QueryFulfilledRejectionReason } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { type AnyAction } from 'redux';
import { type ThunkDispatch } from 'redux-thunk';
import { type SafeParseReturnType } from 'zod';

import { showGlobalError } from '~/shared/ui/components/Toast';

export const getResponseValidator =
  <ResultType, QueryArg = unknown, BaseQuery extends BaseQueryFn = BaseQueryFn>(
    validator: (
      result: ResultType,
      dispatch: ThunkDispatch<unknown, unknown, AnyAction>
    ) => SafeParseReturnType<unknown, unknown>
  ) =>
  async (
    _: QueryArg,
    {
      queryFulfilled,
      dispatch
    }: {
      queryFulfilled: PromiseWithKnownReason<
        {
          data: ResultType;
          meta?: FetchBaseQueryMeta;
        },
        QueryFulfilledRejectionReason<BaseQuery>
      >;
      dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
    }
  ) => {
    try {
      const response = await queryFulfilled;
      const responseValidation = validator(response.data, dispatch);

      if (!responseValidation.success) {
        console.error(responseValidation.error.errors);
        const pathname = response.meta
          ? new URL(response.meta.request.url).pathname
          : 'unknown';
        const method = response.meta?.request.method || 'unknown';

        showGlobalError({
          titleTag: 'server_error',
          descriptionTag: 'invalid_response_schema',
          descriptionTagArgs: {
            url: `${method} ${pathname}`
          }
        });
      }
      // eslint-disable-next-line no-empty -- error cases are handled outside
    } catch (err) {}
  };
