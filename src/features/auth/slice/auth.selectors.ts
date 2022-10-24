import { RootState } from '~/shared/store/store.types';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
