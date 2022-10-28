import { authenticationEndpoints } from '~/shared/store/api/authentication/authentication.api';

export const selectCurrentEmployee =
  authenticationEndpoints.getCurrentUser.select();
