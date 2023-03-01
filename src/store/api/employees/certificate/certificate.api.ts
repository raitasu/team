import { rootApiSlice } from '~/store/api';
import { getResponseValidator } from '~/store/api/api.utils';
import { type EmployeeCertificate } from '~/store/api/employees/employees.types';

import { ApiTags } from '../../api.constants';
import { EmployeeCertificateSchema } from '../employees.schemas';

const certificateApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    createCertificate: builder.mutation<
      void,
      EmployeeCertificate & { employeeId: number }
    >({
      invalidatesTags: (_result, _error, arg) => [
        {
          type: ApiTags.Employees,
          id: `${arg.employeeId}`
        }
      ],
      onQueryStarted: getResponseValidator((data) =>
        EmployeeCertificateSchema.safeParse(data)
      ),
      query: (data) => {
        const body = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (key === 'link' && !value) body.append(key, '');
          if (key === 'file' && !value) body.append(key, 'null');
          if (value && typeof value !== 'number') body.append(key, value);
        });

        return {
          url: `employees/${data.employeeId}/certificates`,
          method: 'POST',
          body
        };
      }
    }),
    deleteCertificate: builder.mutation<
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
        url: `employees/${employeeId}/certificates/${id}`,
        method: 'DELETE'
      })
    }),
    updateCertificate: builder.mutation<
      void,
      {
        certificate: Partial<EmployeeCertificate>;
        employeeId: number;
        certificateId: number;
      }
    >({
      invalidatesTags: (_result, _error, arg) => [
        {
          type: ApiTags.Employees,
          id: `${arg.employeeId}`
        }
      ],
      onQueryStarted: getResponseValidator((data) =>
        EmployeeCertificateSchema.safeParse(data)
      ),
      query: ({ certificate, employeeId, certificateId }) => {
        const body = new FormData();

        Object.entries(certificate).forEach(([key, value]) => {
          if (key === 'link' && !value) body.append(key, '');
          if (key === 'file' && !value) body.append(key, 'null');
          if (value && typeof value !== 'number') body.append(key, value);
        });

        return {
          url: `employees/${employeeId}/certificates/${certificateId}`,
          method: 'PATCH',
          body
        };
      }
    })
  })
});

export const {
  useCreateCertificateMutation,
  useDeleteCertificateMutation,
  useUpdateCertificateMutation
} = certificateApiSlice;
