import { Navigate, Outlet } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { selectIsLoggedIn } from '~/shared/store/slices/auth/auth.selectors';
import { useAppSelector } from '~/shared/store/store.hooks';

export const PublicOnlyRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={PagePaths.Employees} /> : <Outlet />;
};
