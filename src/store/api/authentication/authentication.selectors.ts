import { authenticationEndpoints } from '~/store/api/authentication/authentication.api';
import { type RootState } from '~/store/store.types';

export const selectLoggedInUser = (state: RootState) => {
  const { data } = authenticationEndpoints.getCurrentUser.select()(state);

  if (!data) {
    throw new Error('Trying to select user before authorization ');
  }

  return data;
};
