import { faker } from '@faker-js/faker/locale/en';
import shuffle from 'lodash/shuffle';

import { getRandomInteger } from '~/mocks/mocks.utils';
import { type EmployeeCertificate } from '~/store/api/employees/employees.types';

const sessionCertificates: Record<string, EmployeeCertificate> = {};

const generateEmployeeCertificate = (id: number): EmployeeCertificate => ({
  id,
  name: faker.lorem.sentence(),
  issued_by: faker.company.name(),
  start_date: faker.date
    .birthdate({ min: 1980, max: 2019, mode: 'year' })
    .toISOString(),
  link: faker.internet.url(),
  end_date: faker.date
    .birthdate({ min: 2019, max: 2025, mode: 'year' })
    .toISOString(),
  file: faker.internet.url()
});

(function generateSessionEmployeeCertificates() {
  new Array(getRandomInteger(1, 50)).fill('').forEach((_, index) => {
    sessionCertificates[index] = generateEmployeeCertificate(index);
  });
})();

export const getRandomCertificates = (count: number) =>
  shuffle(Object.values(sessionCertificates).slice(0, count));
