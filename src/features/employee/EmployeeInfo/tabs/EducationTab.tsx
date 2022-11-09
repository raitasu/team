import type { EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';

export const EducationTab: EmployeeInfoTab = ({ employee }) => (
  <div>{JSON.stringify(employee.projects)}</div>
);
