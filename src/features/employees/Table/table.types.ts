import { EmployeeStatus } from '~/shared/ui/components/Avatar/avatar.types';

export type EmployeesTableRow = {
  status: EmployeeStatus;
  name: string;
  avatar?: string;
  position: string;
  location: string;
  date: string;
  projects: string;
  cv: string;
};
