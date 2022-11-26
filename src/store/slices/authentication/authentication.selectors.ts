import { type RootState } from '~/store/store.types';

export const selectIsLoggedIn = (state: RootState) =>
  state.authentication.isLoggedIn;
