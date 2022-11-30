import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import { type HardSkill } from '~/store/api/employees/employees.types';

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
    })
  })
});

export const { useGetHardSkillsQuery } = hardSkillsApiSlice;
