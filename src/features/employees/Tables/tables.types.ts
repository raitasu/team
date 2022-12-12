import type React from 'react';

import { type SortingState } from '@tanstack/react-table';

import { type EmployeesHeaderIds } from '~/features/employees/Tables/tables.constants';
import {
  type Employee,
  type ShortEmployee
} from '~/store/api/employees/employees.types';

export type EmployeesTable = React.FC<{
  data: Array<ShortEmployee>;
  employee: Employee;
  sorting: SortingState;
  onSortingChange: (sortingState: SortingState) => void;
}>;

export type HeaderKeys =
  typeof EmployeesHeaderIds[keyof typeof EmployeesHeaderIds];
