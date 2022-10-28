import { faker } from '@faker-js/faker';
import { rest } from 'msw';

import { Employee } from '~/shared/store/api/employees/employees.types';

function randomInteger(min: number, max: number) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

const generateEmployees: () => Employee[] = () =>
  new Array(50).fill(1).map((_, index) => ({
    about: faker.lorem.paragraph(),
    avatar: {
      smallThumb: faker.image.avatar(),
      thumb: faker.image.avatar(),
      url: faker.image.avatar()
    },
    city: faker.address.cityName(),
    date_of_birth: faker.date
      .birthdate({ min: 18, max: 50, mode: 'age' })
      .toISOString(),
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    id: index,
    job_title: faker.name.jobTitle(),
    last_name: faker.name.lastName(),
    projects: new Array(randomInteger(0, 3)).fill(1).map((_, index) => ({
      id: index,
      name: faker.company.name()
    })),
    role: faker.helpers.arrayElement(['admin', 'user'] as const),
    status: faker.helpers.arrayElement([
      'active',
      'candidate',
      'inactive'
    ] as const),
    years_of_experience: faker.datatype.number({
      min: 1,
      max: 10,
      precision: 0
    })
  }));

export const employeesHandler = rest.get(
  `${import.meta.env.VITE_PUBLIC_API_URL}api/v1/employees`,
  async (_, res, ctx) => res(ctx.json(generateEmployees()))
);
