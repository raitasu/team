import { faker } from '@faker-js/faker';
import shuffle from 'lodash/shuffle';

import {
  type EmployeeLanguage,
  type LanguageName
} from '~/store/api/employees/employees.types';

const sessionLanguages: LanguageName[] = [
  'be',
  'de',
  'en',
  'es',
  'fr',
  'hi',
  'it',
  'ja',
  'lt',
  'pl',
  'pt',
  'ru',
  'ua',
  'zh'
];

export const getRandomLanguages = (count: number): EmployeeLanguage[] =>
  shuffle(sessionLanguages)
    .slice(0, count)
    .map((lang) => ({
      id: sessionLanguages.indexOf(lang),
      name: lang,
      level: faker.helpers.arrayElement([
        'beginner',
        'elementary',
        'intermediate',
        'upper_intermediate',
        'advanced',
        'proficiency'
      ])
    }));
