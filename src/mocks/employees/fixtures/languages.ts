import { faker } from '@faker-js/faker';
import shuffle from 'lodash/shuffle';

import type { EmployeeLanguage } from '~/shared/store/api/employees/employees.types';

const sessionLanguages = ['en', 'ru', 'ja', 'fr'] as const;

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
