import { type SortingState } from '@tanstack/react-table';

import { getPageOffset } from '~/shared/utils/pagination.utils';
import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import {
  type ProjectResponse,
  type ProjectsListResponse
} from '~/store/api/projects/projects.types';
import { type ProjectsFilters } from '~/store/slices/projects/projects.types';

import { ProjectSchema, ProjectsResponseSchema } from './projects.schemas';
import { getResponseValidator } from '../api.utils';

const projectsApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getProjects: builder.query<
      ProjectsListResponse,
      {
        page: number;
        elementsPerPage: number;
        filters?: ProjectsFilters;
        sorting?: SortingState;
      }
    >({
      providesTags: (response) =>
        response
          ? [
              ...response.items.map((employee) => ({
                type: ApiTags.Employees,
                id: employee.id
              })),
              {
                type: ApiTags.Employees,
                id: 'LIST'
              }
            ]
          : [
              {
                type: ApiTags.Employees,
                id: 'LIST'
              }
            ],
      onQueryStarted: getResponseValidator((data) =>
        ProjectsResponseSchema.safeParse(data)
      ),
      query: ({ page, elementsPerPage }) => {
        const params = new URLSearchParams({
          limit: `${elementsPerPage}`,
          offset: `${getPageOffset(page, elementsPerPage)}`,
          page: page.toString()
        });

        return {
          url: 'projects',
          method: 'GET',
          params
        };
      }
    }),
    getProject: builder.query<ProjectResponse, number>({
      onQueryStarted: getResponseValidator((data) =>
        ProjectSchema.safeParse(data)
      ),
      providesTags: (employee) => [
        { type: ApiTags.Employees, id: `${employee ? employee.id : 'ENTITY'}` }
      ],
      query: (id) => ({
        url: `projects/${id}`,
        method: 'GET'
      })
    })
  })
});

export const { useGetProjectsQuery, useGetProjectQuery } = projectsApiSlice;
