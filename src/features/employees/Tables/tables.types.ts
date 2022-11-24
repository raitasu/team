import type React from 'react';

import { type EmployeesHeaderIds } from '~/features/employees/Tables/tables.constants';
import {
  type Employee,
  type ShortEmployee
} from '~/shared/store/api/employees/employees.types';

export type EmployeesTable = React.FC<{
  data: Array<ShortEmployee>;
  employee: Employee;
}>;

export type HeaderKeys =
  typeof EmployeesHeaderIds[keyof typeof EmployeesHeaderIds];
