import { Provider } from 'react-redux';

import { store } from 'shared/store/store';

import { Pages } from './pages';

export const App = () => (
  <Provider store={store}>
    <Pages />
  </Provider>
);
