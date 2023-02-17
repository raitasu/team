import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import {
  type SelectedSoftSkill,
  type SoftSkill
} from '~/store/api/employees/employees.types';

import { getResponseValidator } from '../api.utils';
import { EmployeeSchema } from '../employees/employees.schemas';

const softSkillsApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getSoftSkill: builder.query<SoftSkill[], void>({
      providesTags: (response) =>
        response
          ? [
              ...response.map((hardSkill) => ({
                type: ApiTags.SoftSkills,
                id: hardSkill.id
              })),
              {
                type: ApiTags.SoftSkills,
                id: 'LIST'
              }
            ]
          : [
              {
                type: ApiTags.SoftSkills,
                id: 'LIST'
              }
            ],
      onQueryStarted: getResponseValidator((data) =>
        EmployeeSchema.shape.soft_skills.safeParse(data)
      ),
      query: () => ({
        url: 'soft_skills',
        method: 'GET'
      })
    }),
    updateSoftSkills: builder.mutation<
      SoftSkill[],
      {
        skills: SelectedSoftSkill[];
        id: number;
      }
    >({
      invalidatesTags: (_result, _error, arg) => [
        {
          type: ApiTags.Employees,
          id: `${arg.id}`
        }
      ],
      onQueryStarted: getResponseValidator((data) =>
        EmployeeSchema.shape.soft_skills.safeParse(data)
      ),
      query: ({ skills, id }) => ({
        url: `employees/${id}/batch_soft_skills`,
        method: 'POST',
        body: { soft_skill_ids: skills.map((skill) => skill.value) }
      })
    })
  })
});

export const { useGetSoftSkillQuery, useUpdateSoftSkillsMutation } =
  softSkillsApiSlice;
