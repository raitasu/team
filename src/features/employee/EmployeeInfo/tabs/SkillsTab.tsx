import type { EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';

export const SkillsTab: EmployeeInfoTab = ({ employee }) => (
  <div>{JSON.stringify(employee.soft_skills)}</div>
);
