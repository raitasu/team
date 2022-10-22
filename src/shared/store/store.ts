import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { authReducer } from 'features/auth/slice/auth.slice';
import { projectsReducer } from 'features/projects/slice/projects.slice';
import { rootApiSlice } from 'shared/store/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    [rootApiSlice.reducerPath]: rootApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApiSlice.middleware)
});

setupListeners(store.dispatch);
