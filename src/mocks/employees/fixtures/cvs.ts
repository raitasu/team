import { faker } from '@faker-js/faker/locale/en';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type EmployeeCv } from '~/store/api/employees/employees.types';

const sessionCvs: Record<string, EmployeeCv> = {};

const generateEmployeeCv = (id: number): EmployeeCv => ({
  id,
  position: {
    id,
    name_translations: {
      en: faker.name.jobTitle(),
      ru: fakerRu.name.jobTitle()
    }
  }
});

(function generateSessionCvs() {
  new Array(getRandomInteger(0, 50)).fill(1).forEach((_, index) => {
    sessionCvs[index] = generateEmployeeCv(index);
  });
})();

export const getRandomCvs = (count: number) =>
  shuffle(Object.values(sessionCvs)).slice(0, count);
