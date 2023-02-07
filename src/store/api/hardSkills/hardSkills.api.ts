import { showGlobalError } from '~/shared/ui/components/Toast';
import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import { type HardSkill } from '~/store/api/employees/employees.types';

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
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const responseValidation =
            EmployeeSchema.shape.employee_hard_skills.safeParse(response.data);

          if (!responseValidation.success) {
            console.error(responseValidation.error.errors);

            showGlobalError({
              titleTag: 'server_error',
              descriptionTag: 'invalid_response_schema',
              descriptionTagArgs: {
                url: 'POST employees/{id}/batch_hard_skills'
              }
            });
          }
          // eslint-disable-next-line no-empty -- error cases are handled outside
        } catch (err) {}
      },
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
