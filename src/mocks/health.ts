import { rest } from 'msw';

export const healthHandler = rest.get(
  `${import.meta.env.VITE_API_HOST}/api/v1/health`,
  async (_, res, ctx) => res(ctx.text('OK!'))
);
