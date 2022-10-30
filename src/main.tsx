import * as React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AppThemeProvider } from '~/shared/ui/theme/AppThemeProvider';

import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const app = (
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
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
