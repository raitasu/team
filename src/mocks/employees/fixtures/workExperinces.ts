import { faker } from '@faker-js/faker/locale/en';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type EmployeeWorkExperience } from '~/store/api/employees/employees.types';

import { getRandomHardSkills } from './hardSkills';

const sessionWorkExperiences: Record<string, EmployeeWorkExperience> = {};

const generateEmployeeWorkExperience = (
  id: number
): EmployeeWorkExperience => ({
  id,
  company_name: faker.company.name(),
  positions: new Array(getRandomInteger(0, 5)).fill('').map((_item, index) => ({
    id: index,
    created_at: faker.date
      .birthdate({ min: 18, max: 23, mode: 'age' })
      .toISOString(),
    name: faker.name.jobTitle(),
    updated_at: faker.date
      .birthdate({ min: 23, max: 28, mode: 'age' })
      .toISOString()
  })),
  started_at: faker.date
    .birthdate({ min: 18, max: 23, mode: 'age' })
    .toISOString(),
  ended_at: faker.date
    .birthdate({ min: 23, max: 28, mode: 'age' })
    .toISOString(),
  description: faker.lorem.paragraph(),
  responsibilities: faker.lorem.paragraph(),
  hard_skills: getRandomHardSkills(getRandomInteger(0, 8)),
  project: {
    name: faker.company.name(),
    id: faker.datatype.number()
  }
});

(function generateSessionEmployeeWorkExperiences() {
  new Array(getRandomInteger(1, 50)).fill('').forEach((_, index) => {
    sessionWorkExperiences[index] = generateEmployeeWorkExperience(index);
  });
})();

export const getRandomWorkExperiences = (count: number) =>
  shuffle(Object.values(sessionWorkExperiences)).slice(0, count);
