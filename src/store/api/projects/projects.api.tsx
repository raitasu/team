import { type SortingState } from '@tanstack/react-table';

import { type PartialProject } from '~/features/project/CreateProjectModal/project.schema';
import { getPageOffset } from '~/shared/utils/pagination.utils';
import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import {
  type Project,
  type ProjectResponse,
  type ProjectsListResponse
} from '~/store/api/projects/projects.types';
import { type ProjectsFilters } from '~/store/slices/projects/projects.types';

import { transformToFormData } from './projects.helpers';
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
                type: ApiTags.Projects,
                id: employee.id
              })),
              {
                type: ApiTags.Projects,
                id: 'LIST'
              }
            ]
          : [
              {
                type: ApiTags.Projects,
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
      providesTags: (project) => [
        { type: ApiTags.Employees, id: `${project ? project.id : 'ENTITY'}` }
      ],
      query: (id) => ({
        url: `projects/${id}`,
        method: 'GET'
      })
    }),
    createNewProject: builder.mutation<
      Project,
      {
        project: PartialProject;
      }
    >({
      invalidatesTags: [{ type: ApiTags.Projects, id: 'LIST' }],
      onQueryStarted: getResponseValidator((data) =>
        ProjectSchema.safeParse(data)
      ),
      query: ({ project }) => {
        const body = new FormData();

        transformToFormData(body, project);

        return {
          url: `projects`,
          method: 'POST',
          body
        };
      }
    }),
    removeProject: builder.mutation<void, string>({
      invalidatesTags: [{ type: ApiTags.Projects, id: 'LIST' }],
      query: (projectId) => ({
        url: `projects/${projectId}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateNewProjectMutation,
  useRemoveProjectMutation
} = projectsApiSlice;
