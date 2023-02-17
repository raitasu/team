import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import { type HardSkill } from '~/store/api/employees/employees.types';

import { getResponseValidator } from '../api.utils';
import { EmployeeSchema } from '../employees/employees.schemas';

const hardSkillsApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getHardSkills: builder.query<HardSkill[], void>({
      providesTags: (response) =>
        response
          ? [
              ...response.map((hardSkill) => ({
                type: ApiTags.HardSkills,
                id: hardSkill.id
              })),
              {
                type: ApiTags.HardSkills,
                id: 'LIST'
              }
            ]
          : [
              {
                type: ApiTags.HardSkills,
                id: 'LIST'
              }
            ],
      onQueryStarted: getResponseValidator((data) =>
        EmployeeSchema.shape.employee_hard_skill_permissions.safeParse(data)
      ),
      query: () => ({
        url: 'hard_skills',
        method: 'GET'
      })
    }),
    updateHardSkills: builder.mutation<
      HardSkill[],
      { skills: HardSkill[]; id: number }
    >({
      invalidatesTags: (_result, _error, arg) => [
        {
          type: ApiTags.Employees,
          id: `${arg.id}`
        }
      ],
      onQueryStarted: getResponseValidator((data) =>
        EmployeeSchema.shape.employee_hard_skill_permissions.safeParse(data)
      ),
      query: ({ skills, id }) => ({
        url: `employees/${id}/batch_hard_skills`,
        method: 'POST',
        body: { hard_skill_ids: skills.map((skill) => skill.id) }
      })
    })
  })
});

export const { useGetHardSkillsQuery, useUpdateHardSkillsMutation } =
  hardSkillsApiSlice;
