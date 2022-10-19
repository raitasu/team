import * as React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AppThemeProvider } from '~/shared/ui/theme/AppThemeProvider';

import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
