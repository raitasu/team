import { rootApiSlice } from '~/shared/store/api';
import { ApiTags } from '~/shared/store/api/api.constants';
import {
  type Employee,
  type EmployeesListResponse
} from '~/shared/store/api/employees/employees.types';
import { getPageOffset } from '~/shared/utils/pagination.utils';

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
