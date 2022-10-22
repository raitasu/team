import React, { Suspense } from 'react';

import { Route, Routes } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';

import { selectAccessToken } from 'features/auth/slice/auth.selectors';
import { PagePaths } from 'pages/pages.constants';
import { MainLayout } from 'shared/layout/MainLayout';
import { useAppSelector } from 'shared/store/store.hooks';

import { NotFound } from './NotFound';

const LoadableEmployees = React.lazy(() =>
  import('pages/Employees').then(({ Employees: element }) => ({
    default: element
  }))
);

const LoadableLogin = React.lazy(() =>
  import('pages/Login').then(({ Login: element }) => ({
    default: element
  }))
);

const LoadableAuth = React.lazy(() =>
  import('pages/Auth').then(({ Auth: element }) => ({
    default: element
  }))
);

const LoadableOnboadrding = React.lazy(() =>
  import('pages/Onboarding').then(({ Onboarding: element }) => ({
    default: element
  }))
);

const LoadableProjects = React.lazy(() =>
  import('pages/Projects').then(({ Projects: element }) => ({
    default: element
  }))
);

const LoadableOffboarding = React.lazy(() =>
  import('pages/Offboarding').then(({ Offboarding: element }) => ({
    default: element
  }))
);

const PrivateOnlyRoutes = () => {
  const token = useAppSelector(selectAccessToken);
  return token ? <Outlet /> : <Navigate to={PagePaths.Login} />;
};

const PublicOnlyRoutes = () => {
  const token = useAppSelector(selectAccessToken);
  return token ? <Navigate to={PagePaths.Main} /> : <Outlet />;
};

export const Pages = () => (
  <Routes>
    <Route element={<PrivateOnlyRoutes />}>
      <Route element={<MainLayout />}>
        <Route
          path={PagePaths.Main}
          element={
            <Suspense fallback={<div>Loading employees ...</div>}>
              <LoadableEmployees />
            </Suspense>
          }
        />
        <Route
          path={PagePaths.Onboarding}
          element={
            <Suspense fallback={<div>Loading onboarding ...</div>}>
              <LoadableOnboadrding />
            </Suspense>
          }
        />
        <Route
          path={PagePaths.Projects}
          element={
            <Suspense fallback={<div>Loading projects ...</div>}>
              <LoadableProjects />
            </Suspense>
          }
        />
        <Route
          path={PagePaths.Offboarding}
          element={
            <Suspense fallback={<div>Loading offboarding ...</div>}>
              <LoadableOffboarding />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Route>
    <Route element={<PublicOnlyRoutes />}>
      <Route
        path={PagePaths.Auth}
        element={
          <Suspense fallback={<div>Loading auth...</div>}>
            <LoadableAuth />
          </Suspense>
        }
      />
      <Route
        path={PagePaths.Login}
        element={
          <Suspense fallback={<div>Loading login ...</div>}>
            <LoadableLogin />
          </Suspense>
        }
      />
    </Route>
  </Routes>
);
