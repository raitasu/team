import { compareAsc, parseISO } from 'date-fns';

import { type Employee } from '~/store/api/employees/employees.types';

export const isAdmin = (
  employee: Employee
): employee is Employee & { role: 'admin' } => employee.role === 'admin';

export const isEditableProfile = (
  employeeId: Employee['id'],
  currentEmployee?: Employee
) => {
  if (currentEmployee) {
    return isAdmin(currentEmployee) || currentEmployee.id === employeeId;
  }

  return false;
};

export const isCompanyProject = (
  hiredAt: string,
  startedAtProject: string,
  endedAtProject: string
) => {
  const hiredDate = parseISO(hiredAt);
  const startedDate = parseISO(startedAtProject);
  const endedDate = parseISO(endedAtProject);

  if (
    compareAsc(startedDate, hiredDate) === -1 &&
    compareAsc(endedDate, hiredDate) === -1
  ) {
    return true;
  }

  return false;
};

export const isEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
