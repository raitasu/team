import { supportedLocales } from '~/services/i18n/i18n.constants';
import { type AppLocale } from '~/services/i18n/i18n.types';

export const isSupportedLocale = (lang?: string): lang is AppLocale =>
  supportedLocales.includes(lang as AppLocale);
