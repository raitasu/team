import type { EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';

export const PublicationTab: EmployeeInfoTab = ({ employee }) => (
  <div>{JSON.stringify(employee.languages)}</div>
);
