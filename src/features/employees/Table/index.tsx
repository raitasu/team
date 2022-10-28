import { useGetEmployeesQuery } from '~/shared/store/api/employees/employees.api';

import { EmployeesTable } from './EmployeesTable';

export const EmployeesTableContainer = () => {
  const { data } = useGetEmployeesQuery();

  return data ? <EmployeesTable data={data} /> : null;
};
