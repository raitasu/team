import { rootApiSlice } from '~/shared/store/api';
import { EmployeesListResponse } from '~/shared/store/api/employees/employees.types';

const employeesApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeesListResponse, void>({
      query: () => ({
        url: 'employees',
        method: 'GET'
      })
    })
  })
});

export const { useGetEmployeesQuery } = employeesApiSlice;
