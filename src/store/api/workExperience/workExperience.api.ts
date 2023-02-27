import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import {
  type Customers,
  type EmployeeProject,
  type CreateEmployeeWorkExperience,
  type EmployeeWorkExperience,
  type HardSkill
} from '~/store/api/employees/employees.types';

import { getResponseValidator } from '../api.utils';
import {
  CustomersSchema,
  EmployeeSchema,
  WorkExperienceSchema
} from '../employees/employees.schemas';

const workExperienceApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    createWorkExperience: builder.mutation<
      EmployeeWorkExperience,
      {
        workExperience: CreateEmployeeWorkExperience;
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
        EmployeeSchema.shape.projects.safeParse(data)
      ),
      query: (name) => ({
        url: `company_projects?name=${name}`,
        method: 'GET'
      })
    }),
    getCompanyHardSkills: builder.query<HardSkill[], string>({
      onQueryStarted: getResponseValidator((data) =>
        EmployeeSchema.shape.employee_hard_skill_permissions
          .array()
          .safeParse(data)
      ),
      query: (name) => ({
        url: `/project_hard_skills?name=${name}`,
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
    }),
    updateWorkExperience: builder.mutation<
      EmployeeWorkExperience,
      {
        workExperience: Partial<CreateEmployeeWorkExperience>;
        employeeId: number;
        workExperienceId: number;
      }
    >({
      invalidatesTags: (_result, _error, arg) => [
        {
          type: ApiTags.Employees,
          id: `${arg.employeeId}`
        }
      ],
      onQueryStarted: getResponseValidator((data) =>
        WorkExperienceSchema.safeParse(data)
      ),
      query: ({ workExperience, employeeId, workExperienceId }) => ({
        url: `employees/${employeeId}/work_experiences/${workExperienceId}`,
        method: 'PATCH',
        body: {
          work_experience: workExperience
        }
      })
    })
  })
});

export const {
  useCreateWorkExperienceMutation,
  useGetCustomersQuery,
  useGetCompanyProjectsQuery,
  useRemoveWorkExperienceMutation,
  useGetCompanyHardSkillsQuery,
  useUpdateWorkExperienceMutation
} = workExperienceApiSlice;
