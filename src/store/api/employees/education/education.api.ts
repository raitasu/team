import {
  type ChangedEmployeeEducationInfoValues,
  type EmployeeEducationInfoFormValues
} from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/EducationInfo.schema';
import { rootApiSlice } from '~/store/api';
import { getResponseValidator } from '~/store/api/api.utils';

import { ApiTags } from '../../api.constants';
import { EmployeeEducationSchema } from '../employees.schemas';

const educationApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    createEducation: builder.mutation<
      void,
      EmployeeEducationInfoFormValues & { employeeId: number }
    >({
      invalidatesTags: (_result, _error, arg) => [
        {
          type: ApiTags.Employees,
          id: `${arg.employeeId}`
        }
      ],
      onQueryStarted: getResponseValidator((data) =>
        EmployeeEducationSchema.safeParse(data)
      ),
      query: (data) => {
        const { employeeId, startDate, endDate, ...payload } = data;

        return {
          url: `employees/${data.employeeId}/educations`,
          method: 'POST',
          body: { education: payload }
        };
      }
    }),
    deleteEducation: builder.mutation<
      number,
      { employeeId: number; id: number }
    >({
      invalidatesTags: (_result, _error, arg) => [
        {
          type: ApiTags.Employees,
          id: `${arg.employeeId}`
        }
      ],
      query: ({ employeeId, id }) => ({
        url: `employees/${employeeId}/educations/${id}`,
        method: 'DELETE'
      })
    }),
    updateEducation: builder.mutation<
      void,
      {
        education: ChangedEmployeeEducationInfoValues;
        employeeId: number;
        educationId: number;
      }
    >({
      invalidatesTags: (_result, _error, arg) => [
        {
          type: ApiTags.Employees,
          id: `${arg.employeeId}`
        }
      ],
      query: ({ employeeId, educationId, education }) => {
        const { startDate, endDate, ...payload } = education;

        return {
          url: `employees/${employeeId}/educations/${educationId}`,
          method: 'PATCH',
          body: { education: payload }
        };
      }
    })
  })
});

export const {
  useCreateEducationMutation,
  useDeleteEducationMutation,
  useUpdateEducationMutation
} = educationApiSlice;
