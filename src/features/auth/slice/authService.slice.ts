import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { updateAccessToken } from 'features/auth/slice/auth.slice';

export const getAuthApiUrl = () => {
  const queryParams = new URLSearchParams({
    client_id: process.env.REACT_APP_ALFRED_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_ALFRED_REDIRECT_URI,
    response_type: 'code',
    scope: 'user'
  });
  return `${process.env.REACT_APP_ALFRED_URL}?${queryParams.toString()}`;
};

export const authApiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_PUBLIC_API_URL
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    getAccessToken: builder.query<{ access_token: string }, string>({
      query: (code) => ({
        url: 'api/v1/login',
        method: 'POST',
        body: { code }
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateAccessToken(data.access_token));
        } catch (err) {
          console.error(err);
        }
      }
    })
  })
});

export const { useGetAccessTokenQuery } = authApiSlice;
