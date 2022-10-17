import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { authReducer } from 'features/auth/slice/auth.slice';
import { authApiSlice } from 'features/auth/slice/authService.slice';
import { projectsReducer } from 'features/projects/slice/projects.slice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware)
});

setupListeners(store.dispatch);
