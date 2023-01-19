import { type EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';

export const CVTab: EmployeeInfoTab = ({ employee }) => (
  <div>{JSON.stringify(employee.cvs)}</div>
);
