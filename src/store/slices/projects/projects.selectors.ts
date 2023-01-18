import { type RootState } from '~/store/store.types';

export const selectProjectsPagination = (state: RootState) =>
  state.projects.pagination;

export const selectProjectsSorting = (state: RootState) =>
  state.projects.sorting;

export const selectProjectsFilters = (state: RootState) =>
  state.projects.filters;
