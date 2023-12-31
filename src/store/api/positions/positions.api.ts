import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import { type EmployeePosition } from '~/store/api/employees/employees.types';

import { PositionSchema } from './position.schemas';
import { getResponseValidator } from '../api.utils';

const positionsApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getPositions: builder.query<EmployeePosition[], void>({
      providesTags: (response) =>
        response
          ? [
              ...response.map((position) => ({
                type: ApiTags.Positions,
                id: position.id
              })),
              {
                type: ApiTags.Positions,
                id: 'LIST'
              }
            ]
          : [
              {
                type: ApiTags.Positions,
                id: 'LIST'
              }
            ],
      onQueryStarted: getResponseValidator((data) =>
        PositionSchema.array().safeParse(data)
      ),
      query: () => ({
        url: 'positions',
        method: 'GET'
      })
    })
  })
});

export const { useGetPositionsQuery } = positionsApiSlice;
