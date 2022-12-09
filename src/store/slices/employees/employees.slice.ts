import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { type EmployeesSliceState } from '~/store/slices/employees/employees.types';

const getInitialState: () => EmployeesSliceState = () => ({
  pagination: {
    currentPage: 1,
    elementsPerPage: 10
  }
});

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: getInitialState(),
  reducers: {
    resetEmployeesSlice(state) {
      const initialState = getInitialState();

      (Object.keys(initialState) as (keyof EmployeesSliceState)[]).forEach(
        (key) => {
          state[key] = initialState[key];
        }
      );
    },
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
  actions: { togglePage, toggleElementsPerPage, resetEmployeesSlice }
} = employeesSlice;
