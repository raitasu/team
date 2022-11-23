import { faker } from '@faker-js/faker/locale/en';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type EmployeePublication } from '~/shared/store/api/employees/employees.types';

const sessionPublications: Record<string, EmployeePublication> = {};

const generateEmployeePublication = (id: number): EmployeePublication => ({
  id,
  date: faker.date.birthdate({ min: 0, max: 15, mode: 'age' }).toISOString(),
  description_translations: {
    en: faker.lorem.paragraph(),
    ru: fakerRu.lorem.paragraph()
  },
  file: faker.commerce.productDescription(),
  name_translations: {
    en: faker.lorem.sentence(),
    ru: fakerRu.lorem.sentence()
  },
  link: faker.internet.url()
});

(function generateSessionPublications() {
  new Array(getRandomInteger(0, 50)).fill(1).forEach((_, index) => {
    sessionPublications[index] = generateEmployeePublication(index);
  });
})();

export const getRandomPublications = (count: number) =>
  shuffle(Object.values(sessionPublications)).slice(0, count);
