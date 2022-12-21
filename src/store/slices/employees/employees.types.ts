import { type SortingState } from '@tanstack/react-table';

import { type EmployeeFilters } from '~/features/employees/Filters/employeeFiltersForm.schema';

export type EmployeesFilters = {
  [DataKey in keyof EmployeeFilters]?: NonNullable<EmployeeFilters[DataKey]>;
};

export interface EmployeesSliceState {
  filters: EmployeesFilters;
  pagination: {
    currentPage: number;
    elementsPerPage: number;
  };
  sorting: SortingState;
}
