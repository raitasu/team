import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import { type GetCVResponse } from '~/store/api/createCV/createCV.types';

const createCVApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getCV: builder.query<GetCVResponse, { employeeId: string; cvId: string }>({
      providesTags: (cv) => [{ type: ApiTags.CVs, id: cv ? cv.id : 'ENTITY' }],
      query: ({ employeeId, cvId }) => ({
        url: `/employees/${employeeId}/cvs/${cvId}`,
        method: 'GET'
      })
    }),
    createCV: builder.mutation<number, { employeeId: number; name: string }>({
      invalidatesTags: [ApiTags.CVs],
      query: ({ employeeId, name }) => ({
        url: `/employees/${employeeId}/cvs`,
        method: 'POST',
        body: { name }
      })
    })
  })
});

export const { useCreateCVMutation, useGetCVQuery } = createCVApiSlice;
