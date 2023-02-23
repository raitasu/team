import { rootApiSlice } from '~/store/api';

import { type GetCVListResponse, type GetCVResponse } from './cv.types';
import { ApiTags } from '../api.constants';

const CvApiSlice = rootApiSlice.injectEndpoints({
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
      invalidatesTags: (cvId, _error, arg) => [
        {
          type: ApiTags.CVs,
          id: cvId !== undefined ? `${cvId}` : 'ENTITY'
        },
        {
          type: ApiTags.CVs,
          id: `${arg.employeeId ? arg.employeeId : 'LIST'}`
        }
      ],
      query: ({ employeeId, name }) => ({
        url: `/employees/${employeeId}/cvs`,
        method: 'POST',
        body: { name }
      })
    }),
    getCVsList: builder.query<Array<GetCVListResponse>, { employeeId: number }>(
      {
        providesTags: (result, _error, arg) => [
          {
            type: ApiTags.CVs,
            id: `${arg.employeeId ? arg.employeeId : 'LIST'}`
          },
          ...(result || []).map((cv) => ({
            type: ApiTags.CVs,
            id: cv.id
          }))
        ],
        query: ({ employeeId }) => ({
          url: `/employees/${employeeId}/cvs`,
          method: 'GET'
        })
      }
    ),
    deleteCV: builder.mutation<number, { employeeId: number; id: number }>({
      invalidatesTags: (_result, _error, arg) => [
        {
          type: ApiTags.CVs,
          id: 'LIST'
        },
        {
          type: ApiTags.CVs,
          id: `${arg.employeeId}`
        }
      ],
      query: ({ employeeId, id }) => ({
        url: `employees/${employeeId}/cvs/${id}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useGetCVsListQuery,
  useDeleteCVMutation,
  useCreateCVMutation,
  useGetCVQuery
} = CvApiSlice;
