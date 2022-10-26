import { Outlet } from 'react-router-dom';

import { Header } from '~/shared/layout/Main/Header';

export const MainLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);
