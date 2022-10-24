import { Navigate, Outlet } from 'react-router-dom';

import { selectIsLoggedIn } from '~/features/auth/slice/auth.selectors';
import { PagePaths } from '~/router/router.constants';
import { useAppSelector } from '~/shared/store/store.hooks';

export const PrivateOnlyRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to={PagePaths.Login} />;
};
