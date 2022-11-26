import { faker } from '@faker-js/faker/locale/en';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type EmployeeWorkExperience } from '~/store/api/employees/employees.types';

const sessionWorkExperiences: Record<string, EmployeeWorkExperience> = {};

const generateEmployeeWorkExperience = (
  id: number
): EmployeeWorkExperience => ({
  id,
  company_name: faker.company.name(),
  position: {
    en: faker.name.jobTitle(),
    ru: fakerRu.name.jobTitle()
  },
  started_at: faker.date
    .birthdate({ min: 18, max: 23, mode: 'age' })
    .toISOString(),
  ended_at: faker.date
    .birthdate({ min: 23, max: 28, mode: 'age' })
    .toISOString(),
  description: {
    en: faker.lorem.paragraph(),
    ru: fakerRu.lorem.paragraph()
  },
  responsibilities: {
    en: faker.lorem.paragraph(),
    ru: fakerRu.lorem.paragraph()
  },
  environment: new Array(getRandomInteger(0, 15))
    .fill('')
    .map(() => faker.word.noun())
});

(function generateSessionEmployeeWorkExperiences() {
  new Array(getRandomInteger(1, 50)).fill('').forEach((_, index) => {
    sessionWorkExperiences[index] = generateEmployeeWorkExperience(index);
  });
})();

export const getRandomWorkExperiences = (count: number) =>
  shuffle(Object.values(sessionWorkExperiences)).slice(0, count);
