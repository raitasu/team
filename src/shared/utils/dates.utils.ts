import { format, differenceInMonths } from 'date-fns';

import { DateFnsLocales } from '~/services/i18n/i18n.constants';
import { isSupportedLocale } from '~/services/i18n/i18n.utils';
import { DateFormats } from '~/shared/shared.constants';

const MONTHS_PER_YEAR = 12;

export const workPeriod = (startedAt: string, endedAt: string | null) => {
  const startDate = new Date(startedAt);
  const endDate = endedAt ? new Date(endedAt) : new Date();
  const months = differenceInMonths(endDate, startDate);

  const years = Math.floor(months / MONTHS_PER_YEAR);
  const remainingMonths = months % MONTHS_PER_YEAR;

  return { years, months: remainingMonths === 0 ? 1 : remainingMonths };
};

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

export const getFirstLetterOfMonth = (date: string) => {
  switch (new Date(date).getDay()) {
    case 0:
      return 'S';
    case 1:
      return 'M';
    case 2:
      return 'T';
    case 3:
      return 'W';
    case 4:
      return 'T';
    case 5:
      return 'F';
    case 6:
      return 'S';
  }

  return new Date(date).getDay();
};
