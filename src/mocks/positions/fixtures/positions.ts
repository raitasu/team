import { faker } from '@faker-js/faker/locale/en';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import type { EmployeePosition } from '~/shared/store/api/employees/employees.types';

const sessionPositions: Record<string, EmployeePosition> = {};

const generatePosition = (id: number): EmployeePosition => ({
  id,
  name_translations: {
    en: faker.name.jobTitle(),
    ru: fakerRu.name.jobTitle()
  }
});

(function generateSessionPositions() {
  new Array(getRandomInteger(1, 50)).fill(1).forEach((_, index) => {
    sessionPositions[index] = generatePosition(index);
  });
})();

export const getRandomPositions = (count: number) =>
  shuffle(Object.values(sessionPositions)).slice(0, count);

export const getPositions = () => Object.values(sessionPositions);
