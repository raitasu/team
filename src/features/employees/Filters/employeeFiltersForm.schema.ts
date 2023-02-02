import { z } from 'zod';

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

const EmployeeFiltersSchema = z.object({
  name: z.string().optional(),
  positions: z.number().array().optional(),
  hard_skills: z.number().array().optional(),
  work_experience_start: z
    .number({ invalid_type_error: 'invalid_number' })
    .optional(),
  work_experience_end: z
    .number({ invalid_type_error: 'invalid_number' })
    .optional(),
  languages: EmployeeLanguageSchema.array().optional(),
  country: z.string().array().optional(),
  statuses: EmployeeStatusSchema.array().optional()
});

export const EmployeeFiltersFormSchema = z
  .object({
    name: EmployeeFiltersSchema.required().shape.name.nullable(),
    positions: EmployeeFiltersSchema.required().shape.positions.nullable(),
    hard_skills: EmployeeFiltersSchema.required().shape.hard_skills.nullable(),
    work_experience_start:
      EmployeeFiltersSchema.required().shape.work_experience_start.nullable(),
    work_experience_end:
      EmployeeFiltersSchema.required().shape.work_experience_end.nullable(),
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
    country: EmployeeFiltersSchema.required().shape.country.nullable(),
    statuses: EmployeeFiltersSchema.required().shape.statuses.nullable()
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
export type EmployeeFilters = z.infer<typeof EmployeeFiltersSchema>;

export type EmployeeFiltersForm = z.infer<typeof EmployeeFiltersFormSchema>;
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
