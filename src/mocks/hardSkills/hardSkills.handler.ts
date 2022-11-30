import { rest } from 'msw';

import { getHardSkills } from '~/mocks/employees/fixtures/hardSkills';

const getHardSkillsHandler = rest.get(
  `${import.meta.env.VITE_PUBLIC_API_URL}hard_skills`,
  async (_, res, ctx) => res(ctx.json(getHardSkills()))
);

export const hardSkillsHandlers = [getHardSkillsHandler];
