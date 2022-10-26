import { Outlet } from 'react-router-dom';

import { Header } from '~/shared/layout/Header';

export const MainLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);
