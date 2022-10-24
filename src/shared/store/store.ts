import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { rootApiSlice } from '~/shared/store/api';
import { authReducer } from '~/shared/store/slices/auth/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [rootApiSlice.reducerPath]: rootApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApiSlice.middleware)
});

setupListeners(store.dispatch);
