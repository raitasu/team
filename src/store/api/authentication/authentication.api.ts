import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import { type AuthTokens } from '~/store/api/authentication/authentication.types';
import {
  AuthSchema,
  EmployeeSchema
} from '~/store/api/employees/employees.schemas';
import { type Employee } from '~/store/api/employees/employees.types';
import {
  loggedIn,
  tokenReceived
} from '~/store/slices/authentication/authentication.slice';

import { getResponseValidator } from '../api.utils';

export const getAuthApiUrl = () => {
  const queryParams = new URLSearchParams({
    client_id: import.meta.env.VITE_ALFRED_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_ALFRED_REDIRECT_URI,
    response_type: 'code',
    scope: 'user'
  });

  return `${import.meta.env.VITE_ALFRED_URL}?${queryParams.toString()}`;
};

const authenticationApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<Employee, void>({
      providesTags: (employee) => [
        {
          type: ApiTags.Employees,
          id: `${employee ? employee.id : 'ENTITY'}`
        }
      ],
      query: () => ({
        url: 'me',
        method: 'GET'
      }),
      onQueryStarted: getResponseValidator((data, dispatch) => {
        dispatch(loggedIn());

        return EmployeeSchema.safeParse(data);
      })
    }),
    getAccessToken: builder.query<AuthTokens, string>({
      providesTags: [ApiTags.Authentication],
      query: (code) => ({
        url: 'login',
        method: 'POST',
        body: {
          code,
          redirect_uri: import.meta.env.VITE_ALFRED_REDIRECT_URI,
          client_id: import.meta.env.VITE_ALFRED_CLIENT_ID
        }
      }),
      onQueryStarted: getResponseValidator((data, dispatch) => {
        dispatch(tokenReceived(data));

        return AuthSchema.safeParse(data);
      })
    })
  })
});

export const {
  useGetAccessTokenQuery,
  useGetCurrentUserQuery,
  endpoints: authenticationEndpoints
} = authenticationApiSlice;
