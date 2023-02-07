import { showGlobalError } from '~/shared/ui/components/Toast';
import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import {
  type SelectedSoftSkill,
  type SoftSkill
} from '~/store/api/employees/employees.types';

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
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;

          const responseValidation = EmployeeSchema.shape.soft_skills.safeParse(
            response.data
          );

          if (!responseValidation.success) {
            console.error(responseValidation.error.errors);

            showGlobalError({
              titleTag: 'server_error',
              descriptionTag: 'invalid_response_schema',
              descriptionTagArgs: {
                url: 'POST employees/{id}/batch_soft_skills'
              }
            });
          }
          // eslint-disable-next-line no-empty -- error cases are handled outside
        } catch (err) {}
      },
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
