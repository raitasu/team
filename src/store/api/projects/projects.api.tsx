import { type SortingState } from '@tanstack/react-table';

import { type PartialProject } from '~/features/project/CreateProjectModal/project.schema';
import { type ChangedProjectMainInfoValues } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import { getPageOffset } from '~/shared/utils/pagination.utils';
import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import { type Employee } from '~/store/api/employees/employees.types';
import {
  type Project,
  type ProjectsListResponse,
  ProjectResponseSchema,
  type ProjectResponse
} from '~/store/api/projects/projects.types';
import { type ProjectsFilters } from '~/store/slices/projects/projects.types';

import { transformToFormDataForCreate } from './projects.helpers';
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
          items: `${elementsPerPage}`,
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
        ProjectResponseSchema.safeParse(data)
      ),
      providesTags: (project) => [
        { type: ApiTags.Employees, id: `${project ? project.id : 'ENTITY'}` }
      ],
      query: (id) => ({
        url: `projects/${id}`,
        method: 'GET'
      })
    }),
    updateMainInfo: builder.mutation<
      Employee,
      {
        data: ChangedProjectMainInfoValues;
        id: number;
      }
    >({
      invalidatesTags: (employee) => [
        {
          type: ApiTags.Employees,
          id: `${employee ? employee.id : 'ENTITY'}`
        }
      ],
      onQueryStarted: getResponseValidator((data) =>
        ProjectResponseSchema.safeParse(data)
      ),
      query: ({ data, id }) => {
        const body = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (key === 'hard_skill_ids' && value)
            return (value as Array<number>).forEach((item) => {
              body.append(`${key}[]`, String(item));
            });
          if (key === 'business_domain' && value)
            return body.append(
              key,
              (value as { value: string; label: string }).value
            );
          if (key === 'avatar' && value) return body.append(key, value as File);

          return body.append(key, String(value));
        });

        return {
          url: `projects/${id}`,
          method: 'PATCH',
          body
        };
      }
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

        transformToFormDataForCreate(body, project);

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
  useRemoveProjectMutation,
  useUpdateMainInfoMutation
} = projectsApiSlice;
