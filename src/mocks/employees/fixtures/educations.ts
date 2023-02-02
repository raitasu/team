import { faker } from '@faker-js/faker/locale/en';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type EmployeeEducation } from '~/store/api/employees/employees.types';

const sessionEducations: Record<string, EmployeeEducation> = {};

const generateEmployeeEducation = (id: number): EmployeeEducation => ({
  id,
  degree: faker.word.noun(),
  city: faker.address.city(),
  started_at: faker.date
    .birthdate({ min: 1999, max: 2018, mode: 'year' })
    .toISOString(),
  graduated_at: faker.date
    .birthdate({ min: 2019, max: 2025, mode: 'year' })
    .toISOString(),
  speciality_translations: {
    en: faker.name.jobArea(),
    ru: fakerRu.name.jobArea()
  },
  university_name_translations: {
    en: faker.company.name(),
    ru: fakerRu.company.name()
  },
  nowadays: faker.datatype.boolean()
});

(function generateSessionEducations() {
  new Array(getRandomInteger(1, 50)).fill(1).forEach((_, index) => {
    sessionEducations[index] = generateEmployeeEducation(index);
  });
})();

export const getRandomEducations = (count: number) =>
  shuffle(Object.values(sessionEducations)).slice(0, count);
