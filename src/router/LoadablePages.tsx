import React from 'react';

export const LoadableNotFound = React.lazy(() =>
  import('~/pages/NotFound').then(({ NotFound: element }) => ({
    default: element
  }))
);

export const LoadableEmployees = React.lazy(() =>
  import('~/pages/Employees').then(({ Employees: element }) => ({
    default: element
  }))
);

export const LoadableLogin = React.lazy(() =>
  import('~/pages/Login').then(({ Login: element }) => ({
    default: element
  }))
);

export const LoadableAuth = React.lazy(() =>
  import('~/pages/Auth').then(({ Auth: element }) => ({
    default: element
  }))
);

export const LoadableOnboadrding = React.lazy(() =>
  import('~/pages/Onboarding').then(({ Onboarding: element }) => ({
    default: element
  }))
);

export const LoadableProjects = React.lazy(() =>
  import('~/pages/Projects').then(({ Projects: element }) => ({
    default: element
  }))
);

export const LoadableOffboarding = React.lazy(() =>
  import('~/pages/Offboarding').then(({ Offboarding: element }) => ({
    default: element
  }))
);
