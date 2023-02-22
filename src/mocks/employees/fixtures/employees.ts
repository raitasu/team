import { faker } from '@faker-js/faker/locale/en';
import sampleSize from 'lodash/sampleSize';

import { type CreateEmployeeValues } from '~/features/employee/CreateEmployeeModal/employee.schema';
import { getRandomHardSkills } from '~/mocks/employees/fixtures/hardSkills';
import { getRandomLanguages } from '~/mocks/employees/fixtures/languages';
import { opinions } from '~/mocks/employees/fixtures/softSkills';
import { getRandomInteger } from '~/mocks/mocks.utils';
import { getRandomPositions } from '~/mocks/positions/fixtures/positions';
import { getRandomProjects } from '~/mocks/projects/fixtures/projects';
import { CountriesCode } from '~/store/api/api.constants';
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
  city: faker.address.city(),
  country_code: faker.helpers.arrayElement(CountriesCode)
});

const generateEmployeeContacts = (): EmployeeContact => ({
  address: generateEmployeeAddress(),
  primary_phone: faker.phone.number('+############')
});

const generateSocialNetwork = (): SocialNetwork => ({
  linkedin: `https://www.linkedin.com/in/${faker.name.firstName()}`,
  github: `https://github.com/${faker.name.firstName()}`,
  discord: `${faker.name.fullName()}#${faker.random.numeric(4)}`,
  telegram: `https://t.me/${faker.name.firstName()}`,
  facebook: `https://www.facebook.com/${faker.name.firstName()}`,
  instagram: `https://www.instagram.com/${faker.name.firstName()}`,
  vk: `https://vk.com/${faker.name.firstName()}`
});

const generateEmployee = (id: number): Employee => {
  const gender = (['male', 'female'] as const)[getRandomInteger(0, 1)];

  return {
    email: faker.internet.email(),
    about: faker.lorem.paragraph(),
    avatar: faker.image.avatar(),
    certificates: getRandomCertificates(getRandomInteger(0, 10)),
    t_shirt_size: faker.helpers.arrayElement([
      'xs',
      's',
      'm',
      'l',
      'xl',
      'xxl',
      '3xl'
    ]),
    sweat_shirt_size: faker.helpers.arrayElement([
      'xs',
      's',
      'm',
      'l',
      'xl',
      'xxl',
      '3xl'
    ]),
    contacts: generateEmployeeContacts(),
    contact_info: {
      id: faker.datatype.number({ min: 0, max: 10 }),
      city_name: faker.address.city(),
      primary_phone: faker.phone.number('+############'),
      telegram: faker.internet.url(),
      country_code: faker.address.countryCode(),
      instagram: faker.internet.url(),
      facebook: faker.internet.url(),
      github: faker.internet.url(),
      discord: faker.internet.url(),
      linkedin: faker.internet.url(),
      vk: faker.internet.email(),
      employee_attributes: {
        email: faker.internet.email(),
        id: faker.datatype.number({ min: 0, max: 10 })
      },
      personal_email: faker.internet.email(),
      secondary_phone: faker.phone.number('+############'),
      street: faker.address.street(),
      unit: faker.address.street(),
      zip_code: Number(faker.address.zipCode()),
      apartment: Number(faker.address.buildingNumber()),
      building: Number(faker.address.buildingNumber()),
      time_zone: faker.helpers.arrayElement([
        '(GMT+03:00 Moscow, Standard Time - Minsk',
        '(GMT+03:00 Moscow, Standard Time - Moscow'
      ]),
      emergency_contact: {
        id: faker.datatype.number({ min: 0, max: 10 }),
        number: faker.phone.number('+############'),
        name: faker.name.firstName(),
        owner: faker.name.firstName()
      }
    },
    cvs: getRandomCvs(getRandomInteger(0, 5)),
    first_name: faker.name.firstName(gender),
    last_name: faker.name.lastName(gender),
    date_of_birth: faker.date
      .birthdate({ min: 18, max: 50, mode: 'age' })
      .toISOString(),
    educations: getRandomEducations(getRandomInteger(0, 5)),
    gender,
    employee_hard_skill_permissions: getRandomHardSkills(
      getRandomInteger(0, 8)
    ),
    id,
    interests: faker.datatype.string(),
    languages: getRandomLanguages(getRandomInteger(1, 3)),
    positions: getRandomPositions(getRandomInteger(1, 3)),

    projects: getRandomProjects(getRandomInteger(0, 3)).map((project) => ({
      id: project.id,
      name: project.name
    })),
    publications: getRandomPublications(getRandomInteger(0, 8)),

    social_networks: generateSocialNetwork(),
    role: id === 0 ? 'admin' : faker.helpers.arrayElement(['admin', 'user']),
    soft_skills: sampleSize(opinions, 5),
    status: faker.helpers.arrayElement(['active', 'candidate', 'inactive']),
    start_career_at: faker.date
      .birthdate({ min: 0, max: 5, mode: 'age' })
      .toISOString(),
    hired_at: faker.date
      .birthdate({ min: 0, max: 5, mode: 'age' })
      .toISOString(),
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

  newEmployee.first_name = data.first_name;
  newEmployee.last_name = data.last_name;
  newEmployee.status = data.status;
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
