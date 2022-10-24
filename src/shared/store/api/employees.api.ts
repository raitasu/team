import { EmployeesListResponse } from '~/shared/store/api/api.types';
import { rootApiSlice } from '~/shared/store/api/index';

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
