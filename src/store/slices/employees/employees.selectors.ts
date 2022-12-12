import { type RootState } from '~/store/store.types';

export const selectEmployeesPagination = (state: RootState) =>
  state.employees.pagination;

export const selectEmployeesSorting = (state: RootState) =>
  state.employees.sorting;

export const selectEmployeesFilters = (state: RootState) =>
  state.employees.filters;

export const selectEmployeesFiltersCount = (state: RootState) =>
  Object.keys(state.employees.filters).length;
