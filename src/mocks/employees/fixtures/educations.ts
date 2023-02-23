import { faker } from '@faker-js/faker/locale/en';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { EducationDegrees } from '~/store/api/employees/employees.schemas';
import { type EmployeeEducation } from '~/store/api/employees/employees.types';

const sessionEducations: Record<string, EmployeeEducation> = {};

const generateEmployeeEducation = (id: number): EmployeeEducation => ({
  id,
  degree: faker.helpers.arrayElement(EducationDegrees),
  country: faker.address.country(),
  started_at: faker.date
    .birthdate({ min: 1999, max: 2018, mode: 'year' })
    .toISOString(),
  graduated_at: faker.date
    .birthdate({ min: 2019, max: 2025, mode: 'year' })
    .toISOString(),
  speciality: faker.name.jobArea(),
  university_name: faker.company.name(),
  nowadays: faker.datatype.boolean()
});

(function generateSessionEducations() {
  new Array(getRandomInteger(1, 50)).fill(1).forEach((_, index) => {
    sessionEducations[index] = generateEmployeeEducation(index);
  });
})();

export const getRandomEducations = (count: number) =>
  shuffle(Object.values(sessionEducations)).slice(0, count);
