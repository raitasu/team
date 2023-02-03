import { z } from 'zod';

import { type NonNullableRecord } from '~/shared/helpers.types';
import {
  EmployeeLanguageLevelSchema,
  EmployeeLanguagesSchema,
  EmployeeStatusSchema
} from '~/store/api/employees/employees.schemas';

export type EmployeeFilterFormValues = z.infer<
  typeof EmployeeFiltersFormSchema
>;
const EmployeeLanguageSchema = z.object({
  name: EmployeeLanguagesSchema,
  level: EmployeeLanguageLevelSchema.nullable()
});

export const EmployeeFiltersFormSchema = z
  .object({
    name: z.string().nullable(),
    positions: z.number().array().nullable(),
    hard_skills: z.number().array().nullable(),
    work_experience_start: z
      .number({ invalid_type_error: 'invalid_number' })
      .nullable(),
    work_experience_end: z
      .number({ invalid_type_error: 'invalid_number' })
      .nullable(),
    languages: EmployeeLanguageSchema.merge(
      z.object({
        name: EmployeeLanguageSchema.shape.name.nullable()
      })
    )
      .superRefine((value, ctx) => {
        if (value.name === null && value.level) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'required_field',
            path: ['level']
          });
        }

        return value;
      })
      .array()
      .nullable(),
    country: z.string().array().nullable(),
    statuses: EmployeeStatusSchema.array().nullable()
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

export type EmployeeFiltersForm = z.infer<typeof EmployeeFiltersFormSchema>;

export type EmployeeFilters = Partial<
  Omit<NonNullableRecord<EmployeeFiltersForm>, 'languages'> & {
    languages?: z.infer<typeof EmployeeLanguageSchema>[];
  }
>;
export const initialFilterValues: EmployeeFilterFormValues = {
  name: null,
  positions: null,
  hard_skills: null,
  statuses: null,
  languages: [{ name: null, level: null }],
  work_experience_start: null,
  work_experience_end: null,
  country: null
};
