import { rootApiSlice } from '~/shared/store/api';
import { ApiTags } from '~/shared/store/api/api.constants';
import {
  Employee,
  EmployeesListResponse
} from '~/shared/store/api/employees/employees.types';

const employeesApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeesListResponse, void>({
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
      query: () => ({
        url: 'employees',
        method: 'GET'
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
