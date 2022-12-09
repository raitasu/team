import { type RootState } from '~/store/store.types';

export const selectEmployeesPagination = (state: RootState) =>
  state.employees.pagination;

export const selectEmployeesFilters = (state: RootState) =>
  state.employees.filters;
