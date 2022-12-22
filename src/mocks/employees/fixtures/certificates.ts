import { faker } from '@faker-js/faker/locale/en';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type EmployeeCertificate } from '~/store/api/employees/employees.types';

const sessionCertificates: Record<string, EmployeeCertificate> = {};

const generateEmployeeCertificate = (id: number): EmployeeCertificate => ({
  id,
  institute_translations: {
    en: faker.company.name(),
    ru: fakerRu.company.name()
  },
  city: {
    en: faker.address.city(),
    ru: fakerRu.address.city()
  },
  country_code: faker.helpers.arrayElement(['be', 'ru']),
  file: faker.commerce.productDescription(),
  start_at: faker.date
    .birthdate({ min: 18, max: 23, mode: 'age' })
    .toISOString(),
  end_at: faker.date.birthdate({ min: 23, max: 28, mode: 'age' }).toISOString(),
  speciality_translations: {
    en: faker.company.catchPhrase(),
    ru: fakerRu.company.catchPhrase()
  }
});

(function generateSessionEmployeeCertificates() {
  new Array(getRandomInteger(1, 50)).fill('').forEach((_, index) => {
    sessionCertificates[index] = generateEmployeeCertificate(index);
  });
})();

export const getRandomCertificates = (count: number) =>
  shuffle(Object.values(sessionCertificates).slice(0, count));
