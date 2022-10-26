import { Suspense } from 'react';

import { Route, Routes } from 'react-router';

import { PrivateOnlyRoutes } from '~/router/guards/PrivateOnlyRoutes';
import { PublicOnlyRoutes } from '~/router/guards/PublicOnlyRoutes';
import { TokenVerification } from '~/router/guards/TokenVerification';
import {
  LoadableAuthentication,
  LoadableEmployee,
  LoadableEmployees,
  LoadableLogin,
  LoadableNotFound,
  LoadableOffboarding,
  LoadableOnboarding,
  LoadableProject,
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
            path={PagePaths.Employees}
            element={
              <Suspense fallback={<PageLoader />}>
                <LoadableEmployees />
              </Suspense>
            }
          />
          <Route
            path={`${PagePaths.Employees}/:id`}
            element={
              <Suspense fallback={<PageLoader />}>
                <LoadableEmployee />
              </Suspense>
            }
          />
          <Route
            path={PagePaths.Onboarding}
            element={
              <Suspense fallback={<PageLoader />}>
                <LoadableOnboarding />
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
            path={PagePaths.Projects}
            element={
              <Suspense fallback={<PageLoader />}>
                <LoadableProjects />
              </Suspense>
            }
          />
          <Route
            path={`${PagePaths.Projects}/:id`}
            element={
              <Suspense fallback={<PageLoader />}>
                <LoadableProject />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route element={<PublicOnlyRoutes />}>
        <Route
          path={PagePaths.Authentication}
          element={
            <Suspense fallback={<PageLoader />}>
              <LoadableAuthentication />
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
      <Route
        path="*"
        element={
          <Suspense fallback={<PageLoader />}>
            <LoadableNotFound />
          </Suspense>
        }
      />
    </Routes>
  </TokenVerification>
);
