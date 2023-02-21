import { rest } from 'msw';

import { getHardSkills } from '~/mocks/employees/fixtures/hardSkills';

const getHardSkillsHandler = rest.get(
  `${import.meta.env.VITE_API_HOST}/api/v1/hard_skills`,
  async (_, res, ctx) => res(ctx.json(getHardSkills()))
);

export const hardSkillsHandlers = [getHardSkillsHandler];
