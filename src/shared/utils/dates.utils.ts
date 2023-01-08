import format from 'date-fns/format';

import { DateFnsLocales } from '~/services/i18n/i18n.constants';
import { isSupportedLocale } from '~/services/i18n/i18n.utils';
import { DateFormats } from '~/shared/shared.constants';

export const getFormattedDate = (
  date: string,
  language: string,
  pattern: (typeof DateFormats)[keyof typeof DateFormats] = DateFormats.Short
) => {
  if (!isSupportedLocale(language)) {
    throw new Error(
      `[Teams]: Language ${language} is not loaded for date-fns!`
    );
  }

  return format(new Date(date), pattern, {
    locale: DateFnsLocales[language]
  });
};
