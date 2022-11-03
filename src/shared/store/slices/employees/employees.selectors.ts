import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '~/shared/store/store.types';

const selectCurrentPage = (state: RootState) =>
  state.employees.pagination.currentPage;
const selectElementsPerPage = (state: RootState) =>
  state.employees.pagination.elementsPerPage;

export const selectEmployeesPagination = createSelector(
  selectCurrentPage,
  selectElementsPerPage,
  (currentPage, elementsPerPage) => ({ currentPage, elementsPerPage })
);
