import pick from 'lodash/pick';
import { rest } from 'msw';

import { type CreateEmployeeValues } from '~/features/employee/CreateEmployeeModal/employee.schema';
import {
  createEmployee,
  getEmployeeById,
  getEmployees
} from '~/mocks/employees/fixtures/employees';
import { sleep } from '~/mocks/mocks.utils';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { type ShortEmployee } from '~/store/api/employees/employees.types';

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
      first_name_translations_en: CreateEmployeeValues['first_name_translations']['en'];
      last_name_translations_en: CreateEmployeeValues['last_name_translations']['en'];
      status: CreateEmployeeValues['status'];
      email: CreateEmployeeValues['email'];
      avatar: CreateEmployeeValues['avatar'];
    };

    const employee = createEmployee({
      first_name_translations: {
        en: formData.first_name_translations_en
      },
      last_name_translations: {
        en: formData.last_name_translations_en
      },
      status: formData.status,
      email: formData.email,
      avatar: formData.avatar
    });

    await sleep(3000);

    return res(ctx.json(employee));
  }
);

const getEmployeesHandler = rest.get(
  `${import.meta.env.VITE_PUBLIC_API_URL}employees`,
  async ({ url: { searchParams } }, res, ctx) => {
    const limit = +(searchParams.get('limit') || 10);
    const offset = +(searchParams.get('offset') || 0);
    const name = searchParams.get('name');
    const locale = searchParams.get('locale') || undefined;

    const employees: ShortEmployee[] = getEmployees()
      .filter((employee) => {
        if (
          name &&
          !(
            getTranslation(employee.first_name_translations, locale).indexOf(
              name
            ) > -1 ||
            getTranslation(employee.last_name_translations, locale).indexOf(
              name
            ) > -1
          )
        ) {
          return false;
        }

        return true;
      })
      .map((employee) =>
        pick(employee, [
          'contacts',
          'avatar_url',
          'date_of_birth',
          'first_name_translations',
          'id',
          'last_name_translations',
          'positions',
          'projects',
          'role',
          'status',
          'social_networks'
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
