import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { selectAccessToken } from 'features/auth/slice/auth.selectors';
import { ApiTags } from 'shared/store/api/api.constants';
import { RootState } from 'shared/store/store.types';

export const rootApiSlice = createApi({
  reducerPath: 'apiSlice',
  tagTypes: [ApiTags.Auth],
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { endpoint, getState }) => {
      const token = selectAccessToken(getState() as RootState);
      if (endpoint !== 'getAccessToken' && token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    baseUrl: `${process.env.REACT_APP_PUBLIC_API_URL}/api/v1/`
  }),
  endpoints: () => ({})
});
