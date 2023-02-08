import { faker } from '@faker-js/faker/locale/en';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type EmployeePublication } from '~/store/api/employees/employees.types';

const sessionPublications: Record<string, EmployeePublication> = {};

const generateEmployeePublication = (id: number): EmployeePublication => ({
  id,
  start_date: faker.date
    .birthdate({ min: 18, max: 32, mode: 'age' })
    .toISOString(),
  description: faker.lorem.paragraph(),
  file: faker.commerce.productDescription(),
  name: faker.lorem.sentence(),
  link: faker.internet.url()
});

(function generateSessionPublications() {
  new Array(getRandomInteger(0, 50)).fill(1).forEach((_, index) => {
    sessionPublications[index] = generateEmployeePublication(index);
  });
})();

export const getRandomPublications = (count: number) =>
  shuffle(Object.values(sessionPublications)).slice(0, count);
