import {
  differenceInMonths,
  endOfMonth,
  format,
  isBefore,
  isValid as isValidDateFns,
  startOfMonth
} from 'date-fns';

import { DateFnsLocales } from '~/services/i18n/i18n.constants';
import { isSupportedLocale } from '~/services/i18n/i18n.utils';
import { DateFormats, Patterns } from '~/shared/shared.constants';

import { type NonNullableRecord } from '../helpers.types';

const MONTHS_PER_YEAR = 12;

const currentDate = new Date();

export const getWorkPeriod = (startedAt: string, endedAt: string | null) => {
  const startDate = new Date(startedAt);
  const endDate = endedAt ? new Date(endedAt) : new Date();
  const months = differenceInMonths(endDate, startDate);

  const years = Math.floor(months / MONTHS_PER_YEAR);
  const remainingMonths = months % MONTHS_PER_YEAR;

  return { years, months: remainingMonths === 0 ? 1 : remainingMonths };
};

export const getFormattedDate = (
  date: string | number,
  language: string,
  pattern: (typeof DateFormats)[keyof typeof DateFormats] = DateFormats.Short
) => {
  if (!isSupportedLocale(language)) {
    throw new Error(
      `[Teams]: Language ${language} is not loaded for date-fns!`
    );
  }

  const cvDate = new Date(date);

  return isValidDateFns(cvDate)
    ? format(new Date(date), pattern, {
        locale: DateFnsLocales[language]
      })
    : 'invalid_date';
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

type DateObjType = {
  month: string | null;
  year: string | null;
};

export const isValidUrl = (link: string | null | undefined) =>
  !link || Patterns.Link.test(link);

const isValidDate = (date: NonNullableRecord<DateObjType>) => {
  const enteredDate = new Date(Number(date.year), Number(date.month));

  return Patterns.Date.test(date.year) && isBefore(enteredDate, currentDate);
};

const isFullDate = (
  date: DateObjType
): date is NonNullableRecord<DateObjType> => !!(date.year && date.month);

export const isValidAndRequiredDate = (
  date: DateObjType
): date is NonNullableRecord<DateObjType> =>
  isFullDate(date) && isValidDate(date);

const isEmptyDate = (date: DateObjType): date is { month: null; year: null } =>
  date.month === null && date.year === null;

export const isEmptyOrValidDate = (date: DateObjType) =>
  isEmptyDate(date) || isValidAndRequiredDate(date);

const isCorrectPeriod = (startDate: DateObjType, endDate: DateObjType) =>
  isValidAndRequiredDate(startDate) &&
  isValidAndRequiredDate(endDate) &&
  isBefore(
    startOfMonth(new Date(+startDate.year, +startDate.month)),
    endOfMonth(new Date(+endDate.year, +endDate.month))
  );

export const isValidWorkPeriod = (
  startDate: DateObjType,
  endDate: DateObjType,
  isBothOptional = false
) => {
  if (isBothOptional) {
    return (
      (isEmptyDate(startDate) && isEmptyDate(endDate)) ||
      (isValidAndRequiredDate(startDate) &&
        (isEmptyDate(endDate) || isCorrectPeriod(startDate, endDate)))
    );
  }

  return (
    isValidAndRequiredDate(startDate) &&
    (isEmptyDate(endDate) || isCorrectPeriod(startDate, endDate))
  );
};
