import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { LocalStorageKey } from '~/shared/shared.constants';
import { ApiTags } from '~/shared/store/api/api.constants';
import { createFetchBaseQueryWithReauth } from '~/shared/store/api/authentication/authentication.utils';

export const rootApiSlice = createApi({
  reducerPath: 'apiSlice',
  tagTypes: Object.values(ApiTags),
  baseQuery: createFetchBaseQueryWithReauth({
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LocalStorageKey.AuthToken);

      if (!headers.has('Authorization') && token) {
        headers.set('Authorization', token);
      }

      return headers;
    },
    baseUrl: `${import.meta.env.VITE_PUBLIC_API_URL}api/v1/`
  }),
  endpoints: () => ({})
});
