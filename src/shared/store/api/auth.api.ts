import { updateAccessToken } from 'features/auth/slice/auth.slice';
import { ApiTags } from 'shared/store/api/api.constants';
import { rootApiSlice } from 'shared/store/api/index';

export const getAuthApiUrl = () => {
  const queryParams = new URLSearchParams({
    client_id: process.env.REACT_APP_ALFRED_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_ALFRED_REDIRECT_URI,
    response_type: 'code',
    scope: 'user'
  });
  return `${process.env.REACT_APP_ALFRED_URL}?${queryParams.toString()}`;
};

const authApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAccessToken: builder.query<{ access_token: string }, string>({
      providesTags: [ApiTags.Auth],
      query: (code) => ({
        url: 'login',
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
