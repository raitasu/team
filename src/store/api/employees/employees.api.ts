import { type SortingState } from '@tanstack/react-table';

import { type CreateEmployeeFormValues } from '~/features/employee/CreateEmployeeModal/employee.schema';
import { type ChangedEmployeeGeneralInfoValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { showGlobalError } from '~/shared/ui/components/Toast';
import { getPageOffset } from '~/shared/utils/pagination.utils';
import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import { assignFilterParams } from '~/store/api/employees/employees.helpers';
import {
  EmployeeSchema,
  ShortEmployeeSchema
} from '~/store/api/employees/employees.schemas';
import {
  type Employee,
  type EmployeesListResponse
} from '~/store/api/employees/employees.types';
import { type EmployeesFilters } from '~/store/slices/employees/employees.types';

const employeesApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getEmployees: builder.query<
      EmployeesListResponse,
      {
        page: number;
        elementsPerPage: number;
        filters?: EmployeesFilters;
        sorting?: SortingState;
      }
    >({
      providesTags: (response) =>
        response
          ? [
              ...response.items.map((employee) => ({
                type: ApiTags.Employees,
                id: employee.id
              })),
              {
                type: ApiTags.Employees,
                id: 'LIST'
              }
            ]
          : [
              {
                type: ApiTags.Employees,
                id: 'LIST'
              }
            ],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const responseValidation = ShortEmployeeSchema.array().safeParse(
            response.data.items
          );

          if (!responseValidation.success) {
            console.error(responseValidation.error.errors);

            showGlobalError({
              titleTag: 'server_error',
              descriptionTag: 'invalid_response_schema',
              descriptionTagArgs: { url: 'GET /employees' }
            });
          }
          // eslint-disable-next-line no-empty -- error cases are handled outside
        } catch (err) {}
      },
      query: ({ page, elementsPerPage, filters = {}, sorting = [] }) => {
        const params = new URLSearchParams({
          limit: `${elementsPerPage}`,
          offset: `${getPageOffset(page, elementsPerPage)}`,
          page: page.toString()
        });

        assignFilterParams(params, filters);

        if (sorting.length > 0) {
          const [column] = sorting;

          params.append(
            `sort[${column.id === 'date_of_birth' ? 'age' : column.id}]`,
            column.desc ? 'desc' : 'asc'
          );
        }

        return {
          url: 'employees',
          method: 'GET',
          params
        };
      }
    }),
    getEmployee: builder.query<Employee, number>({
      providesTags: (employee) => [
        { type: ApiTags.Employees, id: `${employee ? employee.id : 'ENTITY'}` }
      ],
      query: (id) => ({
        url: `employees/${id}`,
        method: 'GET'
      })
    }),
    createEmployee: builder.mutation<void, CreateEmployeeFormValues>({
      invalidatesTags: [ApiTags.Employees],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const responseValidation = EmployeeSchema.safeParse(response.data);

          if (!responseValidation.success) {
            console.error(responseValidation.error.errors);

            showGlobalError({
              titleTag: 'server_error',
              descriptionTag: 'invalid_response_schema',
              descriptionTagArgs: { url: 'POST /employees' }
            });
          }
          // eslint-disable-next-line no-empty -- error cases are handled outside
        } catch (err) {}
      },
      query: (employee) => {
        const body = new FormData();

        body.append('first_name', employee.first_name);

        body.append('email', employee.email);

        body.append('last_name', employee.last_name);

        body.append('status', employee.status);

        if (employee.avatar) {
          body.append('avatar', employee.avatar);
        }

        return {
          url: 'employees',
          method: 'POST',
          body
        };
      }
    }),
    updateGeneralInformation: builder.mutation<
      Employee,
      {
        data: ChangedEmployeeGeneralInfoValues;
        id: number;
      }
    >({
      invalidatesTags: (employee) => [
        {
          type: ApiTags.Employees,
          id: `${employee ? employee.id : 'ENTITY'}`
        }
      ],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const responseValidation = ShortEmployeeSchema.safeParse(
            response.data
          );

          if (!responseValidation.success) {
            console.error(responseValidation.error.errors);
            showGlobalError({
              titleTag: 'server_error',
              descriptionTag: 'invalid_response_schema',
              descriptionTagArgs: {
                url: 'PATCH employees/{id}'
              }
            });
          }
          // eslint-disable-next-line no-empty -- error cases are handled outside
        } catch (err) {}
      },
      query: ({ data, id }) => {
        const body = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (value && typeof value !== 'number') body.append(key, value);
        });

        return {
          url: `employees/${id}`,
          method: 'PATCH',
          body
        };
      }
    }),
    deleteAvatar: builder.mutation<void, { id: string }>({
      invalidatesTags: (_result, _error, arg) => [
        { type: ApiTags.Employees, id: `${arg.id}` }
      ],
      query: ({ id }) => ({
        url: `/employees/${id}/avatars`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateGeneralInformationMutation,
  useDeleteAvatarMutation
} = employeesApiSlice;
