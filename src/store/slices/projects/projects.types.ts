import { type SortingState } from '@tanstack/react-table';

import { type EmployeeFilters as ProjectsFiltersType } from '~/features/employees/Filters/employeeFiltersForm.schema';

export type ProjectsFilters = {
  [DataKey in keyof ProjectsFiltersType]?: NonNullable<
    ProjectsFiltersType[DataKey]
  >;
};

export interface ProjectsSliceState {
  filters: ProjectsFilters;
  pagination: {
    currentPage: number;
    elementsPerPage: number;
  };
  sorting: SortingState;
}
