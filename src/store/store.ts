import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { LocalStorageKey } from '~/shared/shared.constants';
import { rootApiSlice } from '~/store/api';
import { authenticationSlice } from '~/store/slices/authentication/authentication.slice';
import { listenerMiddleware } from '~/store/store.listener';

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
    localStorage.removeItem(LocalStorageKey.AuthToken);
    localStorage.removeItem(LocalStorageKey.RefreshToken);
    api.dispatch(rootApiSlice.util.resetApiState());
  }
});
