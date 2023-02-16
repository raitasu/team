import { showGlobalError } from '~/shared/ui/components/Toast';
import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import { type AuthTokens } from '~/store/api/authentication/authentication.types';
import { EmployeeSchema } from '~/store/api/employees/employees.schemas';
import { type Employee } from '~/store/api/employees/employees.types';
import {
  loggedIn,
  tokenReceived
} from '~/store/slices/authentication/authentication.slice';

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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const responseValidation = EmployeeSchema.safeParse(response.data);

          if (!responseValidation.success) {
            console.error(responseValidation.error.errors);

            showGlobalError({
              titleTag: 'server_error',
              descriptionTag: 'invalid_response_schema',
              descriptionTagArgs: { url: 'GET /me' }
            });
          }

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
        body: {
          code,
          redirect_uri: import.meta.env.VITE_ALFRED_REDIRECT_URI,
          client_id: import.meta.env.VITE_ALFRED_CLIENT_ID
        }
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(tokenReceived(data));
          // eslint-disable-next-line no-empty -- error cases are handled outside
        } catch (err) {}
      }
    })
  })
});

export const {
  useGetAccessTokenQuery,
  useGetCurrentUserQuery,
  endpoints: authenticationEndpoints
} = authenticationApiSlice;
