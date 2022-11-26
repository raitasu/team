import { authenticationEndpoints } from '~/store/api/authentication/authentication.api';

export const selectCurrentEmployee =
  authenticationEndpoints.getCurrentUser.select();
