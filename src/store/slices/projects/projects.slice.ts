import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type SortingState } from '@tanstack/react-table';

import { ProjectsHeaderIds } from '~/features/projects/Tables/tables.constants';
import { type ProjectsSliceState } from '~/store/slices/projects/projects.types';

const getInitialState: () => ProjectsSliceState = () => ({
  filters: {},
  pagination: {
    currentPage: 1,
    elementsPerPage: 10
  },
  sorting: [
    {
      id: ProjectsHeaderIds.CompanyName,
      desc: false
    }
  ]
});

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: getInitialState(),
  reducers: {
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
  actions: { togglePage, toggleElementsPerPage, toggleSorting }
} = projectsSlice;
