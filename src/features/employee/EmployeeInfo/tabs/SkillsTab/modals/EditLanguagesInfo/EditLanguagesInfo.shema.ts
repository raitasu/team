import { z } from 'zod';

import {
  EmployeeLanguageLevelSchema,
  EmployeeLanguagesSchema
} from '~/store/api/employees/employees.schemas';

const EmployeesEditLanguageSchema = z.object({
  id: z.number().optional(),
  name: EmployeeLanguagesSchema.nullable(),
  level: EmployeeLanguageLevelSchema.nullable()
});

const EmployeesLanguageSchema = z.object({
  id: z.number().optional(),
  name: EmployeeLanguagesSchema,
  level: EmployeeLanguageLevelSchema
});

export const EmployeeLanguageValidationSchema = z.object({
  languages: EmployeesLanguageSchema.array()
});

const LanguageEditSchema = z.object({
  languages: EmployeesEditLanguageSchema.array()
});

export type LanguagesInfoFormValues = z.infer<typeof LanguageEditSchema>;
export type EmployeeLanguageValues = z.infer<
  typeof EmployeesEditLanguageSchema
>;
