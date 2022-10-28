import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { rootApiSlice } from '~/shared/store/api';
import { authenticationSlice } from '~/shared/store/slices/authentication/authentication.slice';
import { listenerMiddleware } from '~/shared/store/store.listener';

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    [rootApiSlice.reducerPath]: rootApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(rootApiSlice.middleware)
});

setupListeners(store.dispatch);

listenerMiddleware.startListening({
  actionCreator: authenticationSlice.actions.loggedOut,
  effect: (_, api) => {
    api.dispatch(rootApiSlice.util.resetApiState());
  }
});
