import { Navigate, Outlet } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { selectIsLoggedIn } from '~/store/slices/authentication/authentication.selectors';
import { useAppSelector } from '~/store/store.hooks';

export const PrivateOnlyRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={PagePaths.Login} />;
};
