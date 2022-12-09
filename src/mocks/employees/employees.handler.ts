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
    const name = searchParams.get('employee_name');
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
    const locale = searchParams.get('locale') || 'en';
    const positions = searchParams
      .getAll('position[]')
      .flatMap((item) => item.split(','))
      .map((num) => +num);
    const hardSkills = searchParams
      .getAll('hard_skills[]')
      .flatMap((item) => item.split(','))
      .map((num) => +num);
    const languages = searchParams
      .getAll('language[]')
      .flatMap((item) => item.split(','));
    const languageLevels = searchParams
      .getAll('language_level[]')
      .flatMap((item) => item.split(','));
    const statuses = searchParams
      .getAll('status[]')
      .flatMap((item) => item.split(','));

    const employees: ShortEmployee[] = getEmployees()
      .filter((employee) => {
        let isValid = true;

        if (name) {
          isValid =
            getTranslation(employee.first_name_translations, locale)
              .toLowerCase()
              .indexOf(name.toLowerCase()) > -1 ||
            getTranslation(employee.last_name_translations, locale)
              .toLowerCase()
              .indexOf(name.toLowerCase()) > -1;
        }

        if (workExperienceStart !== null) {
          isValid =
            isValid && employee.years_of_experience >= workExperienceStart;
        }

        if (workExperienceEnd !== null) {
          isValid =
            isValid && employee.years_of_experience <= workExperienceEnd;
        }

        if (positions.length > 0) {
          isValid =
            isValid &&
            employee.positions.some(({ id }) => positions.includes(id));
        }

        if (hardSkills.length > 0) {
          isValid =
            isValid &&
            employee.hard_skills.some(({ id }) => hardSkills.includes(id));
        }

        if (languages.length > 0) {
          isValid =
            isValid &&
            employee.languages.some(({ name }) => languages.includes(name));
        }

        if (languageLevels.length > 0) {
          isValid =
            isValid &&
            employee.languages.some(({ level }) =>
              languageLevels.includes(level)
            );
        }

        if (statuses.length > 0) {
          isValid = isValid && statuses.includes(employee.status);
        }

        return isValid;
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
