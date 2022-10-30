import pick from 'lodash/pick';
import { rest } from 'msw';

import { getEmployees } from '~/mocks/employees/fixtures/employees';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { ShortEmployee } from '~/shared/store/api/employees/employees.types';

const getCurrentUser = rest.get(
  `${import.meta.env.VITE_PUBLIC_API_URL}me`,
  async (_, res, ctx) => {
    const me = getEmployees()[0];

    return res(ctx.json(me));
  }
);

const getEmployeesHandler = rest.get(
  `${import.meta.env.VITE_PUBLIC_API_URL}employees`,
  async ({ url: { searchParams } }, res, ctx) => {
    const limit = +(searchParams.get('limit') || 10);
    const offset = +(searchParams.get('offset') || 10);
    const name = searchParams.get('name');
    const locale = searchParams.get('locale') || undefined;

    const employees: ShortEmployee[] = getEmployees()
      .filter((employee) => {
        if (
          name &&
          !(
            getTranslation(employee.first_name, locale).indexOf(name) > -1 ||
            getTranslation(employee.last_name, locale).indexOf(name) > -1
          )
        ) {
          return false;
        }

        return true;
      })
      .map((employee) =>
        pick(employee, [
          'address',
          'avatar',
          'date_of_birth',
          'first_name',
          'id',
          'last_name',
          'positions',
          'projects',
          'status'
        ])
      );

    return res(
      ctx.json({
        items: employees.slice(offset, offset + limit),
        limit,
        offset,
        total_count: employees.length
      })
    );
  }
);

export const employeesHandlers = [getEmployeesHandler, getCurrentUser];
