import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import { loggedOut, tokenReceived } from '~/features/auth/slice/auth.slice';
import { LocalStorageKey } from '~/shared/shared.constants';
import { AuthTokens } from '~/shared/store/api/api.types';

/**
 * Redux toolkit reference:
 * https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
 */

const mutex = new Mutex();

export const createFetchBaseQueryWithReauth: typeof fetchBaseQuery = (
  baseQueryArgs
) => {
  const baseQuery = fetchBaseQuery(baseQueryArgs);

  return async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    const initialResult = await baseQuery(args, api, extraOptions);

    if (mutex.isLocked()) {
      await mutex.waitForUnlock();
      return baseQuery(args, api, extraOptions);
    }

    if (initialResult.error && initialResult.error.status === 401) {
      const refreshToken = localStorage.getItem(LocalStorageKey.RefreshToken);

      if (refreshToken) {
        const release = await mutex.acquire();
        try {
          const { data: refreshedTokens } = (await baseQuery(
            {
              url: '/refresh',
              headers: {
                Authorization: refreshToken
              }
            },
            api,
            extraOptions
          )) as QueryReturnValue<AuthTokens>;

          if (refreshedTokens) {
            api.dispatch(tokenReceived(refreshedTokens));
            return baseQuery(args, api, extraOptions);
          }
        } finally {
          release();
        }
      }

      api.dispatch(loggedOut());
    }

    return initialResult;
  };
};
