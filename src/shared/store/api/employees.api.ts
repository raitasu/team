import { EmployeesPagination } from '~/features/employees/Table/pagination.types';
import { Employee } from '~/shared/store/api/api.types';
import { rootApiSlice } from '~/shared/store/api/index';

const employeesApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getEmployees: builder.query<
      { employees: Array<Employee>; pagy: EmployeesPagination },
      void
    >({
      query: () => ({
        url: 'employees',
        method: 'GET'
      })
    })
  })
});

export const { useGetEmployeesQuery } = employeesApiSlice;
