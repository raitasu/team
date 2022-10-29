import { useEffect } from 'react';

import { DecoratorFn } from '@storybook/react';
import { useAsync } from 'react-use';

import { initI18n } from '~/services/i18n';
import { AppLocale } from '~/services/i18n/i18n.types';
import { PageLoader } from '~/shared/ui/components/PageLoader';

import { ParamKey } from '../constants';

export const WithI18n: DecoratorFn = (Story, context) => {
  const { globals } = context;
  const locale: AppLocale | undefined = globals[ParamKey.Locale];
  const {
    error,
    loading: isLoading,
    value: i18nInstance
  } = useAsync(() => initI18n(locale));

  useEffect(() => {
    if (locale && i18nInstance && i18nInstance.language !== locale) {
      i18nInstance.changeLanguage(locale).catch((err) => console.error(err));
    }
  }, [locale, i18nInstance]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <div>i18n loading error: {error.message}</div>;
  }

  return <Story {...context} />;
};
