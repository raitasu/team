import { type CreateEmployeeFormValues } from '~/features/employee/CreateEmployeeModal/employee.schema';
import { showGlobalError } from '~/shared/ui/components/Toast';
import { getPageOffset } from '~/shared/utils/pagination.utils';
import { rootApiSlice } from '~/store/api';
import { ApiTags } from '~/store/api/api.constants';
import {
  EmployeeSchema,
  ShortEmployeeSchema
} from '~/store/api/employees/employees.schemas';
import {
  type Employee,
  type EmployeesListResponse
} from '~/store/api/employees/employees.types';

const employeesApiSlice = rootApiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getEmployees: builder.query<
      EmployeesListResponse,
      { page: number; elementsPerPage: number }
    >({
      providesTags: (response) =>
        response
          ? [
              ...response.items.map((employee) => ({
                type: ApiTags.Employees,
                id: employee.id
              })),
              {
                type: ApiTags.Employees,
                id: 'LIST'
              }
            ]
          : [
              {
                type: ApiTags.Employees,
                id: 'LIST'
              }
            ],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const responseValidation = ShortEmployeeSchema.array().safeParse(
            response.data.items
          );

          if (!responseValidation.success) {
            console.error(responseValidation.error.errors);

            showGlobalError({
              titleTag: 'server_error',
              descriptionTag: 'invalid_response_schema',
              descriptionTagArgs: { url: 'GET /employees' }
            });
          }
          // eslint-disable-next-line no-empty -- error cases are handled outside
        } catch (err) {}
      },
      query: ({ page, elementsPerPage }) => ({
        url: 'employees',
        method: 'GET',
        params: {
          limit: elementsPerPage,
          offset: getPageOffset(page, elementsPerPage)
        }
      })
    }),
    getEmployee: builder.query<Employee, number>({
      providesTags: (employee) => [
        { type: ApiTags.Employees, id: `${employee ? employee.id : 'ENTITY'}` }
      ],
      query: (id) => ({
        url: `employees/${id}`,
        method: 'GET'
      })
    }),
    createEmployee: builder.mutation<void, CreateEmployeeFormValues>({
      invalidatesTags: [ApiTags.Employees],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          const responseValidation = EmployeeSchema.safeParse(response.data);

          if (!responseValidation.success) {
            console.error(responseValidation.error.errors);

            showGlobalError({
              titleTag: 'server_error',
              descriptionTag: 'invalid_response_schema',
              descriptionTagArgs: { url: 'POST /employees' }
            });
          }
          // eslint-disable-next-line no-empty -- error cases are handled outside
        } catch (err) {}
      },
      query: (employee) => {
        const body = new FormData();

        body.append(
          'first_name_translations_en',
          employee.first_name_translations.en
        );

        body.append('email', employee.email);

        body.append(
          'last_name_translations_en',
          employee.last_name_translations.en
        );

        body.append('status', employee.status);

        if (employee.avatar) {
          body.append('avatar', employee.avatar);
        }

        return {
          url: 'employees',
          method: 'POST',
          body
        };
      }
    })
  })
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation
} = employeesApiSlice;
