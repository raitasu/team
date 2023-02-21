import { type EmployeeLanguageValues } from '~/features/employee/EmployeeInfo/tabs/SkillsTab/modals/EditLanguagesInfo/EditLanguagesInfo.shema';

import { rootApiSlice } from '../..';
import { ApiTags } from '../../api.constants';

const languagesInfoApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    updateLanguagesInfo: builder.mutation<
      void,
      { languages: EmployeeLanguageValues[]; employeeId: number }
    >({
      invalidatesTags: (_result, _error, arg) => [
        {
          type: ApiTags.Employees,
          id: `${arg.employeeId}`
        }
      ],
      query: ({ languages, employeeId }) => ({
        url: `employees/${employeeId}/batch_languages`,
        method: 'POST',
        body: { language_ids: languages }
      })
    })
  })
});

export const { useUpdateLanguagesInfoMutation } = languagesInfoApiSlice;
