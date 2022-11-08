import { Employee } from '~/shared/store/api/employees/employees.types';

export const EmployeeInfo = ({ employee }: { employee: Employee }) => (
  <>
    <p>EmployeeInfo placeholder</p>
    <p>{JSON.stringify(employee)}</p>
  </>
);
