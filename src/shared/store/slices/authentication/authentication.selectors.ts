import { type RootState } from '~/shared/store/store.types';

export const selectIsLoggedIn = (state: RootState) =>
  state.authentication.isLoggedIn;
