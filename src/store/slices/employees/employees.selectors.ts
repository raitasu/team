import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '~/store/store.types';

const selectCurrentPage = (state: RootState) =>
  state.employees.pagination.currentPage;
const selectElementsPerPage = (state: RootState) =>
  state.employees.pagination.elementsPerPage;

export const selectEmployeesPagination = createSelector(
  selectCurrentPage,
  selectElementsPerPage,
  (currentPage, elementsPerPage) => ({ currentPage, elementsPerPage })
);
