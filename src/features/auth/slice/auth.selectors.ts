import { RootState } from '~/shared/store/store.types';

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
