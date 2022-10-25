import { Suspense } from 'react';

import { Route, Routes } from 'react-router';

import { PrivateOnlyRoutes } from '~/router/guards/PrivateOnlyRoutes';
import { PublicOnlyRoutes } from '~/router/guards/PublicOnlyRoutes';
import { TokenVerification } from '~/router/guards/TokenVerification';
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
import { PageLoader } from '~/shared/ui/components/PageLoader';

export const AppRouter = () => (
  <TokenVerification>
    <Routes>
      <Route element={<PrivateOnlyRoutes />}>
        <Route element={<MainLayout />}>
          <Route
            path={PagePaths.Main}
            element={
              <Suspense fallback={<PageLoader />}>
                <LoadableEmployees />
              </Suspense>
            }
          />
          <Route
            path={PagePaths.Onboarding}
            element={
              <Suspense fallback={<PageLoader />}>
                <LoadableOnboadrding />
              </Suspense>
            }
          />
          <Route
            path={PagePaths.Projects}
            element={
              <Suspense fallback={<PageLoader />}>
                <LoadableProjects />
              </Suspense>
            }
          />
          <Route
            path={PagePaths.Offboarding}
            element={
              <Suspense fallback={<PageLoader />}>
                <LoadableOffboarding />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
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
            <Suspense fallback={<PageLoader />}>
              <LoadableAuth />
            </Suspense>
          }
        />
        <Route
          path={PagePaths.Login}
          element={
            <Suspense fallback={<PageLoader />}>
              <LoadableLogin />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  </TokenVerification>
);
