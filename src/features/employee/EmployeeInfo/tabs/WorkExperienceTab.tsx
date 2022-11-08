import { EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';

export const WorkExperienceTab: EmployeeInfoTab = ({ employee }) => (
  <div>{JSON.stringify(employee.projects)}</div>
);
