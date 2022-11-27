import { showGlobalError } from '~/shared/ui/components/Toast';
import { getPageOffset } from '~/shared/utils/pagination.utils';
import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import { ShortEmployeeSchema } from '~/store/api/employees/employees.schemas';
import {
  type Employee,
  type EmployeesListResponse
} from '~/store/api/employees/employees.types';

const employeesApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getEmployees: builder.query<
      EmployeesListResponse,
      { page: number; elementsPerPage: number }
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
      transformResponse: (response: EmployeesListResponse) => {
        const responseValidation = ShortEmployeeSchema.array().safeParse(
          response.items
        );

        if (!responseValidation.success) {
          console.error(responseValidation.error.errors);

          showGlobalError({
            titleTag: 'server_error',
            descriptionTag: 'invalid_response_schema',
            descriptionTagArgs: { url: 'GET /employees' }
          });
        }

        return response;
      },
      query: ({ page, elementsPerPage }) => ({
        url: 'employees',
        method: 'GET',
        params: {
          limit: elementsPerPage,
          offset: getPageOffset(page, elementsPerPage)
        }
      })
    }),
    getEmployee: builder.query<Employee, number>({
      providesTags: (employee) => [
        { type: ApiTags.Employees, id: `${employee ? employee.id : 'ENTITY'}` }
      ],
      query: (id) => ({
        url: `employees/${id}`,
        method: 'GET'
      })
    })
  })
});

export const { useGetEmployeesQuery, useGetEmployeeQuery } = employeesApiSlice;
