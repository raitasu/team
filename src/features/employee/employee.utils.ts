import { type Employee } from '~/store/api/employees/employees.types';

export const isAdmin = (
  employee: Employee
): employee is Employee & { role: 'admin' } => employee.role === 'admin';
export const isEditable = (
  employeeId: Employee['id'],
  currentEmployee?: Employee
) => {
  if (currentEmployee) {
    return isAdmin(currentEmployee) || currentEmployee.id === employeeId;
  }

  return false;
};
