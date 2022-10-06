import 'react-i18next';
import en from 'services/i18n/locales/en.json';

declare module 'react-i18next' {
  type EnglishResource = typeof en;

  interface CustomTypeOptions {
    resources: EnglishResource;
  }
}
