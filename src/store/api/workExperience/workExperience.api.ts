import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import {
  type EmployeeProject,
  type Customers,
  type EmployeeWorkExperience
} from '~/store/api/employees/employees.types';

import { getResponseValidator } from '../api.utils';
import {
  CustomersSchema,
  EmployeeSchema
} from '../employees/employees.schemas';

const workExperienceApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    createWorkExperience: builder.mutation<
      EmployeeWorkExperience,
      {
        workExperience: {
          company_name: string;
          description: string;
          hard_skill_ids: number[];
          position_ids: number[];
          project_id: number;
          responsibilities: string;
          ended_at: string | null;
          started_at: string;
        };
        employeesId: number;
      }
    >({
      invalidatesTags: (_result, _error, arg) => [
        {
          type: ApiTags.Employees,
          id: `${arg.employeesId}`
        }
      ],
      onQueryStarted: getResponseValidator((data) =>
        EmployeeSchema.shape.work_experiences.safeParse(data)
      ),
      query: ({ workExperience, employeesId }) => ({
        url: `employees/${employeesId}/work_experiences`,
        method: 'POST',
        body: { work_experience: workExperience }
      })
    }),
    getCustomers: builder.query<Customers[], void>({
      onQueryStarted: getResponseValidator((data) =>
        CustomersSchema.array().safeParse(data)
      ),
      query: () => ({
        url: `customers`,
        method: 'GET'
      })
    }),
    getCompanyProjects: builder.query<EmployeeProject[], string>({
      onQueryStarted: getResponseValidator((data) =>
        EmployeeSchema.shape.projects.array().safeParse(data)
      ),
      query: (name) => ({
        url: `company_projects?name=${name}`,
        method: 'GET'
      })
    }),
    removeWorkExperience: builder.mutation<
      void,
      { employeesId: string; workExperienceId: string }
    >({
      invalidatesTags: (_result, _error, arg) => [
        {
          type: ApiTags.Employees,
          id: `${arg.employeesId}`
        }
      ],
      query: ({ employeesId, workExperienceId }) => ({
        url: `employees/${employeesId}/work_experiences/${workExperienceId}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useCreateWorkExperienceMutation,
  useGetCustomersQuery,
  useGetCompanyProjectsQuery,
  useRemoveWorkExperienceMutation
} = workExperienceApiSlice;
