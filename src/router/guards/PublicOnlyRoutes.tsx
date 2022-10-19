import { Navigate, Outlet } from 'react-router-dom';

import { selectAccessToken } from '~/features/auth/slice/auth.selectors';
import { PagePaths } from '~/router/router.constants';
import { useAppSelector } from '~/shared/store/store.hooks';

export const PublicOnlyRoutes = () => {
  const token = useAppSelector(selectAccessToken);
  return token ? <Navigate to={PagePaths.Main} /> : <Outlet />;
};
