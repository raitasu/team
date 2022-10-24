import { Navigate, Outlet } from 'react-router-dom';

import { selectIsLoggedIn } from '~/features/auth/slice/auth.selectors';
import { PagePaths } from '~/router/router.constants';
import { useAppSelector } from '~/shared/store/store.hooks';

export const PublicOnlyRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={PagePaths.Main} /> : <Outlet />;
};
