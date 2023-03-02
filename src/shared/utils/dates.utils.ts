import {
  differenceInMonths,
  format,
  isValid as isValidDateFns,
  isBefore
} from 'date-fns';

import { DateFnsLocales } from '~/services/i18n/i18n.constants';
import { isSupportedLocale } from '~/services/i18n/i18n.utils';
import { DateFormats, Patterns } from '~/shared/shared.constants';

import { type NonNullableRecord, type ArrayValues } from '../helpers.types';

const MONTHS_PER_YEAR = 12;

const ACCEPTED_DOCS_FILE_TYPES = [
  'application/pdf',
  'application/msword'
] as const;
const MAX_FILE_SIZE = 52428800;

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
] as const;

const currentDate = new Date();

export const workPeriod = (startedAt: string, endedAt: string | null) => {
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

export const isValidDocsFile = (
  file: string | File | null
): file is File & { type: ArrayValues<typeof ACCEPTED_DOCS_FILE_TYPES> } => {
  if (!file || typeof file === 'string') {
    return true;
  }

  return (
    (ACCEPTED_DOCS_FILE_TYPES as readonly string[]).includes(file.type) &&
    file.size <= MAX_FILE_SIZE
  );
};

export const isValidImageFile = (
  avatar: File | string | null
): avatar is File & { type: ArrayValues<typeof ACCEPTED_IMAGE_TYPES> } => {
  if (typeof avatar === 'string' || avatar === null) {
    return true;
  }

  return (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(avatar.type);
};

const isValidDate = (date: NonNullableRecord<DateObjType>) => {
  const enteredDate = new Date(Number(date.year), Number(date.month));

  return Patterns.Date.test(date.year) && isBefore(enteredDate, currentDate);
};

const isPresentedYearAndMonth = (
  date: DateObjType
): date is NonNullableRecord<DateObjType> => !!(date.year && date.month);

export const isValidAndRequiredDate = (date: DateObjType) =>
  isPresentedYearAndMonth(date) && isValidDate(date);

const isAbsent = (date: DateObjType) =>
  date.month === null && date.year === null;

export const isAbsentOrValidDate = (date: DateObjType) =>
  isAbsent(date) || isValidAndRequiredDate(date);

export const isValidDateObject = (
  startedDate: DateObjType,
  endedDate: DateObjType
) =>
  isValidAndRequiredDate(startedDate) &&
  (isAbsent(endedDate) ||
    (isValidAndRequiredDate(endedDate) &&
      isBefore(
        new Date(Number(startedDate.year), Number(startedDate.month)),
        new Date(Number(endedDate.year), Number(endedDate.month))
      )));
