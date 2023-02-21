import { rest } from 'msw';

import { getProjects } from '~/mocks/projects/fixtures/projects';

const getProjectsHandler = rest.get(
  `${import.meta.env.VITE_API_HOST}/api/v1/projects`,
  async ({ url: { searchParams } }, res, ctx) => {
    const limit = +(searchParams.get('limit') || 10);
    const offset = +(searchParams.get('offset') || 10);

    const projects = getProjects();

    return res(
      ctx.json({
        items: projects.slice(offset, offset + limit),
        limit,
        offset,
        total_count: projects.length
      })
    );
  }
);

export const projectHandlers = [getProjectsHandler];
