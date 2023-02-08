import { type ChangedContactsInfoValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { showGlobalError } from '~/shared/ui/components/Toast';
import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import { EmployeeContactInfoSchema } from '~/store/api/employees/employees.schemas';
import { type EmployeeContactInfo } from '~/store/api/employees/employees.types';

const contactInfoApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getContactInfo: builder.query<EmployeeContactInfo, number>({
      providesTags: (employee) => [
        {
          type: ApiTags.Employees,
          id: `${employee?.id ? employee.id : 'ENTITY'}`
        }
      ],
      query: (id) => ({
        url: `employees/${id}/contact_infos`,
        method: 'GET'
      })
    }),
    updateContactInfo: builder.mutation<
      EmployeeContactInfo,
      { data: ChangedContactsInfoValues; id: number }
    >({
      invalidatesTags: (employee) => [
        {
          type: ApiTags.Employees,
          id: `${employee?.id ? employee.id : 'ENTITY'}`
        }
      ],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const responseValidation = EmployeeContactInfoSchema.safeParse(
            response.data
          );

          if (!responseValidation.success) {
            console.error(responseValidation.error.errors);
            showGlobalError({
              titleTag: 'server_error',
              descriptionTag: 'invalid_response_schema',
              descriptionTagArgs: {
                url: 'PATCH employees/{id}/contact_infos'
              }
            });
          }
          // eslint-disable-next-line no-empty -- error cases are handled outside
        } catch (err) {}
      },
      query: ({ data, id }) => ({
        url: `employees/${id}/contact_infos`,
        method: 'PATCH',
        body: data
      })
    })
  })
});

export const { useGetContactInfoQuery, useUpdateContactInfoMutation } =
  contactInfoApiSlice;
