import { type SortingState } from '@tanstack/react-table';

import { type EmployeeFilterFormValues } from '~/features/employees/Filters/employeesFilters.schema';

export type EmployeesFilters = {
  [DataKey in keyof EmployeeFilterFormValues]?: NonNullable<
    EmployeeFilterFormValues[DataKey]
  >;
};

export interface EmployeesSliceState {
  filters: EmployeesFilters;
  pagination: {
    currentPage: number;
    elementsPerPage: number;
  };
  sorting: SortingState;
}
