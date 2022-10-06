import { Provider } from 'react-redux';
import { useAsync } from 'react-use';

import { initI18n } from 'services/i18n';
import { store } from 'shared/store/store';

import { Pages } from './pages';

export const App = () => {
  const i18nState = useAsync(() => initI18n());

  if (i18nState.loading) {
    return <div>Loading translations</div>;
  }

  if (i18nState.error) {
    return <div>i18n loading error: {i18nState.error.message}</div>;
  }

  return (
    <Provider store={store}>
      <Pages />
    </Provider>
  );
};
