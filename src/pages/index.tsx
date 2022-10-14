import React, { Suspense } from 'react';

import { Route, Routes } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';

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

const PrivateRoutes = () => {
  const token = useAppSelector((state) => state.auth.accessToken);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export const Pages = () => (
  <Routes>
    <Route element={<PrivateRoutes />}>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading employees ...</div>}>
              <LoadableEmployees />
            </Suspense>
          }
        />
        <Route
          path="onboarding"
          element={
            <Suspense fallback={<div>Loading onboarding ...</div>}>
              <LoadableOnboadrding />
            </Suspense>
          }
        />
        <Route
          path="projects"
          element={
            <Suspense fallback={<div>Loading projects ...</div>}>
              <LoadableProjects />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Route>
    <Route
      path="/auth"
      element={
        <Suspense fallback={<div>Loading auth...</div>}>
          <LoadableAuth />
        </Suspense>
      }
    />
    <Route
      path="/login"
      element={
        <Suspense fallback={<div>Loading login ...</div>}>
          <LoadableLogin />
        </Suspense>
      }
    />
  </Routes>
);
