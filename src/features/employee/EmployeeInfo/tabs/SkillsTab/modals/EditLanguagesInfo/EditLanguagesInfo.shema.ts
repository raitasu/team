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

const EditLanguageSchema = z.object({
  languages: EmployeesEditLanguageSchema.array()
});

export const EmployeeLanguageValidationSchema = z.object({
  languages: EmployeesEditLanguageSchema.array()
});

export type LanguagesInfoFormValues = z.infer<typeof EditLanguageSchema>;

export type ChangedEmployeeLanguageInfoValues = {
  [DataKey in keyof LanguagesInfoFormValues]?: LanguagesInfoFormValues[DataKey];
};
