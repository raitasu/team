import { type ChangedContactsInfoValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schema';
import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import { getResponseValidator } from '~/store/api/api.utils';
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
      onQueryStarted: getResponseValidator((data) =>
        EmployeeContactInfoSchema.safeParse(data)
      ),
      query: ({ data, id }) => ({
        url: `employees/${id}/contact_infos`,
        method: 'PATCH',
        body: { contact_info: data }
      })
    })
  })
});

export const { useGetContactInfoQuery, useUpdateContactInfoMutation } =
  contactInfoApiSlice;
