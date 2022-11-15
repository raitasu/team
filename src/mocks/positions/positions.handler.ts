import { rest } from 'msw';

import { getPositions } from '~/mocks/positions/fixtures/positions';

const getPositionsHandler = rest.get(
  `${import.meta.env.VITE_PUBLIC_API_URL}positions`,
  async (_, res, ctx) => res(ctx.json(getPositions()))
);

export const positionsHandlers = [getPositionsHandler];
