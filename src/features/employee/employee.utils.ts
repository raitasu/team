import { type Employee } from '~/store/api/employees/employees.types';

export const isAdmin = (
  employee: Employee
): employee is Employee & { role: 'admin' } => employee.role === 'admin';
