import { faker } from '@faker-js/faker/locale/en';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type EmployeeCv } from '~/store/api/employees/employees.types';

const sessionCvs: Record<string, EmployeeCv> = {};

const generateEmployeeCv = (id: number): EmployeeCv => ({
  id,
  position: {
    created_at: faker.date
      .birthdate({ min: 1999, max: 2018, mode: 'year' })
      .toISOString(),
    updated_at: faker.date
      .birthdate({ min: 2019, max: 2025, mode: 'year' })
      .toISOString(),
    id: faker.datatype.number(),
    name: faker.datatype.string()
  }
});

(function generateSessionCvs() {
  new Array(getRandomInteger(0, 50)).fill(1).forEach((_, index) => {
    sessionCvs[index] = generateEmployeeCv(index);
  });
})();

export const getRandomCvs = (count: number) =>
  shuffle(Object.values(sessionCvs)).slice(0, count);
