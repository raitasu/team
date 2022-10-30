import { faker } from '@faker-js/faker/locale/en';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';

import { getRandomHardSkills } from '~/mocks/employees/fixtures/hardSkills';
import { getRandomLanguages } from '~/mocks/employees/fixtures/languages';
import { getRandomPositions } from '~/mocks/employees/fixtures/positions';
import { getRandomSoftSkills } from '~/mocks/employees/fixtures/softSkills';
import { getRandomInteger } from '~/mocks/mocks.utils';
import {
  Employee,
  EmployeeAddress,
  EmployeeContact,
  EmployeeSocialNetwork
} from '~/shared/store/api/employees/employees.types';

const sessionEmployees: Record<string, Employee> = {};

const generateEmployeeAddress = (): EmployeeAddress => ({
  apartment: faker.address.buildingNumber(),
  building: faker.address.buildingNumber(),
  city: faker.address.city(),
  country: faker.address.country(),
  street: faker.address.street(),
  zip_code: faker.address.zipCode()
});

const generateEmployeeContacts = (): EmployeeContact => ({
  phones: new Array(getRandomInteger(1, 3))
    .fill(1)
    .map(() => faker.phone.number('+############')),
  emergency_phones: new Array(getRandomInteger(1, 3))
    .fill(1)
    .map(() => faker.phone.number('+############')),
  emails: new Array(getRandomInteger(1, 3))
    .fill(1)
    .map(() => faker.internet.email())
});

const generateSocialNetwork = (): EmployeeSocialNetwork => ({
  linkedin: faker.internet.url(),
  github: faker.internet.url(),
  telegram: faker.internet.url(),
  facebook: faker.internet.url(),
  instagram: faker.internet.url(),
  vk: faker.internet.url(),
  discord: faker.internet.url()
});

const generateEmployee = (id: number): Employee => {
  const gender = (['male', 'female'] as const)[getRandomInteger(0, 1)];

  return {
    address: generateEmployeeAddress(),
    avatar: faker.image.avatar(),
    clothing_size: faker.helpers.arrayElement([
      'xs',
      's',
      'm',
      'l',
      'xl',
      'xxl',
      '3xl',
      '4xl'
    ]),
    contacts: generateEmployeeContacts(),
    first_name: {
      en: faker.name.firstName(gender),
      ru: fakerRu.name.firstName(gender)
    },
    last_name: {
      en: faker.name.lastName(gender),
      ru: fakerRu.name.lastName(gender)
    },
    date_of_birth: faker.date
      .birthdate({ min: 18, max: 50, mode: 'age' })
      .toISOString(),
    gender,
    hard_skills: getRandomHardSkills(getRandomInteger(0, 8)),
    id,
    languages: getRandomLanguages(getRandomInteger(1, 3)),
    positions: getRandomPositions(getRandomInteger(1, 3)),
    projects: [],
    social_networks: generateSocialNetwork(),
    role: faker.helpers.arrayElement(['admin', 'user']),
    soft_skills: getRandomSoftSkills(getRandomInteger(0, 8)),
    status: faker.helpers.arrayElement(['active', 'candidate', 'inactive'])
  };
};

(function generateSessionEmployees() {
  new Array(50).fill(1).forEach((_, index) => {
    sessionEmployees[index] = generateEmployee(index);
  });
})();

export const getEmployees = () => Object.values(sessionEmployees);

export const updateEmployee = (
  employeeId: number,
  employee: Partial<Employee>
) => {
  sessionEmployees[employeeId] = {
    ...sessionEmployees[employeeId],
    ...employee
  };
};
