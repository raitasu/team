import * as React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

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
        <App />
      </AppThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

if (import.meta.env.VITE_USE_MOCK_SERVER) {
  import('./mocks/browser')
    .then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
    .then(() => fetch(`${import.meta.env.VITE_PUBLIC_API_URL}health`))
    .then(() => {
      root.render(app);
    })
    .catch((err) => console.error(err));
} else {
  root.render(app);
}
