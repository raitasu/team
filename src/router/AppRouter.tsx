import { Suspense } from 'react';

import { Route, Routes } from 'react-router';

import { PrivateOnlyRoutes } from '~/router/guards/PrivateOnlyRoutes';
import { PublicOnlyRoutes } from '~/router/guards/PublicOnlyRoutes';
import {
  LoadableAuth,
  LoadableEmployees,
  LoadableLogin,
  LoadableNotFound,
  LoadableOffboarding,
  LoadableOnboadrding,
  LoadableProjects
} from '~/router/LoadablePages';
import { PagePaths } from '~/router/router.constants';
import { MainLayout } from '~/shared/layout/MainLayout';

export const AppRouter = () => (
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
          element={
            <Suspense fallback={<div>Loading not found page...</div>}>
              <LoadableNotFound />
            </Suspense>
          }
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
