import type { EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';

export const PersonalInfoTab: EmployeeInfoTab = ({ employee }) => (
  <div>{employee.date_of_birth}</div>
);
