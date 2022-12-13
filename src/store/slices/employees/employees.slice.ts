import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type SortingState } from '@tanstack/react-table';

import { EmployeesHeaderIds } from '~/features/employees/Tables/tables.constants';
import {
  type EmployeesFilters,
  type EmployeesSliceState
} from '~/store/slices/employees/employees.types';

const getInitialState: () => EmployeesSliceState = () => ({
  filters: {},
  pagination: {
    currentPage: 1,
    elementsPerPage: 10
  },
  sorting: [
    {
      id: EmployeesHeaderIds.FullName,
      desc: false
    }
  ]
});

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: getInitialState(),
  reducers: {
    resetEmployeesSlice(state) {
      const initialState = getInitialState();

      (Object.keys(initialState) as (keyof EmployeesSliceState)[]).forEach(
        (key) => {
          const initialValue = initialState[key];

          (state[key] as typeof initialValue) = initialValue;
        }
      );
    },
    setEmployeesFilters(state, { payload }: PayloadAction<EmployeesFilters>) {
      state.filters = payload;
      state.pagination.currentPage = 1;
    },
    togglePage(state, { payload }: PayloadAction<number>) {
      state.pagination.currentPage = payload;
    },
    toggleSorting(state, { payload }: PayloadAction<SortingState>) {
      state.sorting = payload;
      state.pagination.currentPage = 1;
    },
    toggleElementsPerPage(state, { payload }: PayloadAction<number>) {
      state.pagination.currentPage = 1;
      state.pagination.elementsPerPage = payload;
    }
  }
});

export const {
  actions: {
    togglePage,
    toggleElementsPerPage,
    toggleSorting,
    setEmployeesFilters,
    resetEmployeesSlice
  }
} = employeesSlice;
