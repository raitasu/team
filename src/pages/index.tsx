import React, { Suspense } from 'react';

import { Route, Routes } from 'react-router';

import { NotFound } from './NotFound';

export const LoadableHome = React.lazy(() =>
  import('pages/Home').then(({ Home: element }) => ({ default: element }))
);
export const LoadableOnboadrding = React.lazy(() =>
  import('pages/Onboarding').then(({ Onboarding: element }) => ({
    default: element
  }))
);
export const LoadableProjects = React.lazy(() =>
  import('pages/Projects').then(({ Projects: element }) => ({
    default: element
  }))
);

export const Pages = () => (
  <Routes>
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
  </Routes>
);
