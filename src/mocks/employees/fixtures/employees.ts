import { faker } from '@faker-js/faker/locale/en';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';

import { type CreateEmployeeValues } from '~/features/employee/CreateEmployeeModal/employee.schema';
import { getRandomHardSkills } from '~/mocks/employees/fixtures/hardSkills';
import { getRandomLanguages } from '~/mocks/employees/fixtures/languages';
import { getRandomSoftSkills } from '~/mocks/employees/fixtures/softSkills';
import { getRandomInteger } from '~/mocks/mocks.utils';
import { getRandomPositions } from '~/mocks/positions/fixtures/positions';
import { getRandomProjects } from '~/mocks/projects/fixtures/projects';
import {
  type Address,
  type Employee,
  type EmployeeContact,
  type SocialNetwork
} from '~/store/api/employees/employees.types';

import { getRandomCertificates } from './certificates';
import { getRandomCvs } from './cvs';
import { getRandomEducations } from './educations';
import { getRandomPublications } from './publications';
import { getRandomWorkExperiences } from './workExperinces';

const sessionEmployees: Record<string, Employee> = {};

const generateEmployeeAddress = (): Address => ({
  apartment: faker.address.buildingNumber(),
  building: faker.address.buildingNumber(),
  city: {
    en: faker.address.city(),
    ru: fakerRu.address.city()
  },
  country_code: faker.address.countryCode(),
  street_translations: {
    en: faker.address.street(),
    ru: fakerRu.address.street()
  },
  unit: faker.address.buildingNumber(),
  zip_code: faker.address.zipCode()
});

const generateEmployeeContacts = (): EmployeeContact => ({
  address: generateEmployeeAddress(),
  primary_phone: faker.phone.number('+############'),
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

const generateSocialNetwork = (): SocialNetwork => ({
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
    about_translations: {
      en: faker.lorem.paragraph(),
      ru: fakerRu.lorem.paragraph()
    },
    avatar_url: faker.image.avatar(),
    certificates: getRandomCertificates(getRandomInteger(0, 10)),
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
    cvs: getRandomCvs(getRandomInteger(0, 5)),
    first_name_translations: {
      en: faker.name.firstName(gender),
      ru: fakerRu.name.firstName(gender)
    },
    last_name_translations: {
      en: faker.name.lastName(gender),
      ru: fakerRu.name.lastName(gender)
    },
    date_of_birth: faker.date
      .birthdate({ min: 18, max: 50, mode: 'age' })
      .toISOString(),
    educations: getRandomEducations(getRandomInteger(0, 5)),
    gender,
    hard_skills: getRandomHardSkills(getRandomInteger(0, 8)),
    id,
    interests_translations: {
      en: faker.lorem.paragraph(),
      ru: fakerRu.lorem.paragraph()
    },
    languages: getRandomLanguages(getRandomInteger(1, 3)),
    positions: getRandomPositions(getRandomInteger(1, 3)),

    projects: getRandomProjects(getRandomInteger(0, 3)).map((project) => ({
      id: project.id,
      name_translations: project.name_translations
    })),
    publications: getRandomPublications(getRandomInteger(0, 8)),

    social_networks: generateSocialNetwork(),
    role: id === 0 ? 'admin' : faker.helpers.arrayElement(['admin', 'user']),
    soft_skills: getRandomSoftSkills(getRandomInteger(0, 8)),
    status: faker.helpers.arrayElement(['active', 'candidate', 'inactive']),
    start_career_at: faker.date
      .birthdate({ min: 0, max: 5, mode: 'age' })
      .toISOString(),
    timezone: faker.address.timeZone(),
    years_of_experience: getRandomInteger(0, 15),
    work_experiences: getRandomWorkExperiences(getRandomInteger(0, 5))
  };
};

(function generateSessionEmployees() {
  new Array(50).fill(1).forEach((_, index) => {
    sessionEmployees[index] = generateEmployee(index);
  });
})();

export const getEmployees = () => Object.values(sessionEmployees);

export const getEmployeeById = (employeeId: number): Employee | undefined =>
  sessionEmployees[employeeId];

export const createEmployee = (data: CreateEmployeeValues) => {
  const employees = getEmployees();
  const newEmployeeId = employees.reduce(
    (newId, { id }) => (newId >= id ? newId + 1 : id),
    0
  );

  const newEmployee = generateEmployee(newEmployeeId);

  newEmployee.first_name_translations.en = data.first_name_translations.en;
  newEmployee.last_name_translations.en = data.last_name_translations.en;
  newEmployee.status = data.status;
  newEmployee.contacts.emails = [data.email];
  sessionEmployees[newEmployee.id] = newEmployee;

  return newEmployee;
};

export const updateEmployee = (
  employeeId: number,
  employee: Partial<Employee>
) => {
  sessionEmployees[employeeId] = {
    ...sessionEmployees[employeeId],
    ...employee
  };
};
