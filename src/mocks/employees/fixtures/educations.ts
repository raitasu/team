import { faker } from '@faker-js/faker/locale/en';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type EmployeeEducation } from '~/store/api/employees/employees.types';

const sessionEducations: Record<string, EmployeeEducation> = {};

const generateEmployeeEducation = (id: number): EmployeeEducation => ({
  id,
  degree: faker.helpers.arrayElement([
    {
      en: 'Associate degree',
      ru: 'Ассоциированная степень'
    },
    {
      en: "Bachelor's degree",
      ru: 'Степень бакалавра'
    },
    {
      en: "Master's degree",
      ru: 'Степень магистра'
    },
    {
      en: 'Doctoral degree',
      ru: 'Докторская степень'
    },
    {
      en: 'Postgraduate degree',
      ru: 'Аспирантура'
    },
    {
      en: 'First-professional degree',
      ru: 'Первая профессиональная степень'
    }
  ]),
  country_code: faker.helpers.arrayElement(['be', 'ru']),
  city: {
    en: faker.address.city(),
    ru: fakerRu.address.city()
  },
  start_at: faker.date
    .birthdate({ min: 18, max: 23, mode: 'age' })
    .toISOString(),
  end_at: faker.date.birthdate({ min: 23, max: 28, mode: 'age' }).toISOString(),
  speciality_translations: {
    en: faker.name.jobArea(),
    ru: fakerRu.name.jobArea()
  },
  university_name_translations: {
    en: faker.company.name(),
    ru: fakerRu.company.name()
  }
});

(function generateSessionEducations() {
  new Array(getRandomInteger(1, 50)).fill(1).forEach((_, index) => {
    sessionEducations[index] = generateEmployeeEducation(index);
  });
})();

export const getRandomEducations = (count: number) =>
  shuffle(Object.values(sessionEducations)).slice(0, count);
