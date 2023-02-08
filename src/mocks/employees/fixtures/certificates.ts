import { faker } from '@faker-js/faker/locale/en';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type EmployeeCertificate } from '~/store/api/employees/employees.types';

const sessionCertificates: Record<string, EmployeeCertificate> = {};

const generateEmployeeCertificate = (id: number): EmployeeCertificate => ({
  id,
  institute: faker.company.name(),
  city: faker.address.city(),
  country_code: faker.helpers.arrayElement(['be', 'ru']),
  file: faker.commerce.productDescription(),
  link: faker.commerce.productDescription(),
  start_date: faker.date
    .birthdate({ min: 18, max: 23, mode: 'age' })
    .toISOString(),
  end_date: faker.date
    .birthdate({ min: 23, max: 28, mode: 'age' })
    .toISOString(),
  speciality: faker.company.catchPhrase(),
  name: faker.company.name(),
  issued_by: faker.company.name()
});

(function generateSessionEmployeeCertificates() {
  new Array(getRandomInteger(1, 50)).fill('').forEach((_, index) => {
    sessionCertificates[index] = generateEmployeeCertificate(index);
  });
})();

export const getRandomCertificates = (count: number) =>
  shuffle(Object.values(sessionCertificates).slice(0, count));
