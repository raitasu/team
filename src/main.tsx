import * as React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AppErrorBoundary } from '~/features/errors/AppErrorBoundary/AppErrorBoundary';
import { AppThemeProvider } from '~/shared/ui/theme/AppThemeProvider';

import { App } from './App';

console.debug(
  `[Teams] Running version: %c${import.meta.env.VITE_APP_VERSION}`,
  'color:#EF4523; font-weight:bold'
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <AppThemeProvider>
        <AppErrorBoundary>
          <App />
        </AppErrorBoundary>
      </AppThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

if (import.meta.env.VITE_USE_MOCK_SERVER) {
  import('./mocks/browser')
    .then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
    .then(() => fetch(`${import.meta.env.VITE_API_HOST}/api/v1/health`))
    .then(() => {
      root.render(app);
    })
    .catch((err) => console.error(err));
} else {
  root.render(app);
}
