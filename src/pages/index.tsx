import React, { Suspense } from 'react';

import { Route, Routes } from 'react-router';

import { Home } from './Home';
import { NotFound } from './NotFound';
import { Onboarding } from './Onboarding';
import { Projects } from './Projects';

export function Pages() {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="onboarding"
          element={<Onboarding />}
        />
        <Route
          path="projects"
          element={<Projects />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Suspense>
  );
}
