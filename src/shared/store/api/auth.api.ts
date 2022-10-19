import { updateAccessToken } from '~/features/auth/slice/auth.slice';
import { LocalStorageKey } from '~/shared/shared.constants';
import { ApiTags } from '~/shared/store/api/api.constants';
import { LoginResponse } from '~/shared/store/api/auth.api.types';
import { rootApiSlice } from '~/shared/store/api/index';

export const getAuthApiUrl = () => {
  const queryParams = new URLSearchParams({
    client_id: import.meta.env.VITE_ALFRED_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_ALFRED_REDIRECT_URI,
    response_type: 'code',
    scope: 'user'
  });
  return `${import.meta.env.VITE_ALFRED_URL}?${queryParams.toString()}`;
};

const authApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAccessToken: builder.query<LoginResponse, string>({
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
          localStorage.setItem(LocalStorageKey.AuthToken, data.access_token);
          localStorage.setItem(
            LocalStorageKey.RefreshToken,
            data.refresh_token
          );
        } catch (err) {
          console.error(err);
        }
      }
    })
  })
});

export const { useGetAccessTokenQuery } = authApiSlice;
