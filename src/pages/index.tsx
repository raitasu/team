import React, { Suspense } from 'react';

import { Route, Routes } from 'react-router';

import { MainLayout } from 'shared/layout/MainLayout';

import { NotFound } from './NotFound';

const LoadableHome = React.lazy(() =>
  import('pages/Home').then(({ Home: element }) => ({ default: element }))
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

export const Pages = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading home ...</div>}>
            <LoadableHome />
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
  </Routes>
);
