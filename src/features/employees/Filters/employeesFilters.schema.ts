import { z } from 'zod';

import {
  EmployeeLanguageLevelSchema,
  EmployeeLanguagesSchema,
  EmployeeStatusSchema
} from '~/store/api/employees/employees.schemas';

export type EmployeeFilterFormValues = z.infer<typeof EmployeesFiltersSchema>;
export const EmployeesFiltersSchema = z
  .object({
    employee_name: z.string().trim().nullable(),
    position: z.number().array().nullable(),
    hard_skills: z.number().array().nullable(),
    work_experience_start: z
      .number({ invalid_type_error: 'invalid_number' })
      .nullable(),
    work_experience_end: z
      .number({ invalid_type_error: 'invalid_number' })
      .nullable(),
    language: EmployeeLanguagesSchema.array().nullable(),
    language_level: EmployeeLanguageLevelSchema.array().nullable(),
    status: EmployeeStatusSchema.array().nullable()
  })
  .refine(
    (data) => {
      if (
        data.work_experience_start === null ||
        data.work_experience_end === null
      )
        return true;

      return data.work_experience_start <= data.work_experience_end;
    },
    {
      message: 'invalid_range',
      path: ['work_experience_start']
    }
  );

export type EmployeeFilterValues = z.infer<typeof EmployeesFiltersSchema>;
export const initialFilterValues: EmployeeFilterFormValues = {
  employee_name: null,
  position: null,
  hard_skills: null,
  status: null,
  language: null,
  language_level: null,
  work_experience_start: null,
  work_experience_end: null
};
