import { configureStore } from '@reduxjs/toolkit';

import { projectsReducer } from 'features/projects/slice/projects.slice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer
  }
});
