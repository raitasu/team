import type { Employee } from '~/shared/store/api/employees/employees.types';

export const isAdmin = (
  employee: Employee
): employee is Employee & { role: 'admin' } => employee.role === 'admin';
