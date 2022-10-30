import { rootApiSlice } from '~/shared/store/api';
import { ApiTags } from '~/shared/store/api/api.constants';
import { EmployeesListResponse } from '~/shared/store/api/employees/employees.types';

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
    })
  })
});

export const { useGetEmployeesQuery } = employeesApiSlice;
