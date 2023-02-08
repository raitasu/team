import pick from 'lodash/pick';
import { rest } from 'msw';

import { type CreateEmployeeValues } from '~/features/employee/CreateEmployeeModal/employee.schema';
import { getLanguageFilter } from '~/mocks/employees/employess.helpers';
import {
  createEmployee,
  getEmployeeById,
  getEmployees
} from '~/mocks/employees/fixtures/employees';
import { sleep } from '~/mocks/mocks.utils';

const getCurrentUserHandler = rest.get(
  `${import.meta.env.VITE_PUBLIC_API_URL}me`,
  async (_, res, ctx) => {
    const me = getEmployees()[0];

    return res(ctx.json(me));
  }
);

const getEmployeeHandler = rest.get(
  `${import.meta.env.VITE_PUBLIC_API_URL}employees/:id`,
  async ({ params: { id } }, res, ctx) => {
    const employee = getEmployeeById(+id);

    if (!employee) {
      return res(ctx.status(404), ctx.json({ message: 'Employee not found!' }));
    }

    return res(ctx.json(employee));
  }
);

const createEmployeeHandler = rest.post(
  `${import.meta.env.VITE_PUBLIC_API_URL}employees`,
  async (req, res, ctx) => {
    const formData = req.body as {
      first_name: CreateEmployeeValues['first_name'];
      last_name: CreateEmployeeValues['last_name'];
      status: CreateEmployeeValues['status'];
      email: CreateEmployeeValues['email'];
      personal_email: CreateEmployeeValues['personal_email'];
      avatar: CreateEmployeeValues['avatar'];
    };

    const employee = createEmployee({
      first_name: formData.first_name,
      last_name: formData.last_name,
      status: formData.status,
      email: formData.email,
      personal_email: formData.personal_email,
      avatar: formData.avatar
    });

    await sleep(3000);

    return res(ctx.json(employee));
  }
);

const getEmployeesHandler = rest.get(
  `${import.meta.env.VITE_PUBLIC_API_URL}employees`,
  async ({ url: { searchParams, search } }, res, ctx) => {
    const limit = +(searchParams.get('limit') || 10);
    const offset = +(searchParams.get('offset') || 0);
    const name = searchParams.get('name');
    const workExperienceStart = Number.isNaN(
      +(searchParams.get('work_experience_start') || NaN)
    )
      ? null
      : +(searchParams.get('work_experience_start') || '');
    const workExperienceEnd = Number.isNaN(
      +(searchParams.get('work_experience_end') || NaN)
    )
      ? null
      : +(searchParams.get('work_experience_end') || '');
    const sortColumn = searchParams.get('sort_column');
    const sortDirection = searchParams.get('sort_direction');
    const positions = searchParams
      .getAll('positions[]')
      .flatMap((item) => item.split(','))
      .map((num) => +num);

    const hardSkills = searchParams
      .getAll('hard_skills[]')
      .flatMap((item) => item.split(','))
      .map((num) => +num);
    const languages = getLanguageFilter(decodeURIComponent(search));
    const countries = searchParams
      .getAll('country[]')
      .flatMap((item) => item.split(','));
    const statuses = searchParams
      .getAll('statuses[]')
      .flatMap((item) => item.split(','));

    const employees = getEmployees()
      .filter((employee) => {
        let isValid = true;

        if (name) {
          isValid =
            employee.first_name.toLowerCase().indexOf(name.toLowerCase()) >
              -1 ||
            employee.last_name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        }

        if (workExperienceStart !== null && employee.years_of_experience) {
          isValid =
            isValid && employee.years_of_experience >= workExperienceStart;
        }

        if (workExperienceEnd !== null && employee.years_of_experience) {
          isValid =
            isValid && employee.years_of_experience <= workExperienceEnd;
        }

        if (positions.length > 0 && employee.positions) {
          isValid =
            isValid &&
            employee.positions.some(({ id }) => positions.includes(id));
        }

        if (hardSkills.length > 0 && employee.employee_hard_skill_permissions) {
          isValid =
            isValid &&
            employee.employee_hard_skill_permissions.some(({ id }) =>
              hardSkills.includes(id)
            );
        }

        if (languages && employee.languages) {
          isValid =
            isValid &&
            employee.languages.some(({ name, level }) =>
              languages.some(
                (el) =>
                  el.name === name && (el.level === 'any' || el.level === level)
              )
            );
        }

        if (countries.length > 0 && employee.contacts.address?.country_code) {
          isValid =
            isValid &&
            countries.includes(employee.contacts.address.country_code);
        }

        if (statuses.length > 0) {
          isValid = isValid && statuses.includes(employee.status);
        }

        return isValid;
      })
      .sort((a, b) => {
        if (sortColumn && sortDirection) {
          if (a.date_of_birth && b.date_of_birth)
            if (sortColumn === 'date_of_birth') {
              if (sortDirection === 'desc') {
                return a.date_of_birth > b.date_of_birth ? -1 : 1;
              }

              return a.date_of_birth > b.date_of_birth ? 1 : -1;
            }

          if (sortColumn === 'name') {
            const firstNameA = a.first_name;
            const firstNameB = b.first_name;
            const lastNameA = a.last_name.toLowerCase();
            const lastNameB = b.last_name.toLowerCase();

            if (firstNameA === firstNameB) {
              if (sortDirection === 'desc') {
                return lastNameA > lastNameB ? -1 : 1;
              }

              return lastNameA > lastNameB ? 1 : -1;
            }

            if (sortDirection === 'desc') {
              return firstNameA > firstNameB ? -1 : 1;
            }

            return firstNameA > firstNameB ? 1 : -1;
          }

          if (
            sortColumn === 'contacts' &&
            a.contacts.address?.city &&
            b.contacts.address?.city
          ) {
            const firstNameA = a.contacts.address.city;
            const firstNameB = b.contacts.address.city;

            if (sortDirection === 'desc') {
              return firstNameA > firstNameB ? -1 : 1;
            }

            return firstNameA > firstNameB ? 1 : -1;
          }
        }

        return 0;
      })

      .map((employee) =>
        pick(employee, [
          'contacts',
          'avatar',
          'date_of_birth',
          'first_name',
          'id',
          'last_name',
          'positions',
          'projects',
          'role',
          'status',
          'social_networks',
          'email',
          'languages'
        ])
      );

    return res(
      ctx.json({
        items: employees.slice(offset, offset + limit),
        page: {
          limit,
          offset,
          total_count: employees.length
        }
      })
    );
  }
);

export const employeesHandlers = [
  getEmployeesHandler,
  getCurrentUserHandler,
  getEmployeeHandler,
  createEmployeeHandler
];
