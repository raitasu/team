import { supportedLocales } from '~/services/i18n/i18n.constants';
import { AppLocale } from '~/services/i18n/i18n.types';
import { Translation } from '~/shared/store/api/api.types';

const isSupportedLocale = (lang?: string): lang is AppLocale =>
  supportedLocales.includes(lang as AppLocale);

export const getTranslation = (obj: Translation, lang = 'en'): string =>
  isSupportedLocale(lang) ? obj[lang] || obj.en : obj.en;
