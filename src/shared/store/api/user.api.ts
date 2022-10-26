import { ApiTags } from '~/shared/store/api/api.constants';
import { Employee, AuthTokens } from '~/shared/store/api/api.types';
import { rootApiSlice } from '~/shared/store/api/index';
import { loggedIn, tokenReceived } from '~/shared/store/slices/auth/auth.slice';

export const getAuthApiUrl = () => {
  const queryParams = new URLSearchParams({
    client_id: import.meta.env.VITE_ALFRED_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_ALFRED_REDIRECT_URI,
    response_type: 'code',
    scope: 'user'
  });
  return `${import.meta.env.VITE_ALFRED_URL}?${queryParams.toString()}`;
};

const userApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<Employee, void>({
      providesTags: [ApiTags.CurrentUser],
      query: () => ({
        url: 'me',
        method: 'GET'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(loggedIn());
          // eslint-disable-next-line no-empty -- error cases are handled outside
        } catch (err) {}
      }
    }),
    getAccessToken: builder.query<AuthTokens, string>({
      providesTags: [ApiTags.Authentication],
      query: (code) => ({
        url: 'login',
        method: 'POST',
        body: { code }
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(tokenReceived(data));
          // eslint-disable-next-line no-empty -- error cases are handled outside
        } catch (err) {}
      }
    })
  })
});

export const { useGetAccessTokenQuery, useGetCurrentUserQuery } = userApiSlice;
