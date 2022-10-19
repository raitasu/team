import type en from '~/services/i18n/locales/en.json';

export type AppLocale = 'en' | 'ru';
export type I18nNamespaces = keyof typeof en;
