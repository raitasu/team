import { rest } from 'msw';

export const healthHandler = rest.get(
  `${import.meta.env.VITE_PUBLIC_API_URL}health`,
  async (_, res, ctx) => res(ctx.text('OK!'))
);
