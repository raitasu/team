/* eslint-disable import/no-duplicates -- bug in library https://github.com/import-js/eslint-plugin-import/issues/1479 */
import en from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';
/* eslint-enable import/no-duplicates */

import { type ArrayValues } from '~/shared/helpers.types';

export const supportedLocales = ['en', 'ru'] as const;

export const DateFnsLocales: Record<
  ArrayValues<typeof supportedLocales>,
  Locale
> = {
  ru,
  en
};
