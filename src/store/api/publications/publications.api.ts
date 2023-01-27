import {
  type ChangedEmployeePublicationInfoValues,
  type EmployeePublicationInfoFormValues,
  EmployeePublicationInfoSchema
} from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/EditPublication.schema';
import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import { getResponseValidator } from '~/store/api/api.utils';
import { EmployeePublicationSchema } from '~/store/api/employees/employees.schemas';
import { type EmployeePublication } from '~/store/api/employees/employees.types';

const publicationsApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    updatePublications: builder.mutation<
      EmployeePublication,
      {
        data: ChangedEmployeePublicationInfoValues;
        employeeId: number;
        publicationId: number;
      }
    >({
      invalidatesTags: (_result, _error, arg) => [
        {
          type: ApiTags.Employees,
          id: `${arg.employeeId}`
        }
      ],
      onQueryStarted: getResponseValidator((data) =>
        EmployeePublicationInfoSchema.safeParse(data)
      ),
      query: ({ data, employeeId, publicationId }) => {
        const body = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (value && typeof value !== 'number') body.append(key, value); // TODO backend needs to make an opportunity to send null for url and file
        });

        return {
          url: `/employees/${employeeId}/publications/${publicationId}`,
          method: 'PATCH',
          body
        };
      }
    }),

    deletePublication: builder.mutation<
      void,
      { employeeId: number; publicationId: number }
    >({
      invalidatesTags: (_result, _error, arg) => [
        { type: ApiTags.Employees, id: `${arg.employeeId}` }
      ],
      query: ({ employeeId, publicationId }) => ({
        url: `/employees/${employeeId}/publications/${publicationId}`,
        method: 'DELETE'
      })
    }),
    createPublication: builder.mutation<
      void,
      { data: EmployeePublicationInfoFormValues; employeeId: number }
    >({
      invalidatesTags: [ApiTags.Employees],
      onQueryStarted: getResponseValidator((data) =>
        EmployeePublicationSchema.safeParse(data)
      ),
      query: ({ data, employeeId }) => {
        const body = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          // TODO backend needs to make an opportunity to send null for url and file
          if (value) body.append(key, value);
        });

        return {
          url: `employees/${employeeId}/publications`,
          method: 'POST',
          body
        };
      }
    })
  })
});

export const {
  useUpdatePublicationsMutation,
  useDeletePublicationMutation,
  useCreatePublicationMutation
} = publicationsApiSlice;
