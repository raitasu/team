import { createSlice } from '@reduxjs/toolkit';

import { Project } from '~/features/projects/projects.types';

interface ProjectsSliceState {
  projects: Project[];
  status: string;
}

const initialState: ProjectsSliceState = {
  projects: [],
  status: 'idle'
};

export const { reducer: projectsReducer, actions: projectActions } =
  createSlice({
    name: 'projects',
    initialState,
    reducers: {
      loadProject: (state) => {
        state.projects = [];
        state.projects.push({ id: 'Demonstration project' });
      }
    }
  });
