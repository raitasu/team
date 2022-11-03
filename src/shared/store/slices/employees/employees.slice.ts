import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EmployeesSliceState } from '~/shared/store/slices/employees/employees.types';

const getDefaultPagination = (): EmployeesSliceState['pagination'] => ({
  currentPage: 1,
  elementsPerPage: 10
});

const initialState: EmployeesSliceState = {
  pagination: getDefaultPagination()
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    togglePage(state, { payload }: PayloadAction<number>) {
      state.pagination.currentPage = payload;
    },
    toggleElementsPerPage(state, { payload }: PayloadAction<number>) {
      state.pagination.currentPage = 1;
      state.pagination.elementsPerPage = payload;
    }
  }
});

export const {
  actions: { togglePage, toggleElementsPerPage }
} = employeesSlice;
