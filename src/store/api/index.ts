import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { LocalStorageKey } from '~/shared/shared.constants';
import { ApiTags } from '~/store/api/api.constants';
import { createFetchBaseQueryWithReAuth } from '~/store/api/authentication/authentication.utils';

export const rootApiSlice = createApi({
  reducerPath: 'apiSlice',
  tagTypes: Object.values(ApiTags),
  baseQuery: createFetchBaseQueryWithReAuth({
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LocalStorageKey.AuthToken);

      if (!headers.has('Authorization') && token) {
        headers.set('Authorization', token);
      }

      return headers;
    },
    baseUrl: import.meta.env.VITE_PUBLIC_API_URL
  }),
  endpoints: () => ({})
});
