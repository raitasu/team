import { faker } from '@faker-js/faker/locale/en';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type EmployeePosition } from '~/store/api/employees/employees.types';

const sessionPositions: Record<string, EmployeePosition> = {};

const generatePosition = (id: number): EmployeePosition => ({
  id,
  created_at: faker.date
    .birthdate({ min: 1999, max: 2018, mode: 'year' })
    .toISOString(),
  updated_at: faker.date
    .birthdate({ min: 2019, max: 2025, mode: 'year' })
    .toISOString(),
  name: faker.datatype.string()
});

(function generateSessionPositions() {
  new Array(getRandomInteger(1, 50)).fill(1).forEach((_, index) => {
    sessionPositions[index] = generatePosition(index);
  });
})();

export const getRandomPositions = (count: number) =>
  shuffle(Object.values(sessionPositions)).slice(0, count);

export const getPositions = () => Object.values(sessionPositions);
