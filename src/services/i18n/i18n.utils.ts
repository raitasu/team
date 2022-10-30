import { Translation } from '~/shared/store/api/api.types';

export const getTranslation = (obj: Translation, lang = 'en'): string =>
  obj[lang] || obj.en;
